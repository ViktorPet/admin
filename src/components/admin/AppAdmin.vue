<template>
  <div class="admin">
    <template v-if="getNotFoundStatus">
      <app-404></app-404>
    </template>
    <template v-else>
      <app-loader></app-loader>
      <app-sidebar></app-sidebar>
      <app-navbar></app-navbar>
      <div v-for="(component, index) in components" :key="'app-' + index">
        <template v-if="index === 'form' || index === 'list' || index.trim() === 'show' || index === 'markup' || index === 'iframe'">
          <vue-page-transition name="fade">
            <router-view name="list" :component="component" :key="'app-' + index + '-' + component.uid"></router-view>
          </vue-page-transition>
          <!--<transition name="fade">-->
              <!--<router-view name="list" :component="component" :key="'app-' + index + generateRandomString()"></router-view>-->
          <!--</transition>-->
        </template>
      </div>
    </template>
  </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import AppSidebar from '../sidebar/AppSidebar';
    import AppNavbar from '../navbar/AppNavbar';
    import AppLoader from '../shared/loader/AppLoader';
    import App404 from '../../views/App404';
    export default {
        name: "app-admin",
        components: {
            AppSidebar,
            AppNavbar,
            AppLoader,
            App404
        },
        computed: {

            ...mapState(['components']),
            ...mapGetters(['getNotFoundStatus']),
        },

        methods: {
            generateRandomString() {
                console.log( Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
              return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            }
        }
    }
</script>

<style >
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
