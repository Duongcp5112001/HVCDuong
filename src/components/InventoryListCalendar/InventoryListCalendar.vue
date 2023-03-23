<template>
  <div class="ilc-control">
    <span class="ilc-control__buttons">
      <Button
        icon="keyboard_arrow_left"
        type="text"
        size="small"
        @click="onClickPrev"
      >
        前の{{ calendarLengthUnit }}
      </Button>
      <Button
        icon="keyboard_arrow_right"
        icon-position="right"
        type="text"
        size="small"
        @click="onClickNext"
      >
        次の{{ calendarLengthUnit }}
      </Button>
    </span>
    <Text color="light" size="small"> {{ visibleMonths }}</Text>
  </div>
  <div class="ilc-table-container">
    <table>
      <thead>
        <tr>
          <th class="ilc-table__block-type-header" rowspan="2">
            ブロック・部屋タイプ
          </th>
          <th
            v-for="day in days"
            :key="day.toString()"
            :class="tableDayHeaderClass"
            :colspan="calendarLength === 14 ? 3 : 1"
          >
            <Dots
              :limited-accommodation="isLimitedAccommodation(day)"
              :specified-period="isSpecifiedPeriod(day)"
              :direction="calendarLength === 14 ? 'hor' : 'ver'"
            />
            <div :class="getDayHeaderContentClass(day)">
              <span>
                {{ weekDayToText(day.getDay()) }}
              </span>
              <span>
                {{ day.getDate() }}
              </span>
            </div>
          </th>
        </tr>
        <tr>
          <template
            v-for="(day, index) in days"
            :key="`${day.toString()}-type`"
          >
            <template v-if="isClosedDay(day)">
              <th
                class="ilc-table__closed-day-header"
                :colspan="calendarLength === 14 ? 3 : 1"
              >
                休館
              </th>
            </template>
            <template v-else>
              <th :class="getTypeHeaderClass(index)">設定</th>
              <th
                v-if="calendarLength === 14"
                :class="getTypeHeaderClass(index)"
              >
                予約
              </th>
              <th
                v-if="calendarLength === 14"
                :class="getTypeHeaderClass(index)"
              >
                残
              </th>
            </template>
          </template>
        </tr>
      </thead>
      <tbody>
        <!-- Top Blocks -->
        <template v-for="key in staticBlocksTopKeys" :key="`block-top-${key}`">
          <tr>
            <td class="ilc-table__block-control">
              <span class="ilc-table__block-title">
                <button
                  class="ilc-table-cell__expand-button"
                  @click="toggleStaticBlockVisibility(key)"
                >
                  <Icon
                    :icon="
                      staticBlocksVisibility[key]
                        ? 'expand_less'
                        : 'expand_more'
                    "
                    :size="20"
                  />
                </button>
                <span> {{ getKeyTranslation(key) }} </span>
              </span>
              <button
                v-if="canAdd(key)"
                class="ilc-table-cell__plus-button"
                @click="onClickAdd(key)"
              >
                <Icon icon="add" :size="16" />
              </button>
            </td>
            <template
              v-for="(day, index) in days"
              :key="`${day.toString()}-${key}-top-block`"
            >
              <template v-if="isClosedDay(day)">
                <td class="ilc-table__closed-day">-</td>
                <td v-if="calendarLength === 14" class="ilc-table__closed-day">
                  -
                </td>
                <td v-if="calendarLength === 14" class="ilc-table__closed-day">
                  -
                </td>
              </template>
              <template v-else>
                <td
                  :class="`${getDayValueClass(
                    index,
                    staticBlocksTop[key].totals[index]?.setting
                  )} ilc-table-cell__day-value-top-blocks-total`"
                >
                  <span v-if="calendarLength === 14">
                    {{ staticBlocksTop[key].totals[index]?.setting }}
                  </span>
                  <span v-else>
                    <DayValueTip
                      :setting="staticBlocksTop[key].totals[index]?.setting"
                      :reserved="staticBlocksTop[key].totals[index]?.reserved"
                      :remaining="staticBlocksTop[key].totals[index]?.remaining"
                      :day-index="index"
                      :days="days"
                      :holidays="holidays"
                      :days-before-holidays="daysBeforeHolidays"
                    >
                      {{ staticBlocksTop[key].totals[index]?.setting }}
                    </DayValueTip>
                  </span>
                </td>
                <td
                  v-if="calendarLength === 14"
                  :class="`${getDayValueClass(
                    index,
                    staticBlocksTop[key].totals[index]?.reserved
                  )} ilc-table-cell__day-value-top-blocks-total`"
                >
                  {{ staticBlocksTop[key].totals[index]?.reserved }}
                </td>
                <td
                  v-if="calendarLength === 14"
                  :class="`${getDayValueClass(
                    index,
                    staticBlocksTop[key].totals[index]?.remaining
                  )} ilc-table-cell__day-value-top-blocks-total`"
                >
                  {{ staticBlocksTop[key].totals[index]?.remaining }}
                </td>
              </template>
            </template>
          </tr>
          <template v-if="staticBlocksVisibility[key]">
            <tr
              v-for="(topItem, index) in staticBlocksTop[key].items"
              :key="`${key}-item-${index}`"
            >
              <td class="ilc-table__block-item">
                {{ topItem.label }}
              </td>
              <template
                v-for="(day, _index) in days"
                :key="`${key}-item-day-${_index}`"
              >
                <template v-if="isClosedDay(day)">
                  <td class="ilc-table__closed-day">-</td>
                  <td
                    v-if="calendarLength === 14"
                    class="ilc-table__closed-day"
                  >
                    -
                  </td>
                  <td
                    v-if="calendarLength === 14"
                    class="ilc-table__closed-day"
                  >
                    -
                  </td>
                </template>
                <template v-else>
                  <td
                    :class="`${getDayValueClass(
                      _index,
                      topItem.days[_index]?.setting
                    )}`"
                  >
                    <button
                      v-if="calendarLength === 14"
                      :class="getBlockSettingButtonClass(day)"
                      @click="onClickSetting(key, topItem.id, days[_index])"
                    >
                      {{ topItem.days[_index]?.setting }}
                    </button>
                    <DayValueTip
                      v-else
                      :setting="topItem.days[_index]?.setting"
                      :reserved="topItem.days[_index]?.reserved"
                      :remaining="topItem.days[_index]?.remaining"
                      :day-index="_index"
                      :days="days"
                      :holidays="holidays"
                      :days-before-holidays="daysBeforeHolidays"
                    >
                      <button
                        :class="getBlockSettingButtonClass(day)"
                        @click="onClickSetting(key, topItem.id, days[_index])"
                      >
                        {{ topItem.days[_index]?.setting }}
                      </button>
                    </DayValueTip>
                  </td>
                  <td
                    v-if="calendarLength === 14"
                    :class="`${getDayValueClass(
                      _index,
                      topItem.days[_index]?.reserved
                    )}`"
                  >
                    {{ topItem.days[_index]?.reserved }}
                  </td>
                  <td
                    v-if="calendarLength === 14"
                    :class="`${getDayValueClass(
                      _index,
                      topItem.days[_index]?.remaining
                    )}`"
                  >
                    {{ topItem.days[_index]?.remaining }}
                  </td>
                </template>
              </template>
            </tr>
          </template>
          <tr class="ilc-table__block-divider">
            <td colspan="100"></td>
          </tr>
        </template>
        <!-- Hotel Blocks -->
        <template
          v-for="hotelBlock in hotelBlocks"
          :key="`block-hotel-${hotelBlock.id}`"
        >
          <tr>
            <td class="ilc-table__block-control">
              <span class="ilc-table__block-title">
                <button
                  class="ilc-table-cell__expand-button"
                  @click="toggleHotelsBlocksVisibility(hotelBlock.id)"
                >
                  <Icon
                    :icon="
                      hotelsBlocksVisibility.find(
                        (hotel) => hotelBlock.id === hotel.id
                      )?.visible
                        ? 'expand_less'
                        : 'expand_more'
                    "
                    :size="20"
                  />
                </button>
                <span> {{ hotelBlock.title }} </span>
              </span>
              <button
                class="ilc-table-cell__plus-button"
                @click="onClickAdd(hotelBlock.id)"
              >
                <Icon icon="add" :size="16" />
              </button>
            </td>
            <template
              v-for="(day, index) in days"
              :key="`${day.toString()}-hotel-block`"
            >
              <template v-if="isClosedDay(day)">
                <td class="ilc-table__closed-day">-</td>
                <td v-if="calendarLength === 14" class="ilc-table__closed-day">
                  -
                </td>
                <td v-if="calendarLength === 14" class="ilc-table__closed-day">
                  -
                </td>
              </template>
              <template v-else>
                <td
                  :class="`${getDayValueClass(
                    index,
                    hotelBlock.totals[index]?.setting
                  )} ilc-table-cell__day-value-top-blocks-total`"
                >
                  <span v-if="calendarLength === 14">
                    {{ hotelBlock.totals[index]?.setting }}
                  </span>
                  <span v-else>
                    <DayValueTip
                      :setting="hotelBlock.totals[index]?.setting"
                      :reserved="hotelBlock.totals[index]?.reserved"
                      :remaining="hotelBlock.totals[index]?.remaining"
                      :day-index="index"
                      :days="days"
                      :holidays="holidays"
                      :days-before-holidays="daysBeforeHolidays"
                    >
                      {{ hotelBlock.totals[index]?.setting }}
                    </DayValueTip>
                  </span>
                </td>
                <td
                  v-if="calendarLength === 14"
                  :class="`${getDayValueClass(
                    index,
                    hotelBlock.totals[index]?.reserved
                  )} ilc-table-cell__day-value-top-blocks-total`"
                >
                  {{ hotelBlock.totals[index]?.reserved }}
                </td>
                <td
                  v-if="calendarLength === 14"
                  :class="`${getDayValueClass(
                    index,
                    hotelBlock.totals[index]?.remaining
                  )} ilc-table-cell__day-value-top-blocks-total`"
                >
                  {{ hotelBlock.totals[index]?.remaining }}
                </td>
              </template>
            </template>
          </tr>
          <template
            v-if="
              hotelsBlocksVisibility.find((hotel) => hotelBlock.id === hotel.id)
                ?.visible
            "
          >
            <tr
              v-for="(hotelItem, index) in hotelBlock.items"
              :key="`hotel-${hotelBlock.id}-${index}`"
            >
              <td class="ilc-table__block-item">
                {{ hotelItem.label }}
              </td>
              <template
                v-for="(day, _index) in days"
                :key="`hotel-${hotelBlock.id}-item-day-${_index}`"
              >
                <template v-if="isClosedDay(day)">
                  <td class="ilc-table__closed-day">-</td>
                  <td
                    v-if="calendarLength === 14"
                    class="ilc-table__closed-day"
                  >
                    -
                  </td>
                  <td
                    v-if="calendarLength === 14"
                    class="ilc-table__closed-day"
                  >
                    -
                  </td>
                </template>
                <template v-else>
                  <td
                    :class="`${getDayValueClass(
                      _index,
                      hotelItem.days[_index]?.setting
                    )}`"
                  >
                    <button
                      v-if="calendarLength === 14"
                      :class="getBlockSettingButtonClass(day)"
                      @click="
                        onClickSetting(
                          hotelBlock.id,
                          hotelItem.id,
                          days[_index]
                        )
                      "
                    >
                      {{ hotelItem.days[_index]?.setting }}
                    </button>
                    <DayValueTip
                      v-else
                      :setting="hotelItem.days[_index]?.setting"
                      :reserved="hotelItem.days[_index]?.reserved"
                      :remaining="hotelItem.days[_index]?.remaining"
                      :day-index="_index"
                      :days="days"
                      :holidays="holidays"
                      :days-before-holidays="daysBeforeHolidays"
                    >
                      <button
                        :class="getBlockSettingButtonClass(day)"
                        @click="
                          onClickSetting(
                            hotelBlock.id,
                            hotelItem.id,
                            days[_index]
                          )
                        "
                      >
                        {{ hotelItem.days[_index]?.setting }}
                      </button>
                    </DayValueTip>
                  </td>
                  <td
                    v-if="calendarLength === 14"
                    :class="`${getDayValueClass(
                      _index,
                      hotelItem.days[_index]?.reserved
                    )}`"
                  >
                    {{ hotelItem.days[_index]?.reserved }}
                  </td>
                  <td
                    v-if="calendarLength === 14"
                    :class="`${getDayValueClass(
                      _index,
                      hotelItem.days[_index]?.remaining
                    )}`"
                  >
                    {{ hotelItem.days[_index]?.remaining }}
                  </td>
                </template>
              </template>
            </tr>
          </template>
          <tr class="ilc-table__block-divider">
            <td colspan="100"></td>
          </tr>
        </template>
        <!-- Bottom Blocks -->
        <template
          v-for="key in staticBlocksBottomKeys"
          :key="`block-bottom-${key}`"
        >
          <tr>
            <td class="ilc-table__block-control">
              <span class="ilc-table__block-title">
                <button
                  class="ilc-table-cell__expand-button"
                  @click="toggleStaticBlockVisibility(key)"
                >
                  <Icon
                    :icon="
                      staticBlocksVisibility[key]
                        ? 'expand_less'
                        : 'expand_more'
                    "
                    :size="20"
                  />
                </button>
                <span> {{ getKeyTranslation(key) }} </span>
              </span>
              <button
                v-if="canAdd(key)"
                class="ilc-table-cell__plus-button"
                @click="onClickAdd(key)"
              >
                <Icon icon="add" :size="16" />
              </button>
            </td>
            <template
              v-for="(day, index) in days"
              :key="`${day.toString()}-bottom-block`"
            >
              <template v-if="isClosedDay(day)">
                <td class="ilc-table__closed-day">-</td>
                <td v-if="calendarLength === 14" class="ilc-table__closed-day">
                  -
                </td>
                <td v-if="calendarLength === 14" class="ilc-table__closed-day">
                  -
                </td>
              </template>
              <template v-else>
                <td
                  :class="`${getDayValueClass(
                    index,
                    staticBlocksBottom[key].totals[index]?.setting
                  )} ilc-table-cell__day-value-bottom-blocks-total`"
                >
                  <span v-if="calendarLength === 14">
                    {{ staticBlocksBottom[key].totals[index]?.setting }}
                  </span>
                  <span v-else>
                    <DayValueTip
                      :setting="staticBlocksBottom[key].totals[index]?.setting"
                      :reserved="
                        staticBlocksBottom[key].totals[index]?.reserved
                      "
                      :remaining="
                        staticBlocksBottom[key].totals[index]?.remaining
                      "
                      :day-index="index"
                      :days="days"
                      :holidays="holidays"
                      :days-before-holidays="daysBeforeHolidays"
                    >
                      {{ staticBlocksBottom[key].totals[index]?.setting }}
                    </DayValueTip>
                  </span>
                </td>
                <td
                  v-if="calendarLength === 14"
                  :class="`${getDayValueClass(
                    index,
                    staticBlocksBottom[key].totals[index]?.reserved
                  )} ilc-table-cell__day-value-bottom-blocks-total`"
                >
                  {{ staticBlocksBottom[key].totals[index]?.reserved }}
                </td>
                <td
                  v-if="calendarLength === 14"
                  :class="`${getDayValueClass(
                    index,
                    staticBlocksBottom[key].totals[index]?.remaining
                  )} ilc-table-cell__day-value-bottom-blocks-total`"
                >
                  {{ staticBlocksBottom[key].totals[index]?.remaining }}
                </td>
              </template>
            </template>
          </tr>
          <template v-if="staticBlocksVisibility[key]">
            <tr
              v-for="(bottomItem, index) in staticBlocksBottom[key].items"
              :key="`${key}-item-${index}`"
            >
              <td class="ilc-table__block-item">
                {{ bottomItem.label }}
              </td>
              <template
                v-for="(day, _index) in days"
                :key="`${key}-item-day-${_index}`"
              >
                <template v-if="isClosedDay(day)">
                  <td class="ilc-table__closed-day">-</td>
                  <td
                    v-if="calendarLength === 14"
                    class="ilc-table__closed-day"
                  >
                    -
                  </td>
                  <td
                    v-if="calendarLength === 14"
                    class="ilc-table__closed-day"
                  >
                    -
                  </td>
                </template>
                <template v-else>
                  <td
                    :class="`${getDayValueClass(
                      _index,
                      bottomItem.days[_index]?.setting
                    )}`"
                  >
                    <button
                      v-if="calendarLength === 14"
                      :class="getBlockSettingButtonClass(day)"
                      @click="onClickSetting(key, bottomItem.id, days[_index])"
                    >
                      {{ bottomItem.days[_index]?.setting }}
                    </button>
                    <DayValueTip
                      v-else
                      :setting="bottomItem.days[_index]?.setting"
                      :reserved="bottomItem.days[_index]?.reserved"
                      :remaining="bottomItem.days[_index]?.remaining"
                      :day-index="_index"
                      :days="days"
                      :holidays="holidays"
                      :days-before-holidays="daysBeforeHolidays"
                    >
                      <button
                        :class="getBlockSettingButtonClass(day)"
                        @click="
                          onClickSetting(key, bottomItem.id, days[_index])
                        "
                      >
                        {{ bottomItem.days[_index]?.setting }}
                      </button>
                    </DayValueTip>
                  </td>
                  <td
                    v-if="calendarLength === 14"
                    :class="`${getDayValueClass(
                      _index,
                      bottomItem.days[_index]?.reserved
                    )}`"
                  >
                    {{ bottomItem.days[_index]?.reserved }}
                  </td>
                  <td
                    v-if="calendarLength === 14"
                    :class="`${getDayValueClass(
                      _index,
                      bottomItem.days[_index]?.remaining
                    )}`"
                  >
                    {{ bottomItem.days[_index]?.remaining }}
                  </td>
                </template>
              </template>
            </tr>
          </template>
          <tr class="ilc-table__block-divider">
            <td colspan="100"></td>
          </tr>
        </template>
        <tr class="ilc-table__empty-space">
          <td colspan="100"></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="ilc-table__footer-subtitle">合計</td>
          <template
            v-for="(day, index) in days"
            :key="`${day.toString()}-totals-block`"
          >
            <template v-if="isClosedDay(day)">
              <td class="ilc-table__closed-day">-</td>
              <td v-if="calendarLength === 14" class="ilc-table__closed-day">
                -
              </td>
              <td v-if="calendarLength === 14" class="ilc-table__closed-day">
                -
              </td>
            </template>
            <template v-else>
              <td
                :class="`${getDayValueClass(
                  index,
                  getAllTotals(day, BlockInfoType.Setting)
                )} ilc-table-cell__day-value-grand-total`"
              >
                {{ getAllTotals(day, BlockInfoType.Setting) }}
              </td>
              <td
                v-if="calendarLength === 14"
                :class="`${getDayValueClass(
                  index,
                  getAllTotals(day, BlockInfoType.Reserved)
                )} ilc-table-cell__day-value-grand-total`"
              >
                {{ getAllTotals(day, BlockInfoType.Reserved) }}
              </td>
              <td
                v-if="calendarLength === 14"
                :class="`${getDayValueClass(
                  index,
                  getAllTotals(day, BlockInfoType.Remaining)
                )} ilc-table-cell__day-value-grand-total`"
              >
                {{ getAllTotals(day, BlockInfoType.Remaining) }}
              </td>
            </template>
          </template>
        </tr>
        <tr>
          <td class="ilc-table__footer-subtitle">保留数</td>
          <template v-for="(day, index) in days" :key="`held-${index}`">
            <td
              v-if="isClosedDay(day)"
              class="ilc-table__closed-day"
              :colspan="calendarLength === 14 ? 3 : 1"
            >
              -
            </td>
            <td
              v-else
              :colspan="calendarLength === 14 ? 3 : 1"
              :class="`${getHeldClass(index)}`"
            >
              {{ heldTotals[index] }}
            </td>
          </template>
        </tr>
        <tr>
          <td class="ilc-table__footer-subtitle">
            <span>稼働率</span>
            <Tooltip direction="right">
              <Icon icon="info" type="outlined" :size="16"></Icon>
              <template #toolTipContent>
                <span>
                  稼働率 = 予約数 ÷ ( 設定数合計 - 故障 - 販売不可 )
                </span>
              </template>
            </Tooltip>
          </td>
          <template v-for="(day, index) in days" :key="`percentage-${index}`">
            <td
              v-if="isClosedDay(day)"
              class="ilc-table__closed-day"
              :colspan="calendarLength === 14 ? 3 : 1"
            >
              -
            </td>
            <td
              v-else
              :colspan="calendarLength === 14 ? 3 : 1"
              :class="`${getPercentageClass(index)}`"
            >
              {{ usageRates[index]?.toFixed(1) }}%
            </td>
          </template>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Button from '../Button/Button.vue';
import Text from '../Text/Text.vue';
import Icon from '../Icon/Icon.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import Dots from '../Dots/Dots.vue';
import DayValueTip from './DayValueTip.vue';

export type BlockDayItem = {
  setting: number;
  reserved: number;
  remaining: number;
};

export type StaticBlock = {
  totals: BlockDayItem[];
  items: {
    label: string;
    id: string;
    days: BlockDayItem[];
  }[];
};

export type StaticBlocksTop = {
  home: StaticBlock;
  mutual: StaticBlock;
  raffle: StaticBlock;
  vip: StaticBlock;
};

export type StaticBlocksBottom = {
  malfunction: StaticBlock;
  unavailable: StaticBlock;
};

export type HotelBlocks = {
  title: string;
  id: string;
  totals: BlockDayItem[];
  items: {
    label: string;
    id: string;
    days: BlockDayItem[];
  }[];
};

export type Props = {
  startDate: Date;
  calendarLength: 14 | 30;
  staticBlocksTop: StaticBlocksTop;
  staticBlocksBottom: StaticBlocksBottom;
  hotelBlocks: HotelBlocks[];
  heldTotals: number[];
  usageRates: number[];
  holidays: Date[];
  daysBeforeHolidays: Date[];
  closedDays: Date[];
  limitedAccommodationDays: Date[];
  specifiedPeriodDays: Date[];
};

const props = withDefaults(defineProps<Props>(), {
  startDate: () => new Date(),
  calendarLength: 14,
  staticBlocksTop: (): StaticBlocksTop => ({
    home: {
      totals: [] as BlockDayItem[],
      items: [],
    },
    mutual: {
      totals: [] as BlockDayItem[],
      items: [],
    },
    raffle: {
      totals: [] as BlockDayItem[],
      items: [],
    },
    vip: {
      totals: [] as BlockDayItem[],
      items: [],
    },
  }),
  staticBlocksBottom: (): StaticBlocksBottom => ({
    malfunction: {
      totals: [] as BlockDayItem[],
      items: [],
    },
    unavailable: {
      totals: [] as BlockDayItem[],
      items: [],
    },
  }),
  hotelBlocks: (): HotelBlocks[] => [],
  heldTotals: (): number[] => [],
  usageRates: (): number[] => [],
  holidays: (): Date[] => [],
  daysBeforeHolidays: (): Date[] => [],
  closedDays: (): Date[] => [],
  limitedAccommodationDays: (): Date[] => [],
  specifiedPeriodDays: (): Date[] => [],
});

enum BlockInfoType {
  Setting = 'setting',
  Reserved = 'reserved',
  Remaining = 'remaining',
}

const emit = defineEmits<{
  (event: 'clickAdd', id: string): void;
  (event: 'clickSetting', block: string, itemId: string, day: Date): void;
  (event: 'clickNextDate', nextDate: Date): void;
  (event: 'clickPrevDate', prevDate: Date): void;
}>();

const onClickAdd = (id: string) => {
  emit('clickAdd', id);
};
const onClickSetting = (block: string, itemId: string, day: Date) => {
  emit('clickSetting', block, itemId, day);
};
const onClickNext = () => {
  const nextStartDate = new Date(props.startDate);
  nextStartDate.setDate(nextStartDate.getDate() + props.calendarLength);
  emit('clickNextDate', nextStartDate);
};
const onClickPrev = () => {
  const prevStartDate = new Date(props.startDate);
  prevStartDate.setDate(prevStartDate.getDate() - props.calendarLength);
  emit('clickPrevDate', prevStartDate);
};

const staticBlocksTopKeys = computed(() => {
  return Object.keys(props.staticBlocksTop) as (keyof StaticBlocksTop)[];
});

const staticBlocksBottomKeys = computed(() => {
  return Object.keys(props.staticBlocksBottom) as (keyof StaticBlocksBottom)[];
});

const getKeyTranslation = (key: string): string => {
  switch (key) {
    case 'home':
      return 'ホーム';
    case 'mutual':
      return '相互';
    case 'raffle':
      return '抽選';
    case 'vip':
      return '大口';
    case 'malfunction':
      return '故障';
    case 'unavailable':
      return '販売不可';
    default:
      return '';
  }
};

const canAdd = (key: string): boolean => {
  if (key === 'home' || key === 'malfunction' || key === 'unavailable') {
    return false;
  } else {
    return true;
  }
};

const staticBlocksVisibility = ref({
  home: false,
  mutual: false,
  raffle: false,
  vip: false,
  malfunction: false,
  unavailable: false,
});

const toggleStaticBlockVisibility = (
  block: keyof typeof staticBlocksVisibility.value
) => {
  staticBlocksVisibility.value[block] = !staticBlocksVisibility.value[block];
};

const hotelsBlocksVisibility = ref(
  props.hotelBlocks.map((hotel) => {
    return {
      id: hotel.id,
      visible: false,
    };
  })
);

const toggleHotelsBlocksVisibility = (id: string) => {
  const updatedVisibility = hotelsBlocksVisibility.value.map((hotel) => {
    if (hotel.id === id) {
      return {
        ...hotel,
        visible: !hotel.visible,
      };
    }
    return hotel;
  });
  hotelsBlocksVisibility.value = updatedVisibility;
};

const days = computed(() => {
  const days = [];
  for (let i = 0; i < props.calendarLength; i++) {
    const nextDay = new Date(props.startDate);
    nextDay.setDate(nextDay.getDate() + i);
    days.push(nextDay);
  }
  return days;
});

const calendarLengthUnit = computed(() => {
  return props.calendarLength === 14 ? '2週間' : '30日';
});

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

const isClosedDay = (day: Date): boolean => {
  return props.closedDays.some((closedDay) => {
    return closedDay.getTime() === day.getTime();
  });
};

const isLimitedAccommodation = (day: Date): boolean => {
  return props.limitedAccommodationDays.some((limitedAccommodationDay) => {
    return limitedAccommodationDay.getTime() === day.getTime();
  });
};

const isSpecifiedPeriod = (day: Date): boolean => {
  return props.specifiedPeriodDays.some((specifiedPeriodDay) => {
    return specifiedPeriodDay.getTime() === day.getTime();
  });
};

const getDayHeaderContentClass = (day: Date) => {
  const weekday = day.getDay();
  const isHoliday = props.holidays.some((holiday) => {
    return holiday.getTime() === day.getTime();
  });
  const weekdayClass =
    weekday === 0 || isHoliday
      ? ['ilc-table__day-content--holiday']
      : weekday === 6
      ? ['ilc-table__day-content--saturday']
      : [];
  return ['ilc-table__day-content', ...weekdayClass].join(' ');
};

const getBlockSettingButtonClass = (day: Date) => {
  const weekday = day.getDay();
  const isHoliday = props.holidays.some((holiday) => {
    return holiday.getTime() === day.getTime();
  });
  const isDayBeforeHoliday = props.daysBeforeHolidays.some((holiday) => {
    return holiday.getTime() === day.getTime();
  });
  const weekdayClass =
    weekday === 0 || isHoliday
      ? ['ilc-table__block-setting-button--holiday']
      : weekday === 6
      ? ['ilc-table__block-setting-button--saturday']
      : isDayBeforeHoliday
      ? ['ilc-table__block-setting-button--before-holiday']
      : [];
  return ['ilc-table__block-setting-button', ...weekdayClass].join(' ');
};

const getWeekdayBackgroundClass = (day: Date): string[] => {
  const weekday = day.getDay();

  const isHoliday = props.holidays.some((holiday) => {
    return holiday.getTime() === day.getTime();
  });

  const isDayBeforeHoliday = props.daysBeforeHolidays.some((holiday) => {
    return holiday.getTime() === day.getTime();
  });

  return weekday === 0 || isHoliday
    ? ['ilc-table__cell-background-holiday']
    : weekday === 6
    ? ['ilc-table__cell-background-saturday']
    : isDayBeforeHoliday
    ? ['ilc-table__cell-background-before-holiday']
    : [];
};

const getTypeHeaderClass = (dayIndex: number) => {
  const day = days.value[dayIndex];
  const weekdayClass = getWeekdayBackgroundClass(day);
  return ['ilc-table__type-header', ...weekdayClass].join(' ');
};

const getDayValueClass = (dayIndex: number, value?: number) => {
  const day = days.value[dayIndex];
  const weekdayClass = getWeekdayBackgroundClass(day);
  const negativeClass = value && value < 0 ? ['ilc-table__cell--negative'] : [];
  const zeroClass = value === 0 ? ['ilc-table__cell--zero'] : [];

  return [
    'ilc-table-cell__day-value',
    ...weekdayClass,
    ...negativeClass,
    ...zeroClass,
  ].join(' ');
};

const getHeldClass = (dayIndex: number) => {
  const day = days.value[dayIndex];
  const weekdayClass = getWeekdayBackgroundClass(day);

  return ['ilc-table-cell__held', ...weekdayClass].join(' ');
};

const getPercentageClass = (dayIndex: number) => {
  const day = days.value[dayIndex];
  const weekdayClass = getWeekdayBackgroundClass(day);

  return ['ilc-table-cell__percentage', ...weekdayClass].join(' ');
};

const getAllTotals = (day: Date, type: BlockInfoType) => {
  const dayIndex = days.value.findIndex((d) => d.getTime() === day.getTime());
  const topValues = staticBlocksTopKeys.value.reduce((acc, key) => {
    return acc + (props.staticBlocksTop[key].totals[dayIndex]?.[type] || 0);
  }, 0);
  const bottomValues = staticBlocksBottomKeys.value.reduce((acc, key) => {
    return acc + (props.staticBlocksBottom[key].totals[dayIndex]?.[type] || 0);
  }, 0);

  const hotelValues = props.hotelBlocks.reduce((acc, hotel) => {
    return acc + (hotel.totals[dayIndex]?.[type] || 0);
  }, 0);

  return topValues + bottomValues + hotelValues;
};

const tableDayHeaderClass = computed(() => {
  const dayClass =
    props.calendarLength === 14
      ? ['ilc-table__day-header--14']
      : ['ilc-table__day-header--30'];
  return ['ilc-table__day-header', ...dayClass].join(' ');
});

const visibleMonths = computed(() => {
  const firstDay = days.value[0];
  const lastDay = days.value[days.value.length - 1];
  const firstMonth = firstDay.getMonth() + 1;
  const lastMonth = lastDay.getMonth() + 1;

  const firstYear = firstDay.getFullYear();
  const lastYear = lastDay.getFullYear();
  if (firstMonth === lastMonth) {
    return `${firstYear}年${firstMonth}月`;
  } else {
    return `${firstYear}年${firstMonth}月 - ${lastYear}年${lastMonth}月`;
  }
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.ilc-control {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.ilc-control__buttons {
  display: flex;
  align-items: center;
}

.ilc-table-container {
  overflow: auto;
  height: 100%;
}

.ilc-table-container table {
  border-collapse: separate;
  border-spacing: 0;
  position: relative;
  background-color: $color-background-neutral--white;
  height: 100%;
  width: 100%;
}

.ilc-table-container table thead {
  top: 0px;
  position: sticky;
  z-index: 5;
  background: $color-background-neutral--white;
}

.ilc-table-container table thead th {
  text-align: center;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--outline;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: $color-border-neutral--outline;
  @include \.font-component-label-medium;
  font-weight: 400;
  white-space: nowrap;
}

.ilc-table-container table tbody td {
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--outline;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: $color-border-neutral--outline;
}

.ilc-table-container table tbody {
  flex-grow: 1;
}

.ilc-table__block-divider td {
  height: 8px !important;
  background-color: $color-background-neutral--light-01;
  border-bottom: none !important;
}

.ilc-table__empty-space {
  height: 100%;
}

.ilc-table__empty-space td {
  height: 100% !important;
  border-bottom: none !important;
  border-top: none !important;
  background-color: $color-background-neutral--light-01;
}

.ilc-table-container table tfoot {
  background: $color-background-neutral--white;
  bottom: 0px;
  position: sticky;
  z-index: 5;
}

.ilc-table-container table tfoot td {
  height: 32px;
  text-align: center;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--outline;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: $color-border-neutral--outline;
}

.ilc-table-container table tfoot tr:first-child td {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: $color-border-neutral--light;
}

.ilc-table__block-type-header {
  min-width: 196px;
  padding-bottom: 8px;
  vertical-align: bottom;
  color: $color-content-text--light;
}

.ilc-table__day-header {
  padding: 0px;
  min-width: 100px;
  padding-bottom: 4px;
  height: 48px;
  position: relative;
}

.ilc-table__day-header--14 {
  min-width: 100px;
}

.ilc-table__day-header--30 {
  min-width: 48px;
}

.ilc-table__day-content {
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  color: $color-content-text--light;
}

.ilc-table__day-content--saturday {
  color: $color-content-calendar--saturday;
}

.ilc-table__day-content--holiday {
  color: $color-content-calendar--holiday;
}

.ilc-table__day-content :first-child {
  font-size: $font-size-2xs;
  line-height: 150%;
  font-weight: $font-weight-bold;
}

.ilc-table__day-content :last-child {
  font-size: $font-size-ll;
  line-height: 150%;
  font-weight: $font-weight-bold;
}

.ilc-table__type-header {
  height: 39px;
  min-width: 33px;
  vertical-align: middle;
  font-size: $font-size-xs;
  border-right-style: dotted !important;
  color: $color-content-text--light;
}

.ilc-table-cell__day-value {
  height: 39px;
  width: 33px;
  vertical-align: middle;
  border-right-style: dotted !important;
  text-align: center;
  padding: 0px;
}

.ilc-table-cell__day-value-top-blocks-total {
  font-weight: $font-weight-bold;
}

.ilc-table-cell__day-value-bottom-blocks-total {
  font-weight: $font-weight-bold;
  color: $color-content-error--main;
}

.ilc-table-cell__day-value-grand-total {
  font-size: $font-size-2xs;
}

.ilc-table-cell__held {
  color: $color-content-error--main;
  font-size: $font-size-xs;
}

.ilc-table-cell__percentage {
  font-size: $font-size-2xs;
}

.ilc-table__cell--negative {
  color: $color-content-error--main;
}

.ilc-table__cell--zero {
  color: $color-content-neutral--light-00;
  font-weight: $font-weight-regular;
}

.ilc-table__cell-background-saturday {
  background: $color-background-calendar--saturday;
}

.ilc-table__cell-background-holiday {
  background: $color-background-calendar--holiday;
}

.ilc-table__cell-background-before-holiday {
  background: $color-background-calendar--before-holiday;
}

.ilc-table__footer-subtitle {
  padding-left: 40px;
  padding-right: 8px;
  font-size: $font-size-xs;
  color: $color-content-text--light;
  font-weight: $font-weight-bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ilc-table__footer-subtitle :deep(.icon) {
  color: $color-content-neutral--main;
}

.ilc-table__block-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 6px;
}

.ilc-table__block-item {
  padding: 10px 4px 10px 40px;
}

.ilc-table__block-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: $font-weight-bold;
}

.ilc-table-cell__expand-button,
.ilc-table-cell__plus-button {
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  padding: 0px;
  line-height: 100%;
  background: none;
}

.ilc-table-cell__expand-button :deep(.icon) {
  color: $color-content-primary--main;
}

.ilc-table-cell__plus-button :deep(.icon) {
  color: $color-content-neutral--main;
}

.ilc-table__closed-day-header {
  background: $color-background-calendar--closed;
  text-align: center;
  color: $color-content-neutral--disable;
  font-size: $font-size-xs;
  border-right-style: dotted !important;
}

.ilc-table__closed-day {
  background: $color-background-calendar--closed;
  text-align: center;
  color: $color-content-neutral--disable;
  font-size: $font-size-xs;
  border-right-style: dotted !important;
  width: 33px;
}

.ilc-table__block-setting-button {
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  padding: 0px;
  background: none;
  color: $color-content-primary--main;
  font-weight: $font-weight-bold;
  width: 100%;
  height: 100%;
}

.ilc-table__block-setting-button:hover {
  background: $color-background-primary--light-00;
}

.ilc-table__block-setting-button--holiday:hover {
  background: $color-background-calendar--holiday-hover;
}

.ilc-table__block-setting-button--saturday:hover {
  background: $color-background-calendar--saturday-hover;
}

.ilc-table__block-setting-button--before-holiday:hover {
  background: $color-background-calendar--before-holiday-hover;
}
</style>
