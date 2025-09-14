import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import 'highlight.js/styles/github.css'
import 'highlight.js/styles/github-dark.css'

interface MarkdownRendererProps {
  content: string
  className?: string
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 text-xs opacity-70 hover:opacity-100 text-slate-400 hover:text-slate-200 transition-all p-1 rounded hover:bg-white/5"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="h-3 w-3 text-emerald-400" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </button>
  )
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-invert prose-pre:bg-[#0b1220] prose-pre:border prose-pre:border-white/10 prose-code:before:content-[''] prose-code:after:content-[''] max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <pre className="bg-[#0b1220] border border-white/10 rounded-lg p-4 overflow-x-auto relative">
                <code className={className} {...props}>
                  {children}
                </code>
                <CopyButton text={String(children).replace(/\n$/, '')} />
              </pre>
            ) : (
              <code className="bg-[#0b1220] px-1 py-0.5 rounded text-sm text-slate-300" {...props}>
                {children}
              </code>
            )
          },
          pre({ children, ...props }) {
            return (
              <pre className="bg-[#0b1220] border border-white/10 rounded-lg p-4 overflow-x-auto relative" {...props}>
                {children}
                <CopyButton text={String(children).replace(/\n$/, '')} />
              </pre>
            )
          },
          blockquote({ children, ...props }) {
            return (
              <blockquote 
                className="border-l-4 border-emerald-500 pl-4 italic text-slate-300 my-4" 
                {...props}
              >
                {children}
              </blockquote>
            )
          },
          table({ children, ...props }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border border-white/10 rounded-lg" {...props}>
                  {children}
                </table>
              </div>
            )
          },
          th({ children, ...props }) {
            return (
              <th 
                className="px-4 py-2 bg-[#111827] border-b border-white/10 text-left font-semibold text-slate-200" 
                {...props}
              >
                {children}
              </th>
            )
          },
          td({ children, ...props }) {
            return (
              <td 
                className="px-4 py-2 border-b border-white/10 text-slate-300" 
                {...props}
              >
                {children}
              </td>
            )
          },
          ul({ children, ...props }) {
            return (
              <ul className="list-disc list-inside my-2 space-y-1 text-slate-300" {...props}>
                {children}
              </ul>
            )
          },
          ol({ children, ...props }) {
            return (
              <ol className="list-decimal list-inside my-2 space-y-1 text-slate-300" {...props}>
                {children}
              </ol>
            )
          },
          li({ children, ...props }) {
            return (
              <li className="text-slate-300" {...props}>
                {children}
              </li>
            )
          },
          h1({ children, ...props }) {
            return (
              <h1 className="text-2xl font-bold text-slate-100 my-4" {...props}>
                {children}
              </h1>
            )
          },
          h2({ children, ...props }) {
            return (
              <h2 className="text-xl font-semibold text-slate-100 my-3" {...props}>
                {children}
              </h2>
            )
          },
          h3({ children, ...props }) {
            return (
              <h3 className="text-lg font-medium text-slate-100 my-2" {...props}>
                {children}
              </h3>
            )
          },
          p({ children, ...props }) {
            return (
              <p className="text-slate-300 my-2 leading-7" {...props}>
                {children}
              </p>
            )
          },
          a({ children, href, ...props }) {
            return (
              <a 
                href={href}
                className="text-[#60a5fa] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            )
          },
          strong({ children, ...props }) {
            return (
              <strong className="font-semibold text-slate-100" {...props}>
                {children}
              </strong>
            )
          },
          em({ children, ...props }) {
            return (
              <em className="italic text-slate-300" {...props}>
                {children}
              </em>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
