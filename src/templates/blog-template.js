import React from "react"
import { graphql } from "gatsby"
// import "prismjs/themes/prism-twilight.css"
import "./blog-template.css"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"

const BlogTemplate = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt, tableOfContents } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} description={excerpt} />
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{frontmatter.title}</h1>
          <h5>{frontmatter.date}</h5>
          <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
          <hr />
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($slug: String!, $lang: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug }, lang: { eq: $lang } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        description
        title
      }
      tableOfContents(absolute: false)
      excerpt(pruneLength: 300)
    }
  }
`

export default BlogTemplate
