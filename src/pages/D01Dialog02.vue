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
            <TableCell>
              {{ blockData.label }}
            </TableCell>
            <TableCell>
              <Dropdown
                v-model:value="selectedRoomType"
                size="small"
                width="100%"
                placeholder="部屋タイプ選択"
              >
                <DropdownItem
                  v-for="(option, i) in roomTypeOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
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
      <Button class="util-mt-12" type="outlined" icon="add" @click="onClickAdd">
        追加
      </Button>
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
import Dropdown from '../components/Dropdown/Dropdown.vue';
import DropdownItem from '../components/Dropdown/DropdownItem.vue';

const open = ref(true);

const onCloseDialog = () => {
  open.value = false;
};

const roomTypeOptions = [
  { label: 'SD2', value: '0' },
  { label: 'SE3', value: '1' },
  { label: 'SU', value: '2' },
  { label: 'ND1', value: '3' },
  { label: 'NA', value: '4' },
  { label: 'ND3', value: '5' },
  { label: 'ND4', value: '6' },
  { label: 'NB', value: '7' },
  { label: 'NJS', value: '8' },
  { label: 'NE2', value: '9' },
  { label: 'NE4', value: '10' },
  { label: 'NE5', value: '11' },
];

const selectedRoomType = ref('');

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
  ],
});

const onClickAdd = () => {
  console.log('add');
};

const onClickRegister = () => {
  console.log(blockData.value);
};
</script>

<style scoped lang="scss"></style>
