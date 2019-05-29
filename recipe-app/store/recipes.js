import RecipeService from '@/services/RecipeService'
export const state = () => ({
  recipes: [],
  recipe: {}
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
    console.log('createRecipe: recipe :', recipe)
    // return RecipeService.postRecipe(recipe).then(() => {
    //   commit('ADD_RECIPE', recipe)
    //   return recipe
    // })
  }
}
