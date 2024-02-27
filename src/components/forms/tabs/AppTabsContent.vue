<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="tabs-details tab-content">
    <template v-if="type ==='seo'">
      <div v-for="(fieldType, indx) in fieldItem" :key="'field-type-seo-' + indx + fieldKey + sectionIndex">
        <div :class="fieldType.class">
          <div class="card__items">
            <!-- v-if="shouldSyncSeoValues"-->
            <app-form-field :field-type="fieldType" :type="'seo'">
              <template v-if="fieldType.component === 'seo_title'" v-slot:seo_title>
                <app-form-field :type="'seo'">
                  <template v-slot:seo_description>
                    <div class="seo-description" v-if="shouldSyncSeoValues">
                      <a href="#" >{{formFields[fieldType.name]}}</a>
                      <div class="slug">{{hostName}}{{prefix}}/{{transliterate(convertToSlugDash(getMetaField(slugName)))}}</div>
                      <div class="meta-description">{{metaDescription}}</div>
                    </div>
                    <div class="seo-description" v-else>
                      <a href="#"> {{metaTitle}}</a>
                      <div class="slug">{{hostName}}{{prefix}}/{{slug}}</div>
                      <div class="meta-description">{{metaDescription}}</div>
                    </div>
                  </template>
                </app-form-field>

               <template v-if="shouldSyncSeoValues">
                 <template v-if="!fieldType.hide"> <!-- Meta Title -->
                   <h3 class="card__subtitle">{{fieldType.label}}</h3>
                   <input type="text" class="form-control"
                          :name="fieldType.name"
                          :value="getMetaField(fieldType.name)"
                          @input="updateFormField($event.target.value,fieldType.name)">
                 </template>
                 <template v-if="getMetaField(fieldType.name) !== null">
                   <app-seo-bar :seo-indicator-length="getMetaField(fieldType.name).length"
                                :seo-field="'metaTitle'"
                                :divide-ration="1"
                                :max-allowed-char="100">
                   </app-seo-bar>
                 </template>
               </template>
               <template v-else>
                 <template v-if="!fieldType.hide">
                   <h3 class="card__subtitle">{{fieldType.label}}</h3>
                   <input type="text" class="form-control"
                          :name="fieldType.name"
                          v-model="metaTitle"
                          @input="updateFormField($event.target.value,fieldType.name)">
                 </template>
                 <template v-if="metaTitle !== null">
                   <app-seo-bar :seo-indicator-length="metaTitle.length"
                                :seo-field="'metaTitle'"
                                :divide-ration="1"
                                :max-allowed-char="100">
                   </app-seo-bar>
                 </template>
               </template>
              </template>

              <template v-if="fieldType.type === 'string' && fieldType.component === 'seo_alias'" v-slot:seo_alias>
               <template  v-if="!fieldType.hide">
                <template v-if="shouldSyncSeoValues">
                  <!--v-model="updateSeoUrl"-->
                  <h3 class="card__subtitle">{{fieldType.label}}</h3>
                  <input type="text" class="form-control"
                         :name="fieldType.name"
                         :value="getMetaField(fieldType.name)"
                         @input="updateFormField($event.target.value, fieldType.name)">
                  <span class="input-error" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
                </template>
                 <template v-else>
                   <h3 class="card__subtitle">{{fieldType.label}}</h3>
                   <input type="text" class="form-control"
                          :name="fieldType.name"
                          v-model="slug"
                          @input="updateFormField($event.target.value, fieldType.name)">
                   <span class="input-error" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
                 </template>
               </template>

              </template>

              <template v-if="fieldType.type === 'textarea' && fieldType.component === 'seo_description'" v-slot:seo_description>
                <template  v-if="!fieldType.hide">
                  <template v-if="shouldSyncSeoValues">
                    <div class="card__items form-group u-mb-10">
                      <h3 class="card__subtitle">{{fieldType.label}}</h3>
                      <textarea class="form-control" rows="4"
                                :name="fieldType.name"
                                v-model="metaDescription"
                                @input="updateFormField($event.target.value, fieldType.name)"></textarea>
                    </div>
                    <template v-if="getMetaField(fieldType.name) !== null && getMetaField(fieldType.name).length >= 2">
                      <app-seo-bar :seo-indicator-length="getMetaField(fieldType.name).length"
                                   :seo-field="'metaDescription'"
                                   :divide-ration="2"
                                   :max-allowed-char="200">
                      </app-seo-bar>
                    </template>
                  </template>

                 <template v-else>
                   <div class="card__items form-group u-mb-10">
                     <h3 class="card__subtitle">{{fieldType.label}}</h3>
                     <textarea class="form-control" rows="4"
                               :name="fieldType.name"
                               v-model="metaDescription"
                               @input="updateFormField($event.target.value, fieldType.name)"></textarea>
                   </div>
                   <template v-if="metaDescription !== null && metaDescription.length >= 2">
                     <app-seo-bar
                         :seo-indicator-length="metaDescription.length"
                         :seo-field="'metaDescription'"
                         :divide-ration="2"
                         :max-allowed-char="200"></app-seo-bar>
                   </template>
                 </template>
                </template>
              </template>

              <template v-if="fieldType.type === 'hidden'">
                <input type="hidden" class="form-control" :value="fieldType.value" :name="fieldType.name">
              </template>
            </app-form-field>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div v-for="(fieldType, indx) in fieldItem" :key="'field-type-' + indx + fieldKey + sectionIndex">
        <div :class="fieldType.class">
          <div class="card__items">
            <app-form-field
                :field-type="fieldType">
            </app-form-field>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
    import {mapActions, mapState, mapGetters} from 'vuex';
    import AppFormField from '../AppFormField';
    import AppSeoBar from '../../seo-tool/AppSeoBar';
    import { slugMixin } from '../../../mixins';

    export default {
        name: "app-tabs-content",
        components: {AppFormField, AppSeoBar},
        mixins: [slugMixin],
        props: {
            fieldItem: {
                type: Object,
                required: true
            },
            fieldKey: {
                type: String,
                required: true
            },
            sectionIndex: {
                type: String,
                required: false
            },
            type: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                metaTitle: '',
                metaDescription: '',
                slug: '',
                slugName: '',
                prefix: '',
                hostName: location.host,
            }
        },
        computed: {
            updateSeoUrl: {
                set(val) {
                    this.slug = val;
                },
                get() {
                    return this.getMetaField(this.slugName);
                }
            },
            ...mapGetters(['getErrors', 'hasError', 'hasAnyError', 'getMetaField']),
            ...mapState(['formFields', 'shouldSyncSeoValues']),
        },
        mounted() {
            for(let fieldType in this.fieldItem) {
                if((fieldType === 'alias')) {
                    this.slug = this.fieldItem[fieldType].value;
                    this.slugName = this.fieldItem[fieldType].name;
                    if(this.fieldItem[fieldType].prefix.length > 0) {
                        this.prefix  = '/' + this.fieldItem[fieldType].prefix;
                    }
                    // break;
                } else if(fieldType === 'meta_title') {
                    this.metaTitle = this.fieldItem[fieldType].value;
                } else if(fieldType === 'meta_description') {
                    this.metaDescription = this.fieldItem[fieldType].value;
                }
            }
        },
        methods: {
            ...mapActions(['updateField', 'clearErrors']),
            getMessageErrors(errorFieldName) {
                    return this.getErrors(errorFieldName)
            },
            checkForErrors(name) {
                return  this.hasError(name);
            },
            updateFormField(value, fieldName) {
                // debugger // eslint-disable-line
                if(this.checkForErrors(fieldName)) {
                    this.clearErrors(fieldName);
                }

                if (fieldName.indexOf('slug') > -1) {
                    // this.slug = this.transliterate(this.convertToSlugDash(value));
                    if(this.shouldSyncSeoValues) {
                        this.slug = value;
                    } else {
                        // this.slug = this.transliterate(this.convertToSlugDash(value));
                        this.slug = this.transliterate(this.convertToSlugDash(value));
                    }

                    // value = this.transliterate(this.convertToSlugDash(value));
                }

                let payload = {
                    fieldName,
                    value
                };
                this.updateField(payload);
            },
        },
        beforeDestroy() {
            if(this.hasAnyError) {
                this.clearErrors('');
            }
        }
    }
</script>

<style scoped>

</style>
