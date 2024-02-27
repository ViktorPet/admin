<template>
<div class="modal fade" id="showModalExport" tabindex="-1" role="dialog" aria-labelledby="showModalExport" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-body">
                <template>
                    <div class="form-group">
                        <div>
                            <p class="card__subtitle">Филтър - Начална дата</p>
                            <br>
                            <datetime :name="from" :input-class="['form-control', 'input-date']" :input-style="{'height': '40px'}" placeholder="Изберете дата..." value-zone="local" :format="'dd.MM.yyyy'" :auto="true" :flow="['year', 'date']" :phrases="{}"
                                @input="updateFormField($event, 'from')" :type="'date'">
                            </datetime>
                            <span class="input-error" v-if="checkForErrors('from')" v-text="getMessageErrors('from')"></span>
                        </div>
                        <br>
                        <div>
                            <p class="card__subtitle">Филтър - Крайна дата</p>
                            <br>
                            <datetime :name="to" :input-class="['form-control', 'input-date']" :input-style="{'height': '40px'}" placeholder="Изберете дата..." value-zone="local" :format="'dd.MM.yyyy'" :auto="true" :flow="['year', 'date']" :phrases="{}"
                                @input="updateFormField($event, 'to')" :type="'date'">
                            </datetime>
                            <span class="input-error" v-if="checkForErrors('to')" v-text="getMessageErrors('to')"></span>
                        </div>
                        <br>
                        <br>
                        <div class="modal-footer">
                            <button type="button" class="btn outline-red" data-dismiss="modal">Затвори</button>
                            <button type="button" class="btn outline-green" data-dismiss="modal" @click="confirm()">Експортирай</button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {
    mapActions,
    mapGetters,
    mapState
} from 'vuex';
import {
    Datetime
} from 'vue-datetime'

export default {
    name: "app-modal-export",
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
        datetime: Datetime
    },
    computed: {
        ...mapState(['formFields', 'modalExportData']),
        ...mapGetters(['getErrors', 'hasError', 'hasAnyError'])
    },
    methods: {
        ...mapActions(['exportToCsv', 'updateField', 'updateFileField', 'clearErrors', 'getFormElements', 'sendFormData']),
        updateFormField(e, fieldName) {

            let payload = {
                fieldName,
                value: e
            };
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
        confirm() {
            const data = {
                action: this.modalExportData.url,
                method: this.modalExportData.method,
                data: this.formFields
            };

            this.exportToCsv(data);
        }
    }
}
</script>

<style scoped>

</style>
