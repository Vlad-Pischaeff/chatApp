import React, {useRef} from 'react'

export default function MapImages({avatars, value, item}) {
  const imgRef = useRef('')
  let nodes = imgRef.current.childNodes

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
    <div className="add-card-wrap-img" ref={imgRef}>
      {avatarsMap}
    </div>
  )
}