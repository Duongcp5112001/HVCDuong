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
      <ToggleButton
        id="content-1"
        custom-icon="tickets"
        :counter="totalSelected()"
      >
        利用券
      </ToggleButton>
      <ToggleButton id="content-2" custom-icon="ticket_in">
        譲渡利用券
      </ToggleButton>
    </ToggleButtonSet>
    <template #table>
      <Table width="100%">
        <template #head>
          <TableRow id="head-row-1">
            <TableColumn
              id="col-1"
              rowspan="2"
              width="64px"
              text-align="center"
            >
              代表
            </TableColumn>
            <TableColumn id="col-2" rowspan="2" min-width="105px">
              代表会員権番号
            </TableColumn>
            <TableColumn id="col-3" rowspan="2" min-width="153px">
              ホーム施設
            </TableColumn>
            <TableColumn id="col-4" rowspan="2" min-width="128px">
              有効期限
            </TableColumn>
            <TableColumn
              id="col-5"
              colspan="2"
              min-width="120px"
              text-align="center"
              height="24px"
            >
              使用可能数
            </TableColumn>
            <TableColumn
              id="col-6"
              rowspan="2"
              min-width="72px"
              text-align="center"
            >
              残数合計
            </TableColumn>
            <TableColumn
              id="col-7"
              colspan="2"
              min-width="200px"
              text-align="center"
              height="24px"
            >
              今回利用数
            </TableColumn>
          </TableRow>
          <TableRow id="head-row-2">
            <TableColumn
              id="col-7"
              text-align="center"
              height="24px"
              width="60px"
            >
              ホーム
            </TableColumn>
            <TableColumn
              id="col-7"
              text-align="center"
              height="24px"
              width="60px"
            >
              相互
            </TableColumn>
            <TableColumn
              id="col-7"
              text-align="center"
              height="24px"
              width="100px"
            >
              ホーム
            </TableColumn>
            <TableColumn
              id="col-7"
              text-align="center"
              height="24px"
              width="100px"
            >
              相互
            </TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow id="row-1">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-1')"
                name="hotel-selection"
                @input="onSelectRow('row-1')"
              />
            </TableCell>
            <TableCell>GD0001</TableCell>
            <TableCell>裏磐梯グランデコ</TableCell>
            <TableCell>2022/12/31</TableCell>
            <TableCell text-align="right">44</TableCell>
            <TableCell text-align="right">40</TableCell>
            <TableCell text-align="right">84</TableCell>
            <TableCell>
              <Dropdown
                v-model:value="currentNumericDropdownSelection1A"
                placeholder="0"
                size="small"
                width="85px"
              >
                <DropdownItem
                  v-for="(option, i) in numericDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
            <TableCell>
              <Dropdown
                v-model:value="currentNumericDropdownSelection1B"
                placeholder="0"
                size="small"
                width="85px"
              >
                <DropdownItem
                  v-for="(option, i) in numericDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
          </TableRow>
          <TableRow id="row-2">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-1')"
                name="hotel-selection"
                @input="onSelectRow('row-1')"
              />
            </TableCell>
            <TableCell>NU0001</TableCell>
            <TableCell>那須</TableCell>
            <TableCell>2022/09/30</TableCell>
            <TableCell text-align="right">20</TableCell>
            <TableCell text-align="right">20</TableCell>
            <TableCell text-align="right">40</TableCell>
            <TableCell>
              <Dropdown
                v-model:value="currentNumericDropdownSelection2A"
                placeholder="0"
                size="small"
                width="85px"
              >
                <DropdownItem
                  v-for="(option, i) in numericDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
            <TableCell>
              <Dropdown
                v-model:value="currentNumericDropdownSelection2B"
                placeholder="0"
                size="small"
                width="85px"
              >
                <DropdownItem
                  v-for="(option, i) in numericDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <span class="util-flex util-flex--align-center util-flex--gap16">
        <Text bold size="2xs" color="light">合計設定枚数</Text>
        <Text bold size="large">{{ totalSelected() }}</Text>
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
import RadioButton from '../components/RadioButton/RadioButton.vue';
import Dropdown from '../components/Dropdown/Dropdown.vue';
import DropdownItem from '../components/Dropdown/DropdownItem.vue';

const open = ref(true);

const selectedToggleButtonId = ref('content-1');

const currentNumericDropdownSelection1A = ref('2');
const currentNumericDropdownSelection1B = ref('0');
const currentNumericDropdownSelection2A = ref('0');
const currentNumericDropdownSelection2B = ref('3');

const totalSelected = () => {
  return (
    parseInt(currentNumericDropdownSelection1A.value) +
    parseInt(currentNumericDropdownSelection1B.value) +
    parseInt(currentNumericDropdownSelection2A.value) +
    parseInt(currentNumericDropdownSelection2B.value)
  );
};

const numericDropdownOptions = [
  {
    label: '0',
    value: '0',
  },
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];

const selectedRow = ref(['row-1']);
const onSelectRow = (rowId: string) => {
  console.log('onSelectRow', rowId);
  switch (rowId) {
    case 'row-1':
      selectedRow.value = ['row-1'];
      break;
    case 'row-2':
      selectedRow.value = ['row-2'];
      break;
    default:
      selectedRow.value = [];
      break;
  }
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
