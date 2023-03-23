<template>
  <td :class="cellClass" :style="{ textAlign, width }">
    <Tooltip v-if="tooltipText" direction="bottom" :disabled="!isTooltipActive">
      <span ref="cellInnerRef" class="table-cell__inner">
        <slot />
      </span>
      <template v-if="isTooltipActive" #toolTipContent>
        <span class="table-cell__full-text">
          {{ tooltipText }}
        </span>
      </template>
    </Tooltip>
    <template v-else>
      <slot />
    </template>
  </td>
</template>

<script setup lang="ts">
import { withDefaults, inject, computed, ComputedRef, ref, watch } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';

const cellInnerRef = ref();
const isTooltipActive = ref(false);

type Props = {
  id?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  width?: string;
  slotColor?:
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
    | 'gray'
    | 'title'
    | 'selected'
    | '';
  isSticky?: boolean;
  tooltipText?: string;
  bold?: boolean;
  wrap?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  id: '',
  textAlign: 'left',
  slotColor: '',
  tooltipText: '',
  width: '',
});

const { criticalColumnsIds } = inject('tableState') as {
  criticalColumnsIds: ComputedRef<string[]>;
};

const isCritical = computed(() => {
  return criticalColumnsIds.value.find((id) => props.id === id) !== undefined;
});

const cellClass = computed(() => {
  const criticalClass = isCritical.value ? [`table__cell--critical`] : [];
  const slotColorClass = props.slotColor
    ? [`table__cell--color-${props.slotColor}`]
    : [];
  const stickyClass = props.isSticky ? ['table__cell--sticky'] : [];
  const boldClass = props.bold ? ['table__cell--bold'] : [];
  const wrapClass = props.wrap ? ['table__cell--wrap'] : [];

  return [
    'table__cell',
    ...criticalClass,
    ...slotColorClass,
    ...stickyClass,
    ...boldClass,
    ...wrapClass,
  ].join(' ');
});

watch(
  () => cellInnerRef.value,
  (updatedValue) => {
    if (updatedValue) {
      const parent = cellInnerRef.value.parentElement.getBoundingClientRect();
      const child = cellInnerRef.value.children[0].getBoundingClientRect();
      const parentWidth = parent.width;
      const childWidth = child.width;

      if (childWidth > parentWidth) {
        isTooltipActive.value = true;
      } else {
        isTooltipActive.value = false;
      }
    }
  }
);
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.table__cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table__cell--wrap {
  white-space: normal;
}

.table-cell__inner {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table-cell__full-text {
  white-space: normal;
}

.table__cell--critical {
  background: $color-background-error--light-00;
}

.table__cell--color-slot01 {
  background: $color-slot-slot01;
}

.table__cell--color-slot02 {
  background: $color-slot-slot02;
}

.table__cell--color-slot03 {
  background: $color-slot-slot03;
}

.table__cell--color-slot04 {
  background: $color-slot-slot04;
}

.table__cell--color-slot05 {
  background: $color-slot-slot05;
}

.table__cell--color-slot06 {
  background: $color-slot-slot06;
}

.table__cell--color-slot07 {
  background: $color-slot-slot07;
}

.table__cell--color-slot08 {
  background: $color-slot-slot08;
}

.table__cell--color-slot09 {
  background: $color-slot-slot09;
}

.table__cell--color-slot10 {
  background: $color-slot-slot10;
}

.table__cell--color-gray {
  background: $color-background-neutral--light-00;
}

.table__cell--color-title {
  background: $color-background-neutral--light-01;
}

.table__cell--color-selected {
  background: $color-background-primary--light-00;
}

.table__cell--sticky {
  position: sticky;
  right: 0;
  z-index: 1;
  background: $color-background-neutral--white;
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: $color-border-neutral--outline;
}

.table__cell--bold {
  font-weight: $font-weight-bold;
}
</style>
