<template>
  <ul class="pagination">
    <li :class="['pagination__item', pageNumber <= 1 ? 'disabled': '' ]"
        @click="changePageNumber(pageNumber - 1)">
          <span><i class="material-icons">chevron_left</i></span>
    </li>
    <li class="pagination__item " v-for="index in numberPages" :key="'pagination-item-' + index">
      <span :class="{active: index === pageNumber }" @click="changePageNumber(index)">{{index}}</span>
    </li>
    <li :class="['pagination__item', pageNumber >= numberPages ? 'disabled': '' ]" @click="changePageNumber(pageNumber + 1)">
      <span><i class="material-icons">chevron_right</i></span>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "app-pagination",
        props: {
            pagination: {
                total: Number,
                per_page: Number,
                page: Number
            }
        },
        data() {
            return {
                pageNumber: Number(this.$route.query.page) || 1
            }
        },
        computed: {
          numberPages() {
              return Math.ceil(this.pagination.total / this.pagination.per_page)
          }
        },
        methods: {
            changePageNumber(newPageNumber) {
              this.pageNumber = newPageNumber;
              this.$router.push({path: this.$route.path, query: { page: newPageNumber }})
            }
        }

    }
</script>

<style scoped lang="scss">
  .active {
    background-color: #FFFFFF !important;
    border-color: #FFFFFF !important;
    box-shadow: 0 4px 5px 0 rgba(85, 85, 85, 0.14), 0 1px 10px 0 rgba(85, 85, 85, 0.12), 0 2px 4px -1px rgba(85, 85, 85, 0.2);
    color: inherit;
    pointer-events: none;
  }


  .pagination__item {
    cursor: pointer;
  }

  .disabled {
    pointer-events: none;
    opacity: .6;
  }
</style>