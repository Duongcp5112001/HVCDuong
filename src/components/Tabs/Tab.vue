<template>
  <div :class="isActive ? 'tab--active' : ''" class="tab" @click="activateTab">
    <slot />
    <div v-if="showBadge" class="tab--badge">
      {{ badge }}
      <span v-if="isBadgeOver99" class="tab--badge__more" />
    </div>
    <div v-if="isActive" class="tab--active--border" />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  watchEffect,
  getCurrentInstance,
  ComputedRef,
  Ref,
} from 'vue';

const props = defineProps<{
  badge?: number | string;
}>();

const showBadge = computed(() => +(props.badge ?? 0) > 0);
const isBadgeOver99 = computed(() => +(props.badge ?? 0) > 99);

const instance = getCurrentInstance();
const { tabs, selectTab, active } = inject('tabsState') as {
  tabs: Ref<Array<{ uid: number }>>;
  selectTab: (tab: string | number) => void;
  active: ComputedRef<string | number | undefined>;
};

const index = computed(() => {
  return tabs.value.findIndex((target) => target.uid === instance?.uid);
});
const isActive = computed(() => index.value === active.value);

const activateTab = () => {
  selectTab(index.value);
};

watchEffect(() => {
  if (index.value === -1 && instance) {
    tabs.value.push(instance);
  }
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.tab {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  padding: 8px 24px;
  color: $color-content-text--main;
}

.tab--active {
  cursor: pointer;
  background-color: $color-background-neutral--dark-00;
  color: $color-content-text--white;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.tab--active--border {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background-color: $color-background-primary--main;
}

.tab:not(.tab--active):hover {
  cursor: pointer;
  color: $color-content-text--main;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #d6e5f7;
}

.tab--badge {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  padding: 3.5px 3px;
  min-width: 25px;
  font-size: 10px;
  color: $color-content-text--white;
  border-radius: 20px;
  background-color: $color-background-error--main;
}

.tab--badge__more {
  position: relative;
  width: 15px;
  height: 15px;
}

.tab--badge__more::before {
  content: '';
  position: absolute;
  background-color: $color-content-text--white;
  width: 8px;
  height: 1px;
  top: 7px;
  left: 1px;
}

.tab--badge__more::after {
  content: '';
  position: absolute;
  background-color: $color-content-text--white;
  width: 1px;
  height: 8px;
  top: 3.3px;
  left: 4.5px;
}
</style>
