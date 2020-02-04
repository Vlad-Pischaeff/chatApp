require('dotenv').config()

function fetchPOST (url) {
  return async function (data) {
    const response = await fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data), 
      headers: { 'Content-Type': 'application/json' }
    });
    const json = await response.json();
    return json;
  }
}

function fetchGET (url) {
  return async function () {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
}

const url = `http://${window.location.hostname}:${process.env.REACT_APP_PORT}`

export const fetchRoom = fetchPOST(`${url}/api/rooms`)
export const fetchMsgs = fetchPOST(`${url}/api/msgs`)
export const fetchUser = fetchPOST(`${url}/api/users`)
export const fetchRoomAvatars = fetchGET(`${url}/api/roomimg`)
export const fetchUserAvatars = fetchGET(`${url}/api/userimg`)
