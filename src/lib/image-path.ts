'use client';

/**
 * Get the correct image path with basePath prefix for production static export
 * Detects basePath from the current URL pathname
 */
export function getImagePath(path: string): string {
  if (typeof window === "undefined") {
    return path;  // SSR - can't access window
  }
  
  // Check if current URL contains /Adrian_portfolio
  const currentPath = window.location.pathname;
  if (currentPath.includes("/Adrian_portfolio")) {
    const basePath = "/Adrian_portfolio";
    if (!path.startsWith(basePath) && path.startsWith("/")) {
      return basePath + path;
    }
  }
  
  return path;
}
