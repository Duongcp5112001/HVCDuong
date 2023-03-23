<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" size="large" @close-dialog="onCloseDialog">
    <template #header>
      <Text size="xl" bold>在庫数設定</Text>
    </template>
    <div class="util-flex util-flex--justify-between util-full-width">
      <Text bold> 裏磐梯グランデコ </Text>
    </div>
    <template #table>
      <Table :hover-effect="false" :fixed-layout="true">
        <template #head>
          <TableRow id="row-1">
            <TableColumn id="col-1" width="200px">ブロック</TableColumn>
            <TableColumn id="col-2" width="200px">部屋タイプ</TableColumn>
            <TableColumn id="col-3" width="75px">設定数</TableColumn>
            <TableColumn id="col-4" width="170px">開始日</TableColumn>
            <TableColumn id="col-5" width="170px">終了日</TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow
            v-for="item in blockData.items"
            :id="`${item.id}`"
            :key="`${item.id}`"
          >
            <TableCell> {{ blockData.label }} </TableCell>
            <TableCell>{{ item.label }}</TableCell>
            <TableCell>
              <TextField v-model="item.setCount" input-type="number" />
            </TableCell>
            <TableCell>
              <DatePicker
                size="small"
                width="100%"
                :date="item.startDate"
                @change-date="(date: Date) => { item.startDate = date }"
              />
            </TableCell>
            <TableCell>
              <DatePicker
                size="small"
                width="100%"
                :date="item.endDate"
                @change-date="(date: Date) => { item.endDate = date }"
              />
            </TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <Button size="large" width="160px" @click="onClickRegister">登録</Button>
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
import TextField from '../components/TextField/TextField.vue';
import DatePicker from '../components/DatePicker/DatePicker.vue';

const open = ref(true);

const onCloseDialog = () => {
  console.log('onCloseDialog???', open.value);
  open.value = false;
};

const blockData = ref({
  label: '相互',
  items: [
    {
      label: 'SD2',
      id: 'item-1',
      setCount: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      label: 'SE3',
      id: 'item-2',
      setCount: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      label: 'SU',
      id: 'item-3',
      setCount: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      label: 'ND1',
      id: 'item-4',
      setCount: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      label: 'NA',
      id: 'item-5',
      setCount: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      label: 'ND3',
      id: 'item-6',
      setCount: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      label: 'ND4',
      id: 'item-7',
      setCount: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      label: 'NB',
      id: 'item-8',
      setCount: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      label: 'NJS',
      id: 'item-9',
      setCount: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      label: 'NE2',
      id: 'item-10',
      setCount: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      label: 'NE4',
      id: 'item-11',
      setCount: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      label: 'NE5',
      id: 'item-12',
      setCount: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
  ],
});

const onClickRegister = () => {
  console.log(blockData.value);
};
</script>

<style scoped lang="scss"></style>
