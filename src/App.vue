<template>
  <div id="app">
    <!--<vue-page-transition name="fade-in-up">-->
      <router-view></router-view>
    <!--</vue-page-transition>-->
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import router from './router';


export default {
  name: 'App',
    created() {
      this.getRoutes(router);
    },
    watch: {
        $route(to) {
            const fullPath = to.fullPath;
            this.$store.dispatch('getItems', fullPath);
        }
    },

    methods: {
        ...mapActions(['getRoutes', 'getItems'])
    }   
}
</script>

<style lang="scss">
  @import './sass/main.scss';
</style>
