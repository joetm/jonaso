const rimraf = require('rimraf');
const PUBLIC_FOLDER = `${__dirname}/public`;
exports.onPreBuild = () => {
  // empty /public folder
  rimraf.sync(PUBLIC_FOLDER + '/*');
};


// fix build errors related to react-force-graph on /research/network page
// WebpackError: ReferenceError: self is not defined
/*
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /aframe/,
            use: loaders.null(),
          },
          // {
          //   test: /3d-force-graph-vr/,
          //   use: loaders.null(),
          // },
          // {
          //   test: /three-forcegraph/,
          //   use: loaders.null(),
          // },
          // {
          //   test: /three-render-objects/,
          //   use: loaders.null(),
          // },
          // {
          //   test: /3d-force-graph/,
          //   use: loaders.null(),
          // },
          // {
          //   test: /force-graph/,
          //   use: loaders.null(),
          // },
        ],
      },
    })
  }
}
*/


// replace react with preact
// exports.onCreateWebpackConfig = ({ actions }) => {
//   // React-dom is hardcoded as part of react-hot-loader
//   // in the development server. So we either avoid Preact
//   // during development or switch to fast-refresh and loose
//   // hot reloading capabilities.
//   actions.setWebpackConfig({
//     resolve: {
//       alias: {
//         react: `preact/compat`,
//         "react-dom": `preact/compat`,
//         "react-dom/server": `preact/compat`,
//       },
//     },
//   })
// }

// https://blog.greenroots.info/gatsby-the-window-is-not-defined-error-what-and-how-to-fix-it
// skip file during server-side rendering
// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === "build-html") {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: 'ResponsiveMenu',
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

