import React from "react"
import { Link, graphql } from "gatsby"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { Post } from "../components/post"

const languages = {
  ru: "На русском",
  en: "English",
}

const BlogPage = ({ data }) => {
  const { allMarkdownRemark, latest } = data
  const { distinct } = allMarkdownRemark
   
  React.useEffect(() => {
    document.location.href = "https://sova.dev"
  }, [])

  return (
    <Layout>
      <SEO title="Blog" description="Writings about JavaScript and Rust" />
      <div>
        {distinct.map(lang => (
          <Link to={`/${lang}`} key={lang}>
            <h3 style={{ display: "inline-block", paddingRight: "0.5rem" }}>
              {languages[lang]}
            </h3>
          </Link>
        ))}
      </div>
      <h2>Latest</h2>
      <div>
        {latest.edges.map(({ node }) => (
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
  query {
    allMarkdownRemark {
      distinct(field: frontmatter___lang)
    }
    latest: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 4
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
