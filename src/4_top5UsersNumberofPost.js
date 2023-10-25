const fs = require('fs');

const postPath = './posts.json';
const userPath = './users.json';
fs.readFile(postPath, 'utf8', (PostErr, postdata) => {
  if (PostErr) {
    return;
  }
  fs.readFile(userPath, 'utf8', (userErr, userdath) => {
    if (userErr) {
      console.error(userErr);
      return;
    }

    const postData = JSON.parse(postdata);
    const userData = JSON.parse(userdath);

    const UserName = {};
    userData.forEach((user) => {
      UserName[user.id] = user.name;
    });

    const userPostCounts = {};
    postData.forEach((post) => {
      const { userId } = post;
      if (!userPostCounts[userId]) {
        userPostCounts[userId] = 1;
      } else {
        userPostCounts[userId] += 1;
      }
    });

    const maxPosts = Object.keys(userPostCounts).map((userId) => ({
      userName: UserName[userId],
      postCount: userPostCounts[userId],
    }));

    maxPosts.sort((a, b) => b.postCount - a.postCount);
    const top5Users = maxPosts.slice(0, 5);

    console.log('Top 5 users with the most posts:');
    top5Users.forEach((user) => {
      console.log(` Name : ${user.userName}, Post Count ${user.postCount}`);
    });
  });
});
