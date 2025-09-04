'use client'

import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

type Props = {
  query: string
  variables: { [key: string]: unknown }
  data: Record<string, unknown>
}

export default function DocsEditorClient(props: Props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  // @ts-expect-error - runtime shape from Tina
  const body = data?.docs?.body ?? data

  return (
    <div>
      <TinaMarkdown content={body} />
    </div>
  )
}


