import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'
import getSchema from './schema'

interface Props {
  schema?: boolean
  blogPost?: { author: string; datePublished: string }
  description?: string
  image?: string
  keywords?: string[]
  lang?: string
  title?: string
}

const mergeTitles = (page: string = '', base: string) =>
  page ? `${page} | ${base}` : base

const hasLeadingSlashes = (url: string) => url.slice(0, 2) === '//'

/**
 * SEO utility wrapper (powered by react-helmet)
 * Remixed but inspired by:
 * - gatsby-default-starter [`seo.js`](https://github.com/gatsbyjs/gatsby-starter-default/blob/master/src/components/seo.js)
 * - Khalil Stemmler's SEO [best practices article](https://khalilstemmler.com/blog/how-to-optimize-your-gatsby-blog-for-seo/)
 */

export default class SEO extends React.Component<Props, {}> {
  static defaultProps = {
    lang: `en`,
    schema: false,
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
                  url: query.url,
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
                  url: query.url + location.pathname,
                },
              }
              const imageWithProtocol =
                (hasLeadingSlashes(options.page.image) ? 'https:' : '') +
                options.page.image
              return (
                <Helmet
                  htmlAttributes={{ lang: this.props.lang }}
                  title={options.page.title}
                >
                  {/* General tags */}
                  <meta name="description" content={options.page.description} />
                  <meta
                    name="keywords"
                    content={(this.props.keywords || query.keywords).join(`, `)}
                  />
                  <meta name="image" content={imageWithProtocol} />
                  {/* Schema.org tags */}
                  {!this.props.schema ? null : (
                    <script type="application/ld+json">
                      {JSON.stringify(getSchema(options))}
                    </script>
                  )}
                  {/* OpenGraph tags */}
                  <meta property="og:url" content={options.page.url} />
                  {options.page.blogPost ? (
                    <meta property="og:type" content="article" />
                  ) : null}
                  <meta property="og:title" content={options.page.title} />
                  <meta
                    property="og:description"
                    content={options.page.description}
                  />
                  <meta property="og:image" content={imageWithProtocol} />
                  {/* Twitter Card tags */}
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:creator" content={query.twitter} />
                  <meta name="twitter:title" content={options.page.title} />
                  <meta
                    name="twitter:description"
                    content={options.page.description}
                  />
                  <meta name="twitter:image" content={imageWithProtocol} />
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
      ...SiteMetaFields
    }
  }
`
