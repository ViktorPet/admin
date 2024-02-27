<template>
  <input :type="type" class="form-control"
         :name="fieldType.name"
         :value="fieldType.value"
         @input="updateFormField($event.target.value, fieldType.name)">
</template>

<script>
    export default {
        name: "app-input",
        props: {
            type: String,
            fieldType: {
                name: String,
                value: String
            },
            component: {
                type: String,
                default: ''
            }
        },
        methods: {
            updateFormField(value, fieldName) {
                this.$emit('updateField', value, fieldName);

            }
        },
    }
</script>

<style scoped>

</style>