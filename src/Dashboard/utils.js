import swal from 'sweetalert2';

const SERVER_BASE = 'http://localhost:5000';

export async function sendQuery(query) {
  const encoded = encodeURI(query);
  const res = await fetch(`${SERVER_BASE}/explain/${encoded}`)
  const treeData = await res.json();

  if (treeData.success === 'false') {
    swal({
      type: 'error',
      title: 'Oops...',
      text: 'There was an error with the query. Try another one!',
    });

    return null;
  }

  return treeData;
}
