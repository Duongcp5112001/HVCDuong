<template>
  <Button @click="openDialog = true">Open Dialog</Button>
  <Dialog
    :open="openDialog"
    size="fullscreen"
    color="dark"
    @close-dialog="onCloseDialog"
  >
    <template #header>
      <Text size="xl" bold>残室確認／詳細設定予約</Text>
    </template>
    <Panel class="util-mb-16" width="100%">
      <span
        class="
          util-flex util-flex--align-end
          util-full-width
          util-flex--wrap util-flex--row-gap8
        "
      >
        <span class="util-flex util-flex--align-center util-flex--gap8">
          <FieldContainer label="施設" width="320px">
            <DropdownChecklists
              v-model:check-options="checkOptions"
              width="320px"
            >
            </DropdownChecklists>
          </FieldContainer>
          <FieldContainer label="宿泊開始日">
            <DatePicker
              width="160px"
              :date="selectedDate1"
              @change-date="onChangeDate1"
            />
          </FieldContainer>
          <FieldContainer label="お部屋条件" width="128px">
            <ComboBox
              v-model:value="roomCondition"
              placeholder=""
              width="128px"
              :search-icon="false"
            >
              <ComboBoxItem
                v-for="(option, i) in roomConditionOptions"
                :key="i"
                :label="option.label"
                :value="option.value"
              >
              </ComboBoxItem>
            </ComboBox>
          </FieldContainer>
          <FieldContainer label="リクエスト" width="128px">
            <ComboBox
              v-model:value="roomRequest"
              placeholder=""
              width="128px"
              :search-icon="false"
              disabled
            >
              <ComboBoxItem
                v-for="(option, i) in roomRequestOptions"
                :key="i"
                :label="option.label"
                :value="option.value"
              >
              </ComboBoxItem>
            </ComboBox>
          </FieldContainer>
          <FieldContainer label="曜日" width="240px">
            <DropdownCheckboxes
              v-model:check-options="daysCheckOptions"
              width="240px"
              placeholder="曜日選択"
            >
            </DropdownCheckboxes>
          </FieldContainer>
        </span>
        <span class="util-flex util-ml-16 util-flex--align-end">
          <Button width="120px" icon="search" color="neutral" size="large">
            検索
          </Button>
        </span>
      </span>
      <Divider class="util-mt-24" margin="16px"> </Divider>
      <div
        class="
          util-flex util-flex--align-center
          util-full-width
          util-flex--justify-between
          util-mb-16
        "
      >
        <Text size="large" bold> リクエスト ： エレベーター近く </Text>
        <div class="util-flex util-flex--gap8">
          <Button color="neutral" type="outlined"> 顧客部屋リクエスト </Button>
          <Button color="neutral" type="outlined"> アサイン照会 </Button>
        </div>
      </div>
      <VacantRooms
        :blocks="sampleData.blocks"
        :calendar="sampleData.calendar"
        :color-for-selection="colorForSelection"
        :days-for-selection="getDaysForSelection()"
        @selected-days="selectDays"
        @go-to-prev-two-weeks="goToPrevTwoWeeks"
        @go-to-next-two-weeks="goToNextTwoWeeks"
      >
      </VacantRooms>
    </Panel>
    <Panel width="100%">
      <Table
        :selected-rows-ids="selectedRow"
        fixed-layout
        selection-type="border"
        :is-top-sticky="false"
      >
        <template #head>
          <TableRow id="row-0">
            <TableColumn id="col-0" width="48px"> </TableColumn>
            <TableColumn id="col-1" width="301px"> 宿泊施設 </TableColumn>
            <TableColumn id="col-2" width="240px"> 部屋タイプ </TableColumn>
            <TableColumn id="col-3" width="176px"> リクエスト </TableColumn>
            <TableColumn id="col-4" width="176px"> 部屋番号指定 </TableColumn>
            <TableColumn id="col-5" width="176px"> 宿泊開始日 </TableColumn>
            <TableColumn id="col-6" width="80px"> 泊数 </TableColumn>
            <TableColumn id="col-7" width="80px"> 部屋数 </TableColumn>
            <TableColumn id="col-8" width="80px"> 大人 </TableColumn>
            <TableColumn id="col-9" width="80px"> 中人 </TableColumn>
            <TableColumn id="col-10" width="80px"> 小人 </TableColumn>
            <TableColumn id="col-11" width="80px"> 幼児 </TableColumn>
            <TableColumn id="col-12" width="160px" text-align="center">
              泊毎に内容を変更
            </TableColumn>
            <TableColumn id="col-16" width="80px" text-align="center">
              削除
            </TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow id="row-1">
            <TableCell text-align="center" slot-color="slot01">
              <span class="util-flex util-flex--justify-center">
                <RadioButton
                  :checked="selectedRow.includes('row-1')"
                  name="hotel-selection"
                  @input="onSelectRow('row-1')"
                />
              </span>
            </TableCell>
            <TableCell> 裏磐梯グランデコ </TableCell>
            <TableCell>
              <ComboBox
                v-model:value="row1RoomType"
                placeholder=""
                size="small"
                width="224px"
                :search-icon="false"
              >
                <ComboBoxItem
                  v-for="(option, i) in roomTypeOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </ComboBoxItem>
              </ComboBox>
            </TableCell>
            <TableCell>
              <ComboBox
                v-model:value="roomRequestRow1"
                placeholder=""
                size="small"
                width="160px"
                :search-icon="false"
              >
                <ComboBoxItem
                  v-for="(option, i) in roomRequestOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </ComboBoxItem>
              </ComboBox>
            </TableCell>
            <TableCell>
              <TextField
                v-model="roomCodeRow1"
                input-type="number"
                placeholder="0"
                width="159px"
              />
            </TableCell>
            <TableCell>
              <DatePicker
                size="small"
                width="160px"
                :date="row1Date"
                @change-date="onChangeRow1Date"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="daysNumberRow1"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="roomsNumberRow1"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="adultsNumberRow1"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="childrenNumberRow1"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="infantsNumberRow1"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="babiesNumberRow1"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell text-align="center">
              <InlinePopupSplitStays
                :days-to-split="14"
                target-label="連泊"
                aligned="right"
                counter-label="泊"
                @confirm-split="onConfirmSplit1"
              />
            </TableCell>
            <TableCell text-align="center">
              <InlinePopup
                direction="top"
                aligned="right"
                confirm-button-color="critical"
                confirm-button-label="削除"
                @confirm="onConfirmDeleteRow1"
              >
                <Button color="critical" icon="delete" type="text" />
                <template #popupTitle>削除しますか？</template>
              </InlinePopup>
            </TableCell>
          </TableRow>
          <TableRow id="row-2">
            <TableCell text-align="center" slot-color="slot02">
              <span class="util-flex util-flex--justify-center">
                <RadioButton
                  :checked="selectedRow.includes('row-2')"
                  name="hotel-selection"
                  @input="onSelectRow('row-2')"
                />
              </span>
            </TableCell>
            <TableCell> 裏磐梯グランデコ </TableCell>
            <TableCell>
              <ComboBox
                v-model:value="row2RoomType"
                placeholder=""
                size="small"
                width="224px"
                :search-icon="false"
              >
                <ComboBoxItem
                  v-for="(option, i) in roomTypeOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </ComboBoxItem>
              </ComboBox>
            </TableCell>
            <TableCell>
              <ComboBox
                v-model:value="roomRequestRow2"
                placeholder=""
                size="small"
                width="160px"
                :search-icon="false"
              >
                <ComboBoxItem
                  v-for="(option, i) in roomRequestOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </ComboBoxItem>
              </ComboBox>
            </TableCell>
            <TableCell>
              <TextField
                v-model="roomCodeRow2"
                input-type="number"
                placeholder="0"
                width="159px"
              />
            </TableCell>
            <TableCell>
              <DatePicker
                size="small"
                width="160px"
                :date="row2Date"
                @change-date="onChangeRow2Date"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="daysNumberRow2"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="roomsNumberRow2"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="adultsNumberRow2"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="childrenNumberRow2"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="infantsNumberRow2"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="babiesNumberRow2"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell text-align="center">
              <InlinePopupSplitStays
                :days-to-split="14"
                target-label="連泊"
                aligned="right"
                counter-label="泊"
                @confirm-split="onConfirmSplit2"
              />
            </TableCell>
            <TableCell text-align="center">
              <InlinePopup
                direction="top"
                aligned="right"
                confirm-button-color="critical"
                confirm-button-label="削除"
                @confirm="onConfirmDeleteRow2"
              >
                <Button color="critical" icon="delete" type="text" />
                <template #popupTitle>削除しますか？</template>
              </InlinePopup>
            </TableCell>
          </TableRow>
        </template>
      </Table>
      <span
        v-show="errorMessageActivated"
        class="util-flex util-py-8 util-px-16"
      >
        <Icon
          class="util-mr-8"
          icon="do_not_disturb"
          :size="16"
          color="#CA5046"
        />
        <Text color="critical" size="small">
          この状態では予約できません。予約できないスロットが選択されています。
        </Text>
      </span>
      <span
        class="
          util-flex util-full-width
          util-flex--justify-between
          util-mt-16 util-mb-8
        "
      >
        <Button
          width="120px"
          type="outlined"
          color="neutral"
          @click="onAddPattern"
        >
          追加
        </Button>
        <InlinePopup
          direction="top"
          aligned="right"
          confirm-button-color="critical"
          confirm-button-label="削除"
          @confirm="onConfirmDeleteAll"
        >
          <Button width="120px" type="outlined" color="critical">
            全て削除
          </Button>
          <template #popupTitle>全て削除</template>
        </InlinePopup>
      </span>
    </Panel>
    <template #footer>
      <span
        class="util-flex util-flex--align-center util-flex--gap16 util-mr-32"
      >
        <Text bold>合計人数：</Text>
        <span>
          <Text bold>大人</Text>
          <Text class="util-ml-4 util-mr-4" bold size="xl">2</Text>
          <Text bold>人</Text>
        </span>
        <span>
          <Text bold>中人</Text>
          <Text class="util-ml-4 util-mr-4" bold size="ll">0</Text>
          <Text bold>人</Text>
        </span>
        <span>
          <Text bold>小人</Text>
          <Text class="util-ml-4 util-mr-4" bold size="ll">0</Text>
          <Text bold>人</Text>
        </span>
        <span>
          <Text bold>幼児</Text>
          <Text class="util-ml-4 util-mr-4" bold size="ll">0</Text>
          <Text bold>人</Text>
        </span>
      </span>
      <Button width="200px" @click="onMakeReservation"> 予約 </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import { ref, Ref } from 'vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Button from '../components/Button/Button.vue';
import Panel from '../components/Panel/Panel.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import DropdownChecklists, {
  CheckOptionCategory,
} from '../components/DropdownChecklists/DropdownChecklists.vue';
import DropdownCheckboxes, {
  CheckOption,
} from '../components/DropdownCheckboxes/DropdownCheckboxes.vue';
import DatePicker from '../components/DatePicker/DatePicker.vue';
import Divider from '../components/Divider/Divider.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import RadioButton from '../components/RadioButton/RadioButton.vue';
import Icon from '../components/Icon/Icon.vue';
import InlinePopup from '../components/InlinePopup/InlinePopup.vue';
import VacantRooms, {
  SlotColors,
  SelectedDates,
} from '../components/VacantRooms/VacantRooms.vue';
import ComboBox from '../components/ComboBox/ComboBox.vue';
import ComboBoxItem from '../components/ComboBox/ComboBoxItem.vue';
import TextField from '../components/TextField/TextField.vue';
import { vacanciesSampleDataPatternC } from '../data/vacantRoomsTestData';
import InlinePopupSplitStays from '../components/InlinePopup/variations/InlinePopupSplitStays.vue';

const sampleData = vacanciesSampleDataPatternC();

const roomCodeRow1 = ref('301');
const daysNumberRow1 = ref('1');
const roomsNumberRow1 = ref('1');
const adultsNumberRow1 = ref('2');
const childrenNumberRow1 = ref('0');
const infantsNumberRow1 = ref('0');
const babiesNumberRow1 = ref('0');

const roomRequestRow1 = ref('海側');
const roomRequestRow2 = ref('海側');

const roomCodeRow2 = ref('301');
const daysNumberRow2 = ref('1');
const roomsNumberRow2 = ref('1');
const adultsNumberRow2 = ref('2');
const childrenNumberRow2 = ref('0');
const infantsNumberRow2 = ref('0');
const babiesNumberRow2 = ref('0');

const roomCondition = ref('');
const roomRequest = ref('');
const selectedDate1 = ref(new Date());

const errorMessageActivated = ref(false);

const colorForSelection: Ref<SlotColors> = ref('slot01');

const selectedRow = ref(['row-1']);
const row1RoomType = ref('SDツイン');
const row2RoomType = ref('SDツイン');
const row1Date = ref(new Date());
const row2Date = ref(new Date());

const selectDays = (selectedDays: SelectedDates) => {
  const { blockId, categoryId, dates } = selectedDays;
  console.log(
    'The selected dates:',
    dates,
    '\nInside the category Id:',
    categoryId,
    '\nInside the block Id:',
    blockId
  );

  switch (selectedRow.value[0]) {
    case 'row-1':
      row1RoomType.value = categoryId;
      row1Date.value = dates[0];
      break;
    case 'row-2':
      row2RoomType.value = categoryId;
      row2Date.value = dates[0];
      break;
    default:
      break;
  }
};

const goToPrevTwoWeeks = () => {
  console.log('goToPrevTwoWeeks');
};

const goToNextTwoWeeks = () => {
  console.log('goToNextTwoWeeks');
};

const onChangeDate1 = (date: Date) => {
  console.log('onChangeDate', date);
  selectedDate1.value = date;
};

const onChangeRow1Date = (date: Date) => {
  console.log('onChangeDate', date);
  row1Date.value = date;
};

const onChangeRow2Date = (date: Date) => {
  console.log('onChangeDate', date);
  row2Date.value = date;
};

const onSelectRow = (rowId: string) => {
  console.log('onSelectRow', rowId);
  switch (rowId) {
    case 'row-1':
      selectedRow.value = ['row-1'];
      colorForSelection.value = 'slot01';
      break;
    case 'row-2':
      selectedRow.value = ['row-2'];
      colorForSelection.value = 'slot02';
      break;
    default:
      selectedRow.value = [];
      colorForSelection.value = '';
      break;
  }
};

const onConfirmSplit1 = (splittedNights: number[]) => {
  console.log('onConfirmSplit1', splittedNights);
};
const onConfirmSplit2 = (splittedNights: number[]) => {
  console.log('onConfirmSplit2', splittedNights);
};

const onConfirmDeleteRow1 = () => {
  console.log('onConfirmDeleteRow1');
};

const onConfirmDeleteRow2 = () => {
  console.log('onConfirmDeleteRow2');
};

const onConfirmDeleteAll = () => {
  console.log('onConfirmDeleteAll');
};

const onAddPattern = () => {
  console.log('onAddPattern');
};

const onMakeReservation = () => {
  console.log('onMakeReservation');
};

const getDaysForSelection = () => {
  switch (selectedRow.value[0]) {
    case 'row-1':
      return parseInt(daysNumberRow1.value);
    case 'row-2':
      return parseInt(daysNumberRow2.value);
    default:
      return 0;
  }
};

const checkOptionsSample: Array<CheckOptionCategory> = [
  {
    label: '東北・北関東エリア',
    checked: true,
    options: [
      {
        label: '裏磐梯グランデコ',
        checked: true,
      },
      {
        label: '那須',
        checked: true,
      },
      {
        label: '那須Retreat',
        checked: true,
      },
      {
        label: '鬼怒川',
        checked: true,
      },
    ],
  },
  {
    label: '関東エリア',
    checked: true,
    options: [
      {
        label: '勝浦',
        checked: false,
      },
      {
        label: '箱根明神平',
        checked: false,
      },
      {
        label: '箱根甲子園',
        checked: false,
      },
    ],
  },
  {
    label: '東海エリア',
    checked: false,
    options: [
      {
        label: '熱海伊豆山',
        checked: false,
      },
      {
        label: '天城高原',
        checked: false,
      },
      {
        label: '浜名湖',
        checked: false,
      },
      {
        label: '静波海岸',
        checked: false,
      },
    ],
  },
  {
    label: '甲信エリア',
    checked: false,
    options: [
      {
        label: '山中湖マウント富士',
        checked: false,
      },
      {
        label: '斑尾',
        checked: false,
      },
      {
        label: '旧軽井沢 / 旧軽井沢アネックス',
        checked: false,
      },
      {
        label: '軽井沢',
        checked: false,
      },
      {
        label: '蓼科',
        checked: false,
      },
      {
        label: '蓼科アネックス',
        checked: false,
      },
      {
        label: '蓼科リゾート',
        checked: false,
      },
    ],
  },
  {
    label: '関西エリア',
    checked: false,
    options: [
      {
        label: 'スキージャム勝山',
        checked: false,
      },
      {
        label: '南紀田辺',
        checked: false,
      },
      {
        label: '京都鷹峯',
        checked: false,
      },
      {
        label: '京都東山 In THE HOTEL HIGASHIYAMA',
        checked: false,
      },
      {
        label: '有馬六彩',
        checked: false,
      },
    ],
  },
  {
    label: 'VIALAシリーズ',
    checked: false,
    options: [
      {
        label: 'VIALA箱根翡翠',
        checked: false,
      },
      {
        label: 'VIALA annex熱海伊豆山',
        checked: false,
      },
      {
        label: 'VIALA annex軽井沢',
        checked: false,
      },
      {
        label: 'VIALA annex京都鷹峯',
        checked: false,
      },
      {
        label: 'VIALA annex有馬六彩',
        checked: false,
      },
      {
        label: '箱根明神平',
        checked: false,
      },
      {
        label: '箱根甲子園',
        checked: false,
      },
    ],
  },
  {
    label: '準相互利用施設',
    checked: false,
    options: [
      {
        label: '都リゾート 志摩ベイサイドテラス',
        checked: false,
      },
      {
        label: 'プレジデントリゾートホテル軽井沢',
        checked: false,
      },
      {
        label: '京都鷹峯',
        checked: false,
      },
      {
        label: 'プリンス バケーション クラブ',
        checked: false,
      },
      {
        label: 'nol kyoto sanjo',
        checked: false,
      },
    ],
  },
];

const checkOptions = ref(checkOptionsSample);

const daysCheckOptionsSample: Array<CheckOption> = [
  {
    label: '日曜',
    checked: false,
  },
  {
    label: '月曜',
    checked: false,
  },
  {
    label: '火曜',
    checked: false,
  },
  {
    label: '水曜',
    checked: false,
  },
  {
    label: '木曜',
    checked: false,
  },
  {
    label: '金曜',
    checked: false,
  },
  {
    label: '土曜',
    checked: false,
  },
];

const daysCheckOptions = ref(daysCheckOptionsSample);

const roomConditionOptions = [
  {
    label: '禁煙',
    value: '001',
  },
  {
    label: 'タバコ可',
    value: '002',
  },
  {
    label: 'ペットルーム',
    value: '003',
  },
  {
    label: '家族露天風呂',
    value: '004',
  },
  {
    label: 'ラージタイプ',
    value: '005',
  },
];

const roomRequestOptions = [
  {
    label: '海側',
    value: '001',
  },
  {
    label: '山側',
    value: '002',
  },
  {
    label: 'エレベーター近く',
    value: '003',
  },
  {
    label: '角部屋',
    value: '004',
  },
  {
    label: '上層階',
    value: '005',
  },
];

const roomTypeOptions = [
  {
    label: 'SDツイン',
    value: 'category-1-1',
  },
  {
    label: 'EX ツイン',
    value: 'category-1-2',
  },
  {
    label: 'SDファミリーツイン',
    value: 'category-1-3',
  },
  {
    label: 'SDツイン',
    value: 'category-2-1',
  },
];

const openDialog = ref(true);

const onCloseDialog = () => {
  openDialog.value = false;
};
</script>

<style scoped lang="scss"></style>
