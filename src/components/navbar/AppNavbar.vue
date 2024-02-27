<template>
  <header class="top-nav" :class="{ active: getMenuStatus }">
    <nav class="navbar-transparent">
      <div class="navbar-container">
        <div class="sidebar-collapse" @click="toggleMenu">
          <i class="material-icons">menu</i>
        </div>
        <div class="navbar-control-buttons">
          <!--<ul class="navbar-control-buttons__list">-->
            <!--&lt;!&ndash;<li class="navbar-control-buttons__item"><i class="material-icons">fullscreen</i></li>&ndash;&gt;-->
            <!--<li class="navbar-control-buttons__item">-->
              <!--<i class="material-icons">person</i>-->
              <!--&lt;!&ndash; Dropdown &ndash;&gt;-->
            <!--</li>-->
            <!--<li class="navbar-control-buttons__item"><i class="material-icons">settings</i></li>-->
          <!--</ul>-->

          <div class="collapse navbar-collapse" v-if="user && user.length > 0">
            <ul class="nav navbar-nav navbar-right">
              <li class="dropdown">
                <a href="#"
                   class="dropdown-toggle"
                   data-toggle="dropdown"
                   role="button"
                   aria-haspopup="true"
                   aria-expanded="false">
                  <i class="material-icons">person</i> <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                    <app-navbar-item v-for="(item, index) in user" :key="'user-item-' + index" :item="item" ></app-navbar-item>
                </ul>
              </li>
              <!--<li class="dropdown">-->
                <!--<a href="#"-->
                   <!--class="dropdown-toggle"-->
                   <!--data-toggle="dropdown"-->
                   <!--role="button"-->
                   <!--aria-haspopup="true"-->
                   <!--aria-expanded="false">-->
                  <!--<i class="material-icons">language</i> <span class="caret"></span>-->
                <!--</a>-->
                <!--&lt;!&ndash;{{languages}}&ndash;&gt;-->
                <!--&lt;!&ndash;<ul class="dropdown-menu">&ndash;&gt;-->
                  <!--&lt;!&ndash;<app-navbar-item v-for="(lang, index) in languages" :key="'lang-item-' + index" :item="lang" ></app-navbar-item>&ndash;&gt;-->
                <!--&lt;!&ndash;</ul>&ndash;&gt;-->
              <!--</li>-->

            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import appNavbarItem from './AppNavbarItem';
    //appNavbarItem: () => import('./AppNavbarItem')
    export default {
        name: "app-navbar",
        components: {appNavbarItem},
        computed: {
            ...mapGetters(['getMenuStatus']),
            ...mapState(['user', 'languages'])
        },
        methods: {
            ...mapActions(['toggleMenu']),


        }
    }
</script>

<style scoped lang="scss">
  .nav > li > a:focus, .nav > li > a:hover {
    background-color: transparent;
  }
</style>