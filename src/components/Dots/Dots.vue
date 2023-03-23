<template>
  <span v-if="limitedAccommodation || specifiedPeriod" class="dots-container">
    <Tooltip direction="top" :width="164">
      <span :class="dotsClass">
        <span v-if="limitedAccommodation" class="dot dot--blue"></span>
        <span v-if="specifiedPeriod" class="dot dot--orange"></span>
      </span>
      <template #toolTipContent>
        <div class="dots-information">
          <span v-if="limitedAccommodation">
            <span class="dot dot--blue dot--information"></span>
            宿泊制限
          </span>
          <span v-if="specifiedPeriod">
            <span
              v-if="specifiedPeriod"
              class="dot dot--orange dot--information"
            ></span>
            特定期間
          </span>
        </div>
      </template>
    </Tooltip>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';

type Props = {
  limitedAccommodation?: boolean;
  specifiedPeriod?: boolean;
  direction?: 'hor' | 'ver';
};

const props = withDefaults(defineProps<Props>(), {
  direction: 'hor',
});

const dotsClass = computed(() => {
  const directionClass = props.direction ? [`dots--${props.direction}`] : [];
  return ['dots', ...directionClass].join(' ');
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.dots-container {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: flex-start;
}

.dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 2px;
}

.dots--hor {
  flex-direction: row;
}

.dots--ver {
  flex-direction: column;
}

.dot {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
}

.dot--orange {
  background: $color-content-warning--dark-00;
}

.dot--blue {
  background: $color-content-information--main;
}

.dot--information {
  margin-right: 6px;
}

.dots-information {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
</style>
