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
      name: ''
    }
  },

  methods: {
    ...mapActions({
      createRecipe: 'recipes/createRecipe'
    }),
    submit() {
      const recipe = { name: this.name }
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
