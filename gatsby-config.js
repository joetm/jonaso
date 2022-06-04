// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// })

module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-no-sourcemaps",
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
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