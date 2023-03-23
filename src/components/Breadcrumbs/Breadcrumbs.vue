<template>
  <ul class="breadcrumb">
    <li
      v-for="(crumb, index) in crumbs"
      :key="crumb.id"
      class="breadcrumb__item"
    >
      <span v-if="index === crumbs.length - 1">{{ crumb.label }}</span>
      <a v-else :href="crumb.href" class="breadcrumb__link">
        {{ crumb.label }}
      </a>
      <Icon
        v-show="index !== crumbs.length - 1"
        class="breadcrumb__arrow"
        icon="chevron_right"
        :size="16"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';
import Icon from '../Icon/Icon.vue';

type Crumb = {
  id: string;
  label: string;
  href: string;
};
type Props = {
  crumbs?: Crumb[];
};

withDefaults(defineProps<Props>(), {
  crumbs: () => [],
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.breadcrumb {
  align-items: center;
  display: flex;
  margin: 0;
  padding: 0;
}

.breadcrumb__item {
  display: flex;
  align-items: center;
  color: $color-content-text--light;
  @include \.font-component-title-x-small;
}

.breadcrumb__item .breadcrumb__link {
  color: $color-content-text--main;
  cursor: pointer;
  text-decoration: none;
}

.breadcrumb__item :deep(.icon) {
  color: $color-content-neutral--light-00;
}

.breadcrumb__item .breadcrumb__arrow {
  margin: 0px 8px;
}
</style>
