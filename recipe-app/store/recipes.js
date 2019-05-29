import RecipeService from '@/services/RecipeService'
export const state = () => ({
  recipes: [], // This is the list of recipes
  recipe: {} // This is a single recipe mostly used when viewing a single recipe
})
export const mutations = {
  SET_RECIPES(state, recipes) {
    state.recipes = recipes
  },
  SET_RECIPE(state, recipe) {
    state.recipe = recipe
  },
  ADD_RECIPE(state, recipe) {
    state.recipe = recipe
  }
}
export const actions = {
  fetchRecipes({
    commit
  }) {
    return RecipeService.getRecipes().then(response => {
      commit('SET_RECIPES', response.data)
    })
  },
  fetchRecipe({
    commit
  }, id) {
    return RecipeService.getRecipe(id).then(function (response) {
      commit('SET_RECIPE', response.data)
    })
  },
  createRecipe({
    commit
  }, recipe) {
    return RecipeService.postRecipe(recipe).then((response) => {
      console.log('response ', response)
      commit('SET_RECIPE', response.data)
    }).catch((err) => {
      console.log('err', err)

      alert('error with createRecipe')
    })
  }
}
