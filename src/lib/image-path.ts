/**
 * Get the correct image path with basePath prefix for production static export
 * In production, images need the basePath prefix since they're in /public
 * In development, images are served directly without basePath
 */
export function getImagePath(path: string): string {
  // Only add basePath in production (static export for GitHub Pages)
  // Dev server serves images directly from /public without basePath prefix
  const isProduction = process.env.NODE_ENV === "production";
  
  if (isProduction) {
    const basePath = "/Adrian_portfolio";
    if (!path.startsWith(basePath) && path.startsWith("/")) {
      return basePath + path;
    }
  }
  
  return path;
}
