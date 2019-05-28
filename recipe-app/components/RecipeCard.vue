<template>
  <nuxt-link :to="'/recipe/' + recipe.id">
    <div class="-shadow">
      <h4 class="title">
        {{ recipe.name }}
      </h4>
    </div>
  </nuxt-link>
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
div {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
div:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.title {
  margin: 0;
  color: black;
}
a {
  text-decoration: none;
}
</style>
