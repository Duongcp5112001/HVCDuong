<template>
  <div class="header-notification">
    <Icon icon="notifications" :size="20" />
    <Badge
      v-if="counter"
      :counter="counter"
      color="error"
      class="header-notification__badge-container"
    ></Badge>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';
import Badge from '../Badge/Badge.vue';
import Icon from '../Icon/Icon.vue';

type Props = {
  counter?: number;
};

withDefaults(defineProps<Props>(), {
  counter: 0,
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.header-notification {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: $color-background-neutral--main;
  border-radius: 50%;
  position: relative;
}

.header-notification :deep(.icon) {
  color: $color-background-neutral--white;
}

.header-notification__badge-container {
  position: absolute;
  top: 0px;
  right: -14px;
}
</style>
