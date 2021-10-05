<template>
  <div class="card center">
    <table class="table">
      <thead>
        <tr>
          <th 
            v-for="col in columns" 
            :key="col.field" 
            :class="{'table__th-with-sort': col.hasSort}" 
            @click="sortById" >
              {{ col.title }}
              <ArrowsSvg v-if="col.hasSort"/>
              <input 
                class="table__filter-field"
                type="text"
                v-if="col.hasFilter"
                v-model="filterField"
                @input="filterByName"
              >
          </th>
        </tr>
      </thead>
      
      <tbody>
        <tr v-for="row in getModifiedRows" :key="row.id">
          <td 
            v-for="(col, key, idx) in row"
            :key="col.id"
            :columnsField="columns[idx].field" >
            {{col}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ArrowsSvg from '@/svg/arrows'

export default {
  components: {
    ArrowsSvg,
  },

  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      modifiedRows: [],
      sortType: null,
      filterField: '',
    }
  },

  computed: {
    getModifiedRows() {
      if (this.modifiedRows.length === 0) {
        return this.rows;
      }
      return this.modifiedRows;
    },
  },

  methods: {
    sortById(evt) {
      if (evt.target.className === 'table__th-with-sort') {
        if (this.sortType === null || this.sortType !== 'by-descending') {
          this.modifiedRows = [...this.rows].sort((a, b) => b.id - a.id);
          this.sortType = 'by-descending'; 
        } else {
          this.modifiedRows = [...this.rows].sort((a, b) => a.id - b.id);
          this.sortType = 'by-ascending';
        }
      }
    },

    filterByName() {
      this.modifiedRows = [...this.rows].filter((el) => el.name.includes(this.filterField));
    },
  }

}
</script>

<style scoped>
.table__th-with-sort {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    margin-top: 10px;
}

.table__th-with-sort:hover {
  cursor: pointer;
}

.table__filter-field {
  display: block;
  max-width: 100px;
  margin: 0 auto;
}
</style>

