<template>
  <div class=""></div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    export default {
        name: "app-redirect",
        data() {
            return {
                messageTimeout: null,
                messageTime: null,
                redirectTimeout: null,
                redirectTime: null
            }
        },
        computed: {
            ...mapState(['redirectComponent']),
        },
        methods: {
            ...mapActions(['removeRedirect'])
        },
        async created() {
            let url = '';
            if(this.redirectComponent) {
                url = this.redirectComponent.url;
                if(url !== '') {
                   await this.$router.push(url);
                }
            }
        },
        beforeDestroy() {
            this.removeRedirect()
        }
    }
</script>

<style scoped>
  .notification-list {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 15px;
    width: 320px;
  }

  .show {
    opacity: 1;
  }
</style>
