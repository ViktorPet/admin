<template>
   <div class="modal fade" id="showModalClone" tabindex="-1" role="dialog" aria-labelledby="showModalClone" aria-hidden="true">
     <div class="modal-dialog modal-md">
       <div class="modal-content">
         <div class="modal-body">
           <h3>Тази операция изисква вашето потвърждение! Продължаване към процеса на клониране?</h3>
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
        name: "app-modal-clone",
        computed: {
            ...mapState(['modalCloneData']),
        },
        methods: {
            ...mapActions(['cloneRowItemByItemId']),
            confirm() {
                 this.cloneRowItemByItemId(this.modalCloneData);
            }
        }
    }
</script>

<style scoped>

</style>
