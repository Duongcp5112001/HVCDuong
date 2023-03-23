<template>
  <div class="room-type-content-wrapper">
    <slot name="title"></slot>
    <div :class="roomTypeContentClass" class="room-type-content">
      <div class="room-type-content__header">
        <slot name="header"></slot>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';

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
};

const props = withDefaults(defineProps<Props>(), {
  color: 'slot01',
  roomLabels: () => [],
});

const roomTypeContentClass = computed(() => {
  const colorClass = [`room-type-content__${props.color}`];
  return ['room-type-content', ...colorClass].join(' ');
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.room-type-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 6px;
}

.room-type-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-left-width: 8px;
  border-left-style: solid;
  margin-top: 6px;
  padding: 0 20px 0 16px;
}

.room-type-content:last-child {
  padding-bottom: 16px;
}

.room-type-content__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid #b0cdf8;
  padding: 16px 0;
}

.room-type-content__slot01 {
  border-left-color: $color-slot-slot01;
}

.room-type-content__slot01 .room-type-content__header {
  border-bottom: 1px solid $color-slot-slot01;
}

.room-type-content__slot02 {
  border-left-color: $color-slot-slot02;
}

.room-type-content__slot02 .room-type-content__header {
  border-bottom: 1px solid $color-slot-slot02;
}

.room-type-content__slot03 {
  border-left-color: $color-slot-slot03;
}

.room-type-content__slot03 .room-type-content__header {
  border-bottom: 1px solid $color-slot-slot03;
}

.room-type-content__slot04 {
  border-left-color: $color-slot-slot04;
}

.room-type-content__slot04 .room-type-content__header {
  border-bottom: 1px solid $color-slot-slot04;
}

.room-type-content__slot05 {
  border-left-color: $color-slot-slot05;
}

.room-type-content__slot05 .room-type-content__header {
  border-bottom: 1px solid $color-slot-slot05;
}

.room-type-content__slot06 {
  border-left-color: $color-slot-slot06;
}

.room-type-content__slot06 .room-type-content__header {
  border-bottom: 1px solid $color-slot-slot06;
}

.room-type-content__slot07 {
  border-left-color: $color-slot-slot07;
}

.room-type-content__slot07 .room-type-content__header {
  border-bottom: 1px solid $color-slot-slot07;
}

.room-type-content__slot08 {
  border-left-color: $color-slot-slot08;
}

.room-type-content__slot08 .room-type-content__header {
  border-bottom: 1px solid $color-slot-slot08;
}

.room-type-content__slot09 {
  border-left-color: $color-slot-slot09;
}

.room-type-content__slot09 .room-type-content__header {
  border-bottom: 1px solid $color-slot-slot09;
}

.room-type-content__slot10 {
  border-left-color: $color-slot-slot10;
}

.room-type-content__slot10 .room-type-content__header {
  border-bottom: 1px solid $color-slot-slot10;
}
</style>
