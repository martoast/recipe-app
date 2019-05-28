<template>
  <div>
    <h1>Recipes</h1>
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
    />
  </div>
</template>
<script>
import RecipeCard from '@/components/RecipeCard.vue'
import { mapState } from 'vuex'
export default {
  components: {
    RecipeCard
  },

  computed: {
    ...mapState({
      recipes: state => state.recipes.recipes
    })
  },
  head() {
    return {
      title: 'Event Listing'
    }
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('recipes/fetchRecipes')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch recipe at this time.'
      })
    }
  }
}
</script>
