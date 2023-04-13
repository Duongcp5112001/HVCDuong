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
          <TableRow v-for="row in rows" :id="row.id">
            <TableCell text-align="center" :slot-color="row.colorSlot">
              <span class="util-flex util-flex--justify-center">
                <RadioButton
                  :checked="selectedRow.includes(row.id)"
                  name="hotel-selection"
                  @input="onSelectRow(row.id)"
                />
              </span>
            </TableCell>
            <TableCell> 裏磐梯グランデコ </TableCell>
            <TableCell>
              <ComboBox
                v-model:value="row.roomType"
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
                v-model:value="row.roomRequest"
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
                v-model="row.roomCode"
                input-type="number"
                placeholder="0"
                width="159px"
              />
            </TableCell>
            <TableCell>
              <DatePicker
                size="small"
                width="160px"
                placeholder="yyyy/mm/dd"
                :date="row.roomDate"
                @change-date="onChangeRowDate(row.id, row.roomDate)"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="row.roomDays"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="row.roomNumber"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="row.roomAdults"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="row.roomChildren"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="row.roomInfants"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell>
              <TextField
                v-model="row.roomBabies"
                input-type="number"
                placeholder="0"
                width="63px"
              />
            </TableCell>
            <TableCell text-align="center">
              <InlinePopupSplitStays
                :row-id="row.id"
                :days-to-split="Number(row.roomDays)"
                target-label="連泊"
                aligned="right"
                counter-label="泊"
                :disabled="Number(row.roomDays) > 1 ? false : true"
                @confirm-split="onConfirmSplit1"
              />
            </TableCell>
            <TableCell text-align="center">
              <InlinePopup
                direction="top"
                aligned="right"
                confirm-button-color="critical"
                confirm-button-label="削除"
                @confirm="onConfirmDeleteRow1(row.id)"
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
          :disabled="errorMessageActivated"
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
      <Button width="200px" @click="onMakeReservation" :disabled="errorMessageActivated"> 予約 </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import { computed, ref, Ref } from 'vue';
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
import { vacanciesSampleDataPatternB } from '../data/vacantRoomsTestData';
import InlinePopupSplitStays from '../components/InlinePopup/variations/InlinePopupSplitStays.vue';

const sampleData = vacanciesSampleDataPatternB();

const roomCondition = ref('');
const roomRequest = ref('');
const selectedDate1 = ref(new Date());

const colorForSelection: Ref<SlotColors> = ref('slot01');
const selectedRow = ref(['1']);

interface RowType {
  id: string,
  roomType: string,
  roomRequest: string,
  roomCode: string,
  roomDate: Date,
  roomDays: string,
  roomNumber: string,
  roomAdults: string,
  roomChildren: string,
  roomInfants: string,
  roomBabies: string,
  colorSlot: string
}

const rows = ref<RowType[]>([
  {
    id: '1',
    roomType: '',
    roomRequest: '海側',
    roomCode: '301',
    roomDate: null,
    roomDays: '1',
    roomNumber: '1',
    roomAdults: '2',
    roomChildren: '0',
    roomInfants: '0',
    roomBabies: '0',
    colorSlot: 'slot01'
  },
])



const errorMessageActivated = computed(() => {
  for (const row of rows.value) {
    if (selectedRow.value[0] === row.id) {
      const type = row.roomType;
      const date = row.roomDate;
      return checkError(type, date);
    }
  }
})

const checkError = (code: string, date: Date) => {
  if (code === '' || date === null) {
    return true;
  } else {
    return false;
  }
}


const selectDays = (selectedDays: SelectedDates) => {
  const { categoryName, dates } = selectedDays;
  
  for (let i = 0; i < rows.value.length; i++) {
    if (selectedRow.value[0] === rows.value[i].id) {
      rows.value[i].roomType = categoryName;
      rows.value[i].roomDate = dates[0];
    }
  }
};

const goToPrevTwoWeeks = () => {
  console.log('goToPrevTwoWeeks');
};

const goToNextTwoWeeks = () => {
  console.log('goToNextTwoWeeks');
};

const onChangeDate1 = (date: Date) => {
  selectedDate1.value = date;
};

const onChangeRowDate = (id: string, date: Date) => {
  for (const row of rows.value) {
    if (id === row.id) {
      row.roomDate = date;
    }
  }
  
};

const onSelectRow = (rowId: string) => {
  for (const row of rows.value) {
    if (rowId === row.id) {
      selectedRow.value = [row.id];
      colorForSelection.value = row.colorSlot;
    }
  }
};

const onConfirmSplit1 = (splittedNights: number[], rowId: string) => {
  const rowData = rows.value.filter((row) => row.id === rowId);
 

  for (const row of rowData) {
    for (let j = 1; j < splittedNights.length; j++) {
      let maxId = 0;
      rows.value.forEach(row => {
          if (Number(row.id) > maxId) {
            maxId = Number(row.id);
        }
      })
      
      const getDateRow = row.roomDate.getDate();
      const row1 = String(maxId + 1);
      const row2 = row.roomType;
      const row3 = row.roomRequest;
      const row4 = row.roomCode;
      const row5 = new Date(row.roomDate.setDate(getDateRow + 1));
      const row6 = String(splittedNights[j]);
      const row7 = row.roomNumber;
      const row8 = row.roomAdults;
      const row9 = row.roomChildren;
      const row10 = row.roomInfants;
      const row11 = row.roomBabies;
      const row12 = "slot0" + String(maxId + 1)
      row.roomDays = String(Number(row.roomDays) - splittedNights[j]);

      const dataDone: RowType = {
        id: row1,
        roomType: row2,
        roomRequest: row3,
        roomCode: row4,
        roomDate: row5,
        roomDays: row6,
        roomNumber: row7,
        roomAdults: row8,
        roomChildren: row9,
        roomInfants: row10,
        roomBabies: row11,
        colorSlot: row12
      }

      rows.value.push(dataDone)

      console.log(rows.value);
    };
  }
};

const onConfirmDeleteRow1 = (id: string) => {
  const rowToDelete = rows.value.findIndex((row) => row.id === id);

  if (rowToDelete > 0) {
    rows.value.splice(rowToDelete, 1);
  } else {
    const row1 = rows.value.find(row => row.id === '1')
    row1.id = '1';
    row1.roomType = '';
    row1.roomRequest = '海側';
    row1.roomCode = '301';
    row1.roomDate = null;
    row1.roomDays = '1';
    row1.roomNumber = '1';
    row1.roomAdults = '2';
    row1.roomChildren = '0';
    row1.roomInfants = '0';
    row1.roomBabies = '0';
    row1.colorSlot = 'slot01'
  }

  return rows.value;
};


const onConfirmDeleteAll = () => {
  rows.value.splice(1, rows.value.length - 1);

  const row2 = rows.value.find((data) => data.id === '1')
  row2.id = '1';
  row2.roomType = '';
  row2.roomRequest = '海側';
  row2.roomCode = '301';
  row2.roomDate = null;
  row2.roomDays = '1';
  row2.roomNumber = '1';
  row2.roomAdults = '2';
  row2.roomChildren = '0';
  row2.roomInfants = '0';
  row2.roomBabies = '0';
  row1.colorSlot = 'slot01'

  return rows.value;
};

const onAddPattern = () => {
  console.log('onAddPattern');
};

const onMakeReservation = () => {
  console.log('onMakeReservation');
};

const getDaysForSelection = () => {
  for (const row of rows.value) {
    if (selectedRow.value[0] === row.id) {
      return parseInt(row.roomDays);
    }
  }
};

const checkOptionsSample: Array<CheckOptionCategory> = [
  {
    label: '東北・北関東エリア',
    checked: false,
    options: [
      {
        label: '裏磐梯グランデコ',
        checked: true,
      },
      {
        label: '那須',
        checked: false,
      },
      {
        label: '那須Retreat',
        checked: false,
      },
      {
        label: '鬼怒川',
        checked: false,
      },
    ],
  },
  {
    label: '関東エリア',
    checked: false,
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
];

const openDialog = ref(true);

const onCloseDialog = () => {
  openDialog.value = false;
};
</script>

<style scoped lang="scss"></style>
