const fs = require('fs');

const votesPath = './votes.json';
const postsPath = './posts.json';
const usersPath = './users.json';

fs.readFile(votesPath, 'utf8', (votesErr, voteData) => {
  if (votesErr) {
    console.error(votesErr);
    return;
  }
  fs.readFile(postsPath, 'utf8', (PostErr, postData) => {
    if (PostErr) {
      console.error(PostErr);
      return;
    }
    fs.readFile(usersPath, 'utf8', (usserErr, userData) => {
      if (usserErr) {
        console.error(usserErr);
        return;
      }

      const votes = JSON.parse(voteData);
      const posts = JSON.parse(postData);
      const users = JSON.parse(userData);

      const userNames = {};
      users.forEach((user) => {
        userNames[user.id] = user.name;
      });

      const userScores = {};

      posts.forEach((post) => {
        const postId = post.userId;
        if (!userScores[postId]) {
          userScores[postId] = 5;
        } else {
          userScores[postId] += 5;
        }
      });

      votes.forEach((vote) => {
        const { userId } = vote;
        if (!userScores[userId]) {
          userScores[userId] = 1;
        } else {
          userScores[userId] += 1;
        }
      });

      const usersWithScores = Object.keys(userScores).map((userId) => ({
        userName: userNames[userId],
        score: userScores[userId],
      }));

      usersWithScores.sort((a, b) => b.score - a.score);

      const top5Users = usersWithScores.slice(0, 5);

      console.log('Top 5 most active users based on the scoring :');
      top5Users.forEach((user) => {
        console.log(`Active User :${user.userName}, Score ${user.score}`);
      });
    });
  });
});
