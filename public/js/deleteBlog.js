const deleteBlog = async (event) => {
  // console.log(this);
  // event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log('id', id);

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      header: { 'Content-Type': 'application/json' },
    });
    console.log(response);

    response.ok
      ? document.location.replace('/dashboard')
      : alert('Failed to delete blog.');
  }
};

document.querySelector('#blogs').addEventListener('click', deleteBlog);
