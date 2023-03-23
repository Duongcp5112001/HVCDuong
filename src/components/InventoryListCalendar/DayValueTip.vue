<template>
  <Tooltip
    class="day-value-tip"
    direction="bottom"
    content-align="center"
    no-container
    :aligned="isLastDay ? 'right' : 'left'"
    :has-pointer="false"
  >
    <slot />
    <template #toolTipContent>
      <table>
        <thead>
          <th :class="getTypeHeaderClass(dayIndex)">設定</th>
          <th :class="getTypeHeaderClass(dayIndex)">予約</th>
          <th :class="getTypeHeaderClass(dayIndex)">残</th>
        </thead>
        <tbody>
          <td :class="`${getDayValueClass(dayIndex, setting)}`">
            {{ setting }}
          </td>
          <td :class="`${getDayValueClass(dayIndex, reserved)}`">
            {{ reserved }}
          </td>
          <td :class="`${getDayValueClass(dayIndex, remaining)}`">
            {{ remaining }}
          </td>
        </tbody>
      </table>
    </template>
  </Tooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';

type Props = {
  setting?: number;
  reserved?: number;
  remaining?: number;
  dayIndex: number;
  days: Date[];
  holidays: Date[];
  daysBeforeHolidays: Date[];
};

const props = withDefaults(defineProps<Props>(), {
  setting: undefined,
  reserved: undefined,
  remaining: undefined,
});

const getTypeHeaderClass = (dayIndex: number) => {
  const day = props.days[dayIndex];
  const weekdayClass = getWeekdayBackgroundClass(day);
  return ['day-value-tip__type-header', ...weekdayClass].join(' ');
};

const getDayValueClass = (dayIndex: number, value?: number) => {
  const day = props.days[dayIndex];
  const weekdayClass = getWeekdayBackgroundClass(day);
  const negativeClass =
    value && value < 0 ? ['day-value-tip__cell--negative'] : [];
  const zeroClass = value === 0 ? ['day-value-tip__cell--zero'] : [];

  return [
    'day-value-tip-cell__day-value',
    ...weekdayClass,
    ...negativeClass,
    ...zeroClass,
  ].join(' ');
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
    ? ['day-value-tip__cell-background-holiday']
    : weekday === 6
    ? ['day-value-tip__cell-background-saturday']
    : isDayBeforeHoliday
    ? ['day-value-tip__cell-background-before-holiday']
    : [];
};

const isLastDay = computed(() => {
  return props.dayIndex === props.days.length - 1;
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.day-value-tip {
  display: flex;
  height: 100%;
  width: 100%;
}

.day-value-tip :deep(.tooltip-container) {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.day-value-tip table {
  border-collapse: separate;
  border-spacing: 0;
  position: relative;
  background-color: $color-background-neutral--white;
  height: 100%;
  width: 100%;
  box-shadow: $shadow-dialog;
  border-radius: 4px;
}

.day-value-tip thead {
  top: 0px;
  position: sticky;
  z-index: 5;
  background: $color-background-neutral--white;
}

.day-value-tip thead th {
  text-align: center;
  color: $color-content-text--light;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--outline;
  border-right-width: 1px;
  border-right-color: $color-border-neutral--outline;
  border-right-style: dotted;
  font-weight: 400;
  white-space: nowrap;
}

.day-value-tip thead th:last-child {
  border-right: none;
}

.day-value-tip tbody td {
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--outline;
  border-right-width: 1px;
  border-right-style: dotted;
  border-right-color: $color-border-neutral--outline;
}

.day-value-tip tbody td:last-child {
  border-right: none;
}

.day-value-tip tbody {
  flex-grow: 1;
}

.day-value-tip__type-header {
  height: 39px;
  min-width: 33px;
  vertical-align: middle;
  font-size: $font-size-xs;
}

.day-value-tip-cell__day-value {
  height: 39px;
  width: 33px;
  vertical-align: middle;
  text-align: center;
  padding: 0px;
}

.day-value-tip__cell--negative {
  color: $color-content-error--main;
}

.day-value-tip__cell--zero {
  color: $color-content-neutral--light-00;
  font-weight: $font-weight-regular;
}

.day-value-tip__cell-background-saturday {
  background: $color-background-calendar--saturday;
}

.day-value-tip__cell-background-holiday {
  background: $color-background-calendar--holiday;
}

.day-value-tip__cell-background-before-holiday {
  background: $color-background-calendar--before-holiday;
}
</style>
