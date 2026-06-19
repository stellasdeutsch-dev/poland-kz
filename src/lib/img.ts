/** Build an Unsplash image URL from a photo id (e.g. "photo-123..."). */
export function unsplash(id: string, w = 400): string {
  return `https://images.unsplash.com/${id}?w=${w}&q=70&auto=format&fit=crop`;
}

/** Retina srcSet for an Unsplash photo id. */
export function unsplashSrcSet(id: string, w = 400): string {
  return `${unsplash(id, w)} 1x, ${unsplash(id, w * 2)} 2x`;
}
