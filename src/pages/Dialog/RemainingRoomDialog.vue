<template>
  <Dialog
      :open="open"
      size="fullscreen"
      color="dark"
      @close-dialog="onCloseDialog"
  >
    <template #header>
      <Button
          v-if="props.isShowArrow"
          icon="arrow_back"
          type="text"
          color="neutral"
          size="large"
          @click="backToTicketSetting"
      ></Button>
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
          <FieldContainer label="宿泊施設選択" width="320px">
            <DropdownChecklists
                v-model:check-options="checkOptions"
                width="320px"
            >
            </DropdownChecklists>
          </FieldContainer>
          <FieldContainer label="宿泊開始日">
            <DatePicker
                width="240px"
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
          <Button width="120px" icon="search" color="neutral" size="large" @click="searchRoomInventoryCalendarsStore">
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
          v-if="newListDateCalendar"
          :blocks="sampleData.blocks"
          :calendar="newListDateCalendar"
          :list-reservation="listData"
          :color-for-selection="colorForSelection"
          :days-for-selection="getDaysForSelection(selectedId)"
          :room-inventories="listRoomInventoryCalendar"
          :rowNumber="selectedId"
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
            <TableColumn id="col-1" width="429px"> 宿泊施設 </TableColumn>
            <TableColumn id="col-2" width="240px"> 部屋タイプ </TableColumn>
            <TableColumn id="col-3" width="176px"> リクエスト </TableColumn>
            <TableColumn id="col-4" width="176px"> 部屋番号指定 </TableColumn>
            <TableColumn id="col-3" width="240px"> 宿泊開始日 </TableColumn>
            <TableColumn id="col-4" width="80px"> 泊数 </TableColumn>
            <TableColumn id="col-5" width="80px"> 室数 </TableColumn>
            <TableColumn id="col-6" width="80px"> 大人 </TableColumn>
            <TableColumn id="col-7" width="80px"> 中人 </TableColumn>
            <TableColumn id="col-8" width="80px"> 小人 </TableColumn>
            <TableColumn id="col-9" width="80px"> 幼児 </TableColumn>
            <TableColumn id="col-11" width="160px" text-align="center">
              泊毎に内容を変更
            </TableColumn>
            <TableColumn id="col-12" width="80px" text-align="center">
              削除
            </TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow :id="`row${index}`" v-for="(row, index) in listData" :key="index"
                    @click="onSelectRow(`${'row'+index}`, row, index)">
            <TableCell text-align="center" :slot-color="selectColor(row.colorIndex)">
              <span class="util-flex util-flex--justify-center">
                <RadioButton
                    :checked="selectedRow.includes(`${'row'+index}`)"
                    name="hotel-selection"
                    @input="onSelectRow(`${'row'+index}`, row, index)"
                />
              </span>
            </TableCell>
            <TableCell> {{row.hotelName}} </TableCell>
            <TableCell>
              <Dropdown
                  v-model:value="row.roomType"
                  placeholder=""
                  size="small"
                  width="224px"
                  :status="checkRoomType(row)"
                  :listRoomType="roomTypeOptions"
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
                  width="224px"
                  :date="row.arrival_date"
                  :rowId="index"
                  @change-date="onChangeDate"
              />
            </TableCell>
            <TableCell>
              <Dropdown
                  v-model:value="row.numberOfNight"
                  placeholder=""
                  size="small"
                  width="64px"
              >
                <DropdownItem
                    v-for="(option, i) in numericDropdownOptions14"
                    :key="i"
                    :label="option.label"
                    :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
            <TableCell>
              <Dropdown
                  v-model:value="row.numberOfRoom"
                  placeholder=""
                  size="small"
                  width="64px"
              >
                <DropdownItem
                    v-for="(option, i) in numericDropdownOptions30"
                    :key="i"
                    :label="option.label"
                    :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
            <TableCell>
              <Dropdown
                  v-model:value="row.numberAdult"
                  placeholder=""
                  size="small"
                  width="64px"
              >
                <DropdownItem
                    v-for="(option, i) in numericDropdownOptionsAdult"
                    :key="i"
                    :label="option.label"
                    :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
            <TableCell>
              <Dropdown
                  v-model:value="row.numberChildren"
                  placeholder=""
                  size="small"
                  width="64px"
              >
                <DropdownItem
                    v-for="(option, i) in numericDropdownOptions5"
                    :key="i"
                    :label="option.label"
                    :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
            <TableCell>
              <Dropdown
                  v-model:value="row.numberSmallChildren"
                  placeholder=""
                  size="small"
                  width="64px"
              >
                <DropdownItem
                    v-for="(option, i) in numericDropdownOptions5"
                    :key="i"
                    :label="option.label"
                    :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
            <TableCell>
              <Dropdown
                  v-model:value="row.numberBaby"
                  placeholder=""
                  size="small"
                  width="64px"
              >
                <DropdownItem
                    v-for="(option, i) in numericDropdownOptions5"
                    :key="i"
                    :label="option.label"
                    :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
            <TableCell text-align="center" >
              <InlinePopupSplitStays
                  :days-to-split="parseInt(row.numberOfNight)"
                  target-label="連泊"
                  counter-label="泊"
                  @confirm-split="onConfirmSplitNight"
                  :disabled="
                      row.numberOfNight <= 1 ||
                      !row.roomType ||
                      !row.hotelName ||
                      !row.arrival_date"
                  :row_id="index"
              />
            </TableCell>
            <TableCell text-align="center">
              <InlinePopup
                  direction="top"
                  aligned="right"
                  confirm-button-color="critical"
                  confirm-button-label="削除"
                  @confirm="onConfirmDeleteRow(index, row)"
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
            @click="onAddPattern(selectedId)"
            :disabled="disableAddButton"
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
      <div class="footer">
        <Text bold>{{`使用利用： ${props.ticketSelected ?? ''} ${props.numberSelected ?? '0'}`}}</Text>
        <div class="footer-right">
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
          <Button width="200px" disabled @click="onMakeReservation"> 予約 </Button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '@components/Text/Text.vue';
import {ref, Ref, computed, watch} from 'vue';
import Dialog from '@components/Dialog/Dialog.vue';
import Button from '@components/Button/Button.vue';
import Panel from '@components/Panel/Panel.vue';
import FieldContainer from '@components/FieldContainer/FieldContainer.vue';
import Dropdown from '@components/Dropdown/Dropdown.vue';
import DropdownItem from '@components/Dropdown/DropdownItem.vue';
import DropdownChecklists, {
  CheckOptionCategory,
} from '@components/DropdownChecklists/DropdownChecklists.vue';
import DropdownCheckboxes, {
  CheckOption,
} from '@components/DropdownCheckboxes/DropdownCheckboxes.vue';
import DatePicker from '@components/DatePicker/DatePicker.vue';
import Divider from '@components/Divider/Divider.vue';
import Table from '@components/Table/Table.vue';
import TableCell from '@components/Table/TableCell.vue';
import TableColumn from '@components/Table/TableColumn.vue';
import TableRow from '@components/Table/TableRow.vue';
import RadioButton from '@components/RadioButton/RadioButton.vue';
import Icon from '@components/Icon/Icon.vue';
import InlinePopup from '@components/InlinePopup/InlinePopup.vue';
import VacantRooms, {
  SlotColors,
  SelectedDates,
} from '@components/VacantRooms/VacantRooms.vue';
import ComboBox from '@components/ComboBox/ComboBox.vue';
import ComboBoxItem from '@components/ComboBox/ComboBoxItem.vue';
import TextField from '@components/TextField/TextField.vue';
import { vacanciesSampleDataPatternA } from '../../data/vacantRoomsTestData';
import InlinePopupSplitStays from '@components/InlinePopup/variations/InlinePopupSplitStays.vue';
import {useRoomInventoryCalendarsStore} from "@stores/front/roomInventoryCalendars";
import {
  RoomInventoriesApiListRoomInventoryCalendarsRequest,
  RoomInventoryCalendarItemTypeHotel
} from "../../openapi/front/api";
import {storeToRefs} from "pinia";
import { addDateToDay } from "@utils/handleDate"
const sampleData = vacanciesSampleDataPatternA();
const roomInventoryCalendarsStore = useRoomInventoryCalendarsStore();
const {data: listRoomInventoryCalendar} = storeToRefs(roomInventoryCalendarsStore);
const newListDateCalendar = ref<{ date: Date; disabled: boolean | undefined; }[]>();

const formatDate = (date: Date) => {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}
const getRoomInventoryCalendar = async () => {
  const apiParams = new RoomInventoriesApiListRoomInventoryCalendarsRequest();
  apiParams.accountId = "C01";
  apiParams.hotelId = "18";
  apiParams.dateRangeStart = formatDate(new Date());
  await roomInventoryCalendarsStore.fetch(apiParams);
  const listRoomInventoryCalendarValue = listRoomInventoryCalendar.value;
  if(listRoomInventoryCalendarValue && listRoomInventoryCalendarValue.length > 0){
    newListDateCalendar.value = roomInventoryCalendarsStore.newListDateCalendarGetter
    // const listItemTypeHotels = listRoomInventoryCalendarValue?.[0].item_type_hotels;
    // if(listItemTypeHotels){
    //   itemTypeHotels.value.pop();
    //   for(let i = 0; i < listItemTypeHotels.length; i++){
    //     const itemTypeHotel = ref<RoomInventoryCalendarItemTypeHotel>(new RoomInventoryCalendarItemTypeHotel);
    //     itemTypeHotel.value.dates = listItemTypeHotels[i].dates;
    //     itemTypeHotel.value.hotel = listItemTypeHotels[i].hotel;
    //     itemTypeHotel.value.item_type_name = listItemTypeHotels[i].item_type_name;
    //     itemTypeHotel.value.rooms_count_at_date_range_start = listItemTypeHotels[i].rooms_count_at_date_range_start;
    //     itemTypeHotel.value.room_types = listItemTypeHotels[i].room_types;
    //     itemTypeHotels.value.push(itemTypeHotel.value);
    //   }
    // }
  }
}
getRoomInventoryCalendar()

const getListDayOfWeek = () => {
  const listDayOfWeekJp = daysCheckOptions.value;
  const newArr = listDayOfWeekJp.map((item)=>item.checked)
  const listDayOfWeek = [""];
  const dayOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  listDayOfWeek.pop();
  for(let i=0; i < newArr.length; i++){
    if(newArr[i]){
      listDayOfWeek.push(dayOfWeek[i]);
    }
  }
  return listDayOfWeek;
}

const searchRoomInventoryCalendarsStore = async () => {
  const apiParams = new RoomInventoriesApiListRoomInventoryCalendarsRequest();
  apiParams.accountId = "C01";
  apiParams.hotelId = "18";
  apiParams.dateRangeStart = formatDate(selectedDate1.value);
  apiParams.dayOfWeeks = getListDayOfWeek() as Array<'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'>;
  await roomInventoryCalendarsStore.fetch(apiParams);
  const listRoomInventoryCalendarValue = listRoomInventoryCalendar.value;
  if(listRoomInventoryCalendarValue && listRoomInventoryCalendarValue.length > 0){
    // const listItemTypeHotels = listRoomInventoryCalendarValue?.[0].item_type_hotels;
    newListDateCalendar.value = roomInventoryCalendarsStore.newListDateCalendarGetter
    // if(listItemTypeHotels){
    //   itemTypeHotels.value.pop();
    //   for(let i = 0; i < listItemTypeHotels.length; i++){
    //     const itemTypeHotel = ref<RoomInventoryCalendarItemTypeHotel>(new RoomInventoryCalendarItemTypeHotel);
    //     itemTypeHotel.value.dates = listItemTypeHotels[i].dates;
    //     itemTypeHotel.value.hotel = listItemTypeHotels[i].hotel;
    //     itemTypeHotel.value.item_type_name = listItemTypeHotels[i].item_type_name;
    //     itemTypeHotel.value.rooms_count_at_date_range_start = listItemTypeHotels[i].rooms_count_at_date_range_start;
    //     itemTypeHotel.value.room_types = listItemTypeHotels[i].room_types;
    //     itemTypeHotels.value.push(itemTypeHotel.value);
    //   }
    // }
  }
}
const props = withDefaults(
    defineProps<{
      open: boolean,
      ticketSelected?: string,
      numberSelected?: number,
      isShowArrow?: boolean,
      hotelName?: string,
    }>(),
    {
      open: false,
      ticketSelected: '',
      numberSelected: 0,
      isShowArrow: false,
      hotelName: ''
    }
);
const emit = defineEmits<{ (event: 'closeDialog'): void }>();

const currentTextDropdownSelection1 = ref('001');

const currentNumericDropdownSelection1 = ref('1');

interface ExampleData {
  rowId: number,
  hotelName: string,
  roomType: string,
  arrival_date: Date,
  numberOfNight: string,
  numberOfRoom: string,
  numberAdult: string,
  numberChildren: string,
  numberSmallChildren: string,
  numberBaby: string,
  colorIndex: number
}

let exampleData = {
  rowId: 1,
  hotelName: '',
  roomType: '',
  arrival_date: null,
  numberOfNight: '1',
  numberOfRoom: '1',
  numberAdult: '1',
  numberChildren: '0',
  numberSmallChildren: '0',
  numberBaby: '0',
  colorIndex: 0
}
const listData = ref<ExampleData[]>([])
const countIndex = ref(0);
let deletedColor: number[] = []
listData.value.push(JSON.parse(JSON.stringify({...exampleData, colorIndex: 0})))
const disableAddButton = ref(true)

watch(() => listData.value, (currentValue) => {
  if(currentValue[selectedId.value].roomType && currentValue[selectedId.value].arrival_date && currentValue[selectedId.value].hotelName) {
    disableAddButton.value = false
  }
}, {deep: true}
);

const onConfirmDeleteRow = (index : number, row: ExampleData) => {
  deletedColor.push(row.colorIndex)
  deletedColor.sort((a, b) => a - b)
  listData.value.splice(index, 1)
  if(index <= selectedId.value && listData.value.length > 0) {
    if(index == selectedId.value && listData.value.length > selectedId.value) {
      const number = selectedId.value
      selectedRow.value = [`row${number}`]
    } else {
      const number = selectedId.value - 1
      selectedRow.value = [`row${number}`]
      selectedId.value -= 1
    }
  }
  if(listData.value.length === 0) {
    onConfirmDeleteAll()
  }
  if(listData.value.length){
    const color = selectColor(listData.value[selectedId.value].colorIndex)
    colorForSelection.value = color as SlotColors
  }
  if(!listData.value[selectedId.value].roomType || !listData.value[selectedId.value].arrival_date || !listData.value[selectedId.value].hotelName) {
    disableAddButton.value = true
  }
};

const onConfirmDeleteAll = () => {
  resetData()
  listData.value.push(JSON.parse(JSON.stringify({...exampleData, colorIndex: countIndex.value})))
};

const onAddPattern = (selectedId: number) => {
  if(!listData.value[selectedId].roomType || !listData.value[selectedId].arrival_date || !listData.value[selectedId].hotelName) return
  else disableAddButton.value = false
  if(countIndex.value == 9) {
    countIndex.value = -1
  }
  let colorIndex = deletedColor.length > 0 ? deletedColor.shift() : ++countIndex.value
  listData.value.push({...JSON.parse(JSON.stringify(exampleData)), hotelName: listData.value[selectedId].hotelName, colorIndex: colorIndex})
  disableAddButton.value = true
  const lastIndex = listData.value.length -1
  onSelectRow(`${'row'+lastIndex}`, listData.value[lastIndex], lastIndex)
};
/**** split night ****/
const onConfirmSplitNight = (splittedNights: number[], row_id: number) => {
  const preReservation = listData.value[row_id]
  listData.value[row_id].numberOfNight = splittedNights[0].toString()
  const numberNightArr = onTransformNight(splittedNights)
  splittedNights.slice(1).forEach((night, index) => {
    listData.value.splice(row_id + index + 1, 0, {
      ...JSON.parse(JSON.stringify(preReservation)),
      colorIndex: deletedColor.length > 0 ? deletedColor.shift() : ++countIndex.value,
      numberOfNight: night.toString(),
      arrival_date: onCalculateStartDate(preReservation.arrival_date,numberNightArr[index])
    })
  })
  const lastIndex = row_id + splittedNights.length - 1
  onSelectRow(`${'row'+lastIndex}`, listData.value[lastIndex], lastIndex)
};
const onCalculateStartDate = (startDate: Date, numberOfNight: number) => {
  return addDateToDay(startDate, numberOfNight)
}
const onTransformNight = (splittedNights: number[]) => {
  return splittedNights
      .slice(0, splittedNights.length - 1)
      .map((elems, index) => !index
          ? elems
          : splittedNights.slice(0, index + 1).reduce((preVal, curVal) => preVal + curVal, 0))
}

const resetData = () => {
  listData.value = []
  deletedColor = []
  countIndex.value = 0
  selectedRow.value = ['row0']
  selectedId.value = 0
  colorForSelection.value = 'slot01'
  disableAddButton.value = true
}

const slotColor = [
  "slot01",
  "slot02",
  "slot03",
  "slot04",
  "slot05",
  "slot06",
  "slot07",
  "slot08",
  "slot09",
  "slot10",
  ''
]
const selectColor = (index: number) => {
  return slotColor[index]
}

const checkRoomType = (row: any) => {
  return row.roomType ? 'default' : 'error'
}

const currentNumericDropdownSelection6 = ref('1');

const roomCondition = ref('');
const roomRequest = ref('');
const selectedDate1 = ref(new Date());
const roomCodeRow1 = ref('301');
const roomRequestRow1 = ref('海側');

const errorMessageActivated = ref(true);

const colorForSelection: Ref<SlotColors> = ref('slot01');

const selectedRow = ref(['row0']);
const selectedId = ref(0);

const selectDays = (selectedDays: SelectedDates, rowNumber: number, roomName: string) => {
  const { blockId, categoryId, dates } = selectedDays;
  listData.value[rowNumber].hotelName = roomName
  listData.value[rowNumber].roomType = categoryId
  listData.value[rowNumber].arrival_date = dates[0]
  disableAddButton.value = false
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

const onChangeDate = (date: Date, rowId: number) => {
  listData.value[rowId].arrival_date = date;
};

const onSelectRow = (rowId: string, item: any, index: number) => {
  selectedId.value = index
  const color = selectColor(item.colorIndex) as SlotColors
  selectedRow.value = [rowId]
  colorForSelection.value = color
  if (listData.value[index].roomType && listData.value[index].arrival_date && listData.value[index].hotelName) {
    disableAddButton.value = false
  } else {
    disableAddButton.value = true
  }
};

const onConfirmSplit1 = (splittedNights: number[]) => {
  console.log('onConfirmSplit1', splittedNights);
};


const onMakeReservation = () => {
  console.log('onMakeReservation');
};

const getDaysForSelection = (selectedId: number) => {
  return parseInt(listData.value[selectedId].numberOfNight.toString())
};

const checkOptionsSample: Array<CheckOptionCategory> = [
  {
    label: '東北・北関東エリア',
    checked: false,
    options: [
      {
        label: '裏磐梯グランデコ',
        checked: false,
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
watch(()=> props.hotelName, (newVal) => {
  setHotelNameToSelectBox(props.hotelName)
})
const setHotelNameToSelectBox = (hotelName: string) => {
  checkOptions.value.forEach(item => {
    item.options.forEach((option: any) => {
      if(option.label === convertToHalfSize(hotelName)) {
        option.checked = true
        item.checked = true
      } else {
        option.checked = false
        item.checked = false
      }
    })
  });
}
const convertToHalfSize = (hotelName : string) => {
  return hotelName.replace(/[\uff01-\uff5e]/g,
      function(name) { return String.fromCharCode(name.charCodeAt(0) - 0xfee0); })
}

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

const membershipNumberOptions = [
  {
    label: 'UG00001（裏磐梯グランデコ）',
    value: '001',
  },
  {
    label: 'UG00002（裏磐梯グランデコ）',
    value: '002',
  },
  {
    label: 'UG00003（裏磐梯グランデコ）',
    value: '003',
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

const numericDropdownOptions5 = computed(() => {
  const options = [];
  for (let i = 0; i <= 5; i++) {
    options.push({ label: i.toString(), value: i.toString() });
  }
  return options;
});

const numericDropdownOptionsAdult = computed(() => {
  const options = [];
  for (let i = 1; i <= 5; i++) {
    options.push({ label: i.toString(), value: i.toString() });
  }
  return options;
});

const numericDropdownOptions14 = computed(() => {
  const options = [];
  for (let i = 1; i <= 14; i++) {
    options.push({ label: i.toString(), value: i.toString() });
  }
  return options;
});

const numericDropdownOptions30 = computed(() => {
  const options = [];
  for (let i = 1; i <= 30; i++) {
    options.push({ label: i.toString(), value: i.toString() });
  }
  return options;
});

const openDialog = ref(true);

const onCloseDialog = () => {
  setHotelNameToSelectBox(props.hotelName)
  emit('closeDialog');
};

const backToTicketSetting = () => {
  setHotelNameToSelectBox(props.hotelName)
  emit('closeDialog');
}

</script>

<style scoped>
.footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-right {
  display: flex;
}
</style>