<template>
  <draggable
      v-bind="dragOptions"
      tag="div"
      handle=".handle"
      :list="list"
      :value="value"
      @input="emitter"
      @change="onChange">

        <!-- <div v-for="element in realValue" :key="'table-row-' + element.primary_key" :data-openid="'isOpen_' + element.primary_key"> -->
            <div v-for="element in realValue" :key="'table-row-' + element.primary_key">
            <div class="tr td">
              <template v-if="hasSortable">
                <div class="checkbox">
                  <button class="btn btn-material-transparent"><i class="material-icons handle">drag_indicator</i></button>
                </div>
              </template>
              <!-- <div class="pretty p-default p-fill">
              <input type="checkbox" :value="element.primary_key" name="batch_delete[]" v-model="batch_checkbox"/>
                <div class="state p-primary">
                    <label></label>
                </div>
              </div> -->
              <app-table-data v-for="(tableData, indx) in element.column_elements"
                              :table-data="tableData"
                              :key="'table-data-' + indx + element.primary_key">
              </app-table-data>

              <div class="td">
                <div class="u-text-12">
                  <div class="togglebutton  u-ai-center u-grid-7">
                      <span class="material-buttons" v-for="(button, indx) in element.buttons"
                            :key="'table-data-buttons' + indx + element.primary_key">
                          <template v-if="button.type === 'child'">
                             <router-link class="btn btn-material-transparent" title="Add" :to="button.url"><i class="material-icons">add</i></router-link>
                          </template>
                          <template v-if="button.type === 'impersonate'">
                               <a class="btn outline-blue" title="LOGIN AS" :href="button.url" target="_blank">
                                  <i class="material-icons">verified_user</i> LOGIN AS
                              </a>
                          </template>
                          <template v-if="button.type === 'project_preview'">
                              <a class="btn outline-blue" title="GO TO PAGE" :href="button.url" target="_blank">
                                  <i class="material-icons">burst_mode</i> GO TO PAGE
                              </a>
                          </template>
                          <template v-if="button.type === 'section' ||  button.type === 'links'">

                            <!--<router-link class="btn btn-material-transparent" :to="button.url"><i class="material-icons">view_quilt</i></router-link>-->
                              <router-link class="btn outline-blue" :to="button.url">Изграждане</router-link>
                          </template>
                          <template v-if="button.type === 'toggle_button'">
                            <app-check-box-switch :type="'toggle_button'" title="Toggle" :button="button"></app-check-box-switch>
                          </template>
                         <template v-if="button.type === 'downloads'">
                             <router-link class="btn btn-material-transparent" title="Download" :to="button.url"><i class="material-icons">get_app</i></router-link>
                          </template>
                          <template v-if="button.type === 'toggle_favorite_button'">
                            <app-check-box-switch :type="'toggle_favorite_button'" title="Toggle favorite" :button="button"></app-check-box-switch>
                          </template>
                          <template v-if="button.type === 'toggle_new_button'">
                            <app-check-box-switch :type="'toggle_new_button'" title="Нов продукт?" :button="button"></app-check-box-switch>
                          </template>
                          <template v-if="button.type === 'toggle_in_menu_button'">
                            <app-check-box-switch :type="'toggle_in_menu_button'" title="Наличен към меню?" :button="button"></app-check-box-switch>
                          </template>
                          <template v-if="button.type === 'toggle_primary_button'">
                            <app-check-box-switch :type="'toggle_primary_button'" title="Видим в секция" :button="button"></app-check-box-switch>
                          </template>
                          <template v-if="button.type === 'toggle_fixed_button'">
                            <app-check-box-switch :type="'toggle_fixed_button'" title="Фиксиран/а" :button="button"></app-check-box-switch>
                          </template>
                          <template v-if="button.type === 'toggle_page_button'">
                            <app-check-box-switch :type="'toggle_page_button'" style="margin-right: 5px;" title="Add page to primary group" :button="button"></app-check-box-switch>
                          </template>
                          <template v-if="button.type === 'show'">
                            <router-link class="btn btn-material-transparent" :to="button.url" title="Show" ><i class="material-icons">aspect_ratio</i></router-link>
                          </template>
                          <template v-if="button.type === 'clone'">
                            <button class="btn btn-material-transparent"
                                    title="Clone"
                                    type="button"
                                    data-toggle="modal"
                                    data-target="#showModalClone"
                                    style="color: #aeb7e6; margin-right: -5px;"
                                    @click.prevent="showModalClone({element: element,url: button.url, method: button.method})">
                                <i class="material-icons">content_copy</i>
                            </button>
                          </template>
                          <template v-if="button.type === 'edit'">
                            <router-link class="btn btn-material-transparent" :to="button.url" title="Edit"><i class="material-icons">edit</i></router-link>
                          </template>
                          <template v-if="button.type === 'delete'">
                            <button class="btn btn-material-transparent"
                                    title="Delete"
                                    type="button"
                                    data-toggle="modal"
                                    data-target="#showModal"
                                    @click.prevent="showModal({element: element,url: button.url, method: button.method})">
                              <i class="material-icons">delete</i>
                            </button>
                          </template>
                        </span>
                  </div>
                </div>
              </div>
          </div>

            <!-- <collapse-transition> -->
            <!--    <div v-show="isOpen"> -->
                    <app-table-row :child="true" @change="onChange" :list="element.children" class="item-sub" :key="'child ' + element.primary_key"></app-table-row>
                <!-- </div> -->
            <!--</collapse-transition> -->
        </div>
  </draggable>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import draggable from 'vuedraggable';
    import AppTableData from './AppTableData';
    import AppCheckBoxSwitch from '../forms/CheckBoxSwitch';
    /*import CollapseTransition from "@ivanv/vue-collapse-transition"*/

    // import { Sortable, MultiDrag } from 'sortablejs'
    // Sortable.mount(new MultiDrag());

    //draggable
    export default {
        name: "app-table-row",
        components: {AppTableData, AppCheckBoxSwitch, draggable, /*CollapseTransition*/ },
        props: {
            columnElement: Object,
            component: Array,
            rowKey: String,
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
            },
        },
        data () {
            return {
                isOpen: true
            }
        },
        computed: {
            ...mapState(['components']),
            hasSortable() {
                return !!this.components.list.sortable;
            },
            dragOptions() {
                return {
                    animation: 400,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            },
            realValue() {
                return this.value ? this.value : this.list;
            },
        },
        beforeMount() {

        },
        mounted () {
            /*
            for (var i = 0; i < this.components.list.elements.length; i++) {
                if (this.components.list.elements [i].primary_key !== null) {
                    this ['isOpen_' + this.components.list.elements [i].primary_key] = false;
                }
            }
            console.log (this.components.list.elements, this);
            */
        },
        methods: {
            ...mapActions(['getItems', 'deleteRowItem', 'openModal', 'openModalClone', 'updateRowList']),
            emitter(value) {
                this.$emit("input", value);

                const url = this.components.list.sortable.url;
                const method = this.components.list.sortable.method;
                const page = this.$route.query.page || 1;
                const list = this.list;
                const payload = {
                    url,
                    method,
                    list,
                    page,
                };
                this.updateRowList(payload);
            },
            onChange: function () {
                if (this.child === true) {
                    this.$emit("change");
                } else {
                    this.emitter(this.value);
                }
            },
            showModal(data) {
                this.openModal(data)
            },
            showModalClone(data) {
                this.openModalClone(data)
            },
            showChildren (e) {
                this [e.target.dataset.openid] = !this [e.target.dataset.openid];
                console.log (e, this);
            }
        }
    }
</script>

<style scoped>
  .item-sub {
    margin: 0 0 0 20px;
  }


</style>
