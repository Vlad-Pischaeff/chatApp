import React from 'react'

export default function MapImages({nodes, avatars, value, item}) {

  const handleClick = (n, index) => {
    value.avatar = `./img/${item}/${n}`
    nodes.forEach((el, idx ) =>  {
      idx === index ? el.className = "border" : el.className = ""
    })
  }

  const avatarsMap = avatars.map((n, i) => {
    return <img src={`./img/${item}/${n}`} className="" alt="" 
                key={i} onClick={() => handleClick(n, i)}/>
  })

  return (
    <>
      {avatarsMap}
    </>
  )
}