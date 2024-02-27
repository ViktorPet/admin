<template>
  <div class="cmp-tree">
    <div
        class="cmp-node"
        @click="open = !open"
    >

      {{value.label}}
      <div v-if="hasChildren" class="arrow-right" :class="{ 'active': open }"></div>
    </div>

      <draggable
          :value="value.children"
          ghost-class="ghost"
          @input="updateValue"
          :group="group"
          tag="ul"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
      >
        <tree-node
            v-for="(item,index) in value.children"
            :key="index"
            :value="item"
            @input="updateChildValue"
            :group="group"
            :rowKey="rowKey">

          <span>{{item.label}}</span>
        </tree-node>
      </draggable>
  </div>

</template>

<script>
    import Draggable from "vuedraggable";
    export default {
        name: "TreeNode",
        components: {
            Draggable
        },
        props: {
            value: {
                type: Object,
                default: () => ({
                    id: 0,
                    name: "",
                    children: []
                })
            },
            root: {
                type: Boolean,
                default: () => false
            },
            group: {
                type: String,
                default: null
            },
            rowKey: {
                type: String,
                default: 'label'
            },
        },
        data() {
            return {
                open: false,
                drag: false,
                localValue: Object.assign({}, this.value)
            };
        },
        computed: {
            hasChildren() {
                return this.value.children != null && this.value.children.length > 0;
            },
            isDark() {
                return "";
            },
            // hasDefaultSlot() {
            //     return this.$scopedSlots.hasOwnProperty("body");
            // },
            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            }
        },
        watch: {
            value(value) {
                this.localValue = Object.assign({}, value);
            }
        },
        methods: {
            updateValue(value) {
                if (value.constructor == Array) {
                    this.localValue.children = [...value];
                    this.$emit("input", this.localValue);
                }
            },
            updateChildValue(value) {
                const index = this.localValue.children.findIndex(c => c[this.rowKey] === value[this.rowKey]);
                this.$set(this.localValue.children, index, value);
                this.$emit("input", this.localValue);
            },

        }
    };
</script>

<style>

  .cmp-node {
    display: flex;
    align-items: center;
  }

  .cmp-node:hover {
    background-color: #ecf0f1;
  }
  .cmp-drag-node {
    background-color: #1abc9c;
    opacity: 0.7;
  }

  .disabled {
    pointer-events: none;
    opacity: 0.3;
    background: #bdc3c7;
  }

  .arrow-right {
    width: 0;
    height: 0;
    margin-left: 5px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 6px solid #666;
    transition: 0.3s ease-in-out;
  }

  .active {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
  }

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
</style>