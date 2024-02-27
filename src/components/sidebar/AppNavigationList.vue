<template>
  <ul class="nav" :class="cssClass">
      <app-navigation-list-item v-for="(link, index) in navigationLinks" :key="'nav-link-' + index + dropLinkIndex + '-' + index"
          :link="link"
          :index="index"
          :drop-link-index="''"
          :navigation-links="navigationLinks">
      </app-navigation-list-item>
  </ul>
</template>

<script>
    export default {
        name: "app-navigation-list",
        props: {
            navigationLinks: {
                type: Array
            },
            cssClass: {
                type: String,
                default: ''
            },
            dropLinkIndex: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>