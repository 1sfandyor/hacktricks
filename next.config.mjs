import nextra from 'nextra'
 
const withNextra = nextra({
//   search: { codeblocks: false }
})
 
export default withNextra({
    turbopack: {
        resolveAlias: {
            'next-mdx-import-source-file': './mdx-components.tsx'
        }
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/docs',
                permanent: false
            }
        ]
    }
})