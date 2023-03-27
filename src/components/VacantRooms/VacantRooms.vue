<template>
  <div class="table-container">
    <table>
      <thead>
        <tr class="controls-headers">
          <th class="block-header"></th>
          <th class="controls-headers__prev">
            <Button
              icon="keyboard_arrow_left"
              type="text"
              size="small"
              @click="goToPrevTwoWeeks"
            >
              前の２週間
            </Button>
          </th>
          <th class="controls-headers__next" colspan="2">
            <Button
              icon="keyboard_arrow_right"
              icon-position="right"
              type="text"
              size="small"
              @click="goToNextTwoWeeks"
            >
              次の２週間
            </Button>
          </th>
          <th
            v-for="(month, index) in displayedMonths"
            :key="`${month}-${index}`"
            class="controls__month-header"
          >
            <Text color="light">{{ month }}</Text>
          </th>
        </tr>
        <tr>
          <th class="block-header">ブロック</th>
          <th class="room-name-header">施設・部屋タイプ</th>
          <th class="capacity-header">定員</th>
          <th class="count-header">部屋数</th>
          <th
            v-for="(day, index) in calendar"
            :key="`${day.date}-${index}`"
            class="day-header"
          >
            <div :class="getDayHeaderContentClass(day)">
              <span>{{ weekDayToText(day.date.getDay()) }}</span>
              <span>{{ day.date.getDate() }}</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody
        v-for="block in blocks"
        :key="`${block.id}`"
        class="block-separation-border"
      >
        <tr>
          <td :rowspan="block.room.categories.length + rowsOutsideCategories">
            {{ block.name }}
          </td>
          <td>
            <span class="category-cell">
              <button
                class="category-cell__expand-button"
                @click="toggleCategoriesVisibility(block.room.id)"
              >
                <Icon
                  :icon="getCategoryToggleIcon(block.room.id)"
                  color="#0061A3"
                  :size="24"
                />
                {{ block.room.name }}
              </button>
              <Tooltip direction="right">
                <Icon
                  icon="info"
                  type="outlined"
                  color="#40709E"
                  :size="20"
                ></Icon>
                <template #toolTipContent>
                  <span>
                    {{ block.room.tooltip }}
                  </span>
                </template>
              </Tooltip>
            </span>
          </td>
          <td></td>
          <td>
            {{ block.room.total }}
          </td>
          <td
            v-for="(day, index) in block.room.fourteenDaysTop"
            :key="`${block.id}-day-${index}`"
            class="daycell daycell--top"
            :rowspan="
              day.closed
                ? block.room.categories.length + rowsOutsideCategories
                : 1
            "
          >
            <span
              v-if="day.closed"
              class="daycell__content daycell__content--closed"
            >
              閉館
            </span>
            <span v-else :class="getDayCellTopContentClass(day, index)">
              {{ day.counter }}
              <Dots
                :limited-accommodation="day.limitedAccommodation"
                :specified-period="day.specifiedPeriod"
              />
            </span>
          </td>
        </tr>
        <tr v-if="!hiddenRoomCategoriesIds.includes(block.room.id)">
          <td>
            <span class="category-cell"> メッセージ </span>
          </td>
          <td />
          <td />
          <template v-for="(day, index) in block.room.fourteenDaysTop">
            <td
              v-if="!day.closed"
              :key="`${block.id}-day-message-${index}`"
              class="daycell daycell--top"
            >
              <span
                :class="`${getDayCellTopContentClass(
                  day,
                  index
                )} daycell__content--message`"
              >
                {{ day.message }}
              </span>
            </td>
          </template>
        </tr>
        <template v-if="!hiddenRoomCategoriesIds.includes(block.room.id)">
          <tr v-for="category in block.room.categories" :key="`${category.id}`">
            <td>
              <span class="category-cell">
                <span>
                  {{ category.name }}
                </span>
                <Tooltip direction="right">
                  <Icon
                    icon="info"
                    type="outlined"
                    color="#40709E"
                    :size="20"
                  ></Icon>
                  <template #toolTipContent>
                    <span>
                      {{ category.tooltip }}
                    </span>
                  </template>
                </Tooltip>
              </span>
            </td>
            <td>{{ category.capacity }}</td>
            <td>{{ category.total }}</td>
            <td
              v-for="(day, index) in daysWhenHotelIsOpen(
                block.room.fourteenDaysTop,
                category.fourteenDays
              )"
              :key="`${category.id}-day-${index}`"
              class="daycell"
              @mouseover="
                highlightCells(
                  block.id,
                  block.room.fourteenDaysTop,
                  category,
                  index
                )
              "
              @mouseleave="unhighlightCells()"
              @click="selectDays(block)"
            >
              <span
                :class="`${getDayCellContentClass(
                  category,
                  day,
                  block.room.fourteenDaysTop,
                  index
                )} ${day.multiple ? 'daycell--multiple-overlay' : ''}`"
              >
                <div class="daycell-container">
                  <div class="daycell__counter">{{ day.counter }}</div>
                  <div class="daycell__info">
                    <span v-if="day.saleLimit" class="daycell__info-sale-limit">
                      {{ day.saleLimit }}
                    </span>
                    <span v-else class="daycell__info-sale-limit--zero">{{
                      '0'
                    }}</span>
                    <span class="daycell__info-message-container">
                      <Tooltip v-if="day.message" direction="bottom">
                        <span class="daycell__info-message">{{
                          day.message
                        }}</span>
                        <template #toolTipContent>
                          <span>{{ day.message }}</span>
                        </template>
                      </Tooltip>
                    </span>
                  </div>
                </div>
              </span>
            </td>
          </tr>
          <tr>
            <td class="held-count-title" colspan="3">保留数</td>
            <td
              v-for="(heldCount, index) in daysWhenHotelIsOpenHeldCount(
                block.room.fourteenDaysTop,
                block.room.fourteenDayHeldCount
              )"
              :key="`${block.id}-held-count-${index}`"
              class="daycell"
            >
              <span :class="getDayHeldCountClass(index)">
                {{ heldCount ? heldCount : '' }}
              </span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, Ref, withDefaults } from 'vue';
import Icon from '../Icon/Icon.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import Button from '../Button/Button.vue';
import Text from '../Text/Text.vue';
import Dots from '../Dots/Dots.vue';
import moment from "moment";

interface ExampleData {
  blockId: string,
  rowId: number,
  hotelName: string,
  roomType: string,
  arrival_date: Date,
  numberOfNight: number,
  colorIndex: number
}

export type TopDay = {
  counter: number;
  limitedAccommodation?: boolean;
  specifiedPeriod?: boolean;
  closed?: boolean;
  message?: string;
};

export type Day = {
  counter: number;
  selected?:
    | 'slot01'
    | 'slot02'
    | 'slot03'
    | 'slot04'
    | 'slot05'
    | 'slot06'
    | 'slot07'
    | 'slot08'
    | 'slot09'
    | 'slot10'
    | '';
  multiple?: boolean;
  error?: boolean;
  saleLimit?: number;
  message?: string;
};

export type Category = {
  id: string;
  name: string;
  tooltip: string;
  capacity: number;
  total: number;
  fourteenDays: Day[];
};

export type Room = {
  id: string;
  name: string;
  tooltip: string;
  total: number;
  fourteenDaysTop: TopDay[];
  fourteenDayHeldCount: number[];
  categories: Category[];
};

export type CalendarDay = {
  date: Date;
  disabled?: boolean;
};

export type HighlightedDays = {
  blockId: string;
  categoryId: string;
  categoryName: string;
  highlightedDays: number[];
};

export type SelectedDates = {
  blockId: string;
  categoryId: string;
  categoryName: string;
  dates: Date[];
};

export type SlotColors =
  | 'slot01'
  | 'slot02'
  | 'slot03'
  | 'slot04'
  | 'slot05'
  | 'slot06'
  | 'slot07'
  | 'slot08'
  | 'slot09'
  | 'slot10'
  | '';

export type Props = {
  blocks: {
    id: string;
    name: string;
    room: Room;
  }[];
  calendar: CalendarDay[];
  colorForSelection: SlotColors;
  daysForSelection: number;
  rowNumber: number,
  listReservation: ExampleData[]
};

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

const props = withDefaults(defineProps<Props>(), {
  blocks: () => [],
  calendar: () => [],
  colorForSelection: 'slot01',
  daysForSelection: 1,
  rowNumber: 0,
  listReservation: () => []
});

const emit = defineEmits<{
  (event: 'goToPrevTwoWeeks'): void;
  (event: 'goToNextTwoWeeks'): void;
  (event: 'selectedDays', payload: SelectedDates, rowNumber?: number, roomName?: string): void;
  (event: 'roomName', roomName: string): void;
}>();

const selectDays = (block : any) => {
  const areDaysHighlighted = highlightedCells.value.highlightedDays.length > 0;
  console.log(areDaysHighlighted);
  if (areDaysHighlighted) {
    const dates = props.calendar
      .filter((day, index) => {
        return highlightedCells.value.highlightedDays.includes(index);
      })
      .map((day) => day.date);
    emit('selectedDays', {
      blockId: highlightedCells.value.blockId,
      categoryId: highlightedCells.value.categoryId,
      categoryName: highlightedCells.value.categoryName,
      dates,
    }, props.rowNumber, block.room.name);
    emit('roomName', block.room.name);
  } else {
    console.log('no days highlighted');
  }
};

const goToPrevTwoWeeks = () => {
  emit('goToPrevTwoWeeks');
};

const goToNextTwoWeeks = () => {
  emit('goToNextTwoWeeks');
};

const displayedMonths = computed(() => {
  const displayedMonths: number[] = [];
  return props.calendar.map((day) => {
    const month = day.date.getMonth() + 1;
    if (displayedMonths.includes(month)) {
      return '';
    }
    displayedMonths.push(month);
    return `${day.date.getFullYear()}年${month}月`;
  });
});

const rowsOutsideCategories = 3;

const daysWhenHotelIsOpen = (
  fourteenDaysTop: TopDay[],
  fourteenDays: Day[]
) => {
  return fourteenDays.filter((day, index) => {
    return !fourteenDaysTop[index].closed;
  });
};

const daysWhenHotelIsOpenHeldCount = (
  fourteenDaysTop: TopDay[],
  fourteenDayHeldCount: number[]
) => {
  return fourteenDayHeldCount.filter((day, index) => {
    return !fourteenDaysTop[index].closed;
  });
};

const highlightedCells: Ref<HighlightedDays> = ref({
  blockId: '',
  categoryId: '',
  categoryName: '',
  highlightedDays: [],
});

const highlightCells = (
  blockId: string,
  fourteenDaysTop: TopDay[],
  category: Category,
  index: number
) => {
  const dayInCalendarIsDisabled = props.calendar[index].disabled;
  const adjustedIndex = getIndexOnClosedDays(index, fourteenDaysTop);
  const notEnoughDays =
    adjustedIndex + props.daysForSelection > category.fourteenDays.length;

  console.log("adjustedIndex " + adjustedIndex)

  if (dayInCalendarIsDisabled) {
    console.log('The hovered day in calendar is disabled');
    return;
  }

  if (notEnoughDays) {
    console.log('Not enough days in calendar from the hovered day');
    return;
  }

  let hoveredDays = '';
  const highlightedDays = [];
  for (let i = 0; i < props.daysForSelection; i++) {
    highlightedDays.push(adjustedIndex + i);
    hoveredDays =
      hoveredDays +
      'hovered: ' +
      category.fourteenDays[adjustedIndex + i].counter;
  }

  const includesClosedDays = highlightedDays.some((day) => {
    return fourteenDaysTop[day].closed;
  });

  if (includesClosedDays) {
    console.log('The hovered days include closed days');
    return;
  }

  console.log("highlightedDays.length " + highlightedDays.length)
  console.log("props.daysForSelection " + props.daysForSelection)

  if (highlightedDays.length === props.daysForSelection) {
    highlightedCells.value = {
      blockId,
      categoryId: category.id,
      categoryName: category.name,
      highlightedDays: highlightedDays,
    };
  }
};

const unhighlightCells = () => {
  highlightedCells.value = {
    blockId: '',
    categoryId: '',
    categoryName: '',
    highlightedDays: [],
  };
};

const hiddenRoomCategoriesIds: Ref<string[]> = ref([]);

const toggleCategoriesVisibility = (roomId: string) => {
  if (hiddenRoomCategoriesIds.value.includes(roomId)) {
    hiddenRoomCategoriesIds.value = hiddenRoomCategoriesIds.value.filter(
      (id) => id !== roomId
    );
  } else {
    hiddenRoomCategoriesIds.value = [...hiddenRoomCategoriesIds.value, roomId];
  }
};

const getCategoryToggleIcon = (roomId: string) => {
  if (hiddenRoomCategoriesIds.value.includes(roomId)) {
    return 'keyboard_arrow_down';
  } else {
    return 'keyboard_arrow_up';
  }
};

const getDayHeaderContentClass = (day: CalendarDay) => {
  const weekdayClass =
    day.date.getDay() === 0
      ? ['day-header__content--sunday']
      : day.date.getDay() === 6
      ? ['day-header__content--saturday']
      : [];
  const disabledClass = day.disabled ? ['day-header__content--disabled'] : [];
  return ['day-header__content', ...weekdayClass, ...disabledClass].join(' ');
};

const getDayCellTopContentClass = (day: TopDay, index: number): string => {
  const disabled = props.calendar[index].disabled;
  if (disabled) {
    return 'daycell__content daycell__content--disabled';
  }
  const weekday = props.calendar[index].date.getDay();
  const weekdayClass =
    weekday === 0
      ? ['daycell__content--sunday']
      : weekday === 6
      ? ['daycell__content--saturday']
      : '';
  const notAvailableClass =
    day.counter === 0 ? ['daycell__content--not-available'] : [];

  return ['daycell__content', ...weekdayClass, ...notAvailableClass].join(' ');
};

const getDayCellContentClass = (
  category: Category,
  day: Day,
  fourteenDaysTop: TopDay[],
  index: number
): string => {
  const adjustedIndex = getIndexOnClosedDays(index, fourteenDaysTop);

  const disabled = props.calendar[adjustedIndex].disabled;
  if (disabled) {
    return 'daycell__content daycell__content--disabled';
  }
  const weekday = props.calendar[adjustedIndex].date.getDay();
  const weekdayClass =
    weekday === 0
      ? ['daycell__content--sunday']
      : weekday === 6
      ? ['daycell__content--saturday']
      : [];
  const notAvailableClass =
    day.counter === 0 ? ['daycell__content--not-available'] : [];
  day.selected = ''
  day.multiple = false
  const listReservationFilter = props.listReservation.filter(item => {
    if (item.arrival_date) {
      const startDate = new Date(moment(item.arrival_date).format('yyyy-MM-DD'));
      const endDate = new Date(startDate.getTime() + 86400000 * (item.numberOfNight - 1));
      return item.roomType == category.id && startDate <= props.calendar[adjustedIndex].date
          && props.calendar[adjustedIndex].date <= endDate
    }
    else return false
  })
  if (listReservationFilter.length > 0) {
    day.selected = slotColor[listReservationFilter[0].colorIndex] as Day["selected"];
  }
  if (listReservationFilter.length > 1) day.multiple = true
  const selectedClass = day.selected
    ? [`daycell__content--selected-${day.selected}`]
    : [];
  const errorClass = day.error ? ['daycell__content--error'] : [];

  const isHoveredClass =
    highlightedCells.value.categoryId === category.id &&
    highlightedCells.value.highlightedDays.includes(adjustedIndex)
      ? [`daycell__content--hovered-${props.colorForSelection}`]
      : [];

  return [
    'daycell__content',
    ...weekdayClass,
    ...notAvailableClass,
    ...selectedClass,
    ...errorClass,
    ...isHoveredClass,
  ].join(' ');
};

const getIndexOnClosedDays = (index: number, fourteenDaysTop: TopDay[]) => {
  let closedDayAdjustment = 0;
  let innerIndex = index;
  //Handle inner index in case of multiple closed days
  const totalClosedDays = fourteenDaysTop.filter((day) => day.closed);
  if (totalClosedDays.length > 0) {
    totalClosedDays.forEach((day) => {
      if (innerIndex >= fourteenDaysTop.indexOf(day)) {
        innerIndex += 1;
        closedDayAdjustment += 1;
      }
    });
  }
  return index + closedDayAdjustment;
  //Index has to be adjusted by adding the total closing days, because they don't count inside the array of the cells
};

const getDayHeldCountClass = (index: number) => {
  const isDayDisabled = props.calendar[index].disabled
    ? ['daycell__content--disabled']
    : [];

  return [
    'daycell__content',
    'daycell__content--held-count',
    ...isDayDisabled,
  ].join(' ');
};

const weekDayToText = (weekday: number): string => {
  switch (weekday) {
    case 0:
      return '日';
    case 1:
      return '月';
    case 2:
      return '火';
    case 3:
      return '水';
    case 4:
      return '木';
    case 5:
      return '金';
    case 6:
      return '土';
    default:
      return '';
  }
};
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.held-count-title {
  text-align: right;
  padding-right: 27px;
}

.block-header {
  width: 96px;
}

.room-name-header {
  width: 288px;
}

.capacity-header,
.count-header {
  width: 48px;
}

.day-header {
  width: 94px;
  padding: 0px;
}

.day-header__content {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  color: $color-content-text--light;
}

.day-header__content--saturday {
  color: $color-content-calendar--saturday;
}

.day-header__content--sunday {
  color: $color-content-calendar--holiday;
}

.day-header__content--disabled {
  color: $color-content-text--disable;
}

.day-header :first-child {
  font-size: $font-size-2xs;
  line-height: 150%;
  font-weight: $font-weight-bold;
}

.day-header :last-child {
  font-size: $font-size-ll;
  line-height: 150%;
  font-weight: $font-weight-bold;
}

.daycell {
  padding: 0px;
}

.daycell--top {
  color: $color-content-neutral--black;
  font-weight: $font-weight-bold;
  font-size: $font-size-large;
}

.daycell__content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
}

.daycell__content--saturday {
  background: #f3f9ff;
}

.daycell__content--sunday {
  background: #fef6f5;
}

.daycell__content--not-available {
  background: $color-background-neutral--disable;
}

.daycell__content--not-available .daycell__counter {
  border-right-color: $color-border-neutral--input;
  color: $color-content-neutral--light-00;
}

.daycell__content--held-count {
  color: $color-content-error--main;
}

.daycell__content--disabled {
  color: $color-content-neutral--disable;
}

.daycell__content--selected-slot01 {
  background: $color-slot-slot01;
}

.daycell__content--selected-slot02 {
  background: $color-slot-slot02;
}

.daycell__content--selected-slot03 {
  background: $color-slot-slot03;
}

.daycell__content--selected-slot04 {
  background: $color-slot-slot04;
}

.daycell__content--selected-slot05 {
  background: $color-slot-slot05;
}

.daycell__content--selected-slot06 {
  background: $color-slot-slot06;
}

.daycell__content--selected-slot07 {
  background: $color-slot-slot07;
}

.daycell__content--selected-slot08 {
  background: $color-slot-slot08;
}

.daycell__content--selected-slot09 {
  background: $color-slot-slot09;
}

.daycell__content--error {
  background: $color-slot-sloterror;
  color: $color-content-error--main;
}

.daycell__content--selected-slot10 {
  background: $color-slot-slot10;
}

.daycell__content--hovered-slot01 {
  cursor: pointer;
  background: $color-slot-slot01-hover;
}

.daycell__content--hovered-slot02 {
  cursor: pointer;
  background: $color-slot-slot02-hover;
}

.daycell__content--hovered-slot03 {
  cursor: pointer;
  background: $color-slot-slot03-hover;
}

.daycell__content--hovered-slot04 {
  cursor: pointer;
  background: $color-slot-slot04-hover;
}

.daycell__content--hovered-slot05 {
  cursor: pointer;
  background: $color-slot-slot05-hover;
}

.daycell__content--hovered-slot06 {
  cursor: pointer;
  background: $color-slot-slot06-hover;
}

.daycell__content--hovered-slot07 {
  cursor: pointer;
  background: $color-slot-slot07-hover;
}

.daycell__content--hovered-slot08 {
  cursor: pointer;
  background: $color-slot-slot08-hover;
}

.daycell__content--hovered-slot09 {
  cursor: pointer;
  background: $color-slot-slot09-hover;
}

.daycell__content--hovered-slot10 {
  cursor: pointer;
  background: $color-slot-slot10-hover;
}

.daycell__content--closed {
  color: $color-content-neutral--light-00;
  background: $color-background-neutral--disable;
}

.daycell__content--message {
  font-weight: $font-weight-regular;
  font-size: $font-size-xs;
}

.category-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.category-cell__expand-button {
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  padding: 0px;
  line-height: 100%;
  background: none;
  font-weight: $font-weight-bold;
}

.table-container {
  overflow: auto;
  width: 100%;
  position: relative;
}

table {
  width: 100%;
  border-spacing: 0;
  position: relative;
  background-color: $color-background-neutral--white;
  table-layout: fixed;
}

table thead {
  top: 0px;
  position: sticky;
  z-index: 5;
}

table thead th {
  height: 48px;
  padding: 8px 3px;
  text-align: center;
  color: $color-content-text--light;
  background: $color-background-neutral--white;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--outline;
  @include \.font-component-label-medium;
  font-weight: 400;
  white-space: nowrap;
  vertical-align: bottom;
}

table tbody td {
  height: 40px;
  padding: 0 8px;
  color: $color-content-neutral--black;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--outline;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: $color-border-neutral--outline;
  text-align: center;
}

tbody tr:first-child td:first-child {
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: $color-border-neutral--outline;
}

.block-separation-border:not(:last-child) tr:first-child td:first-child {
  border-bottom-width: 8px;
  height: 44px;
}

.block-separation-border:not(:last-child) tr:last-child td {
  border-bottom-width: 8px;
  height: 44px;
}

.block-separation-border .daycell__content--closed::after {
  content: '';
  position: absolute;
  bottom: -4px;
  width: 100%;
  height: 8px;
  background: $color-border-neutral--outline;
  z-index: 1;
}

.controls-headers th {
  border-bottom: none;
  height: 31px;
  vertical-align: middle;
}

.controls-headers__prev {
  width: 288px;
  text-align: right;
  padding: 0px;
}

.controls-headers__next {
  width: 102px;
  padding: 0px;
}

.controls__month-header {
  width: 94px;
  padding: 8px;
}

.daycell-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.daycell__counter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 38px;
  color: $color-content-neutral--black;
  font-weight: $font-weight-bold;
  font-size: $font-size-large;
  border-right: 1px dashed $color-border-neutral--divider-light;
}

.daycell__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.daycell__info-sale-limit,
.daycell__info-sale-limit--zero {
  font-size: $font-size-2xs;
  color: $color-content-error--main;
  font-weight: $font-weight-bold;
}

.daycell__info-sale-limit--zero {
  color: $color-content-neutral--light-00;
}

.daycell__info-message-container {
  width: 45px;
  height: 19px;
}
.daycell__info-message {
  font-size: $font-size-2xs;
  color: $color-content-neutral--light-00;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.daycell--multiple-overlay {
  -webkit-background-size: 24px 24px;
  -moz-background-size: 24px 24px;
  background-size: 24px 24px;
  background-image: -webkit-gradient(
    linear,
    0 0,
    100% 100%,
    color-stop(0.25, $color-slot-multiple-line),
    color-stop(0.25, transparent),
    color-stop(0.5, transparent),
    color-stop(0.5, $color-slot-multiple-line),
    color-stop(0.75, $color-slot-multiple-line),
    color-stop(0.75, transparent),
    to(transparent)
  );
  background-image: -webkit-linear-gradient(
    -45deg,
    $color-slot-multiple-line 25%,
    transparent 25%,
    transparent 50%,
    $color-slot-multiple-line 50%,
    $color-slot-multiple-line 75%,
    transparent 75%,
    transparent
  );
  background-image: -moz-linear-gradient(
    -45deg,
    $color-slot-multiple-line 25%,
    transparent 25%,
    transparent 50%,
    $color-slot-multiple-line 50%,
    $color-slot-multiple-line 75%,
    transparent 75%,
    transparent
  );
  background-image: -ms-linear-gradient(
    -45deg,
    $color-slot-multiple-line 25%,
    transparent 25%,
    transparent 50%,
    $color-slot-multiple-line 50%,
    $color-slot-multiple-line 75%,
    transparent 75%,
    transparent
  );
  background-image: -o-linear-gradient(
    -45deg,
    $color-slot-multiple-line 25%,
    transparent 25%,
    transparent 50%,
    $color-slot-multiple-line 50%,
    $color-slot-multiple-line 75%,
    transparent 75%,
    transparent
  );
  background-image: linear-gradient(
    -45deg,
    $color-slot-multiple-line 25%,
    transparent 25%,
    transparent 50%,
    $color-slot-multiple-line 50%,
    $color-slot-multiple-line 75%,
    transparent 75%,
    transparent
  );
}
</style>
