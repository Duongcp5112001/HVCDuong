<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog
    :open="open"
    size="large"
    custom-height="760px"
    @close-dialog="onCloseDialog"
  >
    <template #header>
      <Text size="xl" bold> 使用利用券設定 </Text>
    </template>
    <span class="util-flex util-flex--gap16 util-mb-16">
      <Text bold size="2xs" color="light">利用施設</Text>
      <Text class="util-mr-8" bold size="large">裏磐梯グランデコ</Text>
      <Text bold size="2xs" color="light">利用開始日</Text>
      <Text bold size="large">2022年10月2日(月)</Text>
      <Text bold size="2xs" color="light">泊数</Text>
      <Text class="util-mr-8" bold size="large">1泊</Text>
      <Text bold size="2xs" color="light">部屋数</Text>
      <Text bold size="large">2部屋</Text>
    </span>
    <ToggleButtonSet
      class="util-mb-16"
      :selected-id="selectedToggleButtonId"
      width="291px"
      type="outlined"
      @click-item="onClickToggleButton"
    >
      <ToggleButton id="content-1" custom-icon="tickets">利用券</ToggleButton>
      <ToggleButton
        id="content-2"
        custom-icon="ticket_in"
        :counter="totalCheckedRows()"
      >
        譲渡利用券
      </ToggleButton>
    </ToggleButtonSet>
    <template #table>
      <Table width="100%">
        <template #head>
          <TableRow id="head-row-1">
            <TableColumn id="col-2" width="56px" text-align="center">
              <Checkbox
                :checked="getAllIsChecked()"
                :indeterminate="getAllIsIndeterminate()"
                @input="onCheckAll()"
              />
            </TableColumn>
            <TableColumn id="col-3" min-width="105px">
              代表会員権番号
            </TableColumn>
            <TableColumn id="col-4" min-width="154px"> ホーム施設 </TableColumn>
            <TableColumn id="col-5" min-width="65px"> 枝番 </TableColumn>
            <TableColumn id="col-6" min-width="79px"> パスコード </TableColumn>
            <TableColumn id="col-7" min-width="132px"> 年度 </TableColumn>
            <TableColumn id="col-8" min-width="132px"> 有効期限 </TableColumn>
            <TableColumn id="col-9" min-width="120px">
              ホーム／相互
            </TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow v-for="row in rowsData" :id="row.id" :key="row.id">
            <TableCell text-align="center">
              <Checkbox :checked="row.checked" @input="onCheckRow(row.id)" />
            </TableCell>
            <TableCell>{{ row.representativeMemberNumber }}</TableCell>
            <TableCell>{{ row.homeFacility }}</TableCell>
            <TableCell>{{ row.branchNumber }}</TableCell>
            <TableCell>{{ row.passcode }}</TableCell>
            <TableCell>{{ row.fiscalYear }}</TableCell>
            <TableCell>{{ row.expirationDate }}</TableCell>
            <TableCell>{{ row.homeOrMutual }}</TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <span class="util-flex util-flex--align-center util-flex--gap16">
        <Text bold size="2xs" color="light">合計設定枚数</Text>
        <Text bold size="large">{{ totalCheckedRows() }}</Text>
        <Button
          size="large"
          color="neutral"
          width="240px"
          @click="onClickMakeReservation"
        >
          残室確認／詳細設定予約
        </Button>
        <Button size="large" width="200px" @click="onClickMakeQuickReservation">
          クイック予約
        </Button>
      </span>
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
import ToggleButtonSet from '../components/ToggleButton/ToggleButtonSet.vue';
import ToggleButton from '../components/ToggleButton/ToggleButton.vue';
import Checkbox from '../components/Checkbox/Checkbox.vue';

const open = ref(true);

const selectedToggleButtonId = ref('content-2');

const rowsData = ref([
  {
    id: 'row-1',
    checked: false,
    representativeMemberNumber: 'NU0001',
    homeFacility: '那須',
    branchNumber: 'xxxx',
    passcode: 'xxx',
    fiscalYear: '2021年(前年)',
    expirationDate: '2022/12/31',
    homeOrMutual: 'ホーム',
  },
  {
    id: 'row-2',
    checked: false,
    representativeMemberNumber: 'KA0001',
    homeFacility: '勝浦',
    branchNumber: 'xxxx',
    passcode: 'xxx',
    fiscalYear: '2021年(前年)',
    expirationDate: '2022/12/31',
    homeOrMutual: 'ホーム',
  },
  {
    id: 'row-3',
    checked: false,
    representativeMemberNumber: 'AT0001',
    homeFacility: '裏磐梯グランデコ',
    branchNumber: 'xxxx',
    passcode: 'xxx',
    fiscalYear: '2022年(本年)',
    expirationDate: '2022/12/31',
    homeOrMutual: '相互',
  },
  {
    id: 'row-4',
    checked: false,
    representativeMemberNumber: 'NN0001',
    homeFacility: '裏磐梯グランデコ',
    branchNumber: 'xxxx',
    passcode: 'xxx',
    fiscalYear: '2022年(本年)',
    expirationDate: '2022/12/13',
    homeOrMutual: 'ホーム',
  },
  {
    id: 'row-5',
    checked: false,
    representativeMemberNumber: 'NN0002',
    homeFacility: '裏磐梯グランデコ',
    branchNumber: 'xxxx',
    passcode: 'xxx',
    fiscalYear: '2022年(本年)',
    expirationDate: '2022/12/31',
    homeOrMutual: '相互',
  },
]);

const totalCheckedRows = () => {
  return rowsData.value.filter((row) => row.checked).length;
};

const onCheckRow = (id: string) => {
  const row = rowsData.value.find((row) => row.id === id);
  if (row) {
    row.checked = !row.checked;
  }
};

const getAllIsChecked = () => {
  return (
    rowsData.value.filter((options) => options.checked === true).length ===
    rowsData.value.length
  );
};

const getAllIsIndeterminate = () => {
  const checkedOptions = rowsData.value.filter((row) => row.checked);
  return (
    checkedOptions.length > 0 && checkedOptions.length < rowsData.value.length
  );
};

const onCheckAll = () => {
  const isChecked = getAllIsChecked();
  rowsData.value.forEach((row) => {
    row.checked = !isChecked;
  });
};

const onClickToggleButton = (id: string) => {
  console.log('clicked toggle button: ', id);
  selectedToggleButtonId.value = id;
};

const onCloseDialog = () => {
  open.value = false;
};

const onClickMakeReservation = () => {
  console.log('onClickMakeReservation');
};

const onClickMakeQuickReservation = () => {
  console.log('onClickMakeQuickReservation');
};
</script>

<style scoped lang="scss"></style>
