import React from "react"
import { Link } from "gatsby"

export const Post = ({ frontmatter, timeToRead, excerpt }) => (
  <div>
    <Link to={`/${frontmatter.lang}/${frontmatter.slug}`}>
      <h2>{frontmatter.title}</h2>
    </Link>
    <time>
      {frontmatter.publishedAgo} — {timeToRead}m to read
    </time>
    {frontmatter.description && <p>{frontmatter.description}</p>}
    <p dangerouslySetInnerHTML={{ __html: excerpt }}></p>
  </div>
)
