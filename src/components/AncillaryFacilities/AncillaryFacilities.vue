<template>
  <table class="table">
    <thead>
      <tr>
        <th class="table__facility-name-header" rowspan="2">施設名</th>
        <th class="table__day-header" colspan="24">
          {{ formatDate(selectedDates[0]) }}
        </th>
        <th class="table__day-header" colspan="24">
          {{ formatDate(selectedDates[1]) }}
        </th>
      </tr>
      <tr v-once>
        <th
          v-for="(hour, hourIndex) in 24"
          :key="`day1-${hourIndex}`"
          :class="`table__hour-header ${
            hour === 24 ? 'table__hour-header--last' : ''
          }`"
        >
          {{ hourIndex }}
        </th>
        <th
          v-for="(hour, hourIndex) in 24"
          :key="`day1-${hourIndex}`"
          :class="`table__hour-header ${
            hour === 24 ? 'table__hour-header--last' : ''
          }`"
        >
          {{ hourIndex }}
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="category in categories" :key="category.id">
        <tr>
          <td class="category-cell">
            <button
              v-if="category.subCategories.length > 0"
              class="category-cell__expand-button"
              @click="toggleSubCategoriesVisibility(category.id)"
            >
              <Icon
                :icon="getCategoryToggleIcon(category.id)"
                color="#0061A3"
                :size="16"
              />
            </button>
            <span class="category-cell__label">
              {{ category.label }}
            </span>
            <Tooltip v-if="category.information" direction="right">
              <Icon
                icon="info"
                type="outlined"
                color="#313131"
                :size="16"
              ></Icon>
              <template #toolTipContent>
                <span>
                  {{ category.information }}
                </span>
              </template>
            </Tooltip>
          </td>
          <template
            v-for="(daySchedule, dayIndex) in category.daysSchedule"
            :key="`${category.id}-day-${dayIndex}`"
          >
            <td
              v-for="(hour, hourIndex) in 24"
              :key="`day-${dayIndex}-${hourIndex}`"
              :class="getHourCellClass(hourIndex, daySchedule, category.id)"
            >
              <div class="hour-container">
                <div
                  :class="
                    getHalfHourCellClass(
                      dayIndex,
                      hourIndex,
                      daySchedule,
                      category.id
                    )
                  "
                  @mousedown="
                    onClickHalfHour($event, hourIndex, dayIndex, category.id)
                  "
                  @mouseup="onReleaseHalfHour(hourIndex + 0.5)"
                  @mouseover="
                    onMouseOverHalfHour(
                      $event,
                      hourIndex,
                      dayIndex,
                      category.id
                    )
                  "
                >
                  <ReservationBlobs
                    :new-reservation="
                      getNewReservation(dayIndex, hourIndex, category.id)
                    "
                    :reservation-name="reservationName"
                    :existing-reservation="
                      getExistingReservation(hourIndex, daySchedule.scheduled)
                    "
                    :day-schedule="daySchedule"
                    :new-reservations="newReservations"
                    :held-new-reservation-id="heldNewReservation?.id"
                    @confirm-update-reservation="updateReservation"
                    @closed-popup="onClosedPopup"
                    @cancel-reservation="onCancelReservation"
                  />
                </div>
                <div
                  :class="
                    getHalfHourCellClass(
                      dayIndex,
                      hourIndex + 0.5,
                      daySchedule,
                      category.id
                    )
                  "
                  @mousedown="
                    onClickHalfHour(
                      $event,
                      hourIndex + 0.5,
                      dayIndex,
                      category.id
                    )
                  "
                  @mouseup="onReleaseHalfHour(hour)"
                  @mouseover="
                    onMouseOverHalfHour(
                      $event,
                      hourIndex + 0.5,
                      dayIndex,
                      category.id
                    )
                  "
                >
                  <ReservationBlobs
                    :new-reservation="
                      getNewReservation(dayIndex, hourIndex + 0.5, category.id)
                    "
                    :reservation-name="reservationName"
                    :existing-reservation="
                      getExistingReservation(
                        hourIndex + 0.5,
                        daySchedule.scheduled
                      )
                    "
                    :day-schedule="daySchedule"
                    :new-reservations="newReservations"
                    :held-new-reservation-id="heldNewReservation?.id"
                    @confirm-update-reservation="updateReservation"
                    @closed-popup="onClosedPopup"
                    @cancel-reservation="onCancelReservation"
                  />
                </div>
              </div>
            </td>
          </template>
        </tr>
        <template v-if="!hiddenCategories.includes(category.id)">
          <tr
            v-for="subCategory in category.subCategories"
            :key="subCategory.id"
          >
            <td class="sub-category-cell">
              <span class="category-cell__label">
                {{ subCategory.label }}
              </span>
              <Tooltip v-if="subCategory.information" direction="right">
                <Icon
                  icon="info"
                  type="outlined"
                  color="#313131"
                  :size="16"
                ></Icon>
                <template #toolTipContent>
                  <span>
                    {{ subCategory.information }}
                  </span>
                </template>
              </Tooltip>
            </td>
            <template
              v-for="(daySchedule, dayIndex) in subCategory.daysSchedule"
              :key="`${subCategory.id}-day-${dayIndex}`"
            >
              <td
                v-for="(hour, hourIndex) in 24"
                :key="`day-${dayIndex}-${hourIndex}`"
                :class="
                  getHourCellClass(hourIndex, daySchedule, subCategory.id)
                "
              >
                <div class="hour-container">
                  <div
                    :class="
                      getHalfHourCellClass(
                        dayIndex,
                        hourIndex,
                        daySchedule,
                        subCategory.id
                      )
                    "
                    @mousedown="
                      onClickHalfHour(
                        $event,
                        hourIndex,
                        dayIndex,
                        subCategory.id
                      )
                    "
                    @mouseup="onReleaseHalfHour(hourIndex + 0.5)"
                    @mouseover="
                      onMouseOverHalfHour(
                        $event,
                        hourIndex,
                        dayIndex,
                        subCategory.id
                      )
                    "
                  >
                    <ReservationBlobs
                      :new-reservation="
                        getNewReservation(dayIndex, hourIndex, subCategory.id)
                      "
                      :reservation-name="reservationName"
                      :existing-reservation="
                        getExistingReservation(hourIndex, daySchedule.scheduled)
                      "
                      :day-schedule="daySchedule"
                      :new-reservations="newReservations"
                      :held-new-reservation-id="heldNewReservation?.id"
                      @confirm-update-reservation="updateReservation"
                      @closed-popup="onClosedPopup"
                      @cancel-reservation="onCancelReservation"
                    />
                  </div>
                  <div
                    :class="
                      getHalfHourCellClass(
                        dayIndex,
                        hourIndex + 0.5,
                        daySchedule,
                        subCategory.id
                      )
                    "
                    @mousedown="
                      onClickHalfHour(
                        $event,
                        hourIndex + 0.5,
                        dayIndex,
                        subCategory.id
                      )
                    "
                    @mouseup="onReleaseHalfHour(hour)"
                    @mouseover="
                      onMouseOverHalfHour(
                        $event,
                        hourIndex + 0.5,
                        dayIndex,
                        subCategory.id
                      )
                    "
                  >
                    <ReservationBlobs
                      :new-reservation="
                        getNewReservation(
                          dayIndex,
                          hourIndex + 0.5,
                          subCategory.id
                        )
                      "
                      :reservation-name="reservationName"
                      :existing-reservation="
                        getExistingReservation(
                          hourIndex + 0.5,
                          daySchedule.scheduled
                        )
                      "
                      :day-schedule="daySchedule"
                      :new-reservations="newReservations"
                      :held-new-reservation-id="heldNewReservation?.id"
                      @confirm-update-reservation="updateReservation"
                      @closed-popup="onClosedPopup"
                      @cancel-reservation="onCancelReservation"
                    />
                  </div>
                </div>
              </td>
            </template>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
  <div ref="selectionBlobRef" class="selection-blob"></div>
</template>

<script setup lang="ts">
import Icon from '../Icon/Icon.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import { computed, onMounted, onUnmounted, Ref, ref } from 'vue';
import ReservationBlobs from './ReservationBlobs.vue';

export type Schedule = {
  id: string;
  label: string;
  startHour: number;
  endHour: number;
};

export type DaySchedule = {
  startHour: number;
  endHour: number;
  scheduled: Schedule[];
};

export type Category = {
  id: string;
  label: string;
  information: string;
  daysSchedule: DaySchedule[];
  subCategories: {
    id: string;
    label: string;
    information: string;
    daysSchedule: DaySchedule[];
  }[];
};

export type NewReservation = {
  id: string;
  categoryId: string;
  categoryLabel: string;
  label: string;
  startHour: number;
  endHour: number;
  day: number;
  dayDate: Date;
  comments: string;
  price: string;
};

export type ScheduledReservations = {
  id: string;
  startHour: number;
  endHour: number;
  category: string;
  day: number;
};

export type Props = {
  categories: Category[];
  reservationName: string;
  newReservations: NewReservation[];
  selectedDate: Date;
};

const props = withDefaults(defineProps<Props>(), {
  categories: () => [],
  reservationName: '新規予約',
});

const emit = defineEmits<{
  (event: 'addReservation', newReservation: NewReservation): void;
  (event: 'updateReservation', updatedNewReservation: NewReservation): void;
  (event: 'cancelReservation', id: string): void;
}>();

const updateReservation = (updatedNewReservation: NewReservation) => {
  const isSlotAvailable = canBeAdded(
    updatedNewReservation.categoryId,
    updatedNewReservation.day,
    updatedNewReservation.startHour,
    updatedNewReservation.endHour,
    updatedNewReservation.id
  );

  if (isSlotAvailable) {
    if (heldNewReservation.value?.id === updatedNewReservation.id) {
      heldNewReservation.value = updatedNewReservation;
      emit('addReservation', updatedNewReservation);
      heldNewReservation.value = undefined;
    } else {
      emit('updateReservation', updatedNewReservation);
    }
  }
};

const onCancelReservation = (id: string) => {
  emit('cancelReservation', id);
};

/** Categories */

const hiddenCategories: Ref<string[]> = ref([]);
const toggleSubCategoriesVisibility = (categoryId: string) => {
  if (hiddenCategories.value.includes(categoryId)) {
    hiddenCategories.value = hiddenCategories.value.filter(
      (id) => id !== categoryId
    );
  } else {
    hiddenCategories.value = [...hiddenCategories.value, categoryId];
  }
};

const getCategoryToggleIcon = (categoryId: string) => {
  if (hiddenCategories.value.includes(categoryId)) {
    return 'keyboard_arrow_down';
  } else {
    return 'keyboard_arrow_up';
  }
};

/** Scheduled Blobs */

const scheduledBlobs = computed(() => {
  const blobs: ScheduledReservations[] = [];
  props.categories.forEach((category) => {
    category.subCategories.forEach((subCategory) => {
      subCategory.daysSchedule.forEach((daySchedule) => {
        daySchedule.scheduled.forEach((schedule) => {
          blobs.push({
            id: schedule.id,
            startHour: schedule.startHour,
            endHour: schedule.endHour,
            category: subCategory.id,
            day: subCategory.daysSchedule.indexOf(daySchedule),
          });
        });
      });
    });
  });
  props.categories.forEach((category) => {
    category.daysSchedule.forEach((daySchedule) => {
      daySchedule.scheduled.forEach((schedule) => {
        blobs.push({
          id: schedule.id,
          startHour: schedule.startHour,
          endHour: schedule.endHour,
          category: category.id,
          day: category.daysSchedule.indexOf(daySchedule),
        });
      });
    });
  });
  return blobs;
});

/** Selection Blob */

const selectionBlobRef: Ref<HTMLElement | undefined> = ref();
const blobStartPoint = ref(0);
const draggingOnId = ref('');
const draggingOnDay = ref(-1);
const draggingStartHour = ref(-1);
const heldNewReservation: Ref<NewReservation | undefined> = ref(undefined);

const onClosedPopup = () => {
  heldNewReservation.value = undefined;
};

const addReservation = (hour: number) => {
  const startHour =
    hour > draggingStartHour.value ? draggingStartHour.value : hour;
  const endHour =
    hour > draggingStartHour.value ? hour : draggingStartHour.value;
  const newReservation = {
    id: '',
    categoryId: draggingOnId.value,
    categoryLabel: getCategoryLabel(draggingOnId.value),
    label: props.reservationName,
    startHour,
    endHour,
    day: draggingOnDay.value,
    dayDate: selectedDates.value[draggingOnDay.value],
    comments: '',
    price: '',
  };
  heldNewReservation.value = newReservation;
  endDrag();
};

const getCategoryLabel = (categoryId: string) => {
  let categoryLabel = '';
  props.categories.forEach((category) => {
    if (category.id === categoryId) {
      categoryLabel = category.label;
    }
    category.subCategories.forEach((subCategory) => {
      if (subCategory.id === categoryId) {
        categoryLabel = subCategory.label;
      }
    });
  });
  return categoryLabel;
};

const endDrag = () => {
  draggingOnId.value = '';
  draggingOnDay.value = -1;
  draggingStartHour.value = -1;
  if (selectionBlobRef.value) {
    selectionBlobRef.value.style.display = 'none';
  }
};

/** HalfHour Interactions */

const onClickHalfHour = (
  event: MouseEvent,
  hour: number,
  day: number,
  categoryId: string
) => {
  const selection = event.target as HTMLElement;
  const rect = selection.getBoundingClientRect();
  blobStartPoint.value = rect.right;
  if (selectionBlobRef.value) {
    selectionBlobRef.value.style.left = `${rect.left}px`;
    selectionBlobRef.value.style.top = `${rect.top}px`;
    selectionBlobRef.value.style.width = `${rect.width}px`;
    selectionBlobRef.value.style.height = `${rect.height}px`;
    selectionBlobRef.value.style.display = 'flex';
  }
  draggingOnId.value = categoryId;
  draggingOnDay.value = day;
  draggingStartHour.value = hour;
};

const onMouseOverHalfHour = (
  event: MouseEvent,
  hour: number,
  day: number,
  categoryId: string
) => {
  if (
    draggingOnId.value &&
    draggingOnId.value === categoryId &&
    draggingOnDay.value === day
  ) {
    if (!canBeAdded(categoryId, day, draggingStartHour.value, hour)) {
      return;
    }
    const selection = event.target as HTMLElement;
    const rect = selection.getBoundingClientRect();

    if (selectionBlobRef.value) {
      const blobRect = selectionBlobRef.value.getBoundingClientRect();

      if (rect.right < blobStartPoint.value) {
        const difference = blobStartPoint.value - rect.right;
        selectionBlobRef.value.style.width = `${difference}px`;
        selectionBlobRef.value.style.left = `${rect.left}px`;
      } else {
        const difference = rect.right - blobRect.left;
        selectionBlobRef.value.style.width = `${difference}px`;
      }
    }
  } else {
    endDrag();
  }
};

const onReleaseHalfHour = (hour: number) => {
  if (draggingOnId.value) {
    if (
      canBeAdded(
        draggingOnId.value,
        draggingOnDay.value,
        draggingStartHour.value,
        hour
      )
    ) {
      addReservation(hour);
    }
  }
};

/** Blob Entry Validation */

const canBeAdded = (
  categoryId: string,
  day: number,
  startHour: number,
  endHour: number,
  newReservationId?: string
) => {
  const isOverlappingSchedules = scheduledBlobs.value.find((blob) => {
    if (blob.category === categoryId && blob.day === day) {
      return isInsideBlob(startHour, endHour, blob.startHour, blob.endHour);
    }
  });

  const isOverlappingNewReservations = props.newReservations.find((blob) => {
    if (blob.categoryId === categoryId && blob.day === day) {
      return isInsideBlob(startHour, endHour, blob.startHour, blob.endHour);
    }
  });

  const isOverlappingSelf =
    isOverlappingNewReservations?.id === newReservationId ? true : false;

  return (
    (!isOverlappingSchedules && !isOverlappingNewReservations) ||
    (!isOverlappingSchedules && isOverlappingSelf)
  );
};

const isInsideBlob = (
  startHour: number,
  endHour: number,
  blobStartHour: number,
  blobEndHour: number
) => {
  if (startHour <= blobStartHour && endHour >= blobEndHour) {
    return true;
  }
  if (startHour >= blobStartHour && endHour <= blobEndHour) {
    return true;
  }
  if (startHour <= blobStartHour && endHour > blobStartHour) {
    return true;
  }
  if (startHour < blobEndHour && endHour >= blobEndHour) {
    return true;
  }
};

/** Get Reservations */

const getNewReservation = (day: number, hour: number, categoryId: string) => {
  if (
    heldNewReservation.value &&
    heldNewReservation.value.categoryId === categoryId &&
    heldNewReservation.value.startHour === hour &&
    heldNewReservation.value.day === day
  ) {
    return heldNewReservation.value;
  } else {
    const newReservation = props.newReservations.find(
      (reservation) =>
        reservation.categoryId === categoryId &&
        reservation.startHour === hour &&
        reservation.day === day
    );
    return newReservation;
  }
};

const getExistingReservation = (hour: number, scheduled: Schedule[]) => {
  return scheduled.filter((schedule) => schedule.startHour === hour)[0];
};

/** Style Classes */

const getHalfHourCellClass = (
  day: number,
  hour: number,
  daySchedule: DaySchedule,
  categoryId: string
) => {
  const disabledClass = isHalfHourDisabled(day, hour, daySchedule, categoryId)
    ? ['half-hour--disabled']
    : [];

  return ['half-hour', ...disabledClass].join(' ');
};

const isHalfHourDisabled = (
  day: number,
  hour: number,
  daySchedule: DaySchedule,
  categoryId: string
) => {
  const isOpenInHour =
    daySchedule.startHour <= hour && daySchedule.endHour > hour;

  const hasReservation = daySchedule.scheduled.some(
    (schedule) => hour < schedule.endHour && hour >= schedule.startHour
  );

  const category = categoryId
    ? props.categories.filter((category) => category.id === categoryId)[0]
    : undefined;

  const isCategoryWithChildren = category
    ? category.subCategories.length > 0
    : false;

  const hasNewReservation = props.newReservations.find(
    (reservation) =>
      reservation.categoryId === categoryId &&
      hour >= reservation.startHour &&
      hour < reservation.endHour &&
      reservation.day === day
  )
    ? true
    : false;

  return (
    isCategoryWithChildren ||
    !isOpenInHour ||
    hasReservation ||
    hasNewReservation
  );
};

const getHourCellClass = (
  hour: number,
  daySchedule: DaySchedule,
  categoryId: string
) => {
  const isOpenInHour =
    daySchedule.startHour <= hour && daySchedule.endHour > hour;

  const category = categoryId
    ? props.categories.filter((category) => category.id === categoryId)[0]
    : undefined;

  const isCategoryWithChildren = category
    ? category.subCategories.length > 0
    : false;

  const categoryClass = isCategoryWithChildren ? ['hour-cell--category'] : [];
  const closedClass = isOpenInHour ? [] : ['hour-cell--closed'];
  return ['hour-cell', ...closedClass, ...categoryClass].join(' ');
};

const selectedDates = computed(() => {
  let secondDate = new Date(props.selectedDate);
  secondDate.setDate(secondDate.getDate() + 1);
  return [props.selectedDate, secondDate];
});

const formatDate = (date: Date) => {
  const lang = 'ja',
    year = date.toLocaleString(lang, { year: 'numeric' }),
    month = date.toLocaleString(lang, { month: 'short' }),
    day = date.toLocaleString(lang, { day: 'numeric' }),
    dayName = date.toLocaleString(lang, { weekday: 'short' });

  return `${year}${month}${day}(${dayName})`;
};

const cancelNewReservation = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.classList.contains('half-hour')) {
    endDrag();
  }
};

onMounted(() => {
  window.addEventListener('mouseup', cancelNewReservation);
});

onUnmounted(() => {
  window.removeEventListener('mouseup', cancelNewReservation);
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.table {
  border-spacing: 0;
  background-color: $color-background-neutral--white;
  table-layout: fixed;
}

.table thead tr th {
  height: 24px;
  color: $color-content-text--light;
  @include \.font-component-label-small;
  font-weight: $font-weight-regular;
}

.table__facility-name-header {
  min-width: 240px;
  width: 100%;
  vertical-align: bottom;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: $color-border-neutral--outline;
  padding: 8px;
}

.table__day-header {
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: $color-border-neutral--outline;
  padding: 8px;
}

.table__hour-header--last {
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: $color-border-neutral--outline;
}

.table__hour-header {
  min-width: 22px;
  text-align: center;
}

.table tbody tr:first-child td {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: $color-border-neutral--outline;
}

.table tbody tr td {
  height: 40px;
  color: $color-content-neutral--black;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--outline;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: $color-border-neutral--outline;
}

.category-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  gap: 8px;
}

.sub-category-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 8px 60px;
  gap: 8px;
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

.category-cell__label {
  width: 100%;
}

.hour-cell {
  height: 100%;
  padding: 0px;
}

.hour-cell--closed {
  background-color: $color-background-calendar--closed;
}

.hour-cell--category {
  background-color: $color-background-calendar--category;
}

.hour-container {
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
}

.half-hour {
  cursor: pointer;
  width: 50%;
  height: 100%;
}

.half-hour:hover {
  background-color: $color-background-primary--hover;
}

.half-hour--disabled {
  cursor: default;
  pointer-events: none;
}

.half-hour--disabled:hover {
  background-color: transparent;
}

.selection-blob {
  position: absolute;
  width: 100%;
  border-radius: 4px;
  height: 20px;
  background-color: $color-background-primary--hover;
  pointer-events: none;
  display: none;
}
</style>
