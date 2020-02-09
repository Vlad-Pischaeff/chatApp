import React, {useEffect} from 'react'
let nodeAvatars = []

export default function MapUserAvatars({avatars, credentials}) {
  
  useEffect(() => {
    nodeAvatars = document.querySelectorAll('.userAvatars')
  }, [avatars])
  

  const h_Div_onClick = (n, index) => {
    credentials.avatar = `./img/user/${n}`
    nodeAvatars.forEach((el, idx ) =>  {
      idx === index ? el.className = "userAvatars border" : el.className = "userAvatars"
    })
  }

  const avatarsMap = avatars.map((n, i) => {
    return  <div key={i} onClick={() => h_Div_onClick(n, i)}>
              <img src={`./img/user/${n}`} className="userAvatars" alt="" />
            </div>
  })

  return (
    <>
      {avatarsMap}
    </>
  )
}