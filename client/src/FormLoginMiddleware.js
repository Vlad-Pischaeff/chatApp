export default async function fetchData(data, fn) {
  const url = 'http://localhost:3001/api/users';
  const response = await fetch(url, {
    method: 'POST', 
    body: JSON.stringify(data), 
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await response.json();
  if (json.length !== 0) {
    fn()
    return true
  } else {
    return false
  }
}