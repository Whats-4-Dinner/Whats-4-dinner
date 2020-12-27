require('../../secrets')

export async function fetchRecipes() {
  try {
    const res = await fetch(`https://api.spoonacular.com/recipes/716429/information?apiKey=${process.env.SPOONACULAR_API_KEY}`)
    return await res.json()
  } catch (error) {
      console.error('nothing was found')
  }
}