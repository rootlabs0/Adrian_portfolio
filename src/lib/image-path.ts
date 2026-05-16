/**
 * Get the correct image path with basePath prefix on dev (Next.js has a bug with basePath on dev server)
 * On prod (static export), Next.js handles this automatically
 */
export function getImagePath(path: string): string {
  // During dev: just return the path as-is, dev server serves from /public
  // During production static export: Next.js applies basePath automatically
  // So we don't need to do anything
  return path;
}
