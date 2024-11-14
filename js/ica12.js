let ourObject = {
    "name": "ava",
    "profession": "Strategic Communcation Student",
    "age": 21,
    "pets" :[{"name": "Boots", "type": "dog", "age": "9", "unit": "years"}]
}

console.log(ourObject);

let myData = {};
function fetchData() {
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
            document.getElementById(`fact`).innerHTML = myData.fact;
        })
     .catch(error =>{console.log(error)})


}
fetchData();


document.getElementById("generate").addEventListener("click", e=> {fetchData();});

console.log(myData);

let name = "Ava";
// let myString = "hello" + name+ "!";
let myString = `hello ${name} !`; 

