/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import PostCard from '@/components/PostCard'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  const buttonClass =
    'rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-gray-700 dark:text-gray-100'
  const disabledClass =
    'cursor-not-allowed rounded-full border border-gray-200/60 px-4 py-2 text-sm font-semibold text-gray-300 dark:border-gray-800 dark:text-gray-600'

  return (
    <div className="pb-8 pt-10">
      <nav className="flex items-center justify-between">
        {prevPage ? (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className={buttonClass}
          >
            ← 이전
          </Link>
        ) : (
          <span className={disabledClass}>← 이전</span>
        )}
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          <span className="text-base font-bold text-primary-500">{currentPage}</span>
          <span className="mx-1.5">/</span>
          {totalPages}
        </span>
        {nextPage ? (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next" className={buttonClass}>
            다음 →
          </Link>
        ) : (
          <span className={disabledClass}>다음 →</span>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        {/* 전체 목록도 태그 목록도 머리 없이 바로 글로 시작한다 — 메인 화면과 같은 카드. */}
        <div className="pt-6">
          <ul className="flex flex-col gap-5">
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post
              return (
                <li key={path}>
                  <PostCard
                    href={`/${path}`}
                    date={date}
                    title={title}
                    summary={summary}
                    tags={tags}
                  />
                </li>
              )
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </>
  )
}
