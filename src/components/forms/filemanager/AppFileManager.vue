<template>
  <div class="card__body form-group">
    <div class="card__items card__files ">
      <template v-if="!hasObjectOwnProperty(fieldType, 'thumbnail')">
        <img :src="formFields[fieldType.name]" :alt="fieldType.name">
      </template>
      <template v-else>
          <div class="card__file--preview u-ctx" >
            <img :src="fieldType.thumbnail" alt="">
            <template v-if="fileName && fileName.length > 0">
              <div class="u-mt-20 u-pl-20">
                <a :href="formFields[fieldType.name]" target="_blank" class="u-flex u-ai-center">
                  <i class="material-icons" style="color: #00ADEE;">{{fieldType.material_icon}}</i>
                  <!--play_circle_filled-->
                  <span>{{fileName}}</span>
                </a>
              </div>
            </template>
          </div>
      </template>

      <input type="hidden"
             :field-type="JSON.stringify(fieldType)"
             :name="fieldType.name"
             :id="fieldType.id"/>
    </div>
    <template v-if="fieldType.info">
      <div class="description u-p-20">
        <p>{{fieldType.info}}</p>
      </div>
    </template>
    <div class="button-group u-plr-20">
        <template v-if="!fieldType.name.match (/.+image\_package\_thumbnail$/g)">
            <button class="btn outline-blue" @click="uploadFile(fieldType.name, fieldType.id)" id="upload"><i
                class="material-icons">add</i></button>
            <button class="btn outline-red right" id="remove-img" @click="removeFile(fieldType.name)"><i
                class="material-icons">delete</i>
            </button>
        </template>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';

    export default {
        name: "app-file-manager",
        props: {
            fieldType: {
                type: Object,
                name: String,
                id: Number,
                thumbnail: {
                    type: String,
                    default: ''
                },
                material_icon: {
                  type: String,
                  default: 'insert_drive_file'
                },
                info: {
                    type: String,
                    default: ''
                },
            }
        },
        data() {
            return {
                fileName: ''
            }
        },
        created() {
            // debugger // eslint-disable-line
            if (this.fieldType && this.fieldType.type === 'file') {
                if(this.hasObjectOwnProperty(this.fieldType, 'thumbnail')) {
                    this.fileName = this.renameFileName(this.fieldType.value);
                }
                this.initCallback();
            }
        },
        computed: {
            ...mapState([
                'formFields'
            ]),
            ...mapGetters([
                'getDevelopmentMode'
            ])
        },
        methods: {
            ...mapActions(['updateFileField']),
            initCallback() {
                function responsive_filemanager_callback(fieldId) {
                    window['$'].fancybox.close();
                    const value = window['$'](`#${fieldId}`).val();
                    const name = window['$'](`#${fieldId}`).attr('name');
                    const fieldType = JSON.parse(window['$'](`#${fieldId}`).attr('field-type'));

                    if (fieldType && fieldType.type === 'file') {
                        if(this.hasObjectOwnProperty(fieldType, 'thumbnail')) {
                            this.fileName = this.renameFileName(value);
                        }
                    }


                    this.$nextTick(() => {
                        this.updateFileField({
                            value: value,
                            fieldName: name,
                        });
                        this.$forceUpdate();
                    })
                }
                window['responsive_filemanager_callback'] = responsive_filemanager_callback.bind(this);
            },
            uploadFile(fieldName, fieldId) {
                let url = '/file_manager/dialog.php';
                if (this.getDevelopmentMode) {
                    url = 'http://netix.webfiniti.bg/file_manager/dialog.php';
                }
                // debugger // eslint-disable-line
                window['$'].fancybox.open({
                    autoDimensions: false,
                    src: `${url}?type=2&field_id=${fieldId}`,
                    type: 'iframe',
                    iframe: {
                        css: {
                            width: '100%',
                            height: '100%',
                        }
                    }
                });
            },
            removeFile(name) {
                if(!this.hasObjectOwnProperty(this.fieldType, 'thumbnail')) {
                    this.updateFileField({
                        value: '/assets/logo/no_image.jpg',
                        fieldName: name,
                    });
                } else {
                    this.updateFileField({
                        value: '',
                        fieldName: name,
                    });
                    this.fileName = '';
                }
            },
            hasObjectOwnProperty(obj, prop) {

                return Object.prototype.hasOwnProperty.call(obj, prop);
            },
            renameFileName(fileName) {
                if(fileName && fileName.split('/').slice(-1).pop()) {
                    return fileName.split('/').slice(-1).pop().replace(/[%20/\\]+/gi, ' ')
                }
            }

        }
    }
</script>

<style scoped>

</style>
