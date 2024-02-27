<template>
  <div class="notification-list">
    <div class="alert fade" :class="{
            show: messageComponents.hasMessage,
            'alert-success': messageComponents.flash_message.success,
            'alert-success': !messageComponents.flash_message.success
        }"
        role="alert">
      {{messageComponents.flash_message.title}}
    </div>
  </div>
</template>

<script>
    import {mapActions,  mapState} from 'vuex';
    export default {
        name: "app-notification-message",
        data() {
            return {
                messageTimeout: null,
                messageTime: null,
                redirectTimeout: null,
                redirectTime: null
            }
        },
        computed: {
            ...mapState(['messageComponents', 'redirectComponent', 'components']),
        },
        methods: {...mapActions(['hideNotificationMessage', 'redirectTo'])},
        created() {
            this.messageTime = this.messageComponents.flash_message.timeout;
            // let url = '';
            // if(this.redirectComponent) {
            //     this.redirectTime = this.redirectComponent.timeout;
            //     url = this.redirectComponent.url;
            //     if(url !== '') {
            //         router.push(url);
            //     }
            // }
            // this.hideNotificationMessage();
            this.messageTimeout = setTimeout(async () => {
                this.hideNotificationMessage();
                // if(url !== '') {
                //     await router.push(url);
                // }
            }, this.messageTime)
        },
        beforeDestroy() {
            clearTimeout(this.messageTimeout);
            // clearTimeout(this.redirectTimeout);
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
