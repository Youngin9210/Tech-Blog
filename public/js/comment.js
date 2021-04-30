const newComment = async (e) => {
  e.preventDefault();

  const commentText = document.querySelector('#comment-text').value.trim();
  const user = document
    .querySelector('#submit-comment')
    .getAttribute('data-user');
  const blog = document
    .querySelector('#submit-comment')
    .getAttribute('data-blog');

  if (commentText) {
    const res = await fetch('api/comment/create', {
      method: 'POST',
      body: JSON.stringify({ commentText, user_id, blog_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    res.ok
      ? document.location.replace(`/api/blogs/${blog_id}`)
      : alert('Failed to submit comment');
  }
};

document.querySelector('#comment').addEventListener('submit', newComment);
