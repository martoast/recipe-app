import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3002',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default {
  getRecipes() {
    return apiClient.get('/recipes')
  },
  getRecipe(id) {
    return apiClient.get('/recipes/' + id)
  },
  postRecipe(recipe) {
    console.log('service: postRecipe recipe :', recipe)
    return apiClient.post('/recipes', recipe)
  },
  getIngredients() {
    console.log('service: getIngredients ingredients :', ingredients)
    return apiClient.get('/ingredients')
  },
}
