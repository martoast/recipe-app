
<template>
  <div>
    <h1>Showing Recipe #{{ recipeId }} </h1>

    <pre>{{ recipe }}</pre>
  </div>
</template>

<script>
import RecipeService from '@/services/RecipeService.js'
export default {
  data() {
    return {
      recipe: {}
    }
  },
  computed: {
    recipeId() {
      return this.$route.params.id
    }
  },
  created() {
    RecipeService.getRecipe(this.recipeId).then(response => {
      this.recipe = response.data
    })
  }
}
</script>
