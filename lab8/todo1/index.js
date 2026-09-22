 //HOW TO RUN CODE :  node lab8/index.js IN TTERMINAL
 playgame(1);

 function randomNumber(callback){
        setTimeout(()=> {
            let num = Math.floor(Math.random()*10);
            callback(num);
        },2000);

    }


    function playgame(round, callback){

        if(round>3){
            console.log("you win");
            return;
        }

        // console.log("weit 2 secound");
        randomNumber((num)=>{
            // console.log(`round ${round} : ${num}`)
            console.log(` ${num}`)

            if(num % 2 == 0){
                playgame(round+1, callback);

            }
            else
                console.log("you lost");
            
        });


    }   