const updateBlog = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value;
  const blog_content = document.querySelector('#blog-content').value;
  const id = document.querySelector('#submit-update').getAttribute('data-blog');
  const user_id = document
    .querySelector('#submit-update')
    .getAttribute('data-user');

  // console.log(title, blog_content, id, user_id);

  if (title && blog_content) {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, blog_content, id, user_id }),
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log(response);
    response.ok
      ? document.location.replace(`/dashboard`)
      : alert('Failed to update blog');
  }
};

document.querySelector('#blog-update').addEventListener('submit', updateBlog);
