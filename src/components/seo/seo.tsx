import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'
import getSchema from './schema'

interface Props {
  blogPost?: { author: string; datePublished: string }
  description?: string
  image?: string
  keywords?: string[]
  lang?: string
  title?: string
}

const mergeTitles = (page: string, base: string) =>
  page ? `${page} | ${base}` : base

/**
 * SEO utility wrapper (powered by react-helmet)
 * Remixed but inspired by:
 * - gatsby-default-starter [`seo.js`](https://github.com/gatsbyjs/gatsby-starter-default/blob/master/src/components/seo.js)
 * - Khalil Stemmler's SEO [best practices article](https://khalilstemmler.com/blog/how-to-optimize-your-gatsby-blog-for-seo/)
 */

export default class SEO extends React.Component<Props, {}> {
  static defaultProps = {
    lang: `en`,
  }

  public render() {
    return (
      <Location>
        {({ location }) => (
          <StaticQuery
            query={detailsQuery}
            render={({ site: { siteMetadata: query } }) => {
              const options = {
                site: {
                  url: location.origin,
                  title: query.title,
                  description: query.description,
                  logo: query.logo,
                  organization: query.organization,
                },
                page: {
                  blogPost: this.props.blogPost,
                  description: this.props.description || query.description,
                  image: this.props.image || query.logo,
                  title: mergeTitles(this.props.title, query.title),
                  url: location.origin + location.pathname,
                },
              }
              const schema = getSchema(options)
              const { lang } = this.props
              const { twitter } = query
              const keywords = this.props.keywords || query.keywords
              const { blogPost, url, title, description, image } = options.page
              return (
                <Helmet htmlAttributes={{ lang }} title={title}>
                  {/* General tags */}
                  <meta name="description" content={description} />
                  <meta name="keywords" content={keywords.join(`, `)} />
                  <meta name="image" content={image} />
                  {/* Schema.org tags */}
                  <script type="application/ld+json">
                    {JSON.stringify(schema)}
                  </script>
                  {/* OpenGraph tags */}
                  <meta property="og:url" content={url} />
                  {blogPost ? (
                    <meta property="og:type" content="article" />
                  ) : null}
                  <meta property="og:title" content={title} />
                  <meta property="og:description" content={description} />
                  <meta property="og:image" content={image} />
                  {/* Twitter Card tags */}
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:creator" content={twitter} />
                  <meta name="twitter:title" content={title} />
                  <meta name="twitter:description" content={description} />
                  <meta name="twitter:image" content={image} />
                </Helmet>
              )
            }}
          />
        )}
      </Location>
    )
  }
}

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        logo
        keywords
        organization
        twitter
      }
    }
  }
`
