const updateBlog = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const blog_content = document.querySelector('#blog-content').value.trim();
  const id = document.querySelector('#submit-update').getAttribute('data-blog');
  const user_id = document
    .querySelector('#submit-update')
    .getAttribute('data-user');

  if (title && blog_content) {
    const res = await fetch(`/api/blogs/update`, {
      method: 'PUT',
      body: JSON.stringify({ title, blog_content, id, user_id }),
      headers: { 'Content-Type': 'application/json' },
    });
    res.ok
      ? document.location.replace(`/dashboard`)
      : alert('Failed to update blog');
  }
};

document.querySelector('#blog-update').addEventListener('submit', updateBlog);
