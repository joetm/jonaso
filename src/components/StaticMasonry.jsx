import React from "react"

// Prerendered gallery (replaces the react-masonry-css MasonryGallery island):
// CSS-columns layout (src/masonry-static.css), dominant-color placeholder
// backgrounds, native lazy loading. images: [url, width, height, color][]

export default function StaticMasonry({ images }) {
  return (
    <section style={{ textAlign: 'center', marginLeft: '30px', marginRight: '30px', maxWidth: '2000px', margin: 'auto' }}>
      <div className="static-masonry">
        {images.map(img => (
          <div key={encodeURI(img[0])} style={{ backgroundColor: img[3] }}>
            <img
              src={img[0]}
              width={img[1]}
              height={img[2]}
              sizes="(min-width: 400px) 400px, 100vw"
              decoding="async"
              loading="lazy"
              alt=""
            />
          </div>
        ))}
      </div>
    </section>
  )
}
