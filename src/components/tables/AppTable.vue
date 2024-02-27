<template>
  <div class="main-panel" :class="{ active: getMenuStatus }">
    <main class="main-content">
      <div class="page-header">
        <header>
          <template v-if="page_title">
            <h1>{{page_title}}</h1>
          </template>
          <div class="button-group" v-if="component.navbar">
            <div v-for="(button, index) in component.navbar.buttons" :key="'nav-button-' + index">
              <template v-if="button.type === 'create' && button.text">
                <button class="btn outline-blue" @click.prevent="getFormElements(button.url)"><i class="material-icons">add</i>{{button.text}}
                </button>
              </template>
              <template v-if="button.type === 'edit_page' || button.type === 'edit' && button.text">
                  <router-link class="btn outline-red" :to="button.url">{{button.text}}</router-link>
              </template>
              <template v-if="button.type === 'edit_project' && button.text">
                  <router-link class="btn outline-red" :to="button.url">{{button.text}}</router-link>
              </template>
              <template v-if="button.type === 'main_sections' && button.text">
                  <router-link class="btn outline-green" :to="button.url">{{button.text}}</router-link>
              </template>
              <template v-if="button.type === 'export' && button.text">
                  <button class="btn outline-green"
                          title="Export to CSV"
                          type="button"
                          data-toggle="modal"
                          data-target="#showModalExport"
                          @click.prevent="showModalExport({element: button, url: button.url, method: button.method})">
                      <!-- <i class="material-icons">content_copy</i> -->
                      {{button.text}}
                  </button>
              </template>
            </div>
          </div>
        </header>
        <form class="header-form" role="search">
          <div class="input-group">
            <input class="form-control input-group__search" name="search" id="search" type="text" v-debounce:400ms="searchFoItem" :debounce-events="['keydown']">
            <i class="material-icons">search</i>
            <template v-if="getSearchLoadingStatus">
              <img src="/assets/loader/loader.gif" alt="loader">
            </template>
          </div>
        </form>
      </div>
      <br>
      <br>
     <!-- <div class="right">
           <button type="button" :disabled="isDisabled" class="btn outline-red"><i class="material-icons">delete</i>BATCH DELETE</button>
        </div>
        -->
      <template v-if="components.list">

        <div class="table">
          <div class="tr th">
            <!--<div class="td">-->
              <!--<div class="checkbox" style="margin-left: 24px">-->
                <!--<label>-->
                  <!--&lt;!&ndash;<input type="checkbox" name="optionsCheckboxes">&ndash;&gt;-->
                  <!--&lt;!&ndash;<span class="checkbox-material">&ndash;&gt;-->
                  <!--&lt;!&ndash;<span class="check"></span></span>&ndash;&gt;-->
                <!--</label>-->
              <!--</div>-->
            <!--</div>-->
            <div class="td col-lg-6" v-for="(tData, index) in component.elements_heading"
                 :key="'table-heading-' + index">
              <div class="">{{tData}}</div>
            </div>
            <div class="td col-lg-6">
                <div class=""></div>
            </div>
          </div>
          <app-table-row :list="rowLists" :child="false" ></app-table-row>
          <!--Pagination-->
          <div class="main-footer" v-if="components.list.pagination && components.list.pagination.total > 0">
            <app-pagination :pagination="components.list.pagination"></app-pagination>
          </div>
        </div>
        <template v-if="messageComponents.hasMessage">
          <app-notification-message></app-notification-message>
        </template>
      </template>

      <template v-if="components.markup">
        <div class="grid">
          <app-markup v-for="(markup, index) in components.markup" :key="'markup-' + index"
                      :markup="markup"></app-markup>
        </div>
        <template v-if="messageComponents.hasMessage">
          <app-notification-message></app-notification-message>
        </template>
        <template v-if="redirectComponent.hasRedirect">
          <app-redirect></app-redirect>
        </template>
      </template>
    </main>

    <app-modal></app-modal>
    <app-modal-clone></app-modal-clone>
    <app-modal-export></app-modal-export>
  </div>
</template>
<script>
    import {mapActions, mapGetters, mapState} from 'vuex';
    import AppTableRow from './AppTableRow';
    import AppPagination from '../shared/pagination/AppPagination';
    import AppMarkup from './markup/AppMarkup';
    import AppModal from '../shared/modal/AppModal';
    import AppModalClone from '../shared/modal/AppModalClone';
    import AppModalExport from '../shared/modal/AppModalExport';

    export default {
        name: "app-table",
        components: {
             AppPagination, AppMarkup, AppModal, AppTableRow, AppModalClone, AppModalExport
        },
        props: {
            component: Object,

        },
        data() {
            return {
                isLoading: false,
                batch_checkbox: false
            }
        },
        computed: {
            ...mapState([
                'components',
                'rowItems',
                'page_title',
                'redirectComponent',
                'messageComponents',
                'search',
                // 'searchModule', {
                //     search:  state => state.searchModule.search,
                // }
            ]),
            ...mapGetters([
                'getMenuStatus',
                'getSearchLoadingStatus'
              ]
            ),
            isDisabled: function(){
                return !this.batch_checkbox;
            },
            rowLists: {
                get() {
                    return JSON.parse(JSON.stringify(this.component.elements));
                    // return [...this.component.elements]
                },
                set(value) {
                    console.log(value)
                }
            },
            elements: {
                get() {
                    return JSON.parse(JSON.stringify(this.$store.state.nested.elements));
                },
                set(value) {
                    console.log(value)
                }
            }
        },
        methods: {
            ...mapActions(['updateRowList', 'clearFormState', 'shouldSyncSeoValues', 'getSearchItems', 'openModalExport', 'openModal', 'getSearchItems']),
            searchFoItem(val) {
                this.isLoading = !this.isLoading;
                const payload = {
                    keyword: val,
                    method: this.search.method,
                    url: this.search.action,
                };

                this.getSearchItems(payload);
            },
            handleKeyDownButton(e){
                if (e.code === 'Enter') {
                    this.keyEnter = 'Enter';
                    e.preventDefault();
                } else{
                    this.keyEnter = '';
                }
            },
            getFormElements(url) {
                this.$router.push(url);
            },
            resetFormState() {
                this.clearFormState();
            },
            showModal(data) {
                this.openModal(data)
            },
            showModalExport(data) {
                this.openModalExport(data)
            },
        },
        beforeDestroy() {
            this.resetFormState();
            this.shouldSyncSeoValues(false);
        }
    }
</script>

<style scoped lang="scss">
  .sortable-drag {
    opacity: 0;
  }
  .table-list-move {
    transition: transform 1s;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }

  .ghost {
    opacity: 0.7;
    box-shadow: 0 1px 5px;
    transform: translateY(-20px);
    &::before {
      content: ' ';
      position: absolute;
      width: 20px;
      height: 20px;
      margin-left: -50px;
    }
  }

  .handle {
    cursor: move;
    cursor: -webkit-grabbing;
  }

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
