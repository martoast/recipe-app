
<template>
  <div class="c">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-container grid-list-sm fluid>
            <v-layout row wrap>
              <v-img
                :src="recipe.img"
                :lazy-src="recipe.img"
                aspect-ratio="1"
                class="grey lighten-2"
              ></v-img>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <h1>Showing Recipe #{{ recipeId }}</h1>
    <br>
    <h1>{{ recipe.name }}</h1>
    <br>
    <h2>Region:</h2>
    <h3>{{ recipe.region }}</h3>
    <br>
    <h2>Ingredients:</h2>
    <center>
      <tr v-for="(ingredient,index) in recipe.ingredients" :key="recipe.id - index">{{ ingredient }}</tr>
    </center>
    <br>
    <h2>instructions:</h2>
    <blockquote class="blockquote">{{ recipe.instructions }}</blockquote>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    recipeId() {
      return this.$route.params.id
    },
    ...mapState({
      recipe: state => state.recipes.recipe
    })
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
  }
}
</script>
<style>
div.c {
  text-align: center;
}
</style>
