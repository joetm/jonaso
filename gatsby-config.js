// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// })

module.exports = {
  flags: {
    PARALLEL_SOURCING: false,
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    // trying to lower memory requirements during build
  },
  plugins: [
    "gatsby-plugin-no-sourcemaps",
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          backgroundColor: "#EDEDED",
          placeholder: "dominantColor",
        },
        // Set to false to allow builds to continue on image errors
        failOnError: false,
        // deprecated options and their defaults:
        stripMetadata: true,
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        checkSupportedExtensions: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `artworks`,
        path: `${__dirname}/artworks/`,
        ignore: [`**/info.txt`],
      },
    },
    "gatsby-plugin-react-helmet"
  ],
  siteMetadata: {
    url: "https://www.jonaso.de", // No trailing slash allowed!
    twitterUsername: "@duesynapse"
  }
}
