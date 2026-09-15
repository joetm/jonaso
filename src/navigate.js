// Vanilla replacement for gatsby's navigate() in client-side islands.
export function navigate(url) {
  window.location.assign(url)
}
