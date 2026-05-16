'use client';

/**
 * Get the correct image path with basePath prefix for production static export
 * Detects basePath from the current URL pathname at runtime
 * Always returns the basePath-prefixed path to avoid SSR hydration mismatches
 */
export function getImagePath(path: string): string {
  // Always check the current pathname and add basePath if needed
  // This works because Image components are client-side rendered in our app
  if (typeof window !== "undefined") {
    // Client-side: we have access to window
    const currentPath = window.location.pathname;
    if (currentPath.includes("/Adrian_portfolio")) {
      const basePath = "/Adrian_portfolio";
      if (!path.startsWith(basePath) && path.startsWith("/")) {
        return basePath + path;
      }
    }
  } else {
    // Server-side (SSR): assume we're deploying to GitHub Pages with basePath
    // This keeps SSR output consistent with what the client will render
    const basePath = "/Adrian_portfolio";
    if (!path.startsWith(basePath) && path.startsWith("/")) {
      return basePath + path;
    }
  }
  
  return path;
}
