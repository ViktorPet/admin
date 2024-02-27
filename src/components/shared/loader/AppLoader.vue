<template>
  <div :class="['overlay', { 'is-loading': getLoadingStatus }]">
    <div class="loader"></div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "app-loader",
        computed: {
            ...mapGetters(['getLoadingStatus']),
        }
    }
</script>

<style scoped>

</style>