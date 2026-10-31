/**
 * Optimizes Hero StatSection images for LCP performance.
 * Resizes to max 1920px width and outputs WebP. Run from apps/team-website:
 *   node scripts/optimize-hero-images.mjs
 */
import { readdir, rename } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const statSectionDir = join(__dirname, "..", "public", "images", "StatSection");
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;

async function optimizeImage(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath);
  console.log(`Optimized: ${inputPath} -> ${outputPath}`);
}

async function main() {
  try {
    const files = await readdir(statSectionDir);
    const collagePath = join(statSectionDir, "collage.webp");
    const dsc1Path = join(statSectionDir, "DSC01559.JPG");
    const dsc2Path = join(statSectionDir, "DSC02664.JPG");

    if (files.includes("collage.webp")) {
      const tempPath = join(statSectionDir, "collage.tmp.webp");
      await optimizeImage(collagePath, tempPath);
      await rename(tempPath, collagePath);
    }

    if (files.includes("DSC01559.JPG")) {
      const outPath = join(statSectionDir, "DSC01559.webp");
      await optimizeImage(dsc1Path, outPath);
    }

    if (files.includes("DSC02664.JPG")) {
      const outPath = join(statSectionDir, "DSC02664.webp");
      await optimizeImage(dsc2Path, outPath);
    }

    console.log("Hero image optimization complete.");
  } catch (err) {
    console.error("Optimization failed:", err);
    process.exit(1);
  }
}

main();
