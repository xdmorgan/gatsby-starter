import * as React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
      }
    }
  }
}

export const indexPageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

const StyledSection = styled.section`
  padding: 4em;
  max-width: 400px;
  background: #ededed;
`

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  public render() {
    const { title, description } = this.props.data.site.siteMetadata
    return (
      <Layout>
        <SEO
          title="Home"
          description="Required"
          keywords={[`gatsby`, `application`, `react`]}
        />
        <h1>{title}</h1>
        <p>{description}</p>
        <p>Now go build something great.</p>
        <StyledSection>
          <Image />
        </StyledSection>
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    )
  }
}
