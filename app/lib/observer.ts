const observerOption = {
  threshold: 0,
  rootMargin: '-100px 0px 0px 0px',
}

/**
 * 목차에서 "지금 읽는 위치"를 표시하기 위한 관찰자.
 *
 * 화면에 보이는 제목을 그대로 쓰면 스크롤 방향에 따라 표시가 튄다. 내려갈 때는 화면 위로
 * 빠져나간 제목을, 올라갈 때는 다시 들어온 제목의 바로 앞 제목을 현재 위치로 삼는다.
 */
export const getHeadingObserver = (headings: string[], callback: (id: string) => void) => {
  let direction = ''
  let prevYposition = window.scrollY

  const checkScrollDirection = (prevY: number) => {
    if (window.scrollY === prevY) return
    if (window.scrollY > prevY) direction = 'down'
    else direction = 'up'

    prevYposition = window.scrollY
  }

  callback(decodeURIComponent(window.location.hash).slice(1) || '')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      checkScrollDirection(prevYposition)

      if (direction === 'down' && !entry.isIntersecting) {
        callback(entry.target.id)
      }

      if (direction === 'up' && entry.isIntersecting) {
        const index = headings.indexOf(entry.target.id)
        callback(headings[index - 1] || '')
      }
    })
  }, observerOption)

  return observer
}
