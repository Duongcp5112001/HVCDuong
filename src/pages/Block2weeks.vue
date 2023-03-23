<template>
  <div class="lay-container lay-container--3panes">
    <the-sidebar/>
    <main class="lay-main">
      <div class="lay-main__container util-full-height">
        <Breadcrumbs :crumbs="crumbs" />
        <span class="util-flex">
          <Heading class="util-mr-24">在庫一覧</Heading>
        </span>
        <Panel width="100%" color="dark" :shadow="false">
          <span class="util-flex util-flex--align-end util-flex--gap8">
            <FieldContainer label="施設" width="256px" required>
              <Dropdown
                v-model:value="selectedFacility"
                placeholder=""
                size="small"
                width="256px"
              >
                <DropdownItem
                  v-for="(option, i) in facilitiesOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                  width="256px"
                >
                </DropdownItem>
              </Dropdown>
            </FieldContainer>
            <FieldContainer label="日付" required width="259px">
              <DatePicker
                size="small"
                width="259px"
                :date="startDate"
                @change-date="onChangeDate"
              />
            </FieldContainer>
            <FieldContainer label="期間" required width="177px">
              <span class="util-flex util-flex--center util-flex--gap8">
                <RadioButton
                  class="util-py-4 util-px-4"
                  :checked="daysSpanCheck == 14"
                  name="days-span"
                  label="2週間"
                  @click="onChangeDaysSpan(14)"
                />
                <RadioButton
                  class="util-py-4 util-px-4"
                  :checked="daysSpanCheck == 30"
                  name="days-span"
                  label="30日間"
                  @click="onChangeDaysSpan(30)"
                />
              </span>
            </FieldContainer>
            <Button icon="search" color="neutral"> 検索 </Button>
            <Button type="outlined" color="neutral"> クリア </Button>
          </span>
        </Panel>
        <Text size="large" bold>
          {{ displayedFacility }}
        </Text>
        <Panel class="d01a-calendar-area" width="100%">
          <div
            class="
              util-flex util-flex--column
              util-full-height
              util-flex--grow-one
            "
          >
            <InventoryListCalendar
              :static-blocks-top="staticBlocksTop"
              :static-blocks-bottom="staticBlocksBottom"
              :hotel-blocks="hotelBlocks"
              :start-date="startDate"
              :held-totals="heldTotals"
              :usage-rates="usageRates"
              :holidays="holidays"
              :days-before-holidays="daysBeforeHolidays"
              :calendar-length="daysSpanCheck"
              :closed-days="closedDays"
              :limited-accommodation-days="limitedAccommodationDays"
              :specified-period-days="specifiedPeriodDays"
              @click-add="onClickAdd"
              @click-setting="onClickSetting"
              @click-next-date="onClickNextDate"
              @click-prev-date="onClickPrevDate"
            />
          </div>
        </Panel>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Panel from '../components/Panel/Panel.vue';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs.vue';
import Heading from '../components/Heading/Heading.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import Dropdown from '../components/Dropdown/Dropdown.vue';
import DropdownItem from '../components/Dropdown/DropdownItem.vue';
import DatePicker from '../components/DatePicker/DatePicker.vue';
import RadioButton from '../components/RadioButton/RadioButton.vue';
import Button from '../components/Button/Button.vue';
import Text from '../components/Text/Text.vue';
import InventoryListCalendar, {
  HotelBlocks,
  StaticBlocksTop,
  StaticBlocksBottom,
} from '../components/InventoryListCalendar/InventoryListCalendar.vue';
import { ref, computed } from 'vue';
import TheSidebar from "@/containers/TheSidebar.vue";

const crumbs = [
  { label: 'ホーム', id: 'crumb-1', href: '#' },
  { label: '在庫一覧', id: 'crumb-2', href: '#' },
];

const facilitiesOptions = [
  {
    label: '裏磐梯グランデコ',
    value: '1',
  },
  {
    label: '裏磐梯グランデコ-2',
    value: '2',
  },
  {
    label: '裏磐梯グランデコ-3',
    value: '3',
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

const startDate = ref(new Date('November 1, 2022 00:00:00'));
const onChangeDate = (date: Date) => {
  startDate.value = date;
};

const daysSpanCheck = ref<14 | 30>(14);
const onChangeDaysSpan = (value: 14 | 30) => {
  daysSpanCheck.value = value;
};

const onClickAdd = (id: string) => {
  console.log('clicked on', id);
};
const onClickSetting = (block: string, itemId: string, day: Date) => {
  console.log('Clicked on block:', block, 'itemId:', itemId, 'on day:', day);
};

const onClickNextDate = (newDate: Date) => {
  startDate.value = newDate;
};

const onClickPrevDate = (newDate: Date) => {
  startDate.value = newDate;
};

/** Dummy Data */
const holidays = computed(() => {
  const holiday1 = new Date(startDate.value);
  holiday1.setDate(holiday1.getDate() + 2);
  return [holiday1];
});

const daysBeforeHolidays = computed(() => {
  const dayBeforeHoliday1 = new Date(startDate.value);
  dayBeforeHoliday1.setDate(dayBeforeHoliday1.getDate() + 3);
  const dayBeforeHoliday2 = new Date(startDate.value);
  dayBeforeHoliday2.setDate(dayBeforeHoliday2.getDate() + 10);

  return [dayBeforeHoliday1, dayBeforeHoliday2];
});

const closedDays = computed(() => {
  const closeDay1 = new Date(startDate.value);
  closeDay1.setDate(closeDay1.getDate() + 13);

  return [closeDay1];
});

const limitedAccommodationDays = computed(() => {
  const limitedAccommodationDay1 = new Date(startDate.value);
  limitedAccommodationDay1.setDate(limitedAccommodationDay1.getDate() + 2);
  const limitedAccommodationDay2 = new Date(startDate.value);
  limitedAccommodationDay2.setDate(limitedAccommodationDay2.getDate() + 3);
  const limitedAccommodationDay3 = new Date(startDate.value);
  limitedAccommodationDay3.setDate(limitedAccommodationDay3.getDate() + 4);
  const limitedAccommodationDay4 = new Date(startDate.value);
  limitedAccommodationDay4.setDate(limitedAccommodationDay4.getDate() + 5);

  return [
    limitedAccommodationDay1,
    limitedAccommodationDay2,
    limitedAccommodationDay3,
    limitedAccommodationDay4,
  ];
});

const specifiedPeriodDays = computed(() => {
  const specifiedPeriodDay1 = new Date(startDate.value);
  specifiedPeriodDay1.setDate(specifiedPeriodDay1.getDate() + 2);
  const specifiedPeriodDay2 = new Date(startDate.value);
  specifiedPeriodDay2.setDate(specifiedPeriodDay2.getDate() + 3);
  const specifiedPeriodDay3 = new Date(startDate.value);
  specifiedPeriodDay3.setDate(specifiedPeriodDay3.getDate() + 4);
  const specifiedPeriodDay4 = new Date(startDate.value);
  specifiedPeriodDay4.setDate(specifiedPeriodDay4.getDate() + 5);

  return [
    specifiedPeriodDay1,
    specifiedPeriodDay2,
    specifiedPeriodDay3,
    specifiedPeriodDay4,
  ];
});

const staticBlocksTop: StaticBlocksTop = {
  home: {
    totals: [
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 104,
        remaining: -4,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
    ],
    items: [
      {
        label: 'SD2',
        id: 'item-id-1',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
      {
        label: 'SE3',
        id: 'item-id-2',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
    ],
  },
  mutual: {
    totals: [
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
    ],
    items: [
      {
        label: 'SD2',
        id: 'item-id-3',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
      {
        label: 'SE3',
        id: 'item-id-4',
        days: [
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
        ],
      },
      {
        label: 'SU',
        id: 'item-id-4-2',
        days: [
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
        ],
      },
      {
        label: 'ND1',
        id: 'item-id-4-3',
        days: [
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
        ],
      },
      {
        label: 'NA',
        id: 'item-id-4-4',
        days: [
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
        ],
      },
      {
        label: 'ND3',
        id: 'item-id-4-5',
        days: [
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
        ],
      },
      {
        label: 'ND4',
        id: 'item-id-4-6',
        days: [
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
        ],
      },
      {
        label: 'NB',
        id: 'item-id-4-7',
        days: [
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
        ],
      },
      {
        label: 'NUS',
        id: 'item-id-4-8',
        days: [
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
        ],
      },
      {
        label: 'NE2',
        id: 'item-id-4-9',
        days: [
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
        ],
      },
      {
        label: 'NE4',
        id: 'item-id-4-10',
        days: [
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 8,
            reserved: 7,
            remaining: 1,
          },
        ],
      },
    ],
  },
  raffle: {
    totals: [
      {
        setting: 0,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 0,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 0,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 0,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 0,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 0,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 0,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 0,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 0,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 0,
        reserved: 0,
        remaining: 0,
      },
    ],
    items: [
      {
        label: 'SD2',
        id: 'item-id-17',
        days: [
          {
            setting: 0,
            reserved: 0,
            remaining: 0,
          },
          {
            setting: 0,
            reserved: 0,
            remaining: 0,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 0,
            reserved: 0,
            remaining: 0,
          },
          {
            setting: 0,
            reserved: 0,
            remaining: 0,
          },
          {
            setting: 0,
            reserved: 0,
            remaining: 0,
          },
          {
            setting: 0,
            reserved: 0,
            remaining: 0,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 0,
            reserved: 0,
            remaining: 0,
          },
        ],
      },
    ],
  },
  vip: {
    totals: [
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
    ],
    items: [
      {
        label: 'SD2',
        id: 'item-id-5',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
      {
        label: 'SE3',
        id: 'item-id-6',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
    ],
  },
};

const staticBlocksBottom: StaticBlocksBottom = {
  malfunction: {
    totals: [
      {
        setting: 2,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 2,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 2,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 2,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 2,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 2,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 2,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 2,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 2,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 2,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 2,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 2,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 2,
        reserved: 0,
        remaining: 0,
      },
    ],
    items: [
      {
        label: 'SD2',
        id: 'item-id-7',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
      {
        label: 'SE3',
        id: 'item-id-8',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
    ],
  },
  unavailable: {
    totals: [
      {
        setting: 1,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 1,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 1,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 1,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 1,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 1,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 1,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 1,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 1,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 1,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 1,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 1,
        reserved: 0,
        remaining: 0,
      },
      {
        setting: 1,
        reserved: 0,
        remaining: 0,
      },
    ],
    items: [
      {
        label: 'SD2',
        id: 'item-id-9',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
      {
        label: 'SE3',
        id: 'item-id-10',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
    ],
  },
};

const hotelBlocks: HotelBlocks[] = [
  {
    title: 'ホテルハーヴェスト',
    id: 'harvest-01',
    totals: [
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
    ],
    items: [
      {
        label: 'SD2',
        id: 'item-id-11',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
      {
        label: 'SE3',
        id: 'item-id-12',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
    ],
  },
  {
    title: '一休',
    id: 'ikyuu-01',
    totals: [
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
    ],
    items: [
      {
        label: 'SD2',
        id: 'item-id-13',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
      {
        label: 'SE3',
        id: 'item-id-14',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
    ],
  },
  {
    title: '関連IT',
    id: 'kanrenit-01',
    totals: [
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 999,
        reserved: 8,
        remaining: 1,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
      {
        setting: 100,
        reserved: 88,
        remaining: 12,
      },
    ],
    items: [
      {
        label: 'SD2',
        id: 'item-id-15',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
      {
        label: 'SE3',
        id: 'item-id-16',
        days: [
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 999,
            reserved: 8,
            remaining: 1,
          },
          {
            setting: 12,
            reserved: 11,
            remaining: 1,
          },
        ],
      },
    ],
  },
];

const heldTotals = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

const usageRates = [
  88.0, 88.0, 88.3, 88.3, 88.3, 88.3, 88.0, 88.0, 88.0, 88.0, 88.3, 88.3, 88.3,
  88.0,
];
</script>

<style scoped lang="scss">
.d01a-calendar-area {
  height: calc(100% - 197px);
}
</style>
