require('../../secrets');


// export async function fetchRecipes() {
//   try {
//     const res = await fetch(
//       `https://api.spoonacular.com/recipes/716429/information?apiKey=${process.env.SPOONACULAR_API_KEY}`
//     );
//     const data =  await res.json();
//     return data
//   } catch (error) {
//     console.error('nothing was found');
//   }
// }


export async function fetchRecipes(obj) {
  try {
    let propertyStr = objToStr(obj)
    console.log(propertyStr)
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${propertyStr}apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    console.log('STRIN',res)
    const data =  await res.json();
    return data
  } catch (error) {
    console.error('nothing was found');
  }
}

function objToStr(obj) {
  let finalStr = ""
  for (let key in obj) {
    if (obj[key]!=='none') finalStr += key + '=' + obj[key] + '&'
  }
  return finalStr
}