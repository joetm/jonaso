// Build-time data that lives in ./public — written there by `make post-build`
// (of the previous build) and committed. Because ./public is also Astro's
// outDir (emptied at build start), astro.config.mjs snapshots these files to
// .data-snapshot/ at config-load time, before the build touches outDir.
export { default as references } from '../../.data-snapshot/static/references.json'
export { default as referencesType } from '../../.data-snapshot/static/references-type.json'
export { default as referencesDetail } from '../../.data-snapshot/static/references-detail.json'
export { default as docentship } from '../../.data-snapshot/static/docentship.json'
export { default as publications } from '../../.data-snapshot/static/publications.json'
