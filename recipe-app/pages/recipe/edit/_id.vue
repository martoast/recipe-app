<template>
  <div>
    <h1> Edit the Recipe {{ recipeId }}!</h1>
    <v-form ref="form">

      {{ name }}
      <v-text-field
        v-model="name"
        label="recipe.name"
        required
      ></v-text-field>
      <v-text-field
        v-model="img"
        label="recipe.img"
        required
      ></v-text-field>

      <v-container fluid>
        <v-layout wrap>
          <v-flex xs12>
            <v-combobox
              v-model="ingredients"
              :items="available"
              label="Select all necesarry ingredients"
              multiple
            ></v-combobox>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container
        fluid
        grid-list-xl
      >
        <v-layout
          wrap
          align-center
        >
          <v-flex
            xs12
            sm6
            d-flex
          >
            <v-select
              v-model="region"
              :items="regions"
              label="recipe.region"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>

      <v-btn
        color="success"
        @click="submit"
      >
        Submit
      </v-btn>

    </v-form>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      name: '',
      ingredients: [],
      img: '',
      available: ['Salt', 'Ass', 'more salt', 'more Ass'],
      regions: ['American', 'Italian', 'Mexican', 'Asian', 'French'],
      region: []
    }
  },
  methods: {
    ...mapActions({
      changeRecipe: 'recipes/changeRecipe'
    }),
    submit() {
      alert('submit works')
      const recipe = {
        name: this.name,
        ingredients: this.ingredients,
        region: this.region,
        img: this.img
      }

      console.log('recipe :', recipe)

      // this.changeRecipe(recipe).then(responce => {
      //   alert('changeRecipe succcess')
      // })
    }
  },

  async fetch({ store, params, error }) {
    try {
      await store.dispatch('recipes/fetchRecipe', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch recipe at this time'
      }).catch(err => {
        alert('we got an error editing recipe. ')
        // console.log('There was a probelm creating Recipe')
        console.error(err)
      })
    }
  },

  mounted() {
    this.name = this.recipe.name
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
</style>
