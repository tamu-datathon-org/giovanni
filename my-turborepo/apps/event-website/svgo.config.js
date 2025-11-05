/** @type {import('svgo').Config} */
export default {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          cleanupIds: true,
          removeUselessDefs: true,
          removeMetadata: true,
          removeDesc: true,
          removeComments: true,
          removeHiddenElems: true,
          removeEmptyContainers: true,
          removeEditorsNSData: true,
          removeUselessStrokeAndFill: true,
          removeUnknownsAndDefaults: true,
          convertColors: {
            shorthex: true,
            shortname: true,
          },
          convertPathData: {
            applyTransforms: true,
            applyTransformsStroked: true,
            makeArcs: true,
            straightCurves: true,
            convertToQ: true,
            collapseRepeated: true,
            utilizeAbsolute: true,
            leadingZero: true,
          },
          convertTransform: true,
          cleanupNumericValues: {
            floatPrecision: 3,
            leadingZero: true,
            defaultPx: true,
            convertToPx: true,
          },
          moveGroupAttrsToElems: true,
          collapseGroups: true,
          mergePaths: {
            force: false,
          },
          convertShapeToPath: true,
          sortAttrs: true,
        },
      },
    },
    // Keep viewBox for responsive scaling - disable the plugin
    {
      name: "removeViewBox",
      active: false,
    },
    // Remove title elements
    "removeTitle",
    // Clean up list of values
    "cleanupListOfValues",
    // Remove dimensions (keep aspect ratio via viewBox)
    "removeDimensions",
    // Remove empty attributes
    "removeEmptyAttrs",
  ],
};
