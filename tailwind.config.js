// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        // Pretendard 를 앞에 둔다 — 한글까지 이 글꼴이 받고, 없는 글자만 뒤로 넘어간다.
        sans: ['var(--font-pretendard)', 'var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.yellow,
        // 기본 회색은 푸른기가 돌아 노란 강조와 부딪힌다 — 중성 회색으로 교체.
        gray: {
          50: '#f9fafb',
          100: '#ebebeb',
          200: '#d0d0d0',
          300: '#b0b0b0',
          400: '#8d8d8d',
          500: '#6a6a6a',
          600: '#4b4b4b',
          700: '#303030',
          800: '#1d1d1d',
          900: '#141414',
          950: '#141414',
        },
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.600'),
            a: {
              color: theme('colors.primary.500'),
              textUnderlineOffset: '4px',
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              // 코드 블록 안의 구문 강조 토큰(.code-highlight)까지 덮지 않도록 인라인 코드만 겨냥한다.
              'code:not(.code-highlight)': { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            'code:not(.code-highlight)': {
              fontFamily: 'var(--font-pretendard)',
              color: theme('colors.amber.600'),
            },
            // 바깥으로 나가는 링크 — 글씨는 본문색으로 두고 노란 밑줄과 ↗ 로 구분한다.
            '.external': {
              boxSizing: 'content-box',
              padding: '0.25rem',
              borderRadius: '5px',
              textDecorationColor: theme('colors.primary.400'),
              color: theme('colors.black'),
              '&::after': {
                content: '"↗"',
                width: '0.875rem',
                height: '0.875rem',
              },
              '&:hover': {
                color: theme('colors.primary.500'),
              },
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.primary.500'),
              textUnderlineOffset: '4px',
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              'code:not(.code-highlight)': { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            'code:not(.code-highlight)': {
              color: theme('colors.amber.500'),
            },
            '.external': {
              color: theme('colors.primary.400'),
              textDecorationColor: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
                textDecorationColor: theme('colors.primary.300'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
