const deleteBlog = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#deleteBlog').getAttribute('data-blog');

  const response = await fetch(`/dashboard/delete/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    header: { 'Content-Type': 'application/json' },
  });

  response.ok
    ? document.location.replace('/dashboard')
    : alert('Failed to delete blog.');
};

document.querySelector('#deleteBlog').addEventListener('click', deleteBlog);
