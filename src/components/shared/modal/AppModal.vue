<template>
   <div class="modal fade" id="showModal" tabindex="-1" role="dialog" aria-labelledby="showModal" aria-hidden="true">
     <div class="modal-dialog modal-sm">
       <div class="modal-content">
         <div class="modal-body">
           <h3>Confirm Delete?</h3>
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
           <button type="button" class="btn btn-danger" data-dismiss="modal" @click="confirm()">Confirm</button>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    export default {
        name: "app-modal",
        computed: {
            ...mapState(['modalData']),
        },
        methods: {
            ...mapActions(['deleteRowItem']),
            confirm() {
                this.deleteRowItem(this.modalData);
            }
        }
    }
</script>

<style scoped>

</style>