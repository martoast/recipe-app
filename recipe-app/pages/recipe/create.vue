<template>
  <div>
    <h1>Create a Recipe!</h1>
    <pre>{{ categorizedIngredients }}</pre>
    <v-form ref="form">
      <v-text-field v-model="name" label="Name" required></v-text-field>
      <v-text-field v-model="img" label="Image URL" required></v-text-field>

      <v-form>
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
      </v-form>
      <v-container fluid grid-list-xl>
        <v-layout wrap align-center>
          <v-flex xs12 sm6 d-flex>
            <v-select v-model="region" :items="regions" label="Region"></v-select>
          </v-flex>
        </v-layout>
      </v-container>
      <nuxt-link to="/">
        <v-btn color="success" @click="submit">Submit</v-btn>
      </nuxt-link>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
const _ = require('lodash')
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
  computed: {
    ...mapState({
      ingredientsStateValue: state => state.recipes.ingredients
    }),

    categorizedIngredients() {
      let returnItems = []
      const meats = this.availableIngredients.filter(this.isMeat)
      const grains = this.availableIngredients.filter(this.isGrains)
      const header1 = { header: 'Group 1' }
      const header2 = { header: 'Group 2' }

      returnItems = _.concat(returnItems, header1, meats, header2, grains)
      return returnItems
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
    },
    isMeat(availableIngredients) {
      return availableIngredients.group === 'meat'
    },
    isGrains(availableIngredients) {
      return availableIngredients.group === 'grains'
    },
    remove(item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    }
  }
}
</script>

<style>
</style>
