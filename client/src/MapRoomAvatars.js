import React, {useEffect} from 'react'
let nodeAvatars = []

export default function MapRoomAvatars({roomavatars, chatroom}) {
  
  useEffect(() => {
    nodeAvatars = document.querySelectorAll('.roomAvatars')
  }, [roomavatars])
  

  const h_Div_onClick = (n, index) => {
    chatroom.avatar = `./img/room/${n}`
    nodeAvatars.forEach((el, idx ) =>  {
      idx === index ? el.className = "roomAvatars border" : el.className = "roomAvatars"
    })
  }

  const avatarsMap = roomavatars.map((n, i) => {
    return  <div key={i} onClick={() => h_Div_onClick(n, i)}>
              <img src={`./img/room/${n}`} className="roomAvatars" alt="" />
            </div>
  })
  // console.log('room avatars', roomavatars)
  return (
    <>
      {avatarsMap}
    </>
  )
}