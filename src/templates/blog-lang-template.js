import React from "react"
import { graphql } from "gatsby"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { Post } from "../components/post"

const title = {
  ru: "Блог",
  en: "Blog",
}

const BlogPage = ({ data, pageContext, ...rest }) => {
  console.log(data, rest)
  const { lang } = pageContext
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <SEO
        title={title[lang]}
        description="Writings about JavaScript and Rust"
      />
      <div>
        {edges.map(({ node }) => (
          <Post
            key={node.id}
            frontmatter={node.frontmatter}
            timeToRead={node.timeToRead}
            excerpt={node.excerpt}
          />
        ))}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($lang: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { lang: { eq: $lang } } }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            date
            description
            lang
            publishedAgo: date(fromNow: true)
            slug
            title
          }
          id
          excerpt(pruneLength: 300, format: HTML)
          timeToRead
        }
      }
    }
  }
`

export default BlogPage
