import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="inline-flex items-center rounded-full bg-primary-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600 transition-colors hover:bg-primary-500/20 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
