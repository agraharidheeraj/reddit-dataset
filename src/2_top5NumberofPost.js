const fs = require('fs');

const dataPath = './posts.json';
const topicPath = './topics.json';

fs.readFile(dataPath, 'utf8', (postErr, postData) => {
  if (postErr) {
    console.error(postErr);
    return;
  }

  fs.readFile(topicPath, 'utf8', (topicErr, topicData) => {
    if (topicErr) {
      console.error(topicErr);
      return;
    }

    const jsonData = JSON.parse(postData);
    const jsonTopic = JSON.parse(topicData);

    const topicName = {};
    jsonTopic.forEach((topic) => {
      topicName[topic.id] = topic.name;
    });

    const numberofPost = {};
    jsonData.forEach((posts) => {
      const { topicId } = posts;
      if (!numberofPost[topicId]) {
        numberofPost[topicId] = 1;
      } else {
        numberofPost[topicId] += 1;
      }
    });

    const topicWithPostCount = Object.keys(numberofPost).map((topicId) => ({
      topicName: topicName[topicId],
      postCount: numberofPost[topicId],
    }));

    topicWithPostCount.sort((a, b) => b.postCount - a.postCount);
    const top5Topics = topicWithPostCount.slice(0, 5);

    console.log('Top 5 Topic with the most posts:');
    top5Topics.forEach((topic) => {
      console.log(` Topic Name: ${topic.topicName}, Post Count ${topic.postCount}`);
    });
  });
});
