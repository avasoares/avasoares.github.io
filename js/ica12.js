let ourObject = {
    "name": "ava"
    "profession": "Strategic Communcation Student"
    "age": 21,
    "pets" :[{"name": "Boots", "type": "dog", "age": "9", "unit": "years"}]
}

console.log(ourObject);

let myData = {};

fetch('https://catfact.ninja/fact')
    .then(res =>{
        if(res.ok){
            return res.json();
        }else{
            console.log(res);
        }
        }).then(res => {
            myData = res;
            console.log(myData);
        })
     .catch(error =>{console.log(error)})

fetchData();

document.getElementById("generate").addEventListener()

console.log(myData);

