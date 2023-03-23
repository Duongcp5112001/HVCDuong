<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" size="large" @close-dialog="onCloseDialog">
    <template #header>
      <Text size="xl" bold>部屋リクエスト</Text>
    </template>
    <template #table>
      <Table
        class="table util-mt-16 util-mb-8"
        :hover-effect="false"
        :fixed-layout="true"
      >
        <template #head>
          <TableRow id="row-1">
            <TableColumn id="col-1" width="239px">施設</TableColumn>
            <TableColumn id="col-2" width="200px"> 部屋番号指定 </TableColumn>
            <TableColumn id="col-3" width="200px"> 部屋タイプ希望 </TableColumn>
            <TableColumn id="col-4" width="200px">部屋リクエスト</TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow id="row-2">
            <TableCell>浜名湖</TableCell>
            <TableCell wrap>101, 201, 301</TableCell>
            <TableCell wrap> ND 禁煙洋室, NB1 禁煙和洋室, PD ペット </TableCell>
            <TableCell>山側, エレベータ近く</TableCell>
          </TableRow>
          <TableRow id="row-3">
            <TableCell>京都鷹峯</TableCell>
            <TableCell wrap>101</TableCell>
            <TableCell wrap>AP ペット洋室</TableCell>
            <TableCell>エレベータ近く</TableCell>
          </TableRow>
          <TableRow id="row-4">
            <TableCell>勝浦</TableCell>
            <TableCell wrap>-</TableCell>
            <TableCell wrap>-</TableCell>
            <TableCell>エレベータ近く</TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Button from '../components/Button/Button.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';

const open = ref(true);

const onCloseDialog = () => {
  open.value = false;
};
</script>

<style scoped lang="scss">
@import '../scss/variables';
.table :deep(tbody .table__cell) {
  color: $color-content-text--main;
  line-height: 170%;
  padding: 2px 8px;
}
</style>
