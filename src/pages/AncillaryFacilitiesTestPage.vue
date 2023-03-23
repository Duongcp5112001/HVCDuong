<template>
  <Dialog
    v-if="newReservationToDelete"
    :open="confirmDeleteNewReservationOpen"
    @close-dialog="confirmDeleteNewReservationOpen = false"
  >
    <template #header>
      <Text color="critical" size="xl" bold>
        付帯施設予約をキャンセルします
      </Text>
    </template>
    <Text class="util-mb-8" color="light" bold>
      宿泊の予約はキャンセルされません。
    </Text>
    <Table width="100%">
      <template #head>
        <TableRow id="row-1">
          <TableColumn id="col-1" width="144px">施設名</TableColumn>
          <TableColumn id="col-2" min-width="173px">利用日</TableColumn>
          <TableColumn id="col-4" min-width="43px" text-align="center">
            時間
          </TableColumn>
        </TableRow>
      </template>
      <template #body>
        <TableRow id="row-1">
          <TableCell>{{ newReservationToDelete.categoryLabel }}</TableCell>
          <TableCell>
            {{ formatDate(newReservationToDelete.dayDate) }}
          </TableCell>
          <TableCell>
            {{
              formatTime(
                newReservationToDelete.startHour,
                newReservationToDelete.endHour
              )
            }}
          </TableCell>
        </TableRow>
      </template>
    </Table>
    <template #footer>
      <Button
        size="large"
        width="160px"
        color="critical"
        icon="delete"
        @click="onConfirmCancelReservation"
      >
        キャンセル
      </Button>
    </template>
  </Dialog>
  <div class="lay-container lay-container--3panes">
    <the-sidebar/>
    <main class="lay-main">
      <div class="lay-main__container">
        <Disclosure color="light">
          <template #title>
            <Text bold>付帯施設</Text>
          </template>
          <Panel>
            <div class="util-flex util-flex--gap8 util-mb-8">
              <Button
                type="outlined"
                icon="keyboard_arrow_left"
                color="neutral"
                :disabled="previousDateIsDisabled()"
                @click="onPrevDate"
              />
              <Button
                type="outlined"
                icon="keyboard_arrow_right"
                color="neutral"
                :disabled="nextDateIsDisabled()"
                @click="onNextDate"
              />
              <Dropdown
                v-model:value="selectedDateText"
                size="small"
                width="240px"
              >
                <DropdownItem
                  v-for="(option, i) in dateSelectionOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
              <Dropdown
                v-model:value="facilitiesSelectedCategory"
                placeholder="0"
                size="small"
                width="240px"
              >
                <DropdownItem
                  v-for="(option, i) in facilitiesCategoriesOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
              <TextField
                v-model="searchField"
                icon="search"
                placeholder="施設名・コード"
                width="240px"
              />
              <Button icon="search" color="neutral"> 検索 </Button>
              <Button type="outlined" color="neutral"> クリア </Button>
            </div>
            <AncillaryFacilities
              :categories="categories"
              :reservation-name="reservationName"
              :new-reservations="newReservations"
              :selected-date="new Date(selectedDateText)"
              @add-reservation="onAddReservation"
              @update-reservation="onUpdateReservation"
              @cancel-reservation="onCancelReservation"
            >
            </AncillaryFacilities>
          </Panel>
          <div
            v-for="(reservationDay, index) in orderedReservations"
            :key="`reservation-table-${index}`"
            class="util-mt-16"
          >
            <Text bold size="large">
              {{ formatDate(reservationDay.dayDate) }}
            </Text>
            <Table class="util-mt-16" width="100%">
              <template #head>
                <TableRow id="head-row-1">
                  <TableColumn id="col-1" min-width="160px" width="160px">
                    施設名
                  </TableColumn>
                  <TableColumn id="col-1" min-width="83px" width="83px">
                    時間
                  </TableColumn>
                  <TableColumn id="col-1" min-width="240px" width="240px">
                    料金
                  </TableColumn>
                  <TableColumn id="col-1" min-width="160px"> 備考 </TableColumn>
                  <TableColumn
                    id="col-1"
                    min-width="96px"
                    width="96px"
                    text-align="center"
                  >
                    変更
                  </TableColumn>
                  <TableColumn
                    id="col-1"
                    min-width="96px"
                    width="96px"
                    text-align="center"
                  >
                    キャンセル
                  </TableColumn>
                </TableRow>
              </template>
              <template #body>
                <TableRow
                  v-for="reservation in reservationDay.reservations"
                  :id="`reservation-${reservation.id}`"
                  :key="`reservation-${reservation.id}`"
                >
                  <TableCell>{{ reservation.categoryLabel }}</TableCell>
                  <TableCell>
                    {{ formatTime(reservation.startHour, reservation.endHour) }}
                  </TableCell>
                  <TableCell>{{ reservation.price }}</TableCell>
                  <TableCell>{{ reservation.comments }}</TableCell>
                  <TableCell text-align="center">
                    <EditNewReservationPopup
                      :new-reservation="reservation"
                      :new-reservations="newReservations"
                      :day-schedule="
                        getDaySchedule(reservation.categoryId, reservation.day)
                      "
                      aligned="right"
                      @confirm-update-reservation="onUpdateReservation"
                      @cancel-reservation="onCancelReservation"
                    >
                      <Button color="neutral" type="outlined">変更</Button>
                    </EditNewReservationPopup>
                  </TableCell>
                  <TableCell text-align="center">
                    <Button
                      color="critical"
                      icon="delete"
                      type="text"
                      @click="onCancelReservation(reservation.id)"
                    ></Button>
                  </TableCell>
                </TableRow>
              </template>
            </Table>
          </div>
        </Disclosure>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AncillaryFacilities, {
  NewReservation,
} from '../components/AncillaryFacilities/AncillaryFacilities.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import Disclosure from '../components/Disclosure/Disclosure.vue';
import Text from '../components/Text/Text.vue';
import Button from '../components/Button/Button.vue';
import Panel from '../components/Panel/Panel.vue';
import Dropdown from '../components/Dropdown/Dropdown.vue';
import DropdownItem from '../components/Dropdown/DropdownItem.vue';
import TextField from '../components/TextField/TextField.vue';
import Dialog from '../components/Dialog/Dialog.vue';

import { computed, Ref, ref } from 'vue';
import { ancillaryFacillitiesSampleData } from '../data/ancillaryFacilitiesTestData';
import EditNewReservationPopup from '../components/InlinePopup/variations/EditNewReservationPopup.vue';
import TheSidebar from "@/containers/TheSidebar.vue";

const categories = ancillaryFacillitiesSampleData();
const reservationName = ref('田中 太郎');

const selectedDateText = ref('2022/09/20');
const facilitiesSelectedCategory = ref('すべてのカテゴリー');
const searchField = ref('');
const currentNewReservationsId = ref(1);
const newReservations: Ref<NewReservation[]> = ref([]);
const confirmDeleteNewReservationOpen = ref(false);
const newReservationToDelete: Ref<NewReservation | undefined> = ref(undefined);

const orderedReservations = computed(() => {
  const orderedReservations: {
    dayDate: Date;
    reservations: NewReservation[];
  }[] = [];
  newReservations.value.forEach((reservation) => {
    const index = orderedReservations.findIndex((orderedReservation) => {
      return (
        orderedReservation.dayDate.getTime() === reservation.dayDate.getTime()
      );
    });
    if (index === -1) {
      orderedReservations.push({
        dayDate: reservation.dayDate,
        reservations: [reservation],
      });
    } else {
      orderedReservations[index].reservations.push(reservation);
    }
  });

  const orderedByDate = orderedReservations.sort((a, b) => {
    return a.dayDate.getTime() - b.dayDate.getTime();
  });

  const orderedByTime = orderedByDate.map((orderedReservation) => {
    return {
      ...orderedReservation,
      reservations: orderedReservation.reservations.sort((a, b) => {
        return a.startHour - b.startHour;
      }),
    };
  });

  return orderedByTime;
});

const dateSelectionOptions = [
  {
    label: '2022/09/20',
    value: '2022/09/20',
  },
  {
    label: '2022/09/21',
    value: '2022/09/21',
  },
  {
    label: '2022/09/22',
    value: '2022/09/22',
  },
  {
    label: '2022/09/23',
    value: '2022/09/23',
  },
];

const nextDateIsDisabled = () => {
  const currentSelectionOption = getCurrentSelectedOption();
  if (currentSelectionOption) {
    const currentIndex = dateSelectionOptions.indexOf(currentSelectionOption);
    return currentIndex === dateSelectionOptions.length - 1;
  }
};
const onNextDate = () => {
  const currentSelectionOption = getCurrentSelectedOption();
  if (currentSelectionOption) {
    const currentSelectionOptionIndex = dateSelectionOptions.indexOf(
      currentSelectionOption
    );
    if (currentSelectionOptionIndex < dateSelectionOptions.length - 1) {
      selectedDateText.value =
        dateSelectionOptions[currentSelectionOptionIndex + 1].value;
    }
  }
};

const previousDateIsDisabled = () => {
  const currentSelectionOption = getCurrentSelectedOption();
  if (currentSelectionOption) {
    const currentIndex = dateSelectionOptions.indexOf(currentSelectionOption);
    return currentIndex === 0;
  }
};

const onPrevDate = () => {
  const currentSelectionOption = getCurrentSelectedOption();
  if (currentSelectionOption) {
    const currentSelectionOptionIndex = dateSelectionOptions.indexOf(
      currentSelectionOption
    );
    if (currentSelectionOptionIndex > 0) {
      selectedDateText.value =
        dateSelectionOptions[currentSelectionOptionIndex - 1].value;
    }
  }
};

const getCurrentSelectedOption = () => {
  return dateSelectionOptions.find(
    (option) => option.value === selectedDateText.value
  );
};

const facilitiesCategoriesOptions = [
  {
    label: 'すべてのカテゴリー',
    value: '0',
  },
  {
    label: 'テニスコート',
    value: '2',
  },
  {
    label: 'カラオケルーム',
    value: '3',
  },
  {
    label: 'ペットケージ',
    value: '4',
  },
];

const onAddReservation = (newReservation: NewReservation) => {
  newReservations.value = [
    ...newReservations.value,
    { ...newReservation, id: `new-${currentNewReservationsId.value}` },
  ];
  currentNewReservationsId.value++;
};

const onUpdateReservation = (updatedNewReservation: NewReservation) => {
  newReservations.value = newReservations.value.map((reservation) => {
    if (reservation.id === updatedNewReservation.id) {
      return updatedNewReservation;
    }
    return reservation;
  });
};

const onCancelReservation = (id: string) => {
  newReservationToDelete.value = newReservations.value.find(
    (reservation) => reservation.id === id
  );
  confirmDeleteNewReservationOpen.value = true;
};

const onConfirmCancelReservation = () => {
  if (newReservationToDelete.value) {
    newReservations.value = newReservations.value.filter(
      (reservation) => reservation.id !== newReservationToDelete.value?.id
    );
  }
  newReservationToDelete.value = undefined;
  confirmDeleteNewReservationOpen.value = false;
};

const formatDate = (date: Date) => {
  const lang = 'ja',
    year = date.toLocaleString(lang, { year: 'numeric' }),
    month = date.toLocaleString(lang, { month: 'short' }),
    day = date.toLocaleString(lang, { day: 'numeric' }),
    dayName = date.toLocaleString(lang, { weekday: 'short' });

  return `${year}${month}${day}(${dayName})`;
};

const formatTime = (startHour: number, endHour: number) => {
  const startHourMinutes = startHour % 1 === 0 ? 0 : 30;
  const startHourString = new Date(
    0,
    0,
    0,
    startHour,
    startHourMinutes
  ).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endHourMinutes = endHour % 1 === 0 ? 0 : 30;
  const endHourString = new Date(
    0,
    0,
    0,
    endHour,
    endHourMinutes
  ).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${startHourString}〜${endHourString}`;
};

const getDaySchedule = (categoryId: string, day: number) => {
  const category = categories.find((category) => category.id === categoryId);

  const categoryContainingSubcategory = categories.find(
    (category) =>
      category.subCategories.filter(
        (subCategory) => subCategory.id === categoryId
      ).length > 0
  );

  const subCategory = categoryContainingSubcategory
    ? categoryContainingSubcategory.subCategories.filter(
        (subCategory) => subCategory.id === categoryId
      )[0]
    : undefined;

  if (category) {
    return category.daysSchedule[day];
  } else if (subCategory) {
    return subCategory.daysSchedule[day];
  }

  return {
    startHour: 0,
    endHour: 24,
    scheduled: [],
  };
};
</script>

<style scoped lang="scss"></style>
