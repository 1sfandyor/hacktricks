import { ExperimentalGetTinaClient } from '../../../tina/__generated__/types'
import DocsEditorClient from './DocsEditorClient'

export default async function DocsPage() {
  const variables = { relativePath: 'content.mdx' }
  const client = ExperimentalGetTinaClient()
  const res = await client.docs(variables).catch(() => null)

  if (!res) {
    return <div>Document not found.</div>
  }

  return (
    <DocsEditorClient query={res.query} variables={res.variables} data={res.data} />
  )
}