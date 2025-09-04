import client from '../../../tina/__generated__/client'
import DocsEditorClient from './DocsEditorClient'

export default async function DocsPage() {
  const variables = { relativePath: 'content.mdx' }
  const res = await client.queries.docs(variables).catch(() => null)

  if (!res) {
    return <div>Document not found.</div>
  }

  return (
    <DocsEditorClient query={res.query} variables={res.variables} data={res.data} />
  )
}


