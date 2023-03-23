<template>
  <hr :class="componentClass" :style="dividerStyle" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  vertical?: boolean;
  width?: string;
  height?: string;
  margin?: string;
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
    | '';
};

const props = withDefaults(defineProps<Props>(), {
  width: '',
  height: '',
  margin: '8px',
  slotColor: '',
});

const componentClass = computed(() => {
  const verticalClass = props.vertical ? ['fds-divider--vertical'] : [];
  const slotColorClass = props.slotColor
    ? [`fds-divider--color-${props.slotColor}`]
    : [];
  return ['fds-divider', ...verticalClass, ...slotColorClass].join(' ');
});

const dividerStyle = computed(() => ({
  width: !props.vertical && props.width ? props.width : undefined,
  height: props.vertical && props.height ? props.height : undefined,
  margin: props.vertical ? `0 ${props.margin}` : `${props.margin} 0`,
}));
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.fds-divider {
  display: block;
  border-top-style: solid;
  height: 1px;
  width: 100%;
  border-right: 0;
  border-left: 0;
  border-bottom: 0;
  margin: 0;
  padding: 0;
  border-top-color: $color-border-neutral--outline;
  border-top-width: 1px;
}

.fds-divider--vertical {
  border-left-style: solid;
  border-left-width: 1px;
  border-left-color: $color-border-neutral--outline;
  border-top: 0;
  width: 1px;
  height: 100%;
  min-height: 16px;
}

.fds-divider--color-slot01 {
  border-top-color: $color-slot-slot01;
}

.fds-divider--color-slot02 {
  border-top-color: $color-slot-slot02;
}

.fds-divider--color-slot03 {
  border-top-color: $color-slot-slot03;
}

.fds-divider--color-slot04 {
  border-top-color: $color-slot-slot04;
}

.fds-divider--color-slot05 {
  border-top-color: $color-slot-slot05;
}

.fds-divider--color-slot06 {
  border-top-color: $color-slot-slot06;
}

.fds-divider--color-slot07 {
  border-top-color: $color-slot-slot07;
}

.fds-divider--color-slot08 {
  border-top-color: $color-slot-slot08;
}

.fds-divider--color-slot09 {
  border-top-color: $color-slot-slot09;
}

.fds-divider--color-slot10 {
  border-top-color: $color-slot-slot10;
}
</style>
