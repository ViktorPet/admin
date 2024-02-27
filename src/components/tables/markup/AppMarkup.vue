<template>
    <div>
      <router-link :to="markup.href" v-for="(child, index) in markup.children" :key="'children- ' + index">
        {{markup.text}}
        <img :src="child.src" :alt="child.alt">
        <span class="" style="margin: auto; text-align: center;">{{ child.type }}</span>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "app-markup",
        props: {
            markup: {
                href: {
                    type: String,
                    required: true
                },
                text: String,
                children: {
                   type: Array,
                   src: String,
                   alt: String
                }
            }
        }
    }
</script>

<style scoped>

</style>
