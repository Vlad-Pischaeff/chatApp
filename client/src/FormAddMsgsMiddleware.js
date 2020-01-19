require('dotenv').config()
export default async function fetchMsgs(data) {
  const url = `http://${window.location.hostname}:${process.env.REACT_APP_PORT}/api/msgs`;
  const response = await fetch(url, {
    method: 'POST', 
    body: JSON.stringify(data), 
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await response.json();
  return json;
}