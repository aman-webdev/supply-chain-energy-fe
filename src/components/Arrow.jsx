import React from 'react'

const Arrow = ({styleClass}) => {
  return (
    <div>
<svg fill="none" stroke="white" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" className={styleClass}></path>
</svg>
    </div>
  )
}

export default Arrow