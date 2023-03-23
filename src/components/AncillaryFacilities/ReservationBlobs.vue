<template>
  <EditNewReservationPopup
    v-if="newReservation"
    :new-reservation="newReservation"
    :new-reservations="newReservations"
    :day-schedule="daySchedule"
    :newly-created="newlyCreated()"
    @confirm-update-reservation="onConfirmUpdateReservation"
    @closed-popup="onClosedPopup"
    @cancel-reservation="onCancelReservation"
  >
    <button
      class="reservation-blob reservation-blob--new"
      :style="{
        width: `${newReservationWidth}px`,
      }"
    >
      <span class="reservation-blob__label">
        {{ reservationName }}
      </span>
    </button>
  </EditNewReservationPopup>
  <div
    v-else-if="existingReservation"
    class="reservation-blob"
    :style="{
      width: `${existingReservationWidth}px`,
    }"
  >
    <span class="reservation-blob__label">
      {{ existingReservation.label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  DaySchedule,
  NewReservation,
  Schedule,
} from './AncillaryFacilities.vue';
import EditNewReservationPopup from '../InlinePopup/variations/EditNewReservationPopup.vue';

export type Props = {
  newReservation?: NewReservation;
  reservationName: string;
  existingReservation: Schedule;
  newReservations: NewReservation[];
  daySchedule: DaySchedule;
  heldNewReservationId?: string;
};

const halfHourWidth = 22;
const props = withDefaults(defineProps<Props>(), {
  newReservation: undefined,
  heldNewReservationId: undefined,
});

const emit = defineEmits<{
  (
    event: 'confirmUpdateReservation',
    updatedNewReservation: NewReservation
  ): void;
  (event: 'closedPopup'): void;
  (event: 'cancelReservation', id: string): void;
}>();

const onConfirmUpdateReservation = (updatedNewReservation: NewReservation) => {
  emit('confirmUpdateReservation', updatedNewReservation);
};

const newlyCreated = () => {
  return props.heldNewReservationId === props.newReservation?.id;
};

const onClosedPopup = () => {
  emit('closedPopup');
};

const onCancelReservation = (id: string) => {
  emit('cancelReservation', id);
};

const newReservationWidth = computed(() => {
  if (props.newReservation) {
    const difference =
      (props.newReservation.endHour - props.newReservation.startHour) *
      halfHourWidth;
    return difference;
  } else {
    return 0;
  }
});

const existingReservationWidth = computed(() => {
  if (props.existingReservation) {
    return (
      (props.existingReservation.endHour -
        props.existingReservation.startHour) *
      halfHourWidth
    );
  } else {
    return 0;
  }
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.reservation-blob {
  position: absolute;
  border-radius: 4px;
  height: 28px;
  background-color: $color-background-neutral--disable;
  color: $color-content-neutral--disable;
  pointer-events: none;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(5px);
}

.reservation-blob__label {
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  font-size: $font-size-2xs;
}

.reservation-blob--new {
  background-color: $color-background-primary--main;
  color: $color-content-neutral--white;
  cursor: pointer;
  pointer-events: all;
  z-index: 5;
  border: none;
  overflow: hidden;
  outline: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
