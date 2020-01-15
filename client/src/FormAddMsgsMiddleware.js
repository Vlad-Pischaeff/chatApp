export default async function fetchMsgs(data) {
  const url = 'http://localhost:3001/api/msgs';
  const response = await fetch(url, {
    method: 'POST', 
    body: JSON.stringify(data), 
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await response.json();
  return json;
}