<template>
  <Dialog
    :open="isDialogOpen"
    custom-height="755px"
    @close-dialog="onCloseDialog"
  >
    <template #header>
      <Text size="xl" bold> 表示設定 </Text>
    </template>
    <Table width="100%">
      <template #head>
        <TableRow id="settings-row-1">
          <TableColumn id="settings-col-1" width="56px" text-align="center">
            <span class="util-flex util-flex--justify-center">
              <Checkbox
                :checked="getAllIsChecked()"
                :indeterminate="getAllIsIndeterminate()"
                @input="onCheckAll()"
              />
            </span>
          </TableColumn>
          <TableColumn id="settings-col-2">項目</TableColumn>
        </TableRow>
      </template>
      <template #body>
        <TableRow
          v-for="column in testData.columns"
          :id="column.id"
          :key="column.id"
        >
          <TableCell text-align="center">
            <span class="util-flex util-flex--justify-center">
              <Checkbox
                :checked="getCheckedColumn(column.id)"
                @input="onCheckColumn(column.id)"
              />
            </span>
          </TableCell>
          <TableCell>{{ column.label }}</TableCell>
        </TableRow>
      </template>
    </Table>
    <template #footer>
      <Button
        class="util-mr-16"
        size="large"
        color="neutral"
        type="outlined"
        width="200px"
        @click="onResetChecked"
      >
        リセット
      </Button>
      <Button
        size="large"
        color="neutral"
        width="200px"
        @click="confirmChecked"
      >
        設定変更
      </Button>
    </template>
  </Dialog>
  <div class="lay-container lay-container--3panes">
    <the-sidebar/>
    <main :class="`lay-main ${isScrollbarVisible ? 'util-mb-16' : ''}`">
      <div class="lay-main__container">
        <Breadcrumbs :crumbs="crumbs" />
        <span class="util-flex">
          <Heading class="util-mr-24">予約一覧</Heading>
          <Button class="util-mr-16" color="neutral" icon="add" type="outlined">
            新規予約
          </Button>
          <Button color="neutral" type="outlined">残室確認</Button>
        </span>
        <Disclosure>
          <template #title>
            <Text bold>予約検索</Text>
          </template>
          <div
            class="util-flex util-flex--column util-flex--gap16 util-flex--wrap"
          >
            <span class="util-flex util-flex--gap16 util-flex--wrap">
              <FieldContainer label="会員権番号" width="128px">
                <TextField />
              </FieldContainer>
              <FieldContainer label="顧客番号" width="128px">
                <TextField />
              </FieldContainer>
              <FieldContainer label="利用代表者名（カナ）" width="272px">
                <TextField />
              </FieldContainer>
              <FieldContainer label="電話番号" width="128px">
                <TextField />
              </FieldContainer>
              <FieldContainer label="予約番号" width="128px">
                <TextField />
              </FieldContainer>
              <FieldContainer label="外部受付番号" width="128px">
                <TextField />
              </FieldContainer>
              <FieldContainer label="予約経路" width="128px">
                <ComboBox
                  v-model:value="currentTextDropdownSelection1"
                  width="128px"
                  size="small"
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
              </FieldContainer>
              <FieldContainer label="予約種別" width="128px">
                <ComboBox
                  v-model:value="currentTextDropdownSelection2"
                  width="128px"
                  size="small"
                  :search-icon="false"
                >
                  <ComboBoxItem
                    v-for="(option, i) in reservationTypeOptions"
                    :key="i"
                    :label="option.label"
                    :value="option.value"
                  >
                  </ComboBoxItem>
                </ComboBox>
              </FieldContainer>
              <FieldContainer label="顧客種別" width="128px">
                <ComboBox
                  v-model:value="currentTextDropdownSelection3"
                  width="128px"
                  size="small"
                  :search-icon="false"
                >
                  <ComboBoxItem
                    v-for="(option, i) in customerTypeOptions"
                    :key="i"
                    :label="option.label"
                    :value="option.value"
                  >
                  </ComboBoxItem>
                </ComboBox>
              </FieldContainer>
            </span>
            <span class="util-flex">
              <Button
                color="neutral"
                size="small"
                :icon="
                  detailedSearchOptionsActive
                    ? 'keyboard_arrow_up'
                    : 'keyboard_arrow_down'
                "
                type="text"
                @click="onClickDetailedOptions"
              >
                詳細検索
              </Button>
            </span>
            <span v-show="detailedSearchOptionsActive">
              <span
                class="util-flex util-flex--gap16 util-flex--wrap util-mb-16"
              >
                <FieldContainer label="施設" width="416px">
                  <ComboBox
                    v-model:value="currentTextDropdownSelection4"
                    width="416px"
                    size="small"
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
                </FieldContainer>
                <FieldContainer label="ステータス" width="272px">
                  <ComboBox
                    v-model:value="currentTextDropdownSelection5"
                    width="272px"
                    size="small"
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
                </FieldContainer>
                <FieldContainer label="期間" width="542px">
                  <span class="util-flex util-flex--gap8">
                    <DatePicker
                      size="small"
                      type="range"
                      :date-range="range"
                      @change-range-date="onChangeRangeDate"
                    />
                    <RadioButton
                      :checked="dayType === 'arrival'"
                      class="util-py-4 util-px-4"
                      name="day-type"
                      label="到着日"
                      @input="onSelectDayType('arrival')"
                    />
                    <RadioButton
                      :checked="dayType === 'stay'"
                      class="util-py-4 util-px-4"
                      name="day-type"
                      label="宿泊日"
                      @input="onSelectDayType('stay')"
                    />
                    <RadioButton
                      :checked="dayType === 'departure'"
                      class="util-py-4 util-px-4"
                      name="day-type"
                      label="出発日"
                      @input="onSelectDayType('departure')"
                    />
                  </span>
                </FieldContainer>
              </span>
              <span
                class="util-flex util-flex--gap16 util-flex--wrap util-mb-16"
              >
                <FieldContainer label="予約受付者" width="416px">
                  <div class="util-flex util-flex--gap16">
                    <Checkbox
                      v-model:checked="isSelf"
                      class="util-py-4 util-px-4"
                      label="自分"
                    />
                    <ComboBox
                      v-model:value="currentTextDropdownSelection6"
                      width="337px"
                      size="small"
                      disabled
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
                  </div>
                </FieldContainer>
                <FieldContainer label="予約タイプ" width="128px">
                  <ComboBox
                    v-model:value="currentTextDropdownSelection7"
                    width="128px"
                    size="small"
                    :search-icon="false"
                  >
                    <ComboBoxItem
                      v-for="(option, i) in reservationType2Options"
                      :key="i"
                      :label="option.label"
                      :value="option.value"
                    >
                    </ComboBoxItem>
                  </ComboBox>
                </FieldContainer>
                <FieldContainer label="団体予約名" width="416px">
                  <TextField disabled />
                </FieldContainer>
              </span>
              <span
                class="
                  util-flex
                  util-flex--wrap
                  util-flex--column-gap16
                  util-flex--row-gap8
                "
              >
                <FieldContainer label="予約オプション">
                  <div class="util-flex util-flex--gap8 util-flex--wrap">
                    <Checkbox
                      v-model:checked="hasRestaurantReservation"
                      class="util-py-4 util-px-4"
                      label="レストラン予約あり"
                    />
                    <Checkbox
                      v-model:checked="hasFacilitiesReservation"
                      class="util-py-4 util-px-4"
                      label="付帯施設予約あり"
                    />
                    <Checkbox
                      v-model:checked="hasAppointmentReservation"
                      class="util-py-4 util-px-4"
                      label="手配予約あり"
                    />
                    <Checkbox
                      v-model:checked="hasEquipmentReservation"
                      class="util-py-4 util-px-4"
                      label="備品予約あり"
                    />
                    <Checkbox
                      v-model:checked="hasWithReservation"
                      class="util-py-4 util-px-4"
                      label="WITH予約あり"
                    />
                    <Checkbox
                      v-model:checked="hasImportantRemarks"
                      class="util-py-4 util-px-4"
                      label="重要備考"
                    />
                  </div>
                </FieldContainer>
                <FieldContainer
                  class="util-flex--justify-between"
                  label="部屋アサイン"
                >
                  <div class="util-flex util-flex--gap8 util-flex--wrap">
                    <Checkbox
                      v-model:checked="hasNotAssigned"
                      class="util-py-4 util-px-4"
                      label="未アサインあり"
                    />
                    <Checkbox
                      v-model:checked="hasRoomAssignment"
                      class="util-py-4 util-px-4"
                      label="部屋指定あり"
                    />
                    <Checkbox
                      v-model:checked="hasRequested"
                      class="util-py-4 util-px-4"
                      label="リクエストあり"
                    />
                  </div>
                </FieldContainer>
              </span>
            </span>
            <span class="util-flex util-flex--gap8">
              <Button color="neutral" icon="search" @click="onClickSearch">
                検索
              </Button>
              <Button color="neutral" type="outlined" @click="onClickClear">
                クリア
              </Button>
            </span>
          </div>
        </Disclosure>
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
                icon="link"
                type="outlined"
                @click="onOpenWithReservationDialog"
              >
                WITH予約
              </Button>
              <Button color="neutral" icon="upload" type="outlined">
                予約取込
              </Button>
              <Button color="neutral" icon="download" type="outlined">
                帳票出力
              </Button>
              <Button
                color="neutral"
                icon="settings"
                type="outlined"
                @click="onOpenDialog"
              />
            </span>
          </span>
          <TableDetachedHead ref="tableHeadScrollTarget">
            <TableRow id="columns2-row">
              <TableColumn
                v-for="column in visibleData.columns"
                :id="column.id"
                :key="column.id"
                :can-sort="column.canSort"
                :text-align="column.textAlign"
                :width="column.width"
                height="64px"
                :sorted-direction="getSortedDirection(column.id)"
                :is-sticky="column.isSticky"
                :control-wrap="getControlWrap(column.label)"
                @click-sort="onSortColumn"
              >
                {{ column.label }}
              </TableColumn>
              <TableRow id="empty-column" width="100%"></TableRow>
            </TableRow>
          </TableDetachedHead>
          <TableDetachedBody ref="tableBodyScrollTarget">
            <TableRow
              v-for="row in visibleData.rows"
              :id="row.id"
              :key="row.id"
            >
              <TableCell
                v-for="cell in row.cells"
                :key="`${row.id}-${cell.columnId}`"
                :text-align="
                  cell.counter
                    ? 'right'
                    : cell.icon || cell.badge
                    ? 'center'
                    : 'left'
                "
                :is-sticky="getIsColumnSticky(cell.columnId)"
                :tooltip-text="
                  getColumnUsesTooltip(cell.columnId) ? cell.text : ''
                "
                :width="getColumnWidth(cell.columnId)"
              >
                <template v-if="cell.badge">
                  <Tooltip
                    v-if="cell.badge.tooltip"
                    direction="bottom"
                    content-align="center"
                  >
                    <Badge
                      size="small"
                      :color="cell.badge.color"
                      :type="cell.badge.type"
                      :width="cell.badge.width ? cell.badge.width : ''"
                    >
                      {{ cell.badge.label }}
                    </Badge>
                    <template #toolTipContent>
                      <span
                        v-for="(tip, tipIndex) in cell.badge.tooltip"
                        :key="`tip-${tipIndex}-${row.id}-${cell.columnId}`"
                      >
                        {{ tip }}
                      </span>
                    </template>
                  </Tooltip>
                  <Badge
                    v-else
                    class="util-full-width"
                    size="small"
                    :color="cell.badge.color"
                    :type="cell.badge.type"
                    :width="cell.badge.width ? cell.badge.width : ''"
                  >
                    {{ cell.badge.label }}
                  </Badge>
                </template>
                <span
                  v-else-if="cell.subIcon"
                  class="
                    util-flex util-flex--align-center util-flex--justify-between
                    util-full-width
                  "
                >
                  <Text :color="row.isError ? 'critical' : 'main'">
                    {{ cell.text || '' }}
                  </Text>
                  <Icon
                    :icon="cell.subIcon"
                    :color="row.isError ? '#E12626' : '#727272'"
                  />
                </span>
                <Text
                  v-else-if="cell.text"
                  :color="row.isError ? 'critical' : 'main'"
                >
                  {{ cell.text }}
                </Text>
                <Text
                  v-else-if="cell.counter"
                  :color="row.isError ? 'critical' : 'main'"
                >
                  {{ cell.counter }}
                </Text>
                <Icon
                  v-else-if="cell.icon"
                  :icon="cell.icon"
                  :color="cell.icon === 'checked' ? '#236C2D' : '#E6E6E6'"
                />
                <template v-else-if="cell.referenceButton">
                  <Button
                    class="util-mr-8"
                    color="neutral"
                    type="outlined"
                    @click="onClickCopy(row.id)"
                  >
                    複製
                  </Button>
                  <Button
                    color="neutral"
                    type="outlined"
                    @click="onClickReference(row.id)"
                  >
                    参照
                  </Button>
                </template>
              </TableCell>
              <TableRow id="empty-column" width="100%"></TableRow>
            </TableRow>
          </TableDetachedBody>
          <span class="util-flex util-flex--justify-end util-full-width">
            <Pagination
              :total="totalItems"
              :items-per-page="itemsPerPage"
              :current-page="currentPage"
              @change="onChange"
            />
          </span>
        </span>
        <Scrollbar
          :nav-width="navWidth"
          :targets="getTargets()"
          :is-visible="isScrollbarVisible"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Badge from '../components/Badge/Badge.vue';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs.vue';
import Heading from '../components/Heading/Heading.vue';
import Disclosure from '../components/Disclosure/Disclosure.vue';
import Text from '../components/Text/Text.vue';
import Button from '../components/Button/Button.vue';
import TextField from '../components/TextField/TextField.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import DatePicker from '../components/DatePicker/DatePicker.vue';
import RadioButton from '../components/RadioButton/RadioButton.vue';
import Checkbox from '../components/Checkbox/Checkbox.vue';
import Table from '../components/Table/Table.vue';
import Icon from '../components/Icon/Icon.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';

import Tooltip from '../components/Tooltip/Tooltip.vue';
import TheSidebar from "@/containers/TheSidebar.vue";
import TableDetachedHead from '../components/Table/TableDetachedHead.vue';
import TableDetachedBody from '../components/Table/TableDetachedBody.vue';

import Pagination from '../components/Pagination/Pagination.vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Scrollbar from '../components/Scrollbar/Scrollbar.vue';

import ComboBox from '../components/ComboBox/ComboBox.vue';
import ComboBoxItem from '../components/ComboBox/ComboBoxItem.vue';

import { reservationList } from '../data/reservationListTestData';
import { onMounted, Ref, ref, VNodeRef } from 'vue';

const testData = ref(reservationList);
const visibleData = ref(testData.value);

/** Dialog Logic */
const isDialogOpen = ref(false);

const isWithReservationDialogOpen = ref(false);

const onCloseDialog = () => {
  isDialogOpen.value = false;
};

const onOpenWithReservationDialog = () => {
  isWithReservationDialogOpen.value = true;
  console.log('clickedWithReservation');
};

const onOpenDialog = () => {
  isDialogOpen.value = true;
};

const getDefaultDisplayedColumns = (): {
  id: string;
  checked: boolean;
}[] =>
  testData.value.columns.map((column) => ({
    id: column.id,
    checked: true,
  }));

const displayedColumns = ref<{ id: string; checked: boolean }[]>(
  getDefaultDisplayedColumns()
);

const checkedColumns = ref<{ id: string; checked: boolean }[]>(
  getDefaultDisplayedColumns()
);

const getCheckedColumn = (id: string) => {
  return checkedColumns.value.find((column) => column.id === id)?.checked;
};

const onCheckColumn = (id: string) => {
  checkedColumns.value = checkedColumns.value.map((column) => {
    if (column.id === id) {
      const checked = !column.checked;
      return { ...column, checked };
    }
    return column;
  });
};

const getAllIsChecked = () => {
  return (
    checkedColumns.value.filter((options) => options.checked === true)
      .length === checkedColumns.value.length
  );
};

const getAllIsIndeterminate = () => {
  const checkedOptions = checkedColumns.value.filter(
    (option) => option.checked
  );
  return (
    checkedOptions.length > 0 &&
    checkedOptions.length < checkedColumns.value.length
  );
};

const onCheckAll = () => {
  const allChecked = getAllIsChecked();
  checkedColumns.value = checkedColumns.value.map((column) => ({
    ...column,
    checked: !allChecked,
  }));
};

const onResetChecked = () => {
  checkedColumns.value = displayedColumns.value;
};

const confirmChecked = () => {
  const newDisplayedColumns = testData.value.columns.filter((column) =>
    checkedColumns.value.find(
      (checkedColumn) => checkedColumn.id === column.id && checkedColumn.checked
    )
  );

  const newVisibleRows = testData.value.rows.map((row) => {
    const newRow = { ...row };
    newRow.cells = newRow.cells.filter((cell) =>
      checkedColumns.value.find(
        (checkedColumn) =>
          checkedColumn.id === cell.columnId && checkedColumn.checked
      )
    );
    return newRow;
  });

  displayedColumns.value = checkedColumns.value;
  visibleData.value = {
    columns: newDisplayedColumns,
    rows: newVisibleRows,
  };
  isDialogOpen.value = false;
};
/** */

const getSortableColumns = (): {
  id: string;
  direction: 'asc' | 'desc' | '';
}[] =>
  testData.value.columns
    .filter((column) => column.canSort)
    .map((column) => {
      return { id: column.id, direction: '' };
    });

const sortableColums = ref<{ id: string; direction: 'asc' | 'desc' | '' }[]>(
  getSortableColumns()
);

const getSortedDirection = (columnId: string): 'asc' | 'desc' | '' => {
  const column = sortableColums.value.find((column) => column.id === columnId);
  return column ? column.direction : '';
};

const onSortColumn = (sortDirection: 'asc' | 'desc', id: string) => {
  console.log('sorted column', id, 'as:', sortDirection);
  const newSortableColumns = sortableColums.value.map((column) => {
    if (column.id === id) {
      return { ...column, direction: sortDirection };
    }
    return { ...column };
  });
  sortableColums.value = newSortableColumns;
};

const getIsColumnSticky = (columnId: string) => {
  return testData.value.columns.find((column) => column.id === columnId)
    ?.isSticky;
};

const getColumnUsesTooltip = (columnId: string) => {
  return testData.value.columns.find((column) => column.id === columnId)
    ?.useTooltip;
};

const getColumnWidth = (columnId: string) => {
  return testData.value.columns.find((column) => column.id === columnId)?.width;
};

const getControlWrap = (label: string) => {
  return label.includes('\n');
};

const crumbs = [
  { label: 'ホーム', id: 'crumb-1', href: '#' },
  { label: '予約一覧', id: 'crumb-2', href: '#' },
];

const currentTextDropdownSelection1 = ref('First Option');
const currentTextDropdownSelection2 = ref('予約種別-1');
const currentTextDropdownSelection3 = ref('会員');
const currentTextDropdownSelection4 = ref('First Option');
const currentTextDropdownSelection5 = ref('First Option');
const currentTextDropdownSelection6 = ref('First Option');
const currentTextDropdownSelection7 = ref('個人');

const detailedSearchOptionsActive = ref(false);
const onClickDetailedOptions = () => {
  detailedSearchOptionsActive.value = !detailedSearchOptionsActive.value;
};

const range = ref({
  start: new Date(),
  end: new Date(),
});

const onChangeRangeDate = (dateRange: { start?: Date; end?: Date }) => {
  if (dateRange.start) {
    range.value.start = dateRange.start;
  }
  if (dateRange.end) {
    range.value.end = dateRange.end;
  }
};

const dayType: Ref<'arrival' | 'stay' | 'departure'> = ref('arrival');

const onSelectDayType = (type: 'arrival' | 'stay' | 'departure') => {
  dayType.value = type;
};

const isSelf = ref(false);
const hasRestaurantReservation = ref(false);
const hasFacilitiesReservation = ref(false);
const hasAppointmentReservation = ref(false);
const hasEquipmentReservation = ref(false);
const hasWithReservation = ref(false);
const hasImportantRemarks = ref(false);
const hasNotAssigned = ref(false);
const hasRoomAssignment = ref(false);
const hasRequested = ref(false);

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

const onClickCopy = (rowId: string) => {
  console.log('clickedCopy', rowId);
};

const onClickReference = (rowId: string) => {
  console.log('clickedReference', rowId);
};

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

const reservationTypeOptions = [
  {
    label: '予約種別-1',
    value: 'type-001',
  },
  {
    label: '予約種別-2',
    value: 'type-002',
  },
  {
    label: '予約種別-3',
    value: 'type-003',
  },
];

const customerTypeOptions = [
  {
    label: '会員',
    value: 'cust-type-001',
  },
  {
    label: 'ビジター',
    value: 'cust-type-002',
  },
  {
    label: 'ゲスト',
    value: 'cust-type-003',
  },
];

const reservationType2Options = [
  {
    label: '個人',
    value: 'res-type-001',
  },
  {
    label: 'タイプ2',
    value: 'res-type-002',
  },
  {
    label: 'タイプ3',
    value: 'res-type-003',
  },
];

/** Scrollbar Logic */

const tableHeadScrollTarget: VNodeRef | undefined = ref(undefined);
const tableBodyScrollTarget: VNodeRef | undefined = ref(undefined);

const layoutNav: Element | Ref<Element | undefined> = ref(undefined);

const isScrollbarVisible = ref(true);

const navWidth = ref(
  layoutNav.value ? layoutNav.value.getBoundingClientRect().width : 0
);

const getTargets = () => {
  if (tableBodyScrollTarget.value && tableHeadScrollTarget.value) {
    return [
      tableHeadScrollTarget.value.$el as HTMLElement,
      tableBodyScrollTarget.value.$el as HTMLElement,
    ];
  } else {
    return [];
  }
};

onMounted(() => {
  if (
    tableHeadScrollTarget.value &&
    tableBodyScrollTarget.value &&
    layoutNav.value
  ) {
    const tableHeadElement = tableHeadScrollTarget.value.$el as HTMLElement;
    const tableBodyElement = tableBodyScrollTarget.value.$el as HTMLElement;
    tableHeadElement.style.overflowX = 'hidden';
    tableBodyElement.style.overflowX = 'hidden';

    const tableHeadElementTable = tableHeadScrollTarget.value.$el
      .children[0] as HTMLElement;
    const layoutNavElement = layoutNav.value as HTMLElement;
    headResizeObserver.observe(tableHeadElementTable);
    navResizeObserver.observe(layoutNavElement);
  }
});

const headResizeObserver = new ResizeObserver(() => {
  const targets = getTargets();
  if (targets) {
    isScrollbarVisible.value = targets[0].scrollWidth > targets[0].clientWidth;
  } else {
    isScrollbarVisible.value = false;
  }
});

const navResizeObserver = new ResizeObserver(() => {
  const layoutNavElement = layoutNav.value as HTMLElement;
  navWidth.value = layoutNavElement.getBoundingClientRect().width;
});
</script>

<style scoped lang="scss">
.table-detached-body .table__cell:has(.table-cell--reference-button) {
  padding: 0 4px;
}
</style>
