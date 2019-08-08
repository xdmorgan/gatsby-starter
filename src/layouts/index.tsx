import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { SEO } from '../components/seo'
import Header from '../components/header'

import '../styles/global.css'
import '../styles/base-layout.css'

const layoutQuery = graphql`
  query SiteLayoutQuery {
    site {
      ...SiteMetaFields
    }
  }
`

const Layout = ({ children }) => (
  <StaticQuery
    query={layoutQuery}
    render={data => (
      <>
        <SEO title="Welcome" />
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
      </>
    )}
  />
)

export default Layout
