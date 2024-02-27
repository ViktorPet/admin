<template>
    <div class="form-group">
        <template v-if="type==='seo'">
            <slot name="seo_title"></slot>
            <slot name="seo_description"></slot>
            <slot name="seo_alias"></slot>
        </template>
        <template v-else>
            <template v-if="fieldType.type === 'string' && !fieldType.component">
                <div :class="[fieldType.hide ? 'hidden' : '']">
                    <h3 class="card__subtitle">{{fieldType.label}}</h3>
                    <app-input @updateField="updateFormField" :type="'text'" :fieldType="fieldType" class="text-input"></app-input>
                    <span class="input-error" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
                </div>
            </template>
            <template v-if="fieldType.type === 'number' && !fieldType.component">
                <div :class="[fieldType.hide ? 'hidden' : '']">
                    <h3 class="card__subtitle">{{fieldType.label}}</h3>
                    <vue-number-input controls center
                        :type="'number'"
                        :fieldType="fieldType.type"
                        :name="fieldType.name"
                        :min="(fieldType.min ? fieldType.min : '')"
                        :inputtable="false"
                        :attrs="{ value: fieldType.value }"
                        :value="fieldType.value"
                        @update:model-value="onNumberUpdate"
                        @change="onNumberChange"
                        @input="onNumberInput"
                        @updateField="updateFormField">
                    </vue-number-input>
                    <span class="input-error" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
                </div>
            </template>
            <template v-if="fieldType.type === 'email' && !fieldType.component">
                <div :class="[fieldType.hide ? 'hidden' : '']">
                    <h3 class="card__subtitle">{{fieldType.label}}</h3>
                    <app-input @updateField="updateFormField" :type="'email'" :fieldType="fieldType"></app-input>
                    <span class="input-error" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
                </div>
            </template>
            <template v-if="fieldType.type === 'color' && !fieldType.component">
                <div :class="[fieldType.hide ? 'hidden' : '']">
                    <h3 class="card__subtitle">{{fieldType.label}}</h3>
                    <color-picker
                        theme="light"
                        style="margin 0 auto; display: block;"
                        :color="fieldColor"
                        :sucker-hide="false"
                        :sucker-canvas="suckerCanvas"
                        :sucker-area="suckerArea"
                        :name="fieldType.name"
                        :type="fieldType.type"
                        :value="fieldType.value"
                        @updateField="updateFormField"
                        @input="updateFormField(fieldType.value, fieldType.name)"
                        @changeColor="changeColor"
                        @openSucker="openSucker"/>
                    <span class="input-error" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
                </div>
            </template>
            <template v-if="fieldType.type === 'password' && !fieldType.component">
                <div :class="[fieldType.hide ? 'password' : '']">
                    <h3 class="card__subtitle">{{fieldType.label}}</h3>
                    <app-input @updateField="updateFormField" :type="'password'" :fieldType="fieldType"></app-input>
                    <span class="input-eror" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
                </div>
            </template>
            <template v-if="fieldType.type === 'hidden'">
                <input type="hidden" class="form-control" :value="fieldType.value" :name="fieldType.name">
                <template v-if="fieldType.component === 'section_types'">
                    <div class="row section-types">
                        <div class="section-types__img">
                            <img :src="fieldType.image" :alt="fieldType.name">
                        </div>
                        <button class="btn solid-green">
                            <i class="material-icons">edit</i>
                        </button>
                    </div>
                </template>
            </template>
            <template v-if="fieldType.type === 'textarea' && fieldType.component === 'editor'">
                <div :class="[fieldType.hide ? 'hidden' : '']">
                    <h3 class="card__subtitle">{{fieldType.label}}</h3>
                    <ckeditor class="editor" :editor="editor" :value="fieldType.value" @input="updateFormField($event, fieldType.name)" :config="config">
                    </ckeditor>
                    <span class="input-error" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
                </div>
            </template>
            <template v-if="fieldType.type === 'textarea' && !fieldType.component">
                <div :class="['card__items form-group', fieldType.hide ? 'hidden' : '']">
                    <h3 class="card__subtitle">{{fieldType.label}}</h3>
                    <textarea class="form-control" rows="4" :name="fieldType.name" :value="fieldType.value" @input="updateFormField($event.target.value, fieldType.name)"></textarea>
                    <span class="input-error" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
                </div>
            </template>
            <template v-if="fieldType.type === 'select'">
                <div :class="[fieldType.hide ? 'hidden' : '']">
                    <h3 class="card__subtitle">{{fieldType.label}}</h3>
                    <select :name="fieldType.name" class="form-control select" @input="updateFormField($event.target.value, fieldType.name)" @updateField="updateFormField" @change="onChange">

                        <option v-for="(choice, choiceKey) in fieldType.choices"
                            :data-parent-choice="(choice.hasOwnProperty ('data-parent-choice') ? choice ['data-parent-choice'] : null)"
                            :data-tree-level="(choice.hasOwnProperty ('data-tree-level') ? choice ['data-tree-level'] : null)"
                            :data-page="(choice.hasOwnProperty ('data-page') ? choice ['data-page'] : null)"
                            :data-uri="(choice.hasOwnProperty ('data-uri') ? choice ['data-uri'] : null)"
                            :key="'choice' + choiceKey"
                            :value="choice.id"
                            :selected="(fieldType.value == choice.id ? fieldType.value == choice.id : fieldType.default_choice_id)">
                            {{choice.label}}
                        </option>
                    </select>
                    <span class="input-error" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
                </div>
            </template>
            <template v-if="fieldType.type === 'multiselect'">
            <div :class="[fieldType.hide ? 'hidden' : '']">
                <h3 class="card__subtitle">{{fieldType.label}}</h3>
                <div>
                    <multiselect id="ajax"
                        v-model="value_multiselect_selected"
                        :name="fieldType.name"
                        :options="value_multiselect"
                        :multiple="true"
                        :taggable="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="false"
                        tag-placeholder="Pick some"
                        label="label"
                        track-by="label"
                        :loading="isLoading"
                        :internal-search="true"
                        :options-limit="300"
                        :max-height="600"
                        :show-no-results="false"
                        :hide-selected="true"
                        @search-change="onMultiselectSearch"
                        @select="onMultiSelectAdd"
                        @remove="onMultiSelectRemove"
                        @input="onMultiSelectChange"
                        @open="onMultiSelectOpen"
                        @close="onMultiSelectClose">


                    </multiselect>
                </div>
            </div>
        </template>
        <template v-if="fieldType.type === 'time'">
            <div :class="[fieldType.hide ? 'hidden' : '']">
                <h3 class="card__subtitle">{{fieldType.label}}</h3>

                <datetime :name="fieldType.name" :input-class="['form-control', 'input-time']" :input-style="{'height': '40px'}" value-zone="local" :auto="true" :flow="['time']" :phrases="{}"
                    :value="fieldType.value" @input="updateFormField($event, fieldType.name)" :type="'time'">

                </datetime>
            </div>
        </template>
            <template v-if="fieldType.type === 'dateonly'">
                <div :class="[fieldType.hide ? 'hidden' : '']">
                    <h3 class="card__subtitle">{{fieldType.label}}</h3>
                    <!--'dd.MM.yyyy HH:mm'-->

                    <datetime :name="fieldType.name" :input-class="['form-control', 'input-date']" :input-style="{'height': '40px'}" value-zone="local" :format="'dd.MM.yyyy'" :auto="true" :flow="['year', 'date']" :phrases="{}"
                        :value="fieldType.value" @input="updateFormField($event, fieldType.name)" :type="'date'">
                    </datetime>
                    <span class="input-error" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
                </div>
            </template>
            <template v-if="fieldType.component === 'datetime'">
                <div :class="[fieldType.hide ? 'hidden' : '']">
                    <h3 class="card__subtitle">{{fieldType.label}}</h3>
                        <datetime :name="fieldType.name" :input-class="['form-control', 'input-date']" :input-style="{'height': '40px'}" value-zone="UTC" :format="'dd.MM.yyyy HH:mm'" :auto="true" :flow="['year', 'date', 'time']" :phrases="{}"
                            :value="fieldType.value" @input="updateFormField($event, fieldType.name)" :type="'datetime'">

                        </datetime>
                </div>
                <!--type="datetime"-->
                <span class="input-error" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
            </template>
            <template v-if="fieldType.component === 'date'">
                <div :class="[fieldType.hide ? 'hidden' : '']">
                    <h3 class="card__subtitle">{{fieldType.label}}</h3>
                        <datetime :name="fieldType.name" :input-class="['form-control', 'input-date']" :input-style="{'height': '40px'}" value-zone="UTC" :format="'dd.MM.yyyy'" :auto="true" :flow="['year', 'date']" :phrases="{}"
                            :value="fieldType.value" @input="updateFormField($event, fieldType.name)" :type="'date'">

                        </datetime>
                </div>
                <!--type="datetime"-->
                <span class="input-error" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
            </template>
            <template v-if="fieldType.type === 'file'">
                <div :class="[fieldType.hide ? 'hidden' : '']">
                    <app-filemanager :field-type="fieldType"></app-filemanager>
                    <span class="input-error" v-if="checkForErrors(fieldType.name)" v-text="getMessageErrors(fieldType.name)"></span>
                </div>
            </template>
            <template v-if="fieldType.type === 'checkbox' && fieldType.component === 'group_modules'">
                <template v-if="fieldType && fieldType.choices.length > 0">
                    <div :class="['card__body', fieldType.hide ? 'hidden' : '']">
                        <h4>{{fieldType.label}}</h4>
                        <div class="card__items card__items--grid">
                            <div class="checkbox" v-for="(choice, choiceKey) in fieldType.choices" :key="'checkbox_choices' + choiceKey">
                                <div class="u-flex">
                                    <app-check-box-module :name="fieldType.name" :checkedValues="fieldType.value" :all-checked-elements="fieldType.value" :choice="choice">
                                    </app-check-box-module>
                                    <template v-if="fieldType.component === 'group_modules'">
                                        <span class="ml-auto icon-right" v-show="!fieldType.hide" @click="toggleModuleVisibility(choice.id)">
                                            <i class="material-icons">view_list</i>
                                        </span>
                                    </template>
                                </div>
                                <template v-if="choice.children && choice.children.length > 0">
                                    <app-form-field :field-type="choice.children" :field-key="fieldKey"></app-form-field>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-else-if="fieldType.choices.length > 0">
                    <div :class="['card__body', fieldType.hide ? 'hidden' : '']">
                        <!--<div :class="[]">-->
                        <h4>{{fieldType.label}}</h4>
                        <div class="card__items">
                            <div class="checkbox" v-for="(choice, choiceKey) in fieldType.choices" :key="'checkbox_choices' + choiceKey" style="justify-content: flex-start;">
                                <label>
                                    <input type="checkbox">
                                    <span class="checkbox-material"><span class="check"></span></span>
                                    <span>{{choice.label}}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
            <template v-if="fieldType.type === 'taggable'">
                <h3 class="card__subtitle">{{fieldType.label}}</h3>
                <div>
                    <multiselect
                       :name="fieldType.name"
                       v-model="fieldType.selected_tags"
                       :options="taggingOptions"
                       :multiple="true"
                       :taggable="true"
                       :preserve-search="false"
                       tag-placeholder="Pick some"
                       label="name"
                       track-by="id"
                       :loading="isLoading"
                       :internal-search="true"
                       :options-limit="300"
                       :max-height="600"
                       :show-no-results="false"
                       :hide-selected="true"
                       @input="onTaggableChange"
                       @tag="addTag"
                       @search-change="onTaggableSearch"
                       @open="onTaggableOpen"
                       @select="onTaggableAdd"
                       @remove="onTaggableRemove"
                       @close="onTaggableClose">
                       <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                   </multiselect>
                </div>
            </template>
            <template v-if="fieldType.type === 'checkbox'">
                <template v-if="fieldType && fieldType.choices.length > 0">
                    <div :class="['card__body', fieldType.hide ? 'hidden' : '']">
                        <h4>{{fieldType.label}}</h4>
                        <div class="card__items card__items--grid">
                            <div class="checkbox" v-for="(choice, choiceKey) in fieldType.choices" :key="'checkbox_choices' + choiceKey">
                                <div class="u-flex">
                                    <app-checkbox :name="fieldType.name" :checkedValues="fieldType.value" :all-checked-elements="fieldType.value" :choice="choice">
                                    </app-checkbox>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
        </template>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';
import ckEditorConfig from '../../ckEditor';
import CKEditor from 'ckeditor4-vue';
import appCheckBoxModule from './AppCheckBoxModule';
import AppInput from './input/AppInput';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import colorPicker from '@caohenghu/vue-colorpicker';
import Multiselect from 'vue-multiselect';
import { Datetime } from 'vue-datetime'

export default {
    name: "app-form-field",
    props: {
        fieldType: {
            required: false
        },
        fieldKey: {},
        sectionIndex: {},
        index: {
            type: String,
        },
        type: String,
    },
    components: {
        ckeditor: CKEditor.component,
        appCheckBoxModule,
        AppInput,
        Multiselect,
        VueNumberInput,
        colorPicker,
        datetime: Datetime
    },
    data() {
        return {
            time: null,
            date: null,
            dateonly: null,
            datetime: null,
            page: null,
            uri: null,
            textValue: '',
            editor: CKEditor,
            //autoembed,
            config: ckEditorConfig,
            value_multiselect: [],
            value_multiselect_selected: [],
            selected: null,
            options: [],
            optgroups: [{
                label: ''
            }],
            taggingSelected: [],
            taggingOptions: [],
            fieldColor: '#59c7f9',
            suckerCanvas: null,
            suckerArea: [],
            isSucking: false,
            color: {
                hue: 50,
                saturation: 100,
                luminosity: 50,
                alpha: 1
            },
            hue: 50
        }
    },
    computed: {
        ...mapState(['formFields']),
        ...mapGetters(['getErrors', 'hasError', 'hasAnyError']),
    },
    beforeMount() {
        if ((this.fieldType && (this.fieldType.type === 'time' || this.fieldType.type === 'dateonly' || this.fieldType.type === 'datetime' || this.fieldType.type === 'date' || this.fieldType.type === 'taggable' || this.fieldType.type === 'select' || this.fieldType.type === 'number' || this.fieldType.type === 'email' || this.fieldType.type === 'color' || this.fieldType.type === 'hidden' || this.fieldType.type === 'string' || this.fieldType.type === 'multiselect' || this.fieldType.component ===
                'seo_description'))) {

            this.addFields(this.fieldType);

            if (this.fieldType == 'multiselect') {
                this.option = this.fieldType.choices;
            }
            if (this.fieldType.update_values) {
                this.shouldSyncSeoValues(true);
            }
            if (this.fieldType == 'taggable') {
                this.taggingOptions = this.fieldType.taggable_collection;
                this.taggingSelected = this.fieldType.selected_tags;

                this.updateFileField({
                    value: this.fieldType.selected_tags,
                    fieldName: this.fieldType.name,
                });
            }

            if (this.fieldType == 'time') {
                this.time = this.fieldType.value;

                this.updateFileField({
                    value: this.fieldType.value,
                    fieldName: this.fieldType.name,
                });
            }

            if (this.fieldType == 'dateonly') {
                this.dateonly = this.fieldType.value;

                this.updateFileField({
                    value: this.fieldType.value,
                    fieldName: this.fieldType.name,
                });
            }

            if (this.fieldType == 'date') {
                this.date = this.fieldType.value;

                this.updateFileField({
                    value: this.fieldType.value,
                    fieldName: this.fieldType.name,
                });
            }

            if (this.fieldType == 'datetime') {
                this.datetime = this.fieldType.value;

                this.updateFileField({
                    value: this.fieldType.value,
                    fieldName: this.fieldType.name,
                });
            }
        } else if (this.fieldType && this.fieldType.type === 'file') {
            this.updateFileField({
                value: this.fieldType.value,
                fieldName: this.fieldType.name,
            });
        }

    },
    methods: {
        ...mapActions(['updateField', 'updateFileField', 'updateModuleVisibility', 'addFields', 'clearErrors', 'shouldSyncSeoValues']),
        updateFormField(e, fieldName) {

            let payload = {
                fieldName,
                value: e
            };
            if (this.fieldType.update_values) {
                payload.update_values = Object.values(this.fieldType.update_values);
            }
            if (this.fieldType.selected_tags) {
                payload.selected_tags = Object.values(this.fieldType.selected_tags);
            }
            if (this.checkForErrors(fieldName)) {
                this.clearErrors(fieldName);
            }

            this.updateField(payload);
            // this.$store.hotUpdate(this.$store.state.formFields);
        },
        toggleModuleVisibility(id) {
            this.updateModuleVisibility(id);
        },
        getMessageErrors(errorFieldName) {
            return this.getErrors(errorFieldName)
        },
        checkForErrors(name) {
            return this.hasError(name);
        },
        onChange(event) {
            if (event.target.options.selectedIndex > -1) {
                var target = event.target.options[event.target.options.selectedIndex].dataset;
                var input  = document.querySelector('input.text-input');
                var href   = document.querySelector('input[name="translations.1.href"]');

                if (target.page.length && target.uri.length) {
                    this.page = target.page;
                    this.uri = target.uri;
                    this.textValue = this.page
                    this.formFields['translations.1.name'] = target.page;
                    this.formFields['translations.1.href'] = target.uri;

                    input.value = target.page;
                    href.value = target.uri;

                    this.updateFormField(this.page, 'translations.1.name');
                    this.updateFormField(target.uri, 'translations.1.href');

                    this.updateField({
                        fieldName: 'translations.1.name',
                        value: target.page
                    });
                    this.updateField({
                        fieldName: 'translations.1.href',
                        value: target.uri
                    });
                }
            }
        },
        onSelect(option, id) {
            console.log(option, id)
        },
        setSelected(value) {
            console.log (value);
        },
        onMultiSelectAdd(option, id) {
            this.value_multiselect_selected[id] = option.value;

            this.updateField({
                fieldName: this.fieldType.name,
                value: this.value_multiselect_selected
            });
        },
        onMultiSelectChange(value, id) {
            this.value_multiselect_selected[id] = value;

            this.updateField({
                fieldName: this.fieldType.name,
                value: this.value_multiselect_selected
            });
        },
        onMultiSelectRemove(option, id) {
            delete this.value_multiselect_selected[id];

            this.updateField({
                fieldName: this.fieldType.name,
                value: this.value_multiselect_selected
            });
        },
        limitText(count) {
            return `and ${count} other specialties`
        },
        onMultiselectSearch() {
            this.isLoading = true;

            this.value_multiselect = this.fieldType.choices;
            this.isLoading = false;
        },
        onMultiSelectOpen () {
            this.value_multiselect = this.fieldType.choices;
            this.value_multiselect_selected = this.fieldType.selected_choices;
        },
        onMultiSelectClose () {
            this.updateField({
                fieldName: this.fieldType.name,
                value: this.value_multiselect_selected
            });
        },
        clearMultiselectAll() {
            this.value_multiselect_selected = [];
        },
        addTag(newTag) {
            console.log (newTag);

            if (this.fieldType.name.match (/^(consultations)/g)) {
                const tag = {
                    id: this.fieldType.selected_tags.length + 1,
                    name: newTag,
                    label: newTag
                }
                console.log (tag);

                this.taggingSelected.push(tag);

                this.updateField({
                    fieldName: this.fieldType.name,
                    value: this.taggingSelected
                });

                console.log (tag);
            }


              //this.taggingOptions.push(tag);
              //this.taggingSelected.push(tag);
        },
        onTaggableOpen () {
            this.taggingOptions = this.fieldType.taggable_collection;

            this.taggingOptions = this.fieldType.taggable_collection;

            if (this.fieldType.selected_tags) {
                this.taggingSelected = this.fieldType.selected_tags;

                //delete this.fieldType.selected_tags;

                this.updateField({
                    fieldName: this.fieldType.name,
                    value: this.fieldType.selected_tags
                });
            }
        },
        onTaggableSearch() {
            this.isLoading = true;

            //this.taggingSelected = this.fieldType.selected_tags;
            this.isLoading = false;
        },
        onTaggableAdd(option) {
            if (this.fieldType.selected_tags) {
                for (var i = 0; i < this.fieldType.selected_tags.length; i++) {
                    if (this.fieldType.selected_tags [i].id === option.id) {
                        this.taggingSelected [i] = option;
                        this.fieldType.selected_tags [i] = option;

                        this.updateField({
                            fieldName: this.fieldType.name,
                            value: this.fieldType.selected_tags
                        });
                        break;
                    }
                }
            }
        },
        onTaggableRemove(option, id) {
            for (var i = 0; i < this.fieldType.selected_tags [i].length; i++) {console.log (option.id, id);
                if (this.fieldType.selected_tags [i].id === option.id) {
                    console.log (option, id);
                    this.taggingSelected.splice (i, 1);
                    this.fieldType.selected_tags.splice (i, 1);

                    this.updateField({
                        fieldName: this.fieldType.name,
                        value: this.fieldType.selected_tags
                    });
                    break;
                }
            }
        },
        onTaggableChange(value, id) {
            console.log (value, id);
            this.updateField({
                fieldName: this.fieldType.name,
                value: this.fieldType.selected_tags
            });
        },
        onTaggableClose () {
            if (this.fieldType.name.match (/^(consultations)/g)) {
                if (this.fieldType.taggable_collection.length > 1) {
                   for (var i = 0; i < this.fieldType.taggable_collection.length; i++) {
                       if (Array.isArray (this.fieldType.taggable_collection [i]) && !this.fieldType.taggable_collection [i].length) {
                           this.taggingOptions.splice (i, 1);
                           this.fieldType.taggable_collection.splice (i, 1);

                           continue;
                       }
                   }
               }
            }
            this.updateField({
                fieldName: this.fieldType.name,
                value: this.fieldType.selected_tags
            });
        },
        clearTaggableAll() {
            this.fieldType.selected_tags = [];
        },
        onInput(hue) {
            //var color = '';
            //var input = document.querySelector('.color-input');

            this.hue = hue;
            this.color.hue = hue;/*
console.log (new EasyColorParser);
            color = new EasyColorParser.fromHSLA ({
                h: this.hue,
                s: this.color.saturation,
                l: this.color.luminosity,
                a: this.color.alpha
            })
            .to ('hex');

            input.value = color;

            this.formFields['event_tags.color'] = color;
            this.updateFormField(color, 'event_tags.color');
            this.updateField({
                fieldName: 'event_tags.color',
                value: color
            });
            console.log (input, color, input.value, this.formFields);

            */
        },
        onNumberChange(value) {
            this.formFields['sections.elements_number'] = value;
            this.updateField({
                fieldName: 'sections.elements_number',
                value: value
            });
            console.log (value);
        },
        onNumberInput(value) {
            this.formFields['sections.elements_number'] = value;
            this.updateField({
                fieldName: 'sections.elements_number',
                value: value
            });
            console.log (value);
        },
        onNumberUpdate(value, old) {
            this.formFields['sections.elements_number'] = value;
            this.updateField({
                fieldName: 'sections.elements_number',
                value: value
            });

            console.log (old);
        },
        changeColor(fieldColor) {
            const { r, g, b, a } = fieldColor.rgba
            this.fieldColor = `rgba(${r}, ${g}, ${b}, ${a})`;

            this.formFields['event_tags.color'] = fieldColor.hex;
            this.updateFormField(fieldColor.hex, 'event_tags.color');
            this.updateField({
                fieldName: 'event_tags.color',
                value: fieldColor.hex
            });

            console.log (fieldColor);
        },
        openSucker(isOpen) {
            if (isOpen) {
                // ... canvas be created
            // this.suckerCanvas = canvas
                // this.suckerArea = [x1, y1, x2, y2]
            } else {
                // this.suckerCanvas && this.suckerCanvas.remove
            }
        }
    },
    beforeDestroy() {
        if (this.hasAnyError) {
            this.clearErrors('');
        }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
<style scoped>
    body {
        font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
        text-rendering: optimizelegibility;
        -moz-osx-font-smoothing: grayscale;
        -moz-text-size-adjust: none;
    }

    h1,
    .muted {
        color: #2c3e5099;
    }

    h1 {
        font-size: 26px;
        font-weight: 600;
    }
    .select-container {
        max-width: 30em;
        margin: 1em auto;
    }
    .swatch {
        margin-left: 5px;
        display: inline-block;
        vertical-align: middle;
        height: 15px;
        width: 15px;
    }
</style>
