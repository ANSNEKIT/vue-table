<template>
  <div class="container with-nav">
    <Table :columns="columns" :rows="rows">
      <template #name="{ value }">
        <a href="#!">{{ value }}</a>
      </template>
    </Table>
  </div>
</template>

<script>
/**
 * Нужно реализовать компонент таблицы со следующим функционалом
 * + Строки формируются на основе коллекции data
 * + Колонки формируются на основе коллекции columns
 * + Каждая ячейка в колонке ссылается на значение объекта data с ключом field из columns (пример: field: "id" => data["id"] )
 * + Каждая колонка может иметь сортировку и фильтрацию по значениям (hasSort, hasFilter)
 * - Каждая ячейка в колонке может быть кастомизирована с помощью слотов, когда название слота соответствует значению field из columns 
 * - В слот ячейки передается значение ячейки
 * 
 * Не стоит уделять большое значение стилям верстки, так как важна именно сама реализация формирования таблицы
 */
import Table from '@/components/app-table'

export default {
  components: {
    Table,
  },
  data() {
    return {
      columns: [
        { 
          field: "id",
          title: "ID",
          hasSort: true
        },
        { 
          field: "name",
          title: "Имя",
          hasFilter: true
        },
        { 
          field: "birthday",
          title: "Дата рождения",
        },
      ],
      rows: [
        { id: 1, name: "Василий", birthday: "2020-01-01" },
        { id: 2, name: "Семен", birthday: "2012-01-01" },
        { id: 3, name: "Степан", birthday: "2024-01-01" },
        { id: 4, name: "Борис", birthday: "2002-01-01" },
      ]
    }
  },

}
</script>
