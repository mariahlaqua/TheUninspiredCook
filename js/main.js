/*****
 * This code is pretty bad, and I'm scared every time I look at it.
 * I am reworking this project in React.js. When it is complete,
 * I will link each project's respective README's to each other.
 * 
 * You can uncomment the console.logs to see the API response,
 * and the results of some of the manipulation here
 */
window.onload = (event) => getFetch()
document.querySelector('button').addEventListener('click', getFetch)
let ingredients = []
function getFetch(){
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php'
  let ingredients = []
  let measurements = []
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {

        //console.log(data)
        document.querySelector('h3').innerText = data.meals[0].strMeal
        document.querySelector('img').alt = `A thumbnail image of ${data.meals[0].strMeal}`
        document.getElementById('recipePic').src = data.meals[0].strMealThumb
        document.querySelector('p').innerText = data.meals[0].strInstructions
        document.getElementById('linkToAuthor').href = data.meals[0].strSource
        document.getElementById('linkToAuthor').style.visibility = "visible"

        
// object.entries returns an array for each key:value pair, forEach, check the value is not empty
// if true, push to ingredients array
// filter ingredients array for actual values, rather than empty strings

        Object.entries(data.meals[0]).forEach(([key,value]) => key.includes('strIngredient') && value ? ingredients.push(value) : null)

        
        //console.log(ingredients.length) uncomment to see results
        //console.log(ingredients) uncomment to see results
        Object.entries(data.meals[0]).forEach(([key,value]) => key.includes('strMeasure') && value ? measurements.push(value) : null)
        
        //console.log(measurements)
        let list = document.querySelector('ul')
        
        // ingredients.length is how many ingredients there are
        //create a new list item
        ingredients.map(ingredient => {
            let newIngredient = document.createElement('li');
            newIngredient.innerText = `${measurements[ingredients.indexOf(ingredient)]}  ${ingredient}  `;
            list.append(newIngredient)
        })
        
       
    })  
      .catch(err => {
          console.log(`error ${err}`)
      });

}

