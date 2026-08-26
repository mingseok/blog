import Link from '@/components/Link'
import PostCard from '@/components/PostCard'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <div className="flex flex-col gap-10 py-8">
      <ul className="flex flex-col gap-5">
        {!posts.length && (
          <li className="text-gray-500 dark:text-gray-400">아직 쓴 글이 없어요.</li>
        )}
        {posts.slice(0, MAX_DISPLAY).map((post) => {
          const { slug, date, title, summary, tags } = post
          return (
            <li key={slug}>
              <PostCard
                href={`/blog/${slug}`}
                date={date}
                title={title}
                summary={summary}
                tags={tags}
              />
            </li>
          )
        })}
      </ul>

      {/* 홈은 /blog 1페이지와 같은 다섯 글을 보여 주므로, "다음"은 /blog 2페이지로 이어진다. */}
      {posts.length > MAX_DISPLAY && (
        <nav className="flex items-center justify-between" aria-label="페이지 이동">
          <span className="cursor-not-allowed rounded-full border border-gray-200/60 px-4 py-2 text-sm font-semibold text-gray-300 dark:border-gray-800 dark:text-gray-600">
            ← 이전
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            <span className="text-base font-bold text-primary-500">1</span>
            <span className="mx-1.5">/</span>
            {Math.ceil(posts.length / MAX_DISPLAY)}
          </span>
          <Link
            href="/blog/page/2"
            rel="next"
            className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-gray-700 dark:text-gray-100"
          >
            다음 →
          </Link>
        </nav>
      )}
    </div>
  )
}
