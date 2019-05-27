import { graphql } from 'gatsby'

export interface SiteMeta {
  title: string
  description: string
  logo: string
  keywords: string[]
  organization: string
  twitter: string
  url: string
}

export const fragment = graphql`
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
