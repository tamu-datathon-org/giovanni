/**
 * Logo and Branch Colors Configuration
 */

export const logoColors = {
  primary: "#6dfdea",
  secondary: "#01c0cc",
  tertiary: "#28979b",
} as const;

export const branchColors = {
  primary: "#6dfdea",
  secondary: "#01c0cc",
  tertiary: "#28979b",
} as const;

// Export a combined object for convenience
export const brandColors = {
  logo: logoColors,
  branch: branchColors,
} as const;
