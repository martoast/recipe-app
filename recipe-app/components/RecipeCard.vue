<template>

  <v-card>
    <v-img
      :src="recipe.img"
      aspect-ratio="2.75"
    ></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ recipe.name }}</h3>

      </div>

    </v-card-title>
    <v-chip
      v-for="(ingredient, index) in recipe.ingredients"
      :key="recipe.id + index"
    >{{ ingredient }}</v-chip>

    <v-card-actions>
      <nuxt-link :to="'/recipe/edit/' + recipe.id">
        <v-btn
          flat
          color="orange"
        >Edit</v-btn>
      </nuxt-link>
      <nuxt-link :to="'/recipe/' + recipe.id">
        <v-btn
          flat
          color="orange"
        >Explore</v-btn>
      </nuxt-link>
    </v-card-actions>
  </v-card>

</template>

<script>
export default {
  name: 'RecipeCard',
  props: {
    recipe: {
      type: Object
    }
  }
}
</script>

 <style scoped>
</style>
