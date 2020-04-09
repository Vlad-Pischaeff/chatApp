
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

export const fetchRoom = fetchPOST('/api/rooms')
export const fetchMsgs = fetchPOST('/api/msgs')
export const fetchUser = fetchPOST('/api/users')
export const fetchRoomAvatars = fetchGET('/api/roomimg')
export const fetchUserAvatars = fetchGET('/api/userimg')
