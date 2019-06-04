<template>
  <div>
    <h1> Edit the Recipe {{ recipeId }}!</h1>
    <v-form ref="form">
      <v-text-field
        v-model="name"
        label=name
        required
      ></v-text-field>
      <v-text-field
        v-model="img"
        label=img
        required
      ></v-text-field>

      <v-container fluid>
        <v-layout wrap>
          <v-flex xs12>
            <v-combobox
              v-model="ingredients"
              :items="availableIngredients"
              label=ingredients
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
              :items="availableRegions"
              label=region
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
      <v-btn
        color="success"
        @click="erase"
      >
        Delete
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
      availableIngredients: [],
      availableRegions: ['American', 'Italian', 'Mexican', 'Asian', 'French'],
      region: []
    }
  },
  methods: {
    ...mapActions({
      changeRecipe: 'recipes/changeRecipe',
      deleteRecipe: 'recipes/deleteRecipe'
    }),
    erase() {
      const recipe = {
        id: this.recipeId
      }

      console.log('delete recipe :', recipe)

      this.deleteRecipe(recipe)
      alert('deleteRecipe succcess')
    },
    submit() {
      const recipe = {
        id: this.recipeId,
        name: this.name,
        ingredients: this.ingredients,
        region: this.region,
        img: this.img
      }

      console.log('submit recipe :', recipe)

      this.changeRecipe(recipe).then(responce => {
        alert('changeRecipe succcess')
      })
    }
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('recipes/fetchIngredients')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch recipe at this time'
      }).catch(err => {
        alert('we got an error fetching ingredients. ')
        console.error(err)
      })
    }

    try {
      await store.dispatch('recipes/fetchRecipe', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch recipe at this time'
      }).catch(err => {
        alert('we got an error fetching ingredients. ')
        console.error(err)
      })
    }
  },

  mounted() {
    this.name = this.recipeStateValue.name
    this.region = this.recipeStateValue.region
    this.img = this.recipeStateValue.img
    this.ingredients = this.recipeStateValue.ingredients
    this.availableIngredients = this.ingredientsStateValue
  },
  computed: {
    recipeId() {
      return this.$route.params.id
    },
    ...mapState({
      recipeStateValue: state => state.recipes.recipe,
      ingredientsStateValue: state => state.recipes.ingredients
    })
  }
}
</script>

<style>
</style>
