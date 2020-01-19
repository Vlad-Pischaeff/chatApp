require('dotenv').config()
export default async function fetchUser(data) {
  const url = `http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}/api/users`;
  const response = await fetch(url, {
    method: 'POST', 
    body: JSON.stringify(data), 
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await response.json();
  return json;
}
