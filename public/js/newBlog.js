const createNewBlog = async (e) => {
  e.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const blog_content = document.querySelector('#blog-content').value.trim();
  // const user_id = document
  //   .querySelector('#createBlog')
  //   .getAttribute('data-user');
  console.log(title);
  console.log(blog_content);

  if (title && blog_content) {
    const response = await fetch('/api/blogs/', {
      method: 'POST',
      body: JSON.stringify({ title, blog_content }),
      headers: { 'Content-Type': 'application/json' },
    });

    response.ok
      ? document.location.replace('/dashboard')
      : alert('Failed to create blog');
  }
};

document.querySelector('#createBlog').addEventListener('click', createNewBlog);
