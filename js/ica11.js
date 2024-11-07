
function calculateDogAge(age) {
    return age * 7;
  }
  
  function displayDogAge() {
    const ageInput = document.getElementById("dogAgeInput").value;
    const dogAge = calculateDogAge(ageInput);
    document.getElementById("dogAgeOutput").innerHTML = `Your doggie is ${dogAge} years old in dog years!`;
  

    const exampleAges = [1, 3, 5];
    exampleAges.forEach((age, index) => {
      document.getElementById("dogAgeOutput").innerHTML += `<br>Example ${index + 1}: Your doggie is ${calculateDogAge(age)} years old in dog years!`;
    });
  }

  function reverseNumber(num) {
    return parseInt(num.toString().split("").reverse().join(""), 10);
  }
  
  function reverseNumbers() {
    const examples = [32243, 98765];
    const results = examples.map(reverseNumber);
    document.getElementById("reverseOutput").innerHTML = results.join("<br>");
  }
  
 
  function sortStringAlphabetically(str) {
    return str.split("").sort().join("");
  }
  
  function sortStrings() {
    const examples = ["webmaster", "javascript"];
    const results = examples.map(sortStringAlphabetically);
    document.getElementById("alphabetOutput").innerHTML = results.join("<br>");
  }
  
  