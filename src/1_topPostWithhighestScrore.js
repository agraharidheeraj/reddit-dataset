const fs = require('fs');

const postPath = './votes.json';

fs.readFile(postPath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const voteData = JSON.parse(data);
  const highestPostScore = {};

  voteData.forEach((vote) => {
    const { postId } = vote;

    // it check If there is no entry for the 'postId',then highestPostScore object with a score of 0
    if (!highestPostScore[postId]) {
      highestPostScore[postId] = 0;
    }
    if (vote.type === 'up') {
      highestPostScore[postId] += 1;
    } else if (vote.type === 'down') {
      highestPostScore[postId] -= 1;
    }
  });

  const postWithScore = Object.keys(highestPostScore).map((postId) => ({
    postId,
    score: highestPostScore[postId],
  }));

  postWithScore.sort((a, b) => b.score - a.score);
  const Top3Post = postWithScore.slice(0, 3);
  console.log('Top 3 post with the heigest score:');
  Top3Post.forEach((post) => {
    console.log(` Id: ${post.postId}, Score ${post.score}`);
  });
});
