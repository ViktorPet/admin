<template>
  <li class="dropdown-menu-item">
    <template v-if="item.type === 'vue'">
      <router-link class="" :to="item.href">{{item.text}}</router-link>
    </template>
    <template v-else>
      <a :href="item.href">{{item.text}}</a>
    </template>
  </li>
</template>

<script>

    export default {
        name: "app-navbar-item",
        props: {
            item: {
                href: String,
                text: String,
                type: Object
            }
        }
    }
</script>

<style scoped lang="scss">
  .dropdown-menu-item {
    a {
      &:hover {
        box-shadow: none;
        background-color: #F1F2F7;
        color: inherit;
      }
    }
  }
</style>