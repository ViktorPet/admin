<template>
  <li class="nav__item">
    <template v-if="link.path.length === 0">
      <a :href="link.path" class="nav__link" @click.prevent="">
        <template v-if="link.children && link.children.length > 0">
          <i class="material-icons-outlined nav__icon">{{link.icon}}</i><span class="nav__text">{{link.text}}</span>
          <div  @click="isCollapsed = !isCollapsed" class="nav__drop--container">
            <i  class="material-icons-outlined nav__drop-icon">{{isCollapsed ? 'remove': 'add'}}</i>
          </div>
        </template>
        <template v-else>
          <i class="material-icons-outlined nav__icon">{{link.icon}}</i><span class="nav__text">{{link.text}}</span>
        </template>
      </a>
    </template>
    <template v-else>
      <router-link :to="link.path" class="nav__link" :target="[link.path.match(/^(\/admin\/)(docs|swagger\-ui|swagger\-editor|redoc)/g) ? '_blank': '']">
        <template v-if="link.children && link.children.length > 0">
          <i class="material-icons-outlined nav__icon">{{link.icon}}</i><span class="nav__text">{{link.text}}</span>
          <div  @click="isCollapsed = !isCollapsed" class="nav__drop--container">
            <i  class="material-icons-outlined nav__drop-icon">{{isCollapsed ? 'remove': 'add'}}</i>
          </div>
        </template>
        <template v-else>
          <i class="material-icons-outlined nav__icon">{{link.icon}}</i><span class="nav__text">{{link.text}}</span>
        </template>
      </router-link>
    </template>

      <template v-if="link.children && link.children.length > 0">
        <div :class="[isCollapsed ? 'show-drop' : 'hide-drop']">
          <app-navigation-list
              :drop-link-index="'-children' + index"
              :navigation-links="link.children"
              :css-class="'drop-nav'">
          </app-navigation-list>
        </div>
      </template>
  </li>
</template>

<script>
    export default {
        name: "app-navigation-list-item",
        props: ['navigationLinks','link', 'index'],
        data() {
            return {
                isCollapsed: false
            }
        }
    }
</script>

<style scoped>

</style>
