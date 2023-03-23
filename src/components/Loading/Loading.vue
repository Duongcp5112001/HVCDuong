<template>
  <div v-show="show" class="loading">
    <Spinner size="large" color="white" />
  </div>
</template>

<script setup lang="ts">
import Spinner from './Spinner.vue';

type Props = {
  show?: boolean;
};

withDefaults(defineProps<Props>(), {
  show: false,
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: $color-background-neutral--modal-background;
}
</style>
