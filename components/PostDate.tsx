import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

interface Props {
  date: string
}

/** 글 목록에서 쓰는 날짜 배지 — 아이콘과 알약 배경으로 본문 회색 텍스트와 구분한다. */
const PostDate = ({ date }: Props) => {
  return (
    <time
      dateTime={date}
      suppressHydrationWarning
      className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100/80 px-3 py-1 text-[13px] font-semibold tracking-tight text-gray-700 dark:border-gray-700/70 dark:bg-gray-800/70 dark:text-gray-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="h-3.5 w-3.5 text-primary-500"
        aria-hidden="true"
      >
        <rect x="3.75" y="5.25" width="16.5" height="14.25" rx="1.5" />
        <path strokeLinecap="round" d="M6.75 3v3M17.25 3v3M3.75 9.75h16.5" />
      </svg>
      {formatDate(date, siteMetadata.locale)}
    </time>
  )
}

export default PostDate
