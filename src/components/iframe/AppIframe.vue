<template>
    <main class="main-content">
      <iframe :src="getIframeSrc" frameborder="0"></iframe>
      <input type="hidden" id="upload_file">
    </main>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "app-iframe",
        computed: {
            ...mapGetters(['getIframeSrc']),
        },
        mounted() {
            this.initCallback();
        },
        methods: {
            initCallback() {
                function responsive_filemanager_callback() {
                    window['$']("iFrame").contents().find(".close-uploader").trigger('click');
                }
                window['responsive_filemanager_callback'] = responsive_filemanager_callback;
            }
        }
    }
</script>

<style scoped lang="scss">
  iframe {
    width: calc(100% - 270px);
    height: 100vh;
    margin-left: 270px;
    padding: 20px;
  }
</style>