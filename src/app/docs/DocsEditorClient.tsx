'use client'

import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown, type TinaMarkdownContent } from 'tinacms/dist/rich-text'
import type { Components } from 'tinacms/dist/rich-text'
import type { ReactElement } from 'react'

type Props = {
  query: string
  variables: { [key: string]: unknown }
  data: DocsData
}

type DocsData = {
  docs: {
    body?: TinaMarkdownContent | TinaMarkdownContent[]
  }
}

export default function DocsEditorClient(props: Props) {
  const { data } = useTina<DocsData>({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  // Tina rich-text AST (required for TinaMarkdown). Do not fallback to raw data.
  const body = data.docs?.body

  // Map code blocks & images to styled elements compatible with Nextra
  const components = {
    code_block: ({ value, lang }: { value: string; lang?: string }): ReactElement => (
      <pre className={`nx-bg-neutral-900 nx-text-neutral-100 nx-rounded-md nx-p-4 nx-my-4 nx-overflow-x-auto nx-text-[13px] ${lang ? `language-${lang}` : ''}`}>
        <code>{value}</code>
      </pre>
    ),
    img: ({ url, alt }: { url?: string; alt?: string }): ReactElement => (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="nx-rounded-lg nx-shadow-sm" src={url ?? ''} alt={alt ?? ''} />
    ),
  } as unknown as Components<{ [x: string]: (props: object) => ReactElement }>

  // Render with Nextra prose classes so typography and code are styled
  return (
    <div className="nx-prose nx-prose-neutral dark:nx-prose-invert nx-max-w-none">
      {body ? (
        <TinaMarkdown content={body} components={components} />
      ) : (
        <div>Kontent topilmadi yoki noto‘g‘ri format.</div>
      )}
    </div>
  )
}
