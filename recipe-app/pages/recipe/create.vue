<template>
  <div>

  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    name: 'name'
  }),
  methods: {
    createRecipe() {
      this.$store
        .dispatch('createRecipe', this.recipe)
        .then(() => {
          this.$router.push({
            component: '_id',
            params: { id: this.recipe.id }
          })
          this.recipe = this.createFreshRecipeObject()
        })
        .catch(() => {
          // console.log('There was a probelm creating Recipe')
        })
    }
  }
}
</script>

<style>
</style>
