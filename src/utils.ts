// Make image URL
export function makeImagePath(path: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ?? "original"}${path}`;
}
