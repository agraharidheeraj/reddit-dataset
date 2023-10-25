const fs = require('fs');

const postPath = './votes.json';

fs.readFile(postPath,'utf8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    };
   
      const voteData = JSON.parse(data);
      const highestPostScore={};

      voteData.forEach((vote)=>{
        const postId= vote.postId;
         
        if(!highestPostScore[postId]){
            highestPostScore[postId] = vote.type=="up" ? 1 : -1;
        }
        if(vote.type==='up'){
            highestPostScore[postId]++;
            
        }
        else if(vote.type==='down'){
            highestPostScore[postId]--;
        }
      });
    
      const postWithScore = Object.keys(highestPostScore).map((postId)=>({
         postId,
        score : highestPostScore[postId],
      }));
  

    postWithScore.sort((a,b) => b.score-a.score);
    const Top3Post = postWithScore.slice(0,3);
    console.log("Top 3 post with the heigest score:");
    Top3Post.forEach((post)=>{
        console.log(` Id: ${post.postId}, Score ${post.score}`); 
    })
});

