
<template>
  <div class="c">
    <h1>Showing Recipe #{{ recipeId }} </h1>
    <img :src="recipe.img">
    <h2>{{ recipe.name }}</h2>
    <h2>Region: {{ recipe.region }}</h2>
    <h2>Necesary Ingredients:</h2>
    <ul>
      <li
        v-for="(ingredient,index) in recipe.ingredients"
        :key="recipe.id - index"
      >{{ ingredient }}</li>
    </ul>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },

  async fetch({ store, params, error }) {
    try {
      await store.dispatch('recipes/fetchRecipe', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch recipes at this time'
      })
    }
  },
  computed: {
    recipeId() {
      return this.$route.params.id
    },
    ...mapState({
      recipe: state => state.recipes.recipe
    })
  }
}
</script>
<style>
div.c {
  text-align: center;
}
</style>
