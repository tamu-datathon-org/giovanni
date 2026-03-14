/**
 * Logo and Branch Colors Configuration
 * 
 * This file defines the color palette for logos and branch elements
 * with support for both light and dark themes.
 */

export const logoColors = {
  light: {
    primary: "#6dfdea",
    secondary: "#01c0cc",
    tertiary: "#28979b",
  },
  dark: {
    primary: "#66cae0",
    secondary: "#2b67e1",
    tertiary: "#2a42d3",
  },
} as const;

export const branchColors = {
  light: {
    primary: "#6dfdea",
    secondary: "#01c0cc",
    tertiary: "#28979b",
  },
  dark: {
    primary: "#66cae0",
    secondary: "#2b67e1",
    tertiary: "#2a42d3",
  },
} as const;

// Export a combined object for convenience
export const brandColors = {
  logo: logoColors,
  branch: branchColors,
} as const;

