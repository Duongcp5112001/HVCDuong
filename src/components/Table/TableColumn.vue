<template>
  <th
    :class="tableCellClass"
    :style="{
      textAlign,
      minWidth,
      width,
      maxWidth,
      height,
    }"
  >
    <span class="table__cell-inner">
      <span
        :class="tableCellInnerTextClass"
        :style="{
          textAlign,
          width: canSort ? 'auto' : '100%',
        }"
      >
        <slot />
      </span>
      <button v-if="canSort" :class="sortButtonClass" @click="onClickSort">
        <Icon class="arrow_downward" :icon="'arrow_downward'" :size="16" />
        <Icon class="arrow_upward" :icon="'arrow_upward'" :size="16" />
      </button>
    </span>
  </th>
</template>

<script setup lang="ts">
import { withDefaults, computed } from 'vue';
import Icon from '../Icon/Icon.vue';

type Props = {
  id: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  textSize?: 'medium' | 'small';
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  canSort?: boolean;
  sortedDirection?: 'asc' | 'desc' | '';
  isSticky?: boolean;
  controlWrap?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  textAlign: 'left',
  textSize: 'medium',
  width: 'auto',
  minWidth: '',
  maxWidth: '',
  height: '',
  sortedDirection: '',
  isSticky: false,
  controlWrap: false,
});

const emit =
  defineEmits<{
    (event: 'clickSort', sortDirection: 'asc' | 'desc', id: string): void;
  }>();

const tableCellClass = computed(() => {
  const sizeClass = [`table__cell--${props.textSize}`];
  const stickyClass = props.isSticky ? ['table__cell--sticky'] : [];
  return ['table__cell', ...sizeClass, ...stickyClass].join(' ');
});

const tableCellInnerTextClass = computed(() => {
  const preClass = props.controlWrap ? ['table__cell-inner-text--pre'] : [];
  return ['table__cell-inner-text', ...preClass].join(' ');
});

const sortButtonClass = computed(() => {
  const activeClass =
    props.sortedDirection === 'asc'
      ? [`table__sort-btn-asc--active`]
      : props.sortedDirection === 'desc'
      ? [`table__sort-btn-desc--active`]
      : [];
  return ['table__sort-btn', ...activeClass].join(' ');
});

const onClickSort = () => {
  const sortDirection =
    props.sortedDirection === 'asc'
      ? 'desc'
      : props.sortedDirection === 'desc'
      ? 'asc'
      : 'desc';

  emit('clickSort', sortDirection, props.id);
};
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.table__cell--medium {
  @include \.font-component-title-x-small;
  line-height: 130%;
}

.table__cell--small {
  @include \.font-component-title-2x-small;
  line-height: 150%;
}

.table__sort-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  background: none;
  border-radius: 20px;
  padding: 4px;
}

.table__sort-btn :deep(.icon) {
  color: $color-content-neutral--light-00;
}

.table__sort-btn:hover {
  background: $color-background-neutral--light-01;
}

.table__sort-btn-asc--active :deep(.icon.arrow_upward),
.table__sort-btn-desc--active :deep(.icon.arrow_downward) {
  color: $color-content-information--main;
}

.table__sort-btn-asc--active:hover :deep(.icon.arrow_upward),
.table__sort-btn-desc--active:hover :deep(.icon.arrow_downward) {
  background: $color-background-primary--light-01;
  border-radius: 20px;
}

.table__cell-inner-text {
  overflow: hidden;
  text-overflow: ellipsis;
}

.table__cell-inner-text--pre {
  white-space: pre;
}

.table__cell--sticky {
  position: sticky;
  right: 0;
  z-index: 1;
  background: $color-background-neutral--light-00;
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: $color-border-neutral--outline;
}
</style>
