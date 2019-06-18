<template>
  <div>
    <h1>Create a Recipe!</h1>
    <formModel :recipe="recipe"/>
    <!-- <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
      <v-text-field v-model="img" :rules="imgRules" label="Image URL" required></v-text-field>

      <v-container>
        <v-layout>
          <v-flex xs12>
            <v-autocomplete
              v-model="ingredients"
              :items="categorizedIngredients"
              box
              chips
              color="blue-grey lighten-2"
              label="Select"
              item-text="name"
              item-value="name"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  :selected="data.selected"
                  close
                  class="chip--select-multi"
                  @input="remove(data.item)"
                >
                  <v-avatar>
                    <img :src="data.item.avatar">
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-avatar>
                    <img :src="data.item.avatar">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container fluid grid-list-xl>
        <v-layout wrap align-center>
          <v-flex xs12 sm6 d-flex>
            <v-select
              v-model="region"
              :rules="[v => !!v || 'Region is required']"
              :items="regions"
              label="Region"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>

      <v-btn color="success" :disabled="!valid" @click="submit">Submit</v-btn>
    </v-form>-->
  </div>
</template>

<script>
import formModel from '@/components/formModel.vue'
// import { mapActions } from 'vuex'
// import { mapState } from 'vuex'
// const _ = require('lodash')
export default {
  components: {
    formModel
  }
  // data() {
  //   return {
  //     valid: true,
  //     name: '',
  //     ingredients: [],
  //     img: '',
  //     availableIngredients: [],
  //     regions: ['American', 'Italian', 'Mexican', 'Asian', 'French'],
  //     region: null,
  //     nameRules: [
  //       v => !!v || 'Name is required',
  //       v => (v && v.length <= 10) || 'Name must be less than 10 characters'
  //     ],
  //     imgRules: [v => !!v || 'Img is required'],
  //     ingRules: [v => !!v || 'Img is required']
  //   }
  // },
  // computed: {
  //   ...mapState({
  //     ingredientsStateValue: state => state.recipes.ingredients
  //   }),

  //   categorizedIngredients() {
  //     let returnItems = []
  //     const meats = this.availableIngredients.filter(this.isMeat)
  //     const grains = this.availableIngredients.filter(this.isGrains)
  //     const vegtables = this.availableIngredients.filter(this.isVeg)
  //     const seasonings = this.availableIngredients.filter(this.isSeasoning)
  //     const header1 = { header: 'Group 1' }
  //     const header2 = { header: 'Group 2' }
  //     const header3 = { header: 'Group 3' }
  //     const header4 = { header: 'Group 4' }

  //     returnItems = _.concat(
  //       returnItems,
  //       header1,
  //       meats,
  //       header2,
  //       grains,
  //       header3,
  //       vegtables,
  //       header4,
  //       seasonings
  //     )
  //     return returnItems
  //   }
  // },
  // async fetch({ store, error }) {
  //   try {
  //     await store.dispatch('recipes/fetchIngredients')
  //   } catch (e) {
  //     error({
  //       statusCode: 503,
  //       message: 'Unable to fetch recipe at this time'
  //     }).catch(err => {
  //       alert('we got an error fetching ingredients. ')
  //       console.error(err)
  //     })
  //   }
  // },
  // mounted() {
  //   this.availableIngredients = this.ingredientsStateValue
  // },
  // methods: {
  //   ...mapActions({
  //     createRecipe: 'recipes/createRecipe'
  //   }),
  //   submit() {
  //     if (this.$refs.form.validate()) {
  //       const recipe = {
  //         name: this.name,
  //         ingredients: this.ingredients,
  //         region: this.region,
  //         img: this.img
  //       }

  //       // console.log('recipe :', recipe)
  //       this.createRecipe(recipe)
  //         .then(responce => {
  //           this.$router.push('/')
  //         })
  //         .catch(err => {
  //           alert('we got an error callling store createRecipe ')
  //           // console.log('There was a probelm creating Recipe')
  //           console.error(err)
  //         })
  //     }
  //   },
  //   isMeat(availableIngredients) {
  //     return availableIngredients.group === 'meat'
  //   },
  //   isGrains(availableIngredients) {
  //     return availableIngredients.group === 'grains'
  //   },
  //   isVeg(availableIngredients) {
  //     return availableIngredients.group === 'vegtable'
  //   },
  //   isSeasoning(availableIngredients) {
  //     return availableIngredients.group === 'seasoning'
  //   },
  //   remove(item) {
  //     const index = this.ingredients.indexOf(item.name)
  //     if (index >= 0) this.ingredients.splice(index, 1)
  //   }
  // }
}
</script>

<style>
</style>
