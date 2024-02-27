<template>
  <div class="justify-content-between row">
    <!--<nested-test class="col-8" v-model="elements" />-->
    <nested-test class="item-sub"  />

  </div>
</template>

<script>
    import NestedTest from "./nested-test.vue";
    export default {
        name: "nested-with-vmodel",
        display: "Nested (v-model & vuex)",
        order: 16,
        components: {
            NestedTest,
        },
        props: {
            value: {
                required: false,
                type: Array,
                default: null
            },
            list: {
                required: false,
                type: Array,
                default: null
            },
            child: {
                type: Boolean,
                default: () => {
                    return false
                }
            }
        },
        // computed: {
        //     elements: {
        //         get() {
        //             return JSON.parse(JSON.stringify(this.$store.state.nested.elements));
        //             // return this.$store.state.nested.elements;
        //         //    JSON.parse(JSON.stringify(this.$store.state.nested.elements));
        //         },
        //         set(value) {
        //             console.log(value)
        //             this.$store.dispatch("nested/updateElements", value);
        //         }
        //     }
        // },


        methods: {
            emitter(value) {
                this.$emit("input", value);
            },
            onChange: function() {
                if (this.child === true) {
                    this.$emit("change");
                } else {
                    this.emitter(this.value);
                }
            },
        },
    };
</script>