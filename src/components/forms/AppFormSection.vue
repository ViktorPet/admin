<template>
  <div>
    <div :class="[isFromChildren ? 'u-mb-20 ' + section['class'] : 'u-pl-0 ' + section['class'], (isFromChildren && section['class'].includes('hidden'))  ? 'hidden' : '']"  v-for="(section, sectionIndex) in groups" :key="'group-' + sectionIndex">
      <div class="row " >
        <template v-if="section.components">
          <div class="card u-pt-20">
            <div class="card__header u-pl-20 " v-if="section.group_heading !== null">
              <h2>{{section.group_heading}}</h2>
              <!--<span class="icon-right u-pr-20"><i class="material-icons">settings</i></span>-->
            </div>
            <div v-for="(sectionComponent, groupIndex) in section.components" :key="'section-component-' + groupIndex" class="card__body">
              <template v-if="sectionComponent === 'translations'">
                <div class="card__items">
                  <ul class="card-tabs">
                    <li v-for="lang in languages"
                        :key="'language-' + lang.language_id"
                        :name="lang.code"
                        :class="{ active: isActive(lang.code + sectionIndex, sectionIndex) }"
                        class="card-tabs__items">
                      <a :href="'#' + lang.code + sectionIndex" @click.prevent="setActive(lang.code + sectionIndex, sectionIndex)">{{lang.name}}</a>
                    </li>
                  </ul>
                </div>

                <template v-if="!section.components.includes('seo')">
                  <template v-if="section.fields">
                    <div v-for="(field, key) in section.fields"  :key="'tab-content' + key + sectionIndex">
                      <app-tabs-content
                          v-show="isActive(languages[key].code + sectionIndex, sectionIndex)"
                          class="row tab-pane fade"
                          :class="{ show: isActive(languages[key].code + sectionIndex, sectionIndex) }"
                          :id="languages[key].code + sectionIndex"
                          :field-item=field
                          :field-key="key"
                          :section-index="parentSection + sectionIndex + '-fields-' + key">
                      </app-tabs-content>
                    </div>
                  </template>
                  <template v-if="section.children && section.children.length > 0">
                    <app-form-section :groups="section.children" :parentSection="sectionIndex + '-children-'"></app-form-section>
                  </template>
                </template>
              </template>

              <template v-if="sectionComponent === 'seo'">
                <app-tabs-content
                    v-for="(field, key) in section.fields"
                    :key="'tab-content' + key + sectionIndex"
                    v-show="isActive(languages[key].code + sectionIndex, sectionIndex)"
                    class="row"
                    :id="languages[key].code + sectionIndex"
                    :field-item=field
                    :field-key="key"
                    :type="'seo'"
                    :section-index="parentSection + sectionIndex + '-fields-' + key">
                </app-tabs-content>
              </template>

              <template v-if="sectionComponent === 'file'">
                <template v-if="section.fields">
                  <div v-for="(fieldType, fieldKey) in section.fields"  :key="'file-manager-' + fieldKey">
                    <app-form-field :field-type="fieldType" :field-key="fieldKey"></app-form-field>
                  </div>
                </template>
              </template>
            </div>
          </div>

        </template>
        <template v-else-if="section.children && section.children.length > 0">
          <app-form-section :groups="section.children" :is-from-children="true"></app-form-section>
        </template>
        <template v-else>
          <div class="u-p-20 card">
            <div class="card__header "  v-if="section.group_heading !== null">
              <h2>{{section.group_heading}}</h2>
              <!--<span class="icon-right u-pr-20"><i class="material-icons">settings</i></span>-->
            </div>
            <app-aside-form-section :section="section"></app-aside-form-section>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';
    import AppTabsContent from './tabs/AppTabsContent';
    import AppAsideFormSection from './AppAsideFormSection';
    import AppFormField from './AppFormField';

    export default {
        name: "app-form-section",
        components: {AppTabsContent,  AppAsideFormSection, AppFormField},
        props: {
            groups: Array,
            parentSection: null,
            isFromChildren: {
                default:false
            }
        },
        data() {
            return {
                activeTabs: {},
            }
        },
        computed: {
            ...mapState(['languages', 'components']),
            ...mapGetters(['getMenuStatus']),
        },

        beforeMount() {
            this.setActiveLang();

        },

        methods: {
            ...mapActions(['getFormElements']),
            isActive(activeTab, sectionIndex) {
                return this.activeTabs[sectionIndex] === activeTab;
            },
            setActive(tab, sectionIndex) {
                this.activeTabs[sectionIndex] = tab;
            },
            setActiveLang() {
                if (this.groups) {
                    let activeLang = {};
                    this.activeTabs = {};
                    let languages = this.languages;
                    let groups = this.groups;
                    for (let [sectionIndex, section] of groups.entries()) {
                        if (section.components) {
                            for (let sectionComponent of section.components) {
                                if (sectionComponent === 'translations') {
                                    for (let lang in languages) {
                                        // debugger // eslint-disable-line
                                        let tab = languages[lang];
                                        if (tab.active) {
                                            activeLang[sectionIndex] = tab.code + sectionIndex;
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    this.activeTabs = Object.assign({}, activeLang);
                }
            }
        },
    }
</script>

<style scoped>
  .show {
    opacity: 1;
    transition: all .3s ease-in;
  }
</style>
