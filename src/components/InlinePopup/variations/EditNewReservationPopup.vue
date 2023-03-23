<template>
  <TeleportInlinePopup
    confirm-button-color="primary"
    confirm-button-label="予約を確定"
    close-type="top"
    :default-open="newlyCreated || false"
    :aligned="aligned"
    :confirm-button-disabled="getHoursAreInvalid()"
    @confirm="confirmUpdateReservation"
    @closed-popup="onClosedPopup"
  >
    <slot />
    <template #popupTitle>{{ newReservation.categoryLabel }}</template>
    <template #popupContent>
      <span class="reservation-popup__input-area">
        <FieldContainer label="利用日">
          {{ formatDate(newReservation.dayDate) }}
        </FieldContainer>
        <FieldContainer label="時間">
          <span class="reservation-popup__time-input">
            <TimePicker
              size="small"
              :minute-increment="30"
              :date="startTime"
              :status="getHoursAreInvalid() ? 'error' : 'default'"
              @change-date="onChangeStartTime"
            />
            <span>〜</span>
            <TimePicker
              size="small"
              :minute-increment="30"
              :date="endTime"
              :status="getHoursAreInvalid() ? 'error' : 'default'"
              @change-date="onChangeEndTime"
            />
          </span>
        </FieldContainer>
        <span
          v-if="getHoursAreInvalid()"
          class="reservation-popup__error-message"
        >
          <Icon icon="report_problem" type="outlined" :size="16" />
          <Text color="critical"> この時間は予約できません </Text>
        </span>
        <FieldContainer label="備考">
          <TextField
            v-model="updatedNewReservation.comments"
            placeholder="例：レンタル希望あり"
            multi-line
            multi-line-height="80px"
          />
        </FieldContainer>
        <FieldContainer label="料金">
          <span class="reservation-popup__money-input">
            <TextField v-model="updatedNewReservation.price" placeholder="0" />
            <Text color="light" size="xs"> ￥1,080 / 30分 </Text>
          </span>
        </FieldContainer>
      </span>
    </template>
    <template #secondaryActionButton>
      <Button
        v-if="!newlyCreated"
        color="critical"
        width="50%"
        icon="delete"
        type="outlined"
        @click="onCancelReservation"
      >
        キャンセル
      </Button>
    </template>
  </TeleportInlinePopup>
</template>

<script setup lang="ts">
import TeleportInlinePopup from '../TeleportInlinePopup.vue';
import FieldContainer from '../../FieldContainer/FieldContainer.vue';
import TimePicker from '../../TimePicker/TimePicker.vue';
import TextField from '../../TextField/TextField.vue';
import Text from '../../Text/Text.vue';
import Icon from '../../Icon/Icon.vue';
import Button from '../../Button/Button.vue';
import { computed, ref, watch } from 'vue';
import {
  DaySchedule,
  NewReservation,
} from '../../AncillaryFacilities/AncillaryFacilities.vue';

export type Props = {
  newReservation: NewReservation;
  aligned?: 'left' | 'right';
  newReservations: NewReservation[];
  daySchedule: DaySchedule;
  newlyCreated?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  aligned: 'left',
});

const startHourError = ref(false);
const endHourError = ref(false);

const updatedNewReservation = ref({ ...props.newReservation });

const getHoursAreInvalid = () => {
  if (
    startHourError.value ||
    endHourError.value ||
    (updatedNewReservation.value.endHour !== 0 &&
      updatedNewReservation.value.endHour <=
        updatedNewReservation.value.startHour)
  ) {
    return true;
  }
  return false;
};

const emit =
  defineEmits<{
    (
      event: 'confirmUpdateReservation',
      updatedNewReservation: NewReservation
    ): void;
    (event: 'closedPopup'): void;
    (event: 'cancelReservation', id: string): void;
  }>();

const confirmUpdateReservation = () => {
  if (updatedNewReservation.value.endHour === 0) {
    updatedNewReservation.value.endHour = 24;
  }
  emit('confirmUpdateReservation', updatedNewReservation.value);
};

const onClosedPopup = () => {
  emit('closedPopup');
};

const onCancelReservation = () => {
  emit('cancelReservation', props.newReservation.id);
};

const startTime = computed(() => {
  if (props.newReservation) {
    let date = new Date(props.newReservation.dayDate);
    date.setHours(props.newReservation.startHour);
    const isHalfHour = props.newReservation.startHour % 1 !== 0;
    if (isHalfHour) {
      date.setMinutes(30);
    } else {
      date.setMinutes(0);
    }
    return date;
  }
  return new Date();
});

const endTime = computed(() => {
  if (props.newReservation) {
    let date = new Date(props.newReservation.dayDate);
    date.setHours(props.newReservation.endHour);
    const isHalfHour = props.newReservation.endHour % 1 !== 0;
    if (isHalfHour) {
      date.setMinutes(30);
    } else {
      date.setMinutes(0);
    }
    return date;
  }
  return new Date();
});

const onChangeStartTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const newStartHour = hours + minutes / 60;
  if (hourIsInvalid(updatedNewReservation.value.day, newStartHour)) {
    startHourError.value = true;
  } else {
    startHourError.value = false;
  }
  updatedNewReservation.value.startHour = newStartHour;
};

const onChangeEndTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const newEndHour = hours + minutes / 60;
  if (hourIsInvalid(updatedNewReservation.value.day, newEndHour)) {
    endHourError.value = true;
  } else {
    endHourError.value = false;
  }
  updatedNewReservation.value.endHour = newEndHour;
};

const hourIsInvalid = (day: number, hour: number) => {
  const isOpenInHour = getIsOpenInHour(hour);
  const hasReservation = props.daySchedule.scheduled.some(
    (schedule) => hour < schedule.endHour && hour >= schedule.startHour
  );
  const hasNewReservation = props.newReservations.find(
    (reservation) =>
      reservation.categoryId === props.newReservation.categoryId &&
      hour > reservation.startHour &&
      hour < reservation.endHour &&
      reservation.day === day &&
      reservation.id !== props.newReservation.id
  )
    ? true
    : false;

  return !isOpenInHour || hasReservation || hasNewReservation;
};

const formatDate = (date: Date) => {
  const lang = 'ja',
    year = date.toLocaleString(lang, { year: 'numeric' }),
    month = date.toLocaleString(lang, { month: 'short' }),
    day = date.toLocaleString(lang, { day: 'numeric' }),
    dayName = date.toLocaleString(lang, { weekday: 'short' });

  return `${year}${month}${day}(${dayName})`;
};

const getIsOpenInHour = (hour: number) => {
  if (hour === 0) {
    if (props.daySchedule.startHour === 0) {
      return true;
    } else if (props.daySchedule.endHour === 24) {
      return true;
    }
  } else {
    return (
      props.daySchedule.startHour <= hour && props.daySchedule.endHour > hour
    );
  }
};

watch(
  () => props.newReservation,
  (newReservation) => {
    if (newReservation) {
      updatedNewReservation.value = { ...newReservation };
    }
  }
);
</script>

<style scoped lang="scss">
@import '../../../scss/mixins';
@import '../../../scss/variables';

.reservation-popup__input-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.reservation-popup__time-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reservation-popup__money-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reservation-popup__error-message {
  display: flex;
  align-items: center;
  margin-top: -12px;
}
.reservation-popup__error-message :deep(.icon) {
  color: $color-content-error--main;
  margin-right: 4px;
}
</style>
