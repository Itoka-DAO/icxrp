import { Global } from '@emotion/react'

const Font = () => {
  return (
    <Global
      styles={`
        @font-face {
          font-family: 'Himagsikan';
          src: url('/fonts/himagsikan/himagsikan.ttf') format('woff');
        }
      `}
    />
  )
}


export default Font;
