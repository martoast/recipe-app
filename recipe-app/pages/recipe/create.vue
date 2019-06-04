<template>
  <div>
    <h1> Create a Recipe!</h1>
    <v-form ref="form">
      <pre>{{availableIngredients}}</pre>

      {{ name }}
      <v-text-field
        v-model="name"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="img"
        label="Image URL"
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
              label="Region"
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
      availableIngredients: [],
      regions: ['American', 'Italian', 'Mexican', 'Asian', 'French'],
      region: []
    }
  },

  methods: {
    ...mapActions({
      createRecipe: 'recipes/createRecipe'
    }),
    submit() {
      const recipe = {
        name: this.name,
        ingredients: this.ingredients,
        region: this.region,
        img: this.img
      }
      // console.log('recipe :', recipe)
      this.createRecipe(recipe)
        .then(responce => {
          alert('store createRecipe succcess')
        })
        .catch(err => {
          alert('we got an error callling store createRecipe ')
          // console.log('There was a probelm creating Recipe')
          console.error(err)
        })
    }
  },
  async fetch({ store, error }) {
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
  },
  mounted() {
    this.availableIngredients = this.ingredientsStateValue
  },
  computed: {
    ...mapState({
      ingredientsStateValue: state => state.recipes.ingredients
    })
  }
}
</script>

<style>
</style>
