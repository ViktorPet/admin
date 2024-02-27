<template>
  <div class="main-panel" :class="{ active: getMenuStatus }">
    <main class="main-content">
      <div class="page-header">
        <header class="u-width-100">
          <h1>{{page_title}}</h1>
          <div class="button-group" v-if="components.form">
            <div v-for="(button, index) in components.form.buttons" :key="'nav-button-' + index">
              <template v-if="button.type === 'submit'">
                 <button class="btn solid-green" @click="save(button.url, button.method)">{{button.text}}</button>
              </template>
              <template v-if="button.type === 'edit_page'">
                  <router-link class="btn outline-blue" :to="button.url">{{button.text}}</router-link>
              </template>
              <template v-if="button.type === 'edit_project'">
                  <router-link class="btn outline-blue" :to="button.url">{{button.text}}</router-link>
              </template>
              <template v-if="button.type === 'close'">
                <router-link class="btn outline-red" :to="button.url">{{button.text}}</router-link>
              </template>
            </div>
          </div>
        </header>
      </div>
      <div class="row">
        <template v-if="components.form">
          <app-form-section
              :is-from-children="false"
              :parent-section="null"
              :groups="components.form.groups">
          </app-form-section>
          <template v-if="redirectComponent.hasRedirect">
            <app-redirect></app-redirect>
          </template>
          <template v-if="messageComponents.hasMessage">
            <app-notification-message></app-notification-message>
          </template>
        </template>
      </div>
      <!--<br>-->
    </main>

  </div>
</template>
<script>
    import {mapActions, mapGetters, mapState} from 'vuex';
    import AppFormSection from './AppFormSection';
    import { slugMixin } from '../../mixins';
    export default {
        name: "app-form",
        components: {AppFormSection},
        mixins: [slugMixin],
        computed: {
            ...mapState([
                'components',
                'page_title',
                'languages',
                'formFields',
                'messageComponents',
                'redirectComponent',
            ]),
            ...mapGetters(['getMenuStatus', 'shouldSyncSeoValues']),
        },
        methods: {
            ...mapActions(['getFormElements', 'sendFormData']),
            save(action, method) {
                if(this.shouldSyncSeoValues) {
                    for(let field in this.formFields) {
                        if(field.includes('alias')) {
                            const value =  this.formFields[field];
                            this.formFields[field] = this.transliterate(this.convertToSlugDash(value))
                        }
                    }
                }

                const data = {
                    action,
                    method,
                    data: this.formFields
                };

                this.sendFormData(data)
            },
        },
    }
</script>

<style scoped>

</style>
