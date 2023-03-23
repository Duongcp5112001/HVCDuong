<template>
  <div class="lay-container lay-container--3panes">
    <header class="lay-header">
      <Header>
        <img :src="logo" />
        <Badge color="neutral" size="small">予約システム</Badge>
        <template #rightControl><HeaderNotification :counter="99" /></template>
      </Header>
    </header>
    <nav ref="layoutNav" class="lay-nav">
      <Drawer selected-id="drawer-item-11" @click-item="onClickDrawerItem">
        <template #body>
          <DrawerItem id="drawer-item-1" is-subtitle>予約管理</DrawerItem>
          <DrawerItem id="drawer-item-2" icon="call">予約登録</DrawerItem>
          <DrawerItem id="drawer-item-3" icon="list">予約一覧</DrawerItem>
          <DrawerItem id="drawer-item-4" is-subtitle>在庫管理</DrawerItem>
          <DrawerItem id="drawer-item-5" icon="list">在庫一覧</DrawerItem>
          <DrawerItem id="drawer-item-6" is-subtitle>顧客管理</DrawerItem>
          <DrawerItem id="drawer-item-7" icon="people">顧客一覧</DrawerItem>
          <DrawerItem id="drawer-item-8" is-subtitle>利用券管理</DrawerItem>
          <DrawerItem id="drawer-item-9" icon="people">利用券一覧</DrawerItem>
          <DrawerItem id="drawer-item-10" is-subtitle>抽選管理</DrawerItem>
          <DrawerItem id="drawer-item-11" icon="supervised_user_circle">
            抽選登録
          </DrawerItem>
          <DrawerItem id="drawer-item-12" icon="tune">抽選管理</DrawerItem>
          <DrawerItem id="drawer-item-13" is-subtitle>法人代行管理</DrawerItem>
          <DrawerItem id="drawer-item-14" icon="business">
            法人予約代行業者一覧
          </DrawerItem>
        </template>
        <template #footer>
          <DrawerItem id="drawer-item-15" icon="control_point_duplicate">
            サイトコントローラ
          </DrawerItem>
          <DrawerItem id="drawer-item-16" icon="settings">
            マスタ管理
          </DrawerItem>
        </template>
      </Drawer>
    </nav>
    <main class="lay-main">
      <div class="lay-main__container">
        <Breadcrumbs :crumbs="crumbs" />
        <span class="util-flex">
          <Heading class="util-mr-24">抽選会員検索一覧</Heading>
        </span>
        <Panel width="100%" color="dark" :shadow="false">
          <span
            class="
              util-flex util-flex--wrap util-flex--align-end util-flex--gap8
            "
          >
            <FieldContainer label="施設" width="272px" required>
              <ComboBox
                v-model:value="selectedFacility"
                placeholder=""
                size="small"
                width="100%"
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
            <span class="util-flex util-flex--align-end">
              <FieldContainer label="特定期間（年）" width="80px" required>
                <TextField v-model="specifiedPeriod" />
              </FieldContainer>
              <Text class="util-ml-4" color="light" bold size="2xs">年</Text>
            </span>
            <FieldContainer label="特定期間コード" width="80px" required>
              <TextField v-model="specifiedPeriodCode" />
            </FieldContainer>
            <FieldContainer label="代表会員権番号" width="128px">
              <TextField v-model="memberCode" />
            </FieldContainer>
            <FieldContainer label="顧客番号" width="128px">
              <TextField v-model="customerCode" />
            </FieldContainer>
            <FieldContainer label="会員名（カナ）" width="272px">
              <TextField v-model="nameKana" />
            </FieldContainer>
            <FieldContainer label="入会日">
              <DatePicker
                type="range"
                size="small"
                :date-range="joinedDayRange"
                width="272px"
                @change-range-date="onChangeRangeDate"
              />
            </FieldContainer>

            <div
              class="
                util-flex util-flex--align-center util-flex--gap8
                util-ml-8
              "
            >
              <Button icon="search" color="neutral" @click="onClickSearch">
                検索
              </Button>
              <Button type="outlined" color="neutral" @click="onClickClear">
                クリア
              </Button>
            </div>
          </span>
        </Panel>
        <Text size="large" bold>
          {{ displayedFacility }}
          2023年 10-ゴールデンウィーク
        </Text>
        <span>
          <span
            class="
              util-flex util-flex--align-center util-flex--justify-between
              util-mb-8
            "
          >
            <Text size="xs">
              {{ getDisplayItemsFrom() }}-{{ getDisplayItemsTo() }} /
              {{ addCommasToNumber(totalItems) }} 行
            </Text>
            <span class="util-flex util-flex--gap16">
              <Button
                color="neutral"
                icon="download"
                type="outlined"
                @click="onClickReport"
              >
                帳票出力
              </Button>
            </span>
          </span>
          <Table class="util-mb-8" fixed-layout>
            <template #head>
              <TableRow id="head-row-1">
                <TableColumn
                  v-for="column in visibleData.columns[0]"
                  :id="column.id"
                  :key="column.id"
                  :can-sort="column.canSort"
                  :text-align="column.textAlign"
                  :width="column.width"
                  :sorted-direction="getSortedDirection(column.id)"
                  :rowspan="column.rowSpan"
                  :control-wrap="getControlWrap(column.label)"
                  @click-sort="onSortColumn"
                >
                  {{ column.label }}
                </TableColumn>
              </TableRow>
              <TableRow id="head-row-2">
                <TableColumn
                  v-for="column in visibleData.columns[1]"
                  :id="column.id"
                  :key="column.id"
                  :can-sort="column.canSort"
                  :text-align="column.textAlign"
                  :width="column.width"
                  :sorted-direction="getSortedDirection(column.id)"
                  :control-wrap="getControlWrap(column.label)"
                  @click-sort="onSortColumn"
                >
                  {{ column.label }}
                </TableColumn>
              </TableRow>
            </template>
            <template #body>
              <TableRow
                v-for="row in visibleData.rows"
                :id="row.id"
                :key="row.id"
              >
                <TableCell
                  v-for="cell in row.cells"
                  :key="`${row.id}-${cell.columnId}`"
                  :width="getColumnWidth(cell.columnId)"
                  :text-align="getColumnTextAlign(cell.columnId)"
                  wrap
                >
                  <Text color="main">
                    {{ cell.text }}
                  </Text>

                  <template v-if="cell.checkbox">
                    <Icon v-if="cell.checked" icon="check" color="#236C2D" />
                    <Icon v-else icon="horizontal_rule" color="#E6E6E6" />
                  </template>

                  <template v-if="cell.referenceButton">
                    <Button
                      color="neutral"
                      type="outlined"
                      :disabled="cell.disabled"
                      @click="onClickReference(row.id)"
                    >
                      参照
                    </Button>
                  </template>
                  <template v-if="cell.entryButton">
                    <Button
                      color="neutral"
                      type="outlined"
                      :disabled="cell.disabled"
                      @click="onClickEntry(row.id)"
                    >
                      抽選申込み
                    </Button>
                  </template>
                </TableCell>
              </TableRow>
            </template>
          </Table>
          <span class="util-flex util-flex--justify-end util-full-width">
            <Pagination
              :total="totalItems"
              :items-per-page="itemsPerPage"
              :current-page="currentPage"
              @change="onChange"
            />
          </span>
        </span>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import logo from '../assets/logo.svg';
import Badge from '../components/Badge/Badge.vue';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs.vue';
import Button from '../components/Button/Button.vue';
import ComboBox from '../components/ComboBox/ComboBox.vue';
import ComboBoxItem from '../components/ComboBox/ComboBoxItem.vue';
import DatePicker from '../components/DatePicker/DatePicker.vue';
import Drawer from '../components/Drawer/Drawer.vue';
import DrawerItem from '../components/Drawer/DrawerItem.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import Header from '../components/Header/Header.vue';
import HeaderNotification from '../components/HeaderNotification/HeaderNotification.vue';
import Heading from '../components/Heading/Heading.vue';
import Icon from '../components/Icon/Icon.vue';
import Pagination from '../components/Pagination/Pagination.vue';
import Panel from '../components/Panel/Panel.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import Text from '../components/Text/Text.vue';
import TextField from '../components/TextField/TextField.vue';

import { computed, ref } from 'vue';
import { lotteryList } from '../data/lotteryListTestData';

const specifiedPeriod = ref('');
const specifiedPeriodCode = ref('');
const memberCode = ref('');
const customerCode = ref('');
const nameKana = ref('');
const joinedDayRange = ref<{
  start?: Date;
  end?: Date;
}>({});

const testData = ref(lotteryList);
const visibleData = ref(testData.value);

const getSortableColumns = (): {
  id: string;
  direction: 'asc' | 'desc' | '';
}[] =>
  testData.value.columns
    .reduce((acc, curr) => [...acc, ...curr], [])
    .filter((column) => column.canSort)
    .map((column) => {
      return { id: column.id, direction: '' };
    });

const sortableColumns = ref<{ id: string; direction: 'asc' | 'desc' | '' }[]>(
  getSortableColumns()
);

const getSortedDirection = (columnId: string): 'asc' | 'desc' | '' => {
  const column = sortableColumns.value.find((column) => column.id === columnId);
  return column ? column.direction : '';
};

const onSortColumn = (sortDirection: 'asc' | 'desc', id: string) => {
  console.log('sorted column', id, 'as:', sortDirection);
  const newSortableColumns = sortableColumns.value.map((column) => {
    if (column.id === id) {
      return { ...column, direction: sortDirection };
    }
    return { ...column };
  });
  sortableColumns.value = newSortableColumns;
};

const getColumnWidth = (columnId: string) => {
  return testData.value.columns
    .reduce((acc, curr) => [...acc, ...curr], [])
    .find((column) => column.id === columnId)?.width;
};

const getColumnTextAlign = (columnId: string) => {
  return testData.value.columns
    .reduce((acc, curr) => [...acc, ...curr], [])
    .find((column) => column.id === columnId)?.textAlign;
};

const getControlWrap = (label: string) => {
  return label.includes('\n');
};

const crumbs = [
  { label: 'ホーム', id: 'crumb-1', href: '#' },
  { label: '抽選登録', id: 'crumb-2', href: '#' },
];

const facilitiesOptions = [
  {
    label: '浜名湖',
    value: '1',
  },
];

const selectedFacility = ref(facilitiesOptions[0].label);

const displayedFacility = computed(() => {
  const selected = facilitiesOptions.find(
    (option) => option.value === selectedFacility.value
  )?.label;

  if (selected) {
    return selected;
  } else {
    return selectedFacility.value;
  }
});

const totalItems = 3000;
const itemsPerPage = 100;
const currentPage = ref(1);

const addCommasToNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const getDisplayItemsFrom = () => {
  return (currentPage.value - 1) * itemsPerPage + 1;
};
const getDisplayItemsTo = () => {
  return currentPage.value * itemsPerPage;
};

const onChange = (page: number) => {
  currentPage.value = page;
};

const onClickDrawerItem = (id: string) => {
  console.log('clicked drawer item: ', id);
};

const onClickSearch = () => {
  console.log('clickedSearch');
};

const onClickClear = () => {
  console.log('clickedClear');
};

const onClickReport = () => {
  console.log('clickedReport');
};

const onClickReference = (rowId: string) => {
  console.log('clickedReference', rowId);
};

const onClickEntry = (rowId: string) => {
  console.log('clickEntry', rowId);
};

const onChangeRangeDate = (dateRange: { start?: Date; end?: Date }) => {
  if (dateRange?.start) {
    joinedDayRange.value.start = dateRange.start;
  }
  if (dateRange?.end) {
    joinedDayRange.value.end = dateRange.end;
  }
};
</script>

<style scoped lang="scss"></style>
