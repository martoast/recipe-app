import RecipeService from '@/services/RecipeService'
export const state = () => ({
  recipes: []
})
export const mutations = {
  SET_RECIPES(state, recipes) {
    state.recipes = recipes
  }
}
export const actions = {
  fetchRecipes({
    commit
  }) {
    return RecipeService.getRecipes().then(response => {
      commit('SET_RECIPES', response.data)
    })
  }
}
