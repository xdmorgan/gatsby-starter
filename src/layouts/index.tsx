import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Header from '../components/header'

import '../styles/global.css'
import '../styles/base-layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          ...SiteMetaFields
        }
      }
    `}
    render={data => (
      <div>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
      </div>
    )}
  />
)

export default Layout
