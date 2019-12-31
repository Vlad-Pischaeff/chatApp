export default async function fetchData(data, fn) {
  let url = 'http://localhost:3001/api/users';
  let response = await fetch(url, {
    method: 'POST', 
    body: JSON.stringify(data), 
    headers: { 'Content-Type': 'application/json' }
  });
  let json = await response.json();
  if (json.length === 0) {
    data.method = 'add'
    response = await fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data), 
      headers: { 'Content-Type': 'application/json' }
    });
    json = await response.json();
    console.log('adduser true -- ', json)
    fn()
    return true
  } else {
    console.log('adduser false -- ', json)
    return false
  }
}