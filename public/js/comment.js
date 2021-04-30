const newComment = async (e) => {
  e.preventDefault();

  const comment_content = document.querySelector('#comment-text').value.trim();
  const user_id = document
    .querySelector('#submit-comment')
    .getAttribute('data-user');
  const blog_id = document
    .querySelector('#submit-comment')
    .getAttribute('data-blog');

  if (comment_content) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment_content, user_id, blog_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    response.ok
      ? document.location.replace(`/api/blogs/${blog_id}`)
      : alert('Failed to submit comment');
  }
};

document.querySelector('#comment').addEventListener('submit', newComment);
