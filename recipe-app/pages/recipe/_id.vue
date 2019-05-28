
<template>
  <div>
    <h1>Showing Recipe #{{ recipeId }} </h1>

    <pre>{{ recipe }}</pre>
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
