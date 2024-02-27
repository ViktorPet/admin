<template>
   <div>
     <label v-if="type === 'toggle_button'">
       <input type="checkbox"
               :checked="status"
              @change="toggleStatus(button['url'], button['method'])">
       <span class="toggle"></span>
     </label>
     <span v-if="type === 'toggle_favorite_button'">
       <label class="">
         <input type="checkbox" :checked="status" @change="toggleStatus(button['url'], button['method'])">
         <i class="material-icons c-orange"  v-if="status">star</i>
          <i class="material-icons" v-else>star_border</i>
      </label>
     </span>
     <span v-if="type === 'toggle_new_button'">
         <label class="">
             <input type="checkbox" :checked="is_new" @change="toggleNew(button['url'], button['method'])">
             <i class="material-icons-outlined" style="font-size: 40px; color: #ff8a7a; vertical-align: -7px;" v-if="is_new">fiber_new</i>
             <i class="material-icons-outlined" style="font-size: 20px; text-align: center; vertical-align: -8px;" v-else>radio_button_unchecked</i>
         </label>
     </span>
     <span v-if="type === 'toggle_in_menu_button'">
         <label class="">
             <input type="checkbox" :checked="in_menu" @change="toggleInMenu(button['url'], button['method'])">
             <i class="material-icons" style="color: #aeb7e6;" v-if="in_menu">star</i>
             <i class="material-icons" v-else>star_border</i>
         </label>
     </span>
     <span v-if="type === 'toggle_primary_button'">
         <label class="">
             <input type="checkbox" :checked="primary" @change="togglePrimary(button['url'], button['method'])">
             <i class="material-icons" style="color: #aeb7e6;" v-if="primary">star</i>
             <i class="material-icons" v-else>star_border</i>
         </label>
     </span>
     <span  v-if="type === 'toggle_fixed_button'">
         <label class="">
             <input type="checkbox" :checked="fixed" @change="toggleFixed(button['url'], button['method'])">
             <i class="material-icons" style="color: #aeb7e6;"  v-if="fixed">star</i>
             <i class="material-icons" v-else>star_border</i>
         </label>
     </span>
     <label v-if="type === 'toggle_page_button'">
         <template v-if="button['url'].match(/.+consultations.+/g)">
             <input type="checkbox" :checked="status === false" @change="toggleStatus(button['url'], button['method'])">
             <i class="material-icons c-orange" v-if="status === false">star</i>
              <i class="material-icons" v-else>star_border</i>
         </template>
         <template v-else>
             <input type="checkbox" :checked="status" @change="toggleStatus(button['url'], button['method'])">
             <i class="material-icons c-orange"  v-if="status">star</i>
              <i class="material-icons" v-else>star_border</i>
         </template>
     </label>

   </div>
</template>

<script>
  import {mapActions} from 'vuex';
    export default {
        name: "app-check-box-switch",
        props:[
            'button',
            'type'
        ],
        data() {
            return {
                status:this.button.is_published,
                selected:this.button.is_selected,
                primary:this.button.is_primary,
                fixed:this.button.is_fixed,
                in_menu:this.button.in_menu,
                is_new:this.button.is_new,
            }
        },
        methods: {
            ...mapActions(['updatePublishStatus', 'updatePublishPrimary', 'updatePublishInMenu', 'updatePublishFixed', 'updatePublishNew']),
            toggleStatus(url, method) {
                this.status = !this.status;
                let payload = {
                    url,
                    method,
                    status: this.status
                };
                this.updatePublishStatus(payload);
            },
            toggleSelected(url, method) {
                this.selected = !this.selected;
                let payload = {
                    url,
                    method,
                    selected: this.selected
                };
                this.updatePublishStatus(payload);
            },
            togglePrimary(url, method) {
                this.primary = !this.primary;
                let payload = {
                    url,
                    method,
                    primary: this.primary
                };
                this.updatePublishPrimary(payload);
            },
            toggleNew(url, method) {
                this.is_new = !this.is_new;
                let payload = {
                    url,
                    method,
                    is_new: this.is_new
                };
                this.updatePublishNew(payload);
            },
            toggleInMenu(url, method) {
                this.in_menu = !this.in_menu;
                let payload = {
                    url,
                    method,
                    in_menu: this.in_menu
                };
                this.updatePublishInMenu(payload);
            },
            toggleFixed(url, method) {
                this.fixed = !this.fixed;
                let payload = {
                    url,
                    method,
                    fixed: this.fixed
                };
                this.updatePublishFixed(payload);
            },
        }
    }
</script>

<style scoped>

</style>
