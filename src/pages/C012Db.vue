<template>
  <div class="lay-container lay-container--3panes">
    <the-sidebar/>
    <main class="lay-main">
      <div class="lay-main__container">
        <Tabs :selected-index="selectedTab" @change="onChangeTab">
          <Tab>予約</Tab>
          <Tab>利用券指定予約</Tab>
          <Tab>ビジター予約</Tab>
          <Tab>法人代行予約</Tab>
        </Tabs>
        <Panel v-if="selectedTab === 1" color="dark">
          <div
            class="
              util-flex util-flex--gap8 util-flex--align-end util-flex--wrap
            "
          >
            <FieldContainer label="代表会員権番号" width="88px">
              <TextField v-model="telephone" />
            </FieldContainer>
            <Button color="neutral" @click="onClickShowTickets">
              利用券表示
            </Button>
          </div>
        </Panel>
        <span class="util-flex util-flex--gap8">
          <ComboBox
            v-model:value="currentTextDropdownSelection1"
            placeholder=""
            size="small"
            width="121px"
            :search-icon="false"
          >
            <ComboBoxItem
              v-for="(option, i) in textDropdownOptions"
              :key="i"
              :label="option.label"
              :value="option.value"
            >
            </ComboBoxItem>
          </ComboBox>
          <TextField
            v-model="searchField"
            icon="search"
            placeholder="枝番検索"
          />
          <Checkbox
            v-model:checked="includeFinishedReservations"
            class="util-py-4 util-px-4"
            label="予約済みを含む"
          />
        </span>
        <Table width="100%" :disabled-rows-ids="disabledRowsIds">
          <template #head>
            <TableRow id="head-row-1">
              <TableColumn id="col-1" min-width="43px" width="43px">
                選択
              </TableColumn>
              <TableColumn
                id="col-2"
                min-width="75px"
                width="75px"
                can-sort
                :sorted-direction="branchSort"
                @click-sort="onBranchSort"
              >
                枝番
              </TableColumn>
              <TableColumn id="col-3" min-width="80px" width="80px">
                パスコード
              </TableColumn>
              <TableColumn id="col-4" min-width="144px" width="144px">
                ステータス
              </TableColumn>
              <TableColumn id="col-5" min-width="75px" width="75px">
                タイプ
              </TableColumn>
              <TableColumn
                id="col-6"
                min-width="101px"
                width="101px"
                can-sort
                :sorted-direction="yearSort"
                @click-sort="onYearSort"
              >
                年度
              </TableColumn>
              <TableColumn id="col-7" min-width="119px" width="119px">
                有効期限
              </TableColumn>
              <TableColumn id="col-8" min-width="90px" width="90px">
                ホーム／相互
              </TableColumn>
              <TableColumn id="col-9" min-width="144px">
                譲渡先会員名
              </TableColumn>
            </TableRow>
          </template>
          <template #body>
            <template
              v-for="disclosureRow in tableRows"
              :key="disclosureRow.id"
            >
              <TableRow :id="disclosureRow.disclosureId">
                <TableCell colspan="9" slot-color="gray">
                  <span class="util-flex util-flex--justify-between">
                    <span
                      class="util-flex util-flex--align-center util-flex--gap16"
                    >
                      <Button
                        :icon="
                          disclosureRow.open
                            ? 'keyboard_arrow_up'
                            : 'keyboard_arrow_down'
                        "
                        size="small"
                        color="neutral"
                        type="text"
                        @click="onClickDisclosure(disclosureRow.disclosureId)"
                      ></Button>
                      <RadioButton
                        :checked="false"
                        name="table-row-disclosures"
                        label="代表"
                        class="util-mr-8"
                      />
                      <Text color="light" size="2xs"> 会員権番号 </Text>
                      <Text bold class="util-mr-8">
                        NC1234 那須リトリート
                      </Text>
                      <Text color="light" size="2xs"> 譲渡元会員名 </Text>
                      <Text bold> タナカイチロウ </Text>
                    </span>
                    <Button
                      icon="close"
                      size="small"
                      color="neutral"
                      type="text"
                      @click="onCloseDisclosureRow(disclosureRow.disclosureId)"
                    ></Button>
                  </span>
                </TableCell>
              </TableRow>
              <template v-if="disclosureRow.open">
                <TableRow
                  v-for="row in disclosureRow.rows"
                  :id="row.id"
                  :key="row.id"
                >
                  <TableCell text-align="center">
                    <Checkbox
                      :checked="row.checked"
                      :disabled="getIsRowDisabled(row.id)"
                      @input="onCheckRow(disclosureRow.disclosureId, row.id)"
                    />
                  </TableCell>
                  <TableCell>{{ row.branchNumber }}</TableCell>
                  <TableCell>{{ row.passcode }}</TableCell>
                  <TableCell>
                    <Badge
                      size="small"
                      type="outlined"
                      width="100%"
                      :color="row.statusColor"
                      :custom-icon="row.statusIcon"
                    >
                      {{ row.status }}
                    </Badge>
                  </TableCell>
                  <TableCell>{{ row.type }}</TableCell>
                  <TableCell>{{ row.year }}</TableCell>
                  <TableCell>{{ row.expirationDate }}</TableCell>
                  <TableCell>{{ row.homeOrMutual }}</TableCell>
                  <TableCell>{{ row.memberName }}</TableCell>
                </TableRow>
              </template>
            </template>
          </template>
        </Table>
      </div>
      <ContentFooter>
        <template #footerCenter>
          <span
            class="
              util-flex util-full-width
              util-flex--column util-flex--wrap util-flex--gap16
            "
          >
            <span
              class="
                util-flex
                util-flex--align-center
                util-flex--wrap
                util-flex--gap16
              "
            >
              <FieldContainer label="宿泊施設" width="416px" required>
                <ComboBox
                  v-model:value="facilitiesSelection"
                  width="416px"
                  size="small"
                  :search-icon="false"
                >
                  <ComboBoxItem
                    v-for="(option, i) in facilitiesOptions"
                    :key="i"
                    :label="option.label"
                    :value="option.value"
                  >
                  </ComboBoxItem>
                </ComboBox>
              </FieldContainer>
              <FieldContainer label="部屋タイプ" width="272px">
                <ComboBox
                  v-model:value="currentTextDropdownSelection3"
                  placeholder=""
                  size="small"
                  width="272px"
                  disabled
                  :search-icon="false"
                >
                  <ComboBoxItem
                    v-for="(option, i) in textDropdownOptions"
                    :key="i"
                    :label="option.label"
                    :value="option.value"
                    width="272px"
                  >
                  </ComboBoxItem>
                </ComboBox>
              </FieldContainer>
              <FieldContainer label="宿泊日" required width="128px">
                <DatePicker
                  size="small"
                  width="128px"
                  :date="selectedDate"
                  @change-date="onChangeDate"
                />
              </FieldContainer>
              <span class="util-flex util-flex--align-end">
                <FieldContainer label="泊数" width="68px" required>
                  <TextField
                    v-model="currentNumericInput1"
                    input-type="number"
                    placeholder="0"
                    width="68px"
                    @input="
                      if ($event !== undefined) currentNumericInput1 = $event;
                    "
                  />
                </FieldContainer>
                <Text class="util-ml-4" color="light" bold size="2xs">
                  泊
                </Text>
              </span>
              <span class="util-flex util-flex--align-end">
                <FieldContainer label="部屋数" width="68px" required>
                  <TextField
                    v-model="currentNumericInput2"
                    input-type="number"
                    placeholder="0"
                    width="68px"
                    @input="
                      if ($event !== undefined) currentNumericInput2 = $event;
                    "
                  />
                </FieldContainer>
                <Text class="util-ml-4" color="light" bold size="2xs">
                  室
                </Text>
              </span>
              <span class="util-flex util-flex--align-center util-flex--gap16">
                <Text color="light" size="2xs"> 一部屋あたり </Text>
                <span class="util-flex util-flex--align-end">
                  <FieldContainer label="大人" width="68px" required>
                    <TextField
                      v-model="currentNumericInput3"
                      input-type="number"
                      placeholder="0"
                      width="68px"
                      @input="
                        if ($event !== undefined) currentNumericInput3 = $event;
                      "
                    />
                  </FieldContainer>
                  <Text class="util-ml-4" color="light" bold size="2xs">
                    人
                  </Text>
                </span>
                <span class="util-flex util-flex--align-end">
                  <FieldContainer label="中人" width="68px">
                    <TextField
                      v-model="currentNumericInput4"
                      input-type="number"
                      placeholder="0"
                      width="68px"
                      @input="
                        if ($event !== undefined) currentNumericInput4 = $event;
                      "
                    />
                  </FieldContainer>
                  <Text class="util-ml-4" color="light" bold size="2xs">
                    人
                  </Text>
                </span>
                <span class="util-flex util-flex--align-end">
                  <FieldContainer label="小人" width="68px">
                    <TextField
                      v-model="currentNumericInput5"
                      input-type="number"
                      placeholder="0"
                      width="68px"
                      @input="
                        if ($event !== undefined) currentNumericInput5 = $event;
                      "
                    />
                  </FieldContainer>
                  <Text class="util-ml-4" color="light" bold size="2xs">
                    人
                  </Text>
                </span>
                <span class="util-flex util-flex--align-end">
                  <FieldContainer label="幼児" width="68px">
                    <TextField
                      v-model="currentNumericInput6"
                      input-type="number"
                      placeholder="0"
                      width="68px"
                      @input="
                        if ($event !== undefined) currentNumericInput6 = $event;
                      "
                    />
                  </FieldContainer>
                  <Text class="util-ml-4" color="light" bold size="2xs">
                    人
                  </Text>
                </span>
              </span>
            </span>
            <span class="util-flex util-flex--justify-end util-flex--gap16">
              <Button
                color="neutral"
                width="240px"
                size="large"
                @click="onClickShowTickets"
              >
                残室確認／詳細設定予約
              </Button>
              <Button
                color="neutral"
                width="240px"
                size="large"
                disabled
                @click="onClickShowTickets"
              >
                クイック予約
              </Button>
            </span>
          </span>
        </template>
      </ContentFooter>
    </main>
  </div>
</template>

<script setup lang="ts">
import Badge from '../components/Badge/Badge.vue';
import Button from '../components/Button/Button.vue';
import TextField from '../components/TextField/TextField.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import Tabs from '../components/Tabs/Tabs.vue';
import Tab from '../components/Tabs/Tab.vue';
import { ref } from 'vue';
import Panel from '../components/Panel/Panel.vue';
import Checkbox from '../components/Checkbox/Checkbox.vue';
import DatePicker from '../components/DatePicker/DatePicker.vue';
import Text from '../components/Text/Text.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import RadioButton from '../components/RadioButton/RadioButton.vue';
import ComboBox from '../components/ComboBox/ComboBox.vue';
import ComboBoxItem from '../components/ComboBox/ComboBoxItem.vue';
import ContentFooter from '../components/ContentFooter/ContentFooter.vue';
import TheSidebar from "@/containers/TheSidebar.vue";

const telephone = ref('');
const selectedTab = ref(1);

const searchField = ref('');
const includeFinishedReservations = ref(true);

const selectedDate = ref(new Date());

const disabledRowsIds = [
  'row-1-4',
  'row-1-5',
  'row-1-6',
  'row-2-4',
  'row-2-5',
  'row-2-6',
  'row-3-4',
  'row-3-5',
  'row-3-6',
];

const getIsRowDisabled = (rowId: string) => {
  return disabledRowsIds.includes(rowId);
};

const tableRows = ref([
  {
    disclosureId: 'row-disclosure-1',
    open: true,
    rows: [
      {
        id: 'row-1-1',
        checked: false,
        branchNumber: '30',
        passcode: '123',
        status: '未使用発券済',
        statusColor: 'warning' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_out',
        type: '利用券',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: '相互',
        memberName: '-',
      },
      {
        id: 'row-1-2',
        checked: false,
        branchNumber: '2',
        passcode: '124',
        status: '未使用発行済',
        statusColor: 'information' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_out',
        type: 'オンライン',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: 'タナカジロウ',
      },
      {
        id: 'row-1-3',
        checked: false,
        branchNumber: '3',
        passcode: '125',
        status: '未使用発券済',
        statusColor: 'warning' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_out',
        type: '利用券',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: '-',
      },
      {
        id: 'row-1-4',
        checked: false,
        branchNumber: '4',
        passcode: '123',
        status: '宿泊済',
        statusColor: 'neutral' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_not_available',
        type: '-',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: 'タナカハナコ',
      },
      {
        id: 'row-1-5',
        checked: false,
        branchNumber: '5',
        passcode: '124',
        status: '宿泊済',
        statusColor: 'neutral' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_not_available',
        type: '-',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: '-',
      },
      {
        id: 'row-1-6',
        checked: false,
        branchNumber: '6',
        passcode: '125',
        status: '予約済発券済',
        statusColor: 'neutral' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_not_available',
        type: '利用券',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: 'タナカハナコ',
      },
    ],
  },
  {
    disclosureId: 'row-disclosure-2',
    open: true,
    rows: [
      {
        id: 'row-2-1',
        checked: false,
        branchNumber: '30',
        passcode: '123',
        status: '未使用発券済',
        statusColor: 'warning' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_out',
        type: '利用券',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: '相互',
        memberName: '-',
      },
      {
        id: 'row-2-2',
        checked: false,
        branchNumber: '2',
        passcode: '124',
        status: '未使用発行済',
        statusColor: 'information' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_out',
        type: 'オンライン',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: 'タナカジロウ',
      },
      {
        id: 'row-2-3',
        checked: false,
        branchNumber: '3',
        passcode: '125',
        status: '未使用発券済',
        statusColor: 'warning' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_out',
        type: '利用券',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: '-',
      },
      {
        id: 'row-2-4',
        checked: false,
        branchNumber: '4',
        passcode: '123',
        status: '宿泊済',
        statusColor: 'neutral' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_not_available',
        type: '-',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: 'タナカハナコ',
      },
      {
        id: 'row-2-5',
        checked: false,
        branchNumber: '5',
        passcode: '124',
        status: '宿泊済',
        statusColor: 'neutral' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_not_available',
        type: '-',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: '-',
      },
      {
        id: 'row-2-6',
        checked: false,
        branchNumber: '6',
        passcode: '125',
        status: '予約済発券済',
        statusColor: 'neutral' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_not_available',
        type: '利用券',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: 'タナカハナコ',
      },
    ],
  },
  {
    disclosureId: 'row-disclosure-3',
    open: true,
    rows: [
      {
        id: 'row-3-1',
        checked: false,
        branchNumber: '30',
        passcode: '123',
        status: '未使用発券済',
        statusColor: 'warning' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_out',
        type: '利用券',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: '相互',
        memberName: '-',
      },
      {
        id: 'row-3-2',
        checked: false,
        branchNumber: '2',
        passcode: '124',
        status: '未使用発行済',
        statusColor: 'information' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_out',
        type: 'オンライン',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: 'タナカジロウ',
      },
      {
        id: 'row-3-3',
        checked: false,
        branchNumber: '3',
        passcode: '125',
        status: '未使用発券済',
        statusColor: 'warning' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_out',
        type: '利用券',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: '-',
      },
      {
        id: 'row-3-4',
        checked: false,
        branchNumber: '4',
        passcode: '123',
        status: '宿泊済',
        statusColor: 'neutral' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_not_available',
        type: '-',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: 'タナカハナコ',
      },
      {
        id: 'row-3-5',
        checked: false,
        branchNumber: '5',
        passcode: '124',
        status: '宿泊済',
        statusColor: 'neutral' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_not_available',
        type: '-',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: '-',
      },
      {
        id: 'row-3-6',
        checked: false,
        branchNumber: '6',
        passcode: '125',
        status: '予約済発券済',
        statusColor: 'neutral' as
          | 'primary'
          | 'error'
          | 'success'
          | 'neutral'
          | 'warning'
          | 'information',
        statusIcon: 'ticket_not_available',
        type: '利用券',
        year: '2021年(前年)',
        expirationDate: '2022/03/31',
        homeOrMutual: 'ホーム',
        memberName: 'タナカハナコ',
      },
    ],
  },
]);

const onCheckRow = (disclosureRowId: string, rowId: string) => {
  tableRows.value = tableRows.value.map((disclosureRow) => {
    if (disclosureRow.disclosureId === disclosureRowId) {
      return {
        ...disclosureRow,
        rows: disclosureRow.rows.map((row) => {
          if (row.id === rowId) {
            return {
              ...row,
              checked: !row.checked,
            };
          }
          return row;
        }),
      };
    }
    return disclosureRow;
  });
};

const onClickDisclosure = (disclosureId: string) => {
  const disclosure = tableRows.value.find(
    (row) => row.disclosureId === disclosureId
  );
  if (disclosure) {
    disclosure.open = !disclosure.open;
  }
};

const onCloseDisclosureRow = (disclosureId: string) => {
  tableRows.value = tableRows.value.filter(
    (row) => row.disclosureId !== disclosureId
  );
};

const numericDropdownOptions = [
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

const currentTextDropdownSelection1 = ref('');
const currentTextDropdownSelection3 = ref('');

const textDropdownOptions = [
  {
    label: 'First Option',
    value: 'First Option',
  },
  {
    label: 'Second Option',
    value: 'Second Option',
  },
  {
    label: 'Third Option',
    value: 'Third Option',
  },
];

const facilitiesSelection = ref('');
const facilitiesOptions = [
  {
    label: 'GD 裏磐梯グランデコ',
    value: 'option-1',
  },
  {
    label: 'NU 那須',
    value: 'option-2',
  },
  {
    label: 'NG 那須リトリート',
    value: 'option-3',
  },
  {
    label: 'KN 鬼怒川',
    value: 'option-4',
  },
  {
    label: 'KA 勝浦',
    value: 'option-5',
  },
];

const branchSort = ref<'asc' | 'desc' | ''>('');
const yearSort = ref<'asc' | 'desc' | ''>('');

const onBranchSort = (sortStatus: 'asc' | 'desc') => {
  console.log('sorted branch usage as:', sortStatus);
  branchSort.value = sortStatus;
};

const onYearSort = (sortStatus: 'asc' | 'desc') => {
  console.log('sorted year usage as:', sortStatus);
  yearSort.value = sortStatus;
};

const onClickShowTickets = () => {
  console.log('clickedShowTickets');
};

const onChangeDate = (date: Date) => {
  console.log('onChangeDate', date);
  selectedDate.value = date;
};

const onChangeTab = (tab: number) => {
  console.log('onChangeTab', tab);
  selectedTab.value = tab;
};
</script>

<style scoped lang="scss"></style>
