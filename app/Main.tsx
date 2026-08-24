import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <div className="flex flex-col gap-10 py-8">
      <ul className="flex flex-col gap-3">
        {!posts.length && (
          <li className="text-gray-500 dark:text-gray-400">아직 쓴 글이 없어요.</li>
        )}
        {posts.slice(0, MAX_DISPLAY).map((post) => {
          const { slug, date, title, summary, tags } = post
          return (
            <li key={slug}>
              {/* 카드 전체가 글로 가는 링크 — 제목 링크와 "Read more" 를 따로 두면 같은 곳을
                  가리키는 링크가 한 항목에 둘이 된다. 태그는 아래에서 카드 밖으로 꺼내
                  링크 중첩을 피한다. */}
              <article className="group relative rounded-2xl px-5 py-6 transition-colors hover:bg-gray-100/70 dark:hover:bg-zinc-800/60">
                <Link href={`/blog/${slug}`} className="absolute inset-0 z-0" aria-label={title}>
                  <span className="sr-only">{title}</span>
                </Link>

                <div className="pointer-events-none flex flex-col gap-3">
                  <time dateTime={date} className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(date, siteMetadata.locale)}
                  </time>

                  <h2 className="text-xl font-bold leading-8 tracking-tight text-gray-900 transition-colors group-hover:text-primary-500 dark:text-gray-100 sm:text-2xl">
                    {title}
                  </h2>

                  {summary && (
                    <p className="line-clamp-2 leading-7 text-gray-500 dark:text-gray-400">
                      {summary}
                    </p>
                  )}
                </div>

                {/* 태그는 각자 다른 곳으로 가므로 카드 링크 위(z-10)에 올려 따로 눌리게 한다. */}
                {tags.length > 0 && (
                  <div className="relative z-10 mt-4 flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                )}
              </article>
            </li>
          )
        })}
      </ul>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-center">
          <Link
            href="/blog"
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-gray-700 dark:text-gray-100"
            aria-label="All posts"
          >
            글 전체 보기
          </Link>
        </div>
      )}
    </div>
  )
}
