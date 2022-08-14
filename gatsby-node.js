const rimraf = require('rimraf');
const PUBLIC_FOLDER = `${__dirname}/public`;
exports.onPreBuild = () => {
  // empty /public folder
  rimraf.sync(PUBLIC_FOLDER + '/*');
};


// https://blog.greenroots.info/gatsby-the-window-is-not-defined-error-what-and-how-to-fix-it
// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === "build-html") {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /offending-module/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     })
//   }
// }


// PAGINATION
// const path = require("path")
// // const { createFilePath } = require("gatsby-source-filesystem")
// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions
//   const testResult = await graphql(
//     `{
//         allFile(
//           sort: {fields: birthTime, order: DESC}
//           filter: {
//             extension: { regex: "/(jpg)|(png)/" }
//             absolutePath: { regex: "/midjourney/" }
//           }
//           limit: 100
//       ) {
//         edges {
//           node {
//             childImageSharp {
//               gatsbyImageData(
//                 width: 400
//                 placeholder: DOMINANT_COLOR
//               )
//             }
//           }
//         }
//       }
//     }`
//   )
//   if (testResult.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query.`)
//     return
//   }
//   const posts = testResult.data.allFile.edges
//   const postsPerPage = 25
//   const numPages = 4 // Math.ceil(posts.length / postsPerPage)
//   Array.from({ length: numPages }).forEach((_, i) => {
//     createPage({
//       path: `/artworks/midjourney/${i + 1}`,
//       component: path.resolve("./src/components/page-template.js"),
//       context: {
//         limit: postsPerPage,
//         skip: i * postsPerPage,
//         numPages,
//         currentPage: i + 1,
//       },
//     })
//   })

// }
// // exports.onCreateNode = ({ node, actions, getNode }) => {
// //   const { createNodeField } = actions
// //   if (node.internal.type === `MarkdownRemark`) {
// //     const value = createFilePath({ node, getNode })
// //     createNodeField({
// //       name: `slug`,
// //       node,
// //       value,
// //     })
// //   }
// // }

