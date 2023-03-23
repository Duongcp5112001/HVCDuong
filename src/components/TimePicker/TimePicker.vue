<template>
  <v-date-picker
    v-model="date"
    mode="time"
    is24hr
    :minute-increment="minuteIncrement"
    :popover="{ visibility: 'focus' }"
  >
    <template #default="{ inputValue, inputEvents }">
      <div :class="timePickerClass" :style="{ width }">
        <input
          :class="timePickerInputClass"
          :value="inputValue"
          placeholder="00:00"
          v-on="inputEvents"
        />
        <Icon icon="schedule" :size="iconSize" />
      </div>
    </template>
  </v-date-picker>
</template>

<script setup lang="ts">
import { withDefaults, computed } from 'vue';
import Icon from '../Icon/Icon.vue';

type Props = {
  size?: 'default' | 'small';
  status?: 'error' | 'success' | 'default';
  width?: string;
  minuteIncrement: number;
  date?: Date;
};

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  status: 'default',
  width: undefined,
  minuteIncrement: 10,
  date: () => new Date(),
});

const timePickerClass = computed(() => {
  const sizeClass = [`time-picker--${props.size}`];
  return ['time-picker', ...sizeClass].join(' ');
});

const timePickerInputClass = computed(() => {
  const statusClass =
    props.status !== 'default' ? [`time-picker__input--${props.status}`] : [];
  return ['time-picker__input', ...statusClass].join(' ');
});

const iconSize = computed(() => {
  if (props.size === 'default') {
    return 20;
  }
  if (props.size === 'small') {
    return 16;
  }
  return 20;
});

const emit =
  defineEmits<{
    (event: 'changeDate', date: Date): void;
  }>();

const date = computed({
  get() {
    return props.date;
  },
  set(date) {
    emit('changeDate', date);
  },
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.time-picker {
  position: relative;
  display: flex;
  align-items: center;
  width: 100px;
}

.time-picker .icon {
  color: $color-content-neutral--light-00;
  position: absolute;
  right: 8px;
}

.time-picker__input {
  @include \.font-component-label-large;
  padding: 8px;
  color: $color-content-text--main;
  background-color: $color-background-neutral--light-02;
  border-color: $color-border-neutral--input;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  width: 100%;
  outline: 0;
}

.time-picker__input:hover {
  border-color: $color-border-neutral--black;
}

.time-picker__input:focus {
  border-color: $color-border-primary--main;
}

.time-picker__input--error {
  border-color: $color-border-error--main;
}

.time-picker__input--success {
  border-color: $color-border-success--main;
}

.time-picker__input:disabled {
  background-color: $color-background-neutral--disable;
  border: none;
}

.time-picker__input::placeholder {
  color: $color-content-text--placeholder;
}

.time-picker__input--default {
  width: 100px;
}

.time-picker--default .time-picker__input {
  @include \.font-component-label-large;
  height: 40px;
}

.time-picker--small {
  width: 88px;
  height: 32px;
}

.time-picker--small .time-picker__input {
  @include \.font-component-label-small;
  height: 32px;
}

:deep(.vc-time-date) {
  display: none;
}

:deep(.vc-time-content) {
  margin-left: 0px;
}

:deep(.vc-time-picker > div:first-of-type) {
  display: none;
}

:deep(.vc-select select) {
  background-color: $color-background-neutral--light-02;
  border: 1px solid;
  border-color: $color-border-neutral--input;
  color: $color-content-text--main;
}

:deep(.vc-select select:hover) {
  color: $color-content-text--main;
  border-color: $color-border-neutral--black;
}

:deep(.vc-select select:focus) {
  outline: 0;
  border-color: $color-border-primary--main;
  background-color: $color-background-neutral--light-02;
}

:deep(.vc-select-arrow) {
  color: $color-content-neutral--light-00;
}
</style>
