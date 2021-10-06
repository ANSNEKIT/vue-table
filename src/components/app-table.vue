<template>
  <div class="card center">
    <table class="table">
      <thead>
        <tr>
          <th 
            v-for="cell in columns" 
            :key="cell.field" 
            :class="{'table__th-with-sort': cell.hasSort}" 
            @click="sortById" >
              {{ cell.title }}
              <ArrowsSvg v-if="cell.hasSort"/>
              <input 
                class="table__filter-field"
                type="text"
                v-if="cell.hasFilter"
                v-model="filterField"
                @input="filterByName"
              >
          </th>
        </tr>
      </thead>
      
      <tbody>
        <template v-for="row in getModifiedRows" :key="row.id">
          <tr>
            <td v-for="(cell, key, idx) in row" :key="cell.id"> 
              <slot :name="columns[idx].field" :value="cell">
                {{cell}}
              </slot>
            </td>
          </tr>
        </template>
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

