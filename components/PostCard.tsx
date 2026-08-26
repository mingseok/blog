import Link from '@/components/Link'
import PostDate from '@/components/PostDate'
import Tag from '@/components/Tag'

interface Props {
  href: string
  date: string
  title: string
  summary?: string
  tags?: string[]
}

/** 글 목록에서 쓰는 카드 — 홈과 목록 페이지가 같은 모양과 호버 효과를 공유한다. */
const PostCard = ({ href, date, title, summary, tags = [] }: Props) => {
  return (
    <article className="group relative rounded-2xl border border-gray-200/80 px-6 py-7 transition-all duration-200 hover:-translate-y-1 hover:border-primary-400/60 hover:bg-primary-400/5 hover:shadow-lg hover:shadow-primary-500/10 dark:border-gray-800 dark:hover:border-primary-400/40">
      {/* 카드 전체가 글로 가는 링크 — 제목 링크를 따로 두면 같은 곳을 가리키는 링크가
          한 항목에 둘이 된다. 태그는 아래에서 카드 밖으로 꺼내 링크 중첩을 피한다. */}
      <Link href={href} className="absolute inset-0 z-0" aria-label={title}>
        <span className="sr-only">{title}</span>
      </Link>

      <div className="pointer-events-none flex flex-col gap-3">
        <PostDate date={date} />

        <h2 className="text-balance break-keep text-xl font-bold leading-8 tracking-tight text-gray-900 transition-colors group-hover:text-primary-500 dark:text-gray-100 sm:text-2xl">
          {title}
        </h2>

        {summary && (
          <p className="line-clamp-2 break-keep leading-7 text-gray-500 dark:text-gray-400">
            {summary}
          </p>
        )}
      </div>

      {/* 태그는 각자 다른 곳으로 가므로 카드 링크 위(z-10)에 올려 따로 눌리게 한다. */}
      {tags.length > 0 && (
        <div className="relative z-10 mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      )}
    </article>
  )
}

export default PostCard
