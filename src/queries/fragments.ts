import { graphql } from 'gatsby'

export const siteMetaFragment = graphql`
    fragment SiteMetaFields on Site {
        siteMetadata {
            title
            description
            logo
            keywords
            organization
            twitter
            url
          }
    }
`