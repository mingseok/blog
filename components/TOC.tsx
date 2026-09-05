'use client'

import { useEffect, useRef, useState } from 'react'
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
  const navRef = useRef<HTMLElement>(null)

  // 목차가 화면보다 길면 목차 안에서 따로 스크롤한다. 본문을 끝까지 내려야 아래 항목이 보이던 문제.
  // 지금 읽는 제목이 목차 밖으로 나가면 목차만 살짝 움직여 보이게 한다.
  useEffect(() => {
    if (!currentId || !navRef.current) return
    const active = navRef.current.querySelector<HTMLElement>(`a[href="#${currentId}"]`)
    active?.scrollIntoView({ block: 'nearest' })
  }, [currentId])

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
    <nav
      ref={navRef}
      className={`sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto pt-8 ${className ?? ''}`}
    >
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
            {/* 긴 제목은 두 줄로 내려가지 않게 한 줄에서 말줄임. 전체 제목은 마우스를 올리면 보인다. */}
            <a href={url} title={value} className="block truncate">
              {value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TOC
