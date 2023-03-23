<template>
  <Panel color="dark">
    <div class="room-type-card__header">
      <slot name="header"></slot>
      <div class="room-type-card__header-badges">
        <Badge
          v-for="(label, index) in roomLabels"
          :key="index"
          :color="color"
          icon="bedroom_parent"
        >
          {{ label }}
        </Badge>
      </div>
    </div>
    <div class="room-type-card__header-segment">
      <slot name="header-segment"></slot>
    </div>
    <div :class="roomTypeCardContentClass">
      <slot />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';
import Badge from '../Badge/Badge.vue';
import Panel from '../Panel/Panel.vue';

type Props = {
  color?:
    | 'slot01'
    | 'slot02'
    | 'slot03'
    | 'slot04'
    | 'slot05'
    | 'slot06'
    | 'slot07'
    | 'slot08'
    | 'slot09'
    | 'slot10';
  roomLabels: string[];
};

const props = withDefaults(defineProps<Props>(), {
  color: 'slot01',
  roomLabels: () => [],
});

const roomTypeCardContentClass = computed(() => {
  const colorClass = [`room-type-card__content--${props.color}`];
  return ['room-type-card__content', ...colorClass].join(' ');
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.room-type-card__header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.room-type-card__header-badges {
  display: flex;
  gap: 8px;
}

.room-type-card__header-segment {
  padding: 0 0 16px;
}

.room-type-card__content {
  display: flex;
  flex-direction: column;
  background: $color-background-neutral--white;
  padding: 0 24px 0 16px;
  border-left-width: 8px;
  border-left-style: solid;
}

.room-type-card__content--slot01 {
  border-left-color: $color-slot-slot01;
}

.room-type-card__content--slot02 {
  border-left-color: $color-slot-slot02;
}

.room-type-card__content--slot03 {
  border-left-color: $color-slot-slot03;
}

.room-type-card__content--slot04 {
  border-left-color: $color-slot-slot04;
}

.room-type-card__content--slot05 {
  border-left-color: $color-slot-slot05;
}

.room-type-card__content--slot06 {
  border-left-color: $color-slot-slot06;
}

.room-type-card__content--slot07 {
  border-left-color: $color-slot-slot07;
}

.room-type-card__content--slot08 {
  border-left-color: $color-slot-slot08;
}

.room-type-card__content--slot09 {
  border-left-color: $color-slot-slot09;
}

.room-type-card__content--slot10 {
  border-left-color: $color-slot-slot10;
}

.room-type-card__content > :deep(div:not(:last-child)) {
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.room-type-card__content--slot01 > :deep(div:not(:last-child)) {
  border-bottom-color: $color-slot-slot01;
}

.room-type-card__content--slot02 > :deep(div:not(:last-child)) {
  border-bottom-color: $color-slot-slot02;
}

.room-type-card__content--slot03 > :deep(div:not(:last-child)) {
  border-bottom-color: $color-slot-slot03;
}

.room-type-card__content--slot04 > :deep(div:not(:last-child)) {
  border-bottom-color: $color-slot-slot04;
}

.room-type-card__content--slot05 > :deep(div:not(:last-child)) {
  border-bottom-color: $color-slot-slot05;
}

.room-type-card__content--slot06 > :deep(div:not(:last-child)) {
  border-bottom-color: $color-slot-slot06;
}

.room-type-card__content--slot07 > :deep(div:not(:last-child)) {
  border-bottom-color: $color-slot-slot07;
}

.room-type-card__content--slot08 > :deep(div:not(:last-child)) {
  border-bottom-color: $color-slot-slot08;
}

.room-type-card__content--slot09 > :deep(div:not(:last-child)) {
  border-bottom-color: $color-slot-slot09;
}

.room-type-card__content--slot10 > :deep(div:not(:last-child)) {
  border-bottom-color: $color-slot-slot10;
}
</style>
