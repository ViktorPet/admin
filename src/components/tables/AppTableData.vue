<template>
  <div :class="[tableData.constants !== 'section_type_image' ? 'td': '', tableData.class]">
    <template v-if="tableData.type === 'image'">
      <div class="checkbox" v-if="tableData.constants === 'cover' || tableData.constants === 'thumbnail'">
        <!--<img :src="tableData.value" alt="img">-->
        <div class="img-circle"><img v-lazy="tableData.value" alt="img"></div>
      </div>
      <div v-else class="img-circle">
        <!--<img :src="tableData.value" alt="img">-->
        <img v-lazy="tableData.value" alt="img">
      </div>
    </template>
    <div class="td" v-if="tableData.type === 'color'">
        <ColorfulCircle :size="30" :lineWidth="50" :responsive="false" :bgColor="tableData.value" :roundedStroke="false" :showPercentage="false" :showPercentageSymbol="false"/>
    </div>
    <div class="td" v-if="tableData.type === 'visitors'">
      <div class="">
          <i class="material-icons" style="color: #ff937d;">visibility</i> <span class="u-text-12" style="font-weight: bold;">{{tableData.value}}</span>
      </div>
    </div>
    <div class="td" v-if="tableData.type === 'tags'">
      <div class="">
          <div class="multiselect__tags" style="border: 0px;">
              <span v-for="tag in tableData.value" :key="tag.id" class="multiselect__tag">
                  <span>{{tag.label}}</span>
              </span>
          </div>
      </div>
    </div>
    <div class="td" v-if="tableData.type === 'string'">
      <div class="u-text-12">{{tableData.value}}</div>
    </div>
    <div class="td" v-if="tableData.type === 'date'">
      <div class="u-text-12">{{formatDate(tableData.value, tableData.format)}}</div>
    </div>
  </div>
</template>

<script>
    import ColorfulCircle from 'vue-colorful-circle';

    export default {
        name: "app-table-data",
        props: {
            tableData: Object
        },
        components: {
            ColorfulCircle
        },
        methods: {
            formatDate(date, dateFormat) {
                return this.$moment(date).format(dateFormat)
            }
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
<style scoped>

</style>
