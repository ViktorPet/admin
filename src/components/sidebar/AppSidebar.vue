<template>

  <div class="sidebar" :class="{ active: getMenuStatus }">
    <perfect-scrollbar :options ="options">
      <div class="sidebar-logo u-mt-40 u-mb-40">
        <div class="sidebar-logo__img">
          <router-link to="/admin/pages"><img src="/assets/logo/kipo_logo_engine.png" alt="kipo_logo"></router-link>
        </div>
      </div>
      <div class="sidebar-content">
        <nav id="sidebar">
          <div class="nav-container">
            <app-navigation-list :navigation-links="navigationLinks" :css-class="''"></app-navigation-list>
          </div>
        </nav>
        <div class="website-content u-mt-60">
          <a :href="getDomainLink" rel="noopener" target="_blank" class="website-content__link">
            <div class="website-content__image">
              <img :src="getDomainImage" :alt="getDomainName" width="240">
            </div>
            <div class="website-content__footer">
              <div class="website-content__name">
                <p>{{getDomainName}}</p>
              </div>
              <i class="material-icons-outlined website-content__icon">open_in_new</i>
            </div>
          </a>
        </div>
      </div>

      <div class="sidebar__footer u-ctx">
        <p class="copyright">&copy; Kipo Engine 2020</p>
      </div>
    </perfect-scrollbar>
  </div>


</template>

<script>
    import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
    import {mapActions, mapGetters, mapState} from 'vuex';
    import AppNavigationList from './AppNavigationList';

    export default {
        name: "app-sidebar",
        components: {AppNavigationList, PerfectScrollbar},
        data() {
            return {
                options: {
                    wheelSpeed: 3,
                    wheelPropagation: false,
                    minScrollbarLength: 20,
                    maxScrollbarLength: 100
                }
            }
        },
        mounted() {
            this.getNavigationLinks();
        },
        computed: {
            ...mapState(['navigationLinks']),
            ...mapGetters(['getMenuStatus', 'getDomainName', 'getDomainImage', 'getDomainLink'])
        },
        methods: {
            ...mapActions(['getNavigationLinks'])
        }
    }

</script>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"></style>
