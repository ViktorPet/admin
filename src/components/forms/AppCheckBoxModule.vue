<template>
  <div>
    <label>
      <input type="checkbox"  :checked="isChecked" :name="name" @change="toggleCheckedItem(name)">
      <span class="checkbox-material"><span class="check"></span></span>
      <span>{{choice.label}}</span>
    </label>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
    export default {
        name: "app-check-box-module",
        props: {
            allCheckedElements: {
                type: Array,
                default: () => []
            },
            name: String,
            choice: {
                id: Number,
                label: String
            }
        },
        data() {
            return {
                isChecked: false,
            }
        },
        created() {
            this.isChecked = this.allCheckedElements.includes(this.choice.id);
        },
        methods: {
            ...mapActions(['updateModuleItem']),
            toggleCheckedItem(name) {
                const payload = {
                    choiceId: this.choice.id,
                    name: name,
                    checkedValues: this.allCheckedElements
                };
                this.updateModuleItem(payload);
            }
        }
    }
</script>

<style scoped>

</style>
