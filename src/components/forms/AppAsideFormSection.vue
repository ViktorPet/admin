<template>
   <div>
     <template v-if="section.children">
       <div v-for="(fieldChildType, fieldChildKey) in section.children"  :key="'child-' + fieldChildKey">
         <app-aside-form-section :section="fieldChildType.fields"></app-aside-form-section>
       </div>
     </template>
     <template v-else-if="section.fields">
       <div v-for="(fieldType, fieldKey) in section.fields"  :key="'child-' + fieldKey">
         <app-form-field :field-type="fieldType" :field-key="fieldKey"></app-form-field>
       </div>
     </template>
   </div>
</template>

<script>
  import AppFormField from './AppFormField';
    export default {
        name: "app-aside-form-section",
        components: {AppFormField},
        props: ['section'],
    }
</script>

<style scoped>

</style>