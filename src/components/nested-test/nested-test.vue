<style scoped>
  .item-container {
    max-width: 20rem;
    margin: 0;
  }
  .item {
    padding: 1rem;
    border: solid black 1px;
    background-color: #fefefe;
  }
  .item-sub {
    margin: 0 0 0 1rem;
  }
</style>

<!--<template>-->
  <!--<draggable-->
      <!--v-bind="dragOptions"-->
      <!--tag="div"-->
      <!--class="item-container"-->
      <!--:list="list"-->
      <!--:value="value"-->
      <!--@input="emitter"-->
  <!--&gt;-->
    <!--<div class="item-group" :key="el.id" v-for="el in realValue">-->
      <!--<div class="item">{{ el.name }}</div>-->
      <!--<nested-test class="item-sub" :list="el.elements" />-->
    <!--</div>-->
  <!--</draggable>-->
<!--</template>-->

<template>
  <draggable
      class="item-container"
      tag="div"
      v-bind="dragOptions"
      :list="list"
      :value="value"
      @input="emitter"
      @change="onChange"
  >
    <div class="item-group" :key="el.id" v-for="el in realValue">
      <div class="item">{{ el.name }}</div>
      <nested-test class="item-sub" :child="true"  @change="onChange" :list="el.elements" ></nested-test>
    </div>
  </draggable>
</template>
<script>
    import draggable from "vuedraggable";
    export default {
        name: "nested-test",

        components: {
            draggable
        },
        computed: {
            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            },
            // this.value when input = v-model
            // this.list  when input != v-model
            realValue() {
                return this.value ? this.value : this.list;
            }
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
        methods: {
            emitter(value) {
                console.log(this.list)
                this.$emit("input", value);
                this.$store.dispatch("nested/updateElements", this.list);
            },
            onChange: function() {
                console.log(this.child);
                if (this.child === true) {
                    this.$emit("change");
                    // this.$store.dispatch("nested/updateElements", this.value);
                } else {
                    this.emitter(this.value);
                }
            },
        },
    };
</script>