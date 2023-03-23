<template>
  <v-date-picker
    v-if="type === 'single'"
    v-model="innerDate"
    mode="date"
    :masks="{ title: titleFormat, input: inputFormat }"
    locale="ja"
    :popover="{ visibility: 'focus' }"
  >
    <template #default="{ inputValue, inputEvents }">
      <div :class="datePickerClass" :style="{ width }">
        <input
          :class="datePickerInputClass"
          :value="inputValue"
          :placeholder="placeholder"
          v-on="inputEvents"
        />
        <Icon icon="calendar_today" :size="iconSize" />
      </div>
    </template>
  </v-date-picker>
  <v-date-picker
    v-else-if="type === 'range'"
    v-model="innerRange"
    is-range
    :columns="2"
    :masks="{ title: 'YYYY/MM', input: 'YYYY/MM/DD' }"
    locale="ja"
    :popover="{ visibility: 'focus' }"
  >
    <template #default="{ inputValue, inputEvents }">
      <div class="datepicker-range-container" :style="{ width }">
        <span :class="datePickerClass">
          <input
            :class="datePickerInputClass"
            :value="inputValue.start"
            :placeholder="placeholder"
            v-on="inputEvents.start"
          />
          <Icon icon="calendar_today" :size="iconSize" />
        </span>
        <span class="datepicker-range-separator">〜</span>
        <span :class="datePickerClass">
          <input
            :class="datePickerInputClass"
            :value="inputValue.end"
            :placeholder="placeholder"
            v-on="inputEvents.end"
          />
          <Icon icon="calendar_today" :size="iconSize" />
        </span>
      </div>
    </template>
  </v-date-picker>
</template>

<script setup lang="ts">
import { withDefaults, computed } from 'vue';
import Icon from '../Icon/Icon.vue';

type Props = {
  size?: 'default' | 'small';
  type?: 'single' | 'range';
  status?: 'error' | 'success' | 'default';
  date?: Date;
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  placeholder?: string;
  width?: string;
  error?: boolean;
  titleFormat?: string;
  inputFormat?: string;
  rowId?:number
};

const props = withDefaults(defineProps<Props>(), {
  type: 'single',
  size: 'default',
  status: 'default',
  date: undefined,
  dateRange: () => ({
    start: undefined,
    end: undefined,
  }),
  placeholder: 'yyyy/mm/dd',
  width: '136px',
  error: false,
  titleFormat: 'YYYY/MM',
  inputFormat: 'YYYY/MM/DD',
});

const emit =
  defineEmits<{
    (event: 'changeDate', date?: Date, rowId?: number): void;
    (
      event: 'changeRangeDate',
      rangeDate: {
        start?: Date;
        end?: Date;
      }
    ): void;
  }>();

const datePickerClass = computed(() => {
  const sizeClass = [`date-picker--${props.size}`];
  const typeClass = [`date-picker--${props.type}`];
  return ['date-picker', ...sizeClass, ...typeClass].join(' ');
});

const datePickerInputClass = computed(() => {
  const statusClass =
    props.status !== 'default' ? [`date-picker__input--${props.status}`] : [];
  const typeClass = [`date-picker--${props.type}`];
  const errorClass = props.error ? ['date-picker__input--error'] : [];

  return [
    'date-picker__input',
    ...statusClass,
    ...typeClass,
    ...errorClass,
  ].join(' ');
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

const innerDate = computed({
  get() {
    return props.date;
  },
  set(innerDate) {
    emit('changeDate', innerDate, props.rowId);
  },
});

const innerRange = computed({
  get() {
    return props.dateRange;
  },
  set(innerRange) {
    emit('changeRangeDate', innerRange);
  },
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.date-picker {
  position: relative;
  display: flex;
  align-items: center;
}

.datepicker-range-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  gap: 2px;
}

.date-picker .icon {
  color: $color-content-neutral--light-00;
  position: absolute;
  right: 8px;
}

.date-picker__input {
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

.date-picker__input:hover {
  border-color: $color-border-neutral--black;
}

.date-picker__input:focus {
  border-color: $color-border-primary--main;
}

.date-picker__input--error {
  border-color: $color-border-error--main;
}
.date-picker__input--error:hover {
  border-color: $color-border-error--main !important;
}

.date-picker__input--success {
  border-color: $color-border-success--main;
}

.date-picker__input:disabled {
  background-color: $color-background-neutral--disable;
  border: none;
}

.date-picker__input::placeholder {
  color: $color-content-text--placeholder;
}

.date-picker--default .date-picker__input {
  @include \.font-component-label-large;
  height: 40px;
}

.date-picker--small {
  height: 32px;
}

.date-picker--small .date-picker__input {
  @include \.font-component-label-small;
  height: 32px;
}

.date-picker--default.date-picker--range {
  width: 300px;
}

.date-picker--small.date-picker--range {
  width: 128px;
}

.datepicker-range-separator {
  font-size: $font-size-xs;
}

:deep(.vc-container) {
  --rounded-full: 4px;
}

:deep(.vc-blue) {
  --blue-200: #{$color-background-primary--light-00};
  --blue-600: #{$color-background-primary--main};
}

:deep(.vc-weekday) {
  color: $color-content-neutral--dark-00;
  font-weight: 400;
}

:deep(.vc-title) {
  font-size: 16px;
  line-height: 150%;
}

:deep(.vc-header) {
  padding-top: 16px;
}

:deep(.vc-weeks) {
  padding: 8px;
}

:deep(.vc-arrows-container) {
  padding-top: 16px;
}

:deep(.vc-day-content:hover) {
  background: none;
  border-width: 1px;
  border-style: solid;
  border-color: $color-border-primary--main;
}

:deep(.vc-svg-icon) {
  width: 16px;
  height: 16px;
  color: $color-content-neutral--main;
}

:deep(.vc-day.is-not-in-month *) {
  color: $color-content-neutral--disable;
  opacity: 1;
  pointer-events: auto;
}
</style>
