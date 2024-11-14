myData = {};

function fetchData() {
    num = Math.floor(Math.random() * 3000);
    fetch (`https://corsproxy.io/?https://xkcd.com/${num}/info.0.json`)

        .then(res => {
            if (res.ok) {
                return res.json ();
            }
        else {
            console.log(res);
        }
        
        } )
        .then(res => {
         myData = res;
         console.log(myData);

         document.getElementById("title").innerHTML =myData.title;

         document.getElementById("comic").src= myData.img;
         
         document.getElementById("date").innerHTML =myData.month +"/"+ myData.day +"/"+ myData.year;
        
         document.getElementById("comic").alt = myData.alt;
    
        } )
      }
      fetchData();

      document.getElementById("random").addEventListener("click", e=> {fetchData();});

      console.log(myData);