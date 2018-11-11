const SERVER_BASE = 'http://localhost:5000';

export async function sendQuery(query) {
  const encoded = encodeURI(query);
  const res = await fetch(`${SERVER_BASE}/explain/${encoded}`)
  const treeData = await res.json();

  return treeData;
}
