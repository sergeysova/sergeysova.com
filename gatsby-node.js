/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

exports.createPages = async setup => {
  createBlogLang(setup)
  createBlogPosts(setup)
}

async function createBlogLang({ actions, graphql }) {
  const blogLangTemplate = path.resolve(`src/templates/blog-lang-template.js`)
  const result = await graphql(`
    {
      allMarkdownRemark {
        distinct(field: frontmatter___lang)
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.distinct.forEach(lang => {
    actions.createPage({
      path: `/${lang}`,
      component: blogLangTemplate,
      context: { lang },
    })
  })
}

async function createBlogPosts({ actions, graphql }) {
  const blogPostTemplate = path.resolve(`src/templates/blog-template.js`)
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
              date
              lang
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    actions.createPage({
      path: `/${node.frontmatter.lang}/${node.frontmatter.slug}`,
      component: blogPostTemplate,
      context: {
        slug: node.frontmatter.slug,
        lang: node.frontmatter.lang,
      }, // additional data can be passed via context
    })
  })
}
