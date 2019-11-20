import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}/>
        { console.log(posts) }
        {posts.reverse().map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug;
          var image = get(node, 'frontmatter.image');
          const imgSrc= require(`./../pages${node.frontmatter.path}${image[0].src}.jpg`);

          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: '20px',
                  textAlign: 'center',
                }}
              > <br/>
                <Link style={{ boxShadow: '10px solid red',
                  borderBottom: '1px solid black',
                  paddingBottom: '10px',
                  color: 'red',
                  borderWidth: '1px',}} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>

              <div>
                <img src={imgSrc} width="200px" style={{"text-align": "center", "margin-left": "34%", "margin-top": "15px"}} />
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            path
            image {
              name
              src
            }
          }
        }
      }
    }
  }
`
