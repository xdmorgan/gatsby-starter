type BlogPostOptions = {
  author: string
  datePublished: string
}

type PageOptions = {
  blogPost?: BlogPostOptions
  description: string
  image: string
  title: string
  url: string
}

type SiteOptions = {
  description: string
  logo: string
  organization: string
  title: string
  url: string
}

type JSONLDSchemaOptions = {
  page: PageOptions
  site: SiteOptions
}

const getWebsiteSchema = ({ page, site }: JSONLDSchemaOptions) => ({
  '@context': 'http://schema.org',
  '@type': 'WebSite',
  url: page.url,
  name: page.title,
  alternateName: site.title,
})

const getBreadcrumbSchema = ({ page, site }: JSONLDSchemaOptions) => ({
  '@context': site.url,
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@id': page.url,
        name: page.title,
        image: page.image,
      },
    },
  ],
})

const getBlogPostSchema = ({ page, site }: JSONLDSchemaOptions) => ({
  '@context': site.url,
  '@type': 'BlogPosting',
  url: page.url,
  name: page.title,
  alternateName: site.title,
  headline: page.title,
  image: {
    '@type': 'ImageObject',
    url: page.image,
  },
  description: page.description,
  author: {
    '@type': 'Person',
    name: page.blogPost.author,
  },
  publisher: {
    '@type': 'Organization',
    url: site.url,
    logo: site.logo,
    name: site.organization,
  },
  mainEntityOfPage: {
    '@type': 'WebSite',
    '@id': site.url,
  },
  datePublished: page.blogPost.datePublished,
})

export default ({ page, site }: JSONLDSchemaOptions) => {
  return [
    // Always include the base website schema
    getWebsiteSchema({ page, site }),
    // Add breadcrumb schema unless we're on the home page
    // FIXME: explicit or implicit check here? Implicit may be error prone
    ...(page.url === site.url ? [] : [getBreadcrumbSchema({ page, site })]),
    // if on editorial content page add BlogPosting schema
    ...(page.blogPost ? [getBlogPostSchema({ page, site })] : []),
  ]
}
