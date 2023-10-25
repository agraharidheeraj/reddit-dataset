const fs = require("fs");

const  dataPath= './posts.json';
const topicPath = './topics.json';

fs.readFile(dataPath, 'utf8', (err, postData) => {
    if (err) {
        console.error(err);
        return;
    }

    fs.readFile(topicPath, 'utf8', (err, topicData) => {
        if (err) {
            console.error(err);
            return;
        }
 
    const jsonData = JSON.parse(postData);
    const jsonTopic = JSON.parse(topicData);


    const topicName={};
    jsonTopic.forEach((topic)=>{
       topicName[topic.id] = topic.name;
    });
    

    const numberofPost ={};
    jsonData.forEach((posts)=>{
        const topicId= posts.topicId;
        if(!numberofPost[topicId]){
            numberofPost[topicId] =1;
        }else{
            numberofPost[topicId]++;
        }
    });

    const topicWithPostCount = Object.keys(numberofPost).map((topicId)=>({
        topicName: topicName[topicId],
        postCount: numberofPost[topicId],
    }));

    topicWithPostCount.sort((a,b)=> b.postCount-a.postCount);
    const top5Topics = topicWithPostCount.slice(0,5);

    console.log("Top 5 Topic with the most posts:");
    top5Topics.forEach((topic) => {
        console.log(` Topic Name: ${topic.topicName}, Post Count ${topic.postCount}`);
    });

});
});