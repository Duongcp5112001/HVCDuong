<template>
  <!-- table setting dialog --> <Dialog
      :open="isDialogOpen"
      custom-height="755px"
      @close-dialog="onCloseDialogSettingTable"
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
    <main class="lay-main">
      <div class="lay-main__container">
        <Breadcrumbs :crumbs="crumbs" />
        <span class="util-flex">
          <Heading class="util-mr-24">顧客一覧</Heading>
          <Button color="neutral" icon="add" type="outlined" @click="createNewCustomer">新規顧客登録</Button>
        </span>
        <Disclosure :opened="true">
          <template #title>
            <Text bold>顧客検索</Text>
          </template>
          <div
              class="util-flex util-flex--column util-flex--gap16 util-flex--wrap"
          >
            <span class="util-flex util-flex--gap16 util-flex--wrap">
              <FieldContainer label="各種番号" width="272px">
                <TextField placeholder="例）KA0987" v-model="variousNumber"/>
              </FieldContainer>
              <FieldContainer label="拠点" width="272px"> <!-- location dropdown -->
                <Dropdown
                    v-model:value="locationDropdownSelection"
                    placeholder=""
                    size="small"
                    width="272"
                >
                  <DropdownItem
                      v-for="(option, index) in locationDropdownOptions"
                      :key="index"
                      :label="option.label"
                      :value="option.value"
                  >
                  </DropdownItem>
                </Dropdown>
              </FieldContainer>
              <FieldContainer label="個人•法人区分" width="272px"> <!-- classification dropdown -->
                <Dropdown
                    v-model:value="classificationDropdownSelection"
                    placeholder=""
                    size="small"
                    width="232"
                >
                  <DropdownItem
                      v-for="(option) in classificationDropdownOptions"
                      :key="option.code"
                      :label="option.label"
                      :value="option.code"
                  >
                  </DropdownItem>
                </Dropdown>
              </FieldContainer>
              <FieldContainer label="顧客番号" width="272px"> <!-- customer ID -->
                <TextField placeholder="例）1234567890" v-model="customerID"/>
              </FieldContainer>
              <FieldContainer label="会員権番号" width="272px"> <!-- Ticket Number -->
                <TextField placeholder="例）098765432" v-model="tickerNumber"/>
              </FieldContainer>
              <FieldContainer label="外部受付番号" width="272px"><!-- External Reception Number -->
                <TextField placeholder="例）098765432" v-model="externalReceptionNumber"/>
              </FieldContainer>
              <FieldContainer label="" width="272px"> <!-- Family/Representative -->
                <span class="util-mt-20">
                  <Checkbox
                      v-model:checked="includeFamily"
                      class="util-py-3 util-px-4"
                      label="家族を含む"
                  />
                  <Checkbox
                      v-model:checked="onlyRepresentative "
                      class="util-py-3 util-px-4"
                      label="代表者のみ"
                  />
                </span>
              </FieldContainer>
              <FieldContainer label="電話番号／携帯番号" width="272px"> <!-- Phone -->
                <TextField placeholder="例）08012345678" v-model="customerPhone"/>
              </FieldContainer>
              <FieldContainer label="メールアドレス" width="272px"> <!-- Email -->
                <TextField placeholder="例）info@mail.com" v-model="customerEmail"/>
              </FieldContainer>
            </span>
            <span class="util-flex util-flex--gap8">
              <Button color="neutral" icon="search" @click="onClickSearch"> <!-- button search -->
                検索
              </Button>
              <Button color="neutral" type="outlined" @click="onClickClear" class="util-ml-8"> <!-- button clear -->
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
            <span>
              <Text size="xs" class="util-mr-24">
                {{ getDisplayItemsFrom() }}-{{ getDisplayItemsTo() }} /
                {{ addCommasToNumber(totalItems) }} 行
              </Text>
              <Button color="neutral" type="outlined" @click="aggregateSelectedCustomer">
                  選択した顧客を名寄せ
              </Button>
            </span>
            <span class="util-flex util-flex--gap16">
              <Button color="neutral" icon="download" type="outlined" @click="downloadForm">
                帳票出力
              </Button>
              <Button
                  color="neutral"
                  icon="settings"
                  type="outlined"
                  @click="onOpenDialogSettingTable"
              />
            </span>
          </span>
          <TableDetachedHead ref="tableHeadScrollTarget" >
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
                    cell.counter ? 'right' : cell.icon ? 'center' : 'left'
                  "
                  :is-sticky="getIsColumnSticky(cell.columnId)"
                  :tooltip-text="
                    getColumnUsesTooltip(cell.columnId) ? cell.text : ''
                  "
                  :width="getColumnWidth(cell.columnId)"
              >
                <Badge
                    v-if="cell.badge"
                    class="util-full-width"
                    size="small"
                    :color="cell.badge.color"
                    :type="cell.badge.type"
                >
                  {{ cell.badge.label }}
                </Badge>
                <Checkbox
                    v-else-if="cell.checkbox"
                >
                </Checkbox>
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
                    :color="cell.color"
                    @click="deleteCustomer(row.id)"
                />
                <Button
                    v-else-if="cell.referenceButton"
                    color="neutral"
                    type="outlined"
                    @click="onDisplayDetailCustomer(row.id)"
                >
                  参照
                </Button>
              </TableCell>
              <TableRow id="empty-column" width="100%"></TableRow>
            </TableRow>
          </TableDetachedBody>
          <span class="util-flex util-flex--justify-end util-full-width">
            <Pagination
                :total="totalItems"
                :items-per-page="itemsPerPage"
                :current-page="currentPage"
                @change="onChangePage"
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
import Dropdown from '../components/Dropdown/Dropdown.vue';
import DropdownItem from '../components/Dropdown/DropdownItem.vue';
import Checkbox from '../components/Checkbox/Checkbox.vue';
import Table from '../components/Table/Table.vue';
import Icon from '../components/Icon/Icon.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import TableDetachedHead from '../components/Table/TableDetachedHead.vue';
import TableDetachedBody from '../components/Table/TableDetachedBody.vue';
import Pagination from '../components/Pagination/Pagination.vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Scrollbar from '../components/Scrollbar/Scrollbar.vue';

import { onMounted, Ref, ref, VNodeRef} from 'vue';
import TheSidebar from "@/containers/TheSidebar.vue";


/* Data for table */
const customersList = {
  columns: [
    {
      id: 'col-1',
      width: '56px',
      label: '名寄せ選択',
    },
    {
      id: 'col-2',
      width: '89px',
      label: '会員種別',
    },
    {
      id: 'col-3',
      width: '157px',
      label: '顧客番号',
    },
    {
      id: 'col-4',
      width: '56px',
      label: '利用\n' +
          '回数',
    },
    {
      id: 'col-5',
      width: '144px',
      canSort: true,
      label: '顧客名（カナ）',
    },
    {
      id: 'col-6',
      width: '120px',
      label: '生年月日',
    },
    {
      id: 'col-7',
      width: '144px',
      label: '携帯番号',
    },
    {
      id: 'col-8',
      width: '160px',
      label: '携帯番号',
    },
    {
      id: 'col-9',
      width: '144px',
      label: '代表会員権番号',
    },
    {
      id: 'col-10',
      width: '144px',
      label: 'メールアドレス',
    },
    {
      id: 'col-11',
      width: '120px',
      label: '顧客登録日',
    },
    {
      id: 'col-12',
      width: '256px',
      label: '住所'
    },
    {
      id: 'col-13',
      width: '72px',
      label: '詳細',
      textAlign: 'center'
    },
    {
      id: 'col-14',
      width: '64px',
      label: '削除',
      textAlign: 'center'
    }
  ],
  rows: [
    {
      id: 'row-1',
      cells: [
        {
          columnId: 'col-1',
          checkbox: true
        },
        {
          columnId: 'col-2',
          badge: {
            color: 'success',
            label: '予約確定',
          },
        },
        {
          columnId: 'col-3',
          text: '0083962745',
        },
        {
          columnId: 'col-4',
          text: '2',
        },
        {
          columnId: 'col-5',
          text: 'タナカタロウ',
        },
        {
          columnId: 'col-6',
          text: '2022/10/30',
        },
        {
          columnId: 'col-7',
          text: '0384359627',
        },
        {
          columnId: 'col-8',
          text: '09063598274',
        },
        {
          columnId: 'col-9',
          text: 'NA0001',
        },
        {
          columnId: 'col-10',
          text: '',
        },
        {
          columnId: 'col-11',
          text: '2022/10/30',
        },
        {
          columnId: 'col-12',
          text: '969-2701 福島県耶麻郡北塩原村檜原荒砂沢山'
        },
        {
          columnId: 'col-13',
          referenceButton: true,
        },
        {
          columnId: 'col-14',
          icon: 'delete',
          color:'#BA1A1A'
        }
      ],
    }
  ],
};
const testData = ref(customersList);
const visibleData = ref(testData.value);

/* Data for crumb */
const crumbs = [
  { label: 'ホーム', id: 'crumb-1', href: '#' },
  { label: '顧客一覧', id: 'crumb-2', href: '#' },
];


/* location dropdown */
const locationDropdownOptions = ref([]);
const locationDropdownSelection = ref('');

/* classification dropdown */
const classificationData = [
  { label: '全て', code: '1'},
  { label: '個人', code: '2'},
  { label: '法人', code: '3'},
]
const classificationDropdownOptions = ref(classificationData);
const classificationDropdownSelection = ref('');

/* variousNumber */
const variousNumber = ref("")

/* customer ID */
const customerID = ref("")

/* ticker number */
const tickerNumber = ref("")

/* External reception number */
const externalReceptionNumber = ref("")

/* customer phone */
const customerPhone = ref("")

/* customer email */
const customerEmail = ref("")

/* button search/clear */
const onClickSearch = () => {
  console.log('clickedSearch');
};

const onClickClear = () => {
  console.log('clickedClear');
};

/* Family/Representative checkbox */
const includeFamily = ref(false)
const onlyRepresentative = ref(false)

/** Dialog Logic */
const isDialogOpen = ref(false);

const onCloseDialogSettingTable = () => {
  isDialogOpen.value = false;
};

const onOpenDialogSettingTable = () => {
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

/* Table logic */
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
  return testData.value.columns.find((column) => column.id === columnId)?.isSticky;
};

const getColumnUsesTooltip = (columnId: string) => {
  return testData.value.columns.find((column) => column.id === columnId)?.useTooltip;
};

const getColumnWidth = (columnId: string) => {
  return testData.value.columns.find((column) => column.id === columnId)?.width;
};

const onDisplayDetailCustomer = (rowId: string) => {
  console.log('displayDetailCustomer', rowId);
};

const deleteCustomer = (rowId: string) => {
  console.log('deleteCustomer', rowId);
};
const range = ref({
  start: new Date(),
  end: new Date(),
});

/* pagination logic */
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

const onChangePage = (page: number) => {
  currentPage.value = page;
};

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

/* download Form  */
const downloadForm = () => {
  console.log("download Form")
}
/* create new customer */
const createNewCustomer = () => {
  console.log("create new customer")
}

/* aggregate selected Customers */
const aggregateSelectedCustomer = () => {
  console.log("aggregate selected Customers")
}

</script>

<style scoped>

</style>