document.getElementById('linkToAuthor').style.visibility = 'hidden'
let h4 = document.querySelectorAll('h4')
    h4.forEach((h4s) => h4s.style.visibility = 'hidden')

document.querySelector('button').addEventListener('click', getFetch)
let ingredients = []
function getFetch(){
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php'
  let ingredients = []
  let measurements = []
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('h3').innerText = data.meals[0].strMeal
        document.querySelector('img').alt = `A thumbnail image of ${data.meals[0].strMeal}`
        document.getElementById('recipePic').src = data.meals[0].strMealThumb
        document.querySelector('p').innerText = data.meals[0].strInstructions
        document.getElementById('linkToAuthor').href = data.meals[0].strSource
        document.getElementById('linkToAuthor').style.visibility = "visible"
        h4.forEach((h4s) => h4s.style.visibility = 'visible')
       
       //object.entries returns an array for each key:value pair, forEach, check the value is not empty
       // if true, push to ingredients array
        Object.entries(data.meals[0]).forEach(([key,value]) => key.includes('strIngredient') && value ? ingredients.push(value) : null)
        //filter ingredients array for actual ingredients
        //ingredients = ingredients.filter(word => word.includes('strIngredient'))
        console.log(ingredients.length)
        console.log(ingredients)
        Object.entries(data.meals[0]).forEach(([key,value]) => key.includes('strMeasure') && value ? measurements.push(value) : null)
        
        //measurements = measurements.splice(ingredients.length)
        console.log(measurements)
        let list = document.querySelector('ul')
        // ingredients.length is how many ingredients there are
        ingredients.map(ingredient => {
            let newIngredient = document.createElement('li');
            newIngredient.innerText = `${measurements[ingredients.indexOf(ingredient)]}  ${ingredient}  `;
            list.append(newIngredient)
        })
        
        //create a new list item
    })  
      .catch(err => {
          console.log(`error ${err}`)
      });

}

