'use client'

import { useEffect, useState } from 'react'
import { getHeadingObserver } from 'app/lib/observer'

interface TOCProps {
  toc: {
    value: string
    url: string
    depth: number
  }[]
  className?: string
}

/**
 * 글 목차 — 본문 제목을 따라가며 지금 읽는 위치를 굵게 표시한다.
 * 화면이 좁으면 놓을 자리가 없어 xl 이상에서만 띄운다(호출부에서 지정).
 */
const TOC = ({ toc, className }: TOCProps) => {
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    if (toc.length === 0) return

    const headings = toc.map(({ url }) => url.slice(1))
    const observer = getHeadingObserver(headings, setCurrentId)
    const headingElements = toc
      .map(({ url }) => document.getElementById(url.slice(1)))
      .filter((el): el is HTMLElement => el !== null)

    headingElements.forEach((heading) => observer.observe(heading))

    return () => {
      headingElements.forEach((heading) => observer.unobserve(heading))
    }
  }, [toc])

  if (toc.length === 0) return null

  return (
    <nav className={`sticky top-32 pt-8 ${className ?? ''}`}>
      <ul>
        {toc.map(({ value, url, depth }) => (
          <li
            key={url}
            className={`pr-4 leading-8 transition-['font-size'] hover:text-black dark:hover:text-white ${
              currentId === url.slice(1)
                ? 'text-[1.05rem] font-semibold text-black dark:text-white'
                : 'text-gray-500 dark:text-gray-300'
            } ${depth === 3 ? 'pl-4' : depth === 4 ? 'pl-8' : ''}`}
          >
            <a href={url}>{value}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TOC
