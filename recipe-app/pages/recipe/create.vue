<template>
  <div>
    <h1> Create a Recipe!</h1>
    <v-form ref="form">

      {{ name }}
      <v-text-field
        v-model="name"
        label="Name"
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
export default {
  data() {
    return {
      name: '',
      ingredients: [],
      available: ['Salt', 'Ass', 'more salt', 'Vuetify'],
      regions: ['American', 'Italian', 'Mexican', 'Asian']
    }
  },

  methods: {
    ...mapActions({
      createRecipe: 'recipes/createRecipe'
    }),
    submit() {
      const recipe = { name: this.name, ingredients: this.ingredients }
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
  }
}
</script>

<style>
</style>
