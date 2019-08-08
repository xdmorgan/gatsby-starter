import * as React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Image from 'gatsby-image'
import Link from '../components/link'
import { SEO } from '../components/seo'
import { SiteMeta } from '../queries/site-meta'

interface Props {
  data: {
    site: {
      siteMetadata: SiteMeta
    }
    placeholderImage: any
  }
}

const StyledSection = styled.section`
  padding: 4em;
  max-width: 400px;
  background: #ededed;
`

export default function Page({ data }: Props) {
  const { title, description } = data.site.siteMetadata
  return (
    <>
      <SEO
        // all fields optional, will fall back to gatsby-config.js global settings
        // all pages have open graph and twitter card meta tags and website JSON LD schema
        // pages with a url other than the base url also have a breadcrumbs LD Schema
        // blogPost prop is only necessary on blog pages, and adds a blogposting JSON-LD schema
        title="Hello!"
        description="Hi from the homepage"
        blogPost={{ author: 'Dan Morgan', datePublished: '2019/01/21' }}
      />
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Now go build something great.</p>
      <StyledSection>
        <Image fluid={data.placeholderImage.childImageSharp.fluid} />
      </StyledSection>
      <Link to="/test">Go to MDX page</Link>
      <Link to="//google.com">Go to Google</Link>
    </>
  )
}

export const query = graphql`
  query IndexPageQuery {
    site {
      ...SiteMetaFields
    }
    placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
