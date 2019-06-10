<template>
  <div>
    <h1> Create a Recipe!</h1>
    <pre>{{ categorizedIngredients }}</pre>
    <v-form ref="form">
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
              :items="availableIngredients"
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
      <nuxt-link to="/">
        <v-btn
          color="success"
          @click="submit"
        >
          Submit
        </v-btn>
      </nuxt-link>

    </v-form>
    <!-- <v-card
      color="blue-grey darken-1"
      dark
    >
      <v-img
        height="200"
        src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"
      >
        <v-layout wrap>
          <v-flex xs12>
            <v-progress-linear
              :active="isUpdating"
              class="ma-0"
              color="green lighten-3"
              height="4"
              indeterminate
            ></v-progress-linear>
          </v-flex>
          <v-flex
            text-xs-right
            xs12
          >
            <v-menu
              bottom
              left
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  v-on="on"
                >
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-tile @click="isUpdating = true">
                  <v-list-tile-action>
                    <v-icon>mdi-settings</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Update</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
          <v-layout
            align-start
            column
            justify-end
            pa-3
          >
            <h3 class="headline">{{ name }}</h3>
            <span class="grey--text text--lighten-1">{{ title }}</span>
          </v-layout>
        </v-layout>
      </v-img>
      <v-form>
        <v-container>
          <v-layout wrap>
            <v-flex
              xs12
              md6
            >
              <v-text-field
                v-model="name"
                :disabled="isUpdating"
                box
                color="blue-grey lighten-2"
                label="Name"
              ></v-text-field>
            </v-flex>
            <v-flex
              xs12
              md6
            >
              <v-text-field
                v-model="title"
                :disabled="isUpdating"
                box
                color="blue-grey lighten-2"
                label="Title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete
                v-model="friends"
                :disabled="isUpdating"
                :items="people"
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
      <v-divider></v-divider>
      <v-card-actions>
        <v-switch
          v-model="autoUpdate"
          :disabled="isUpdating"
          class="mt-0"
          color="green lighten-2"
          hide-details
          label="Auto Update"
        ></v-switch>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="autoUpdate"
          :loading="isUpdating"
          color="blue-grey darken-3"
          depressed
          @click="isUpdating = true"
        >
          <v-icon left>mdi-update</v-icon>
          Update Now
        </v-btn>
      </v-card-actions>
    </v-card> -->
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
      const header1 = 'Group 1'
      const header2 = 'Group 2'

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
    }
  }
}
</script>

<style>
</style>
