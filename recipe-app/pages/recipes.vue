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
import RecipeService from '@/services/RecipeService.js'
export default {
  components: {
    RecipeCard
  },
  head() {
    return {
      title: 'Event Listing'
    }
  },
  data() {
    return {
      recipes: []
    }
  },
  created() {
    RecipeService.getRecipes().then(response => {
      this.recipes = response.data
    })
  }
}
</script>
