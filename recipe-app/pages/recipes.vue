<template>
  <div>
    <h1>Recipes</h1>
    <RecipeCard
      v-for="(recipe, index) in recipes"
      :key="index"
      :recipe="recipe"
      :data-index="index"
    />
  </div>
</template>
<script>
import RecipeCard from '@/components/RecipeCard.vue'
export default {
  components: {
    RecipeCard
  },
  head() {
    return {
      title: 'Event Listing'
    }
  },
  asyncData({ $axios }) {
    // eslint-disable-next-line
    return $axios.get('http://localhost:3002/recipes').then(response => {
      return {
        recipes: response.data
      }
    })
  }
}
</script>
