"use client";

import type { MutableRefObject } from "react";
import type { BufferGeometry, Material, Object3D } from "three";
import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Box3,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  OrthographicCamera,
  Scene,
  SRGBColorSpace,
  Texture,
  Vector3,
  WebGLRenderer,
} from "three";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import type { BearMotion, ProjectAnchors } from "./bear-config";
import {
  BEAR_MODEL_URL,
  BEAR_STATS,
  bearZoom,
  returnProgress,
} from "./bear-config";

interface BearSceneProps {
  active: boolean;
  motion: MutableRefObject<BearMotion>;
  wake: MutableRefObject<() => void>;
  onProject: ProjectAnchors;
  onReady: () => void;
  onError: () => void;
}

function disposeModel(model: Object3D) {
  const textures = new Set<Texture>();
  model.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    const mesh = child as Mesh<BufferGeometry, Material | Material[]>;
    mesh.geometry.dispose();
    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];
    for (const material of materials) {
      for (const value of Object.values(material)) {
        if (value instanceof Texture) textures.add(value);
      }
      material.dispose();
    }
  });
  for (const texture of textures) {
    const source: unknown = texture.source.data;
    if (typeof ImageBitmap !== "undefined" && source instanceof ImageBitmap)
      source.close();
    texture.dispose();
  }
}

// Next 16's App Router bundles React 19 even though this workspace declares
// React 18. Three directly avoids a dependency on a mismatched reconciler.
export default function BearScene({
  active,
  motion,
  wake,
  onProject,
  onReady,
  onError,
}: BearSceneProps) {
  const container = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const pause = useRef<() => void>(() => undefined);

  useEffect(() => {
    activeRef.current = active;
    if (active) wake.current();
    else pause.current();
  }, [active, wake]);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      onError();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";
    element.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 50);
    camera.position.z = 6;
    camera.updateMatrixWorld();
    scene.add(new AmbientLight("white", 1.4));
    scene.add(new HemisphereLight("#e8f8ff", "#7794b1", 1.6));
    const key = new DirectionalLight("white", 3);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const fill = new DirectionalLight("white", 1.2);
    fill.position.set(4, 1, 3);
    scene.add(fill);
    const pivot = new Group();
    scene.add(pivot);
    const points = BEAR_STATS.map((stat) => ({
      local: new Vector3(...stat.anchor),
      projected: new Vector3(),
    }));
    let width = 1;
    let height = 1;
    let frame = 0;
    let cancelled = false;
    let loaded: Group | undefined;
    let announced = false;

    const invalidate = () => {
      if (!cancelled && !frame && activeRef.current && !document.hidden)
        frame = requestAnimationFrame(render);
    };
    function render() {
      frame = 0;
      if (cancelled || !activeRef.current || document.hidden) return;
      const state = motion.current;
      if (!state.dragging) {
        const progress = returnProgress(performance.now() - state.returnAt);
        state.yaw = state.fromYaw * (1 - progress);
        state.pitch = state.fromPitch * (1 - progress);
        if (progress < 1 && (state.fromYaw !== 0 || state.fromPitch !== 0))
          invalidate();
      }
      pivot.rotation.set(state.pitch, state.yaw, 0, "YXZ");
      pivot.updateWorldMatrix(true, true);
      onProject(
        points.map(({ local, projected }) => {
          const screen = projected.copy(local);
          pivot.localToWorld(screen).project(camera);
          return {
            x: ((screen.x + 1) * width) / 2,
            y: ((1 - screen.y) * height) / 2,
          };
        }),
        width,
        height,
      );
      renderer.render(scene, camera);
      if (loaded && !announced) {
        announced = true;
        onReady();
      }
    }
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    wake.current = invalidate;
    pause.current = stop;
    const resize = new ResizeObserver(() => {
      width = Math.max(1, element.clientWidth);
      height = Math.max(1, element.clientHeight);
      renderer.setSize(width, height);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.zoom = bearZoom(width, height);
      camera.updateProjectionMatrix();
      invalidate();
    });
    resize.observe(element);
    const visibility = () => {
      if (document.hidden) stop();
      else invalidate();
    };
    document.addEventListener("visibilitychange", visibility);
    const contextLost = (event: Event) => {
      event.preventDefault();
      onError();
    };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    loader.load(
      BEAR_MODEL_URL,
      (gltf) => {
        if (cancelled) {
          disposeModel(gltf.scene);
          return;
        }
        loaded = gltf.scene;
        const bounds = new Box3().setFromObject(loaded);
        const center = bounds.getCenter(new Vector3());
        const scale = 2 / bounds.getSize(new Vector3()).y;
        loaded.scale.multiplyScalar(scale);
        loaded.position.copy(center).multiplyScalar(-scale);
        pivot.add(loaded);
        invalidate();
      },
      undefined,
      () => {
        if (!cancelled) onError();
      },
    );

    return () => {
      cancelled = true;
      stop();
      resize.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      wake.current = () => undefined;
      pause.current = () => undefined;
      if (loaded) disposeModel(loaded);
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [motion, wake, onProject, onReady, onError]);

  return (
    <div
      ref={container}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      aria-hidden
    />
  );
}
