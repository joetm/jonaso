// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// })

module.exports = {
  flags: {
    PARALLEL_SOURCING: false,
    FAST_DEV: true,
    // QUERY_ON_DEMAND: true,
    // LAZY_IMAGES: true,
    // PRESERVE_WEBPACK_CACHE: true,
    // DEV_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    // trying to lower memory requirements during build
    // LMDB_STORE: true, // store nodes in a persistent embedded database (vs in-memory). Lowers peak memory usage. Requires Node v14.10 or above.
    // PARALLEL_QUERY_RUNNING: false,
    // GATSBY_CPU_COUNT: 2,
    // PARTIAL_HYDRATION: true,
  },
  plugins: [
    // replace react with preact
    // "gatsby-plugin-preact", // not compatible with React 18
    // do not generate source maps
    "gatsby-plugin-no-sourcemaps",
    // "gatsby-plugin-react-helmet"
    `gatsby-plugin-react-head`,
    `gatsby-plugin-image`,
    // performance monitoring
    // "gatsby-plugin-perf-budgets",
    // {
    //   resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
    //   options: {
    //     devMode: true,
    //     disable: false,
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-sharp`,
    //   options: {
    //     defaults: {
    //       backgroundColor: "#EDEDED",
    //       placeholder: "dominantColor",
    //       breakpoints: [300, 400],
    //     },
    //     // Set to false to allow builds to continue on image errors
    //     failOn: `none`,
    //     // deprecated options and their defaults:
    //     stripMetadata: true,
    //   },
    // },
    // {
    //   resolve: `gatsby-transformer-sharp`,
    //   options: {
    //     checkSupportedExtensions: true,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `artworks`,
    //     path: `${__dirname}/artworks/`,
    //     ignore: [`**/info.txt`],
    //   },
    // },
    {
      resolve: 'gatsby-plugin-minify-html',
      options: {
        debug: false, // debug optional, default false
        config: {
          // Enabled default by this plugin
          collapseWhitespace: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          // Disabled default by html-minifier-terser
          sortAttributes: false,
          useShortDoctype: true,
        }
      }
    },
    'gatsby-plugin-remove-generator',
    // `gatsby-plugin-remove-fingerprints`, // <-- breaks some pages
    // `gatsby-plugin-purgecss`,
  ],
  siteMetadata: {
    siteUrl: "https://www.jonaso.de", // No trailing slash allowed!
    twitterUsername: "@duesynapse",
    title: 'jonaso.de',
    description: '',
  }
}
