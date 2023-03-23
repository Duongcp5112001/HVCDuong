<template>
  <div class="pagination">
    <div
      :class="[
        'pagination__left-btn',
        currentPage === 1
          ? 'pagination__left-btn--disabled'
          : 'pagination__left-btn--active',
      ]"
    >
      <Button
        color="neutral"
        type="text"
        size="medium"
        shape="square"
        icon="chevron_left"
        :disabled="currentPage === 1"
        @click="goToPreviousPage()"
      />
    </div>
    <button
      v-for="page in getPageNumbers(totalPageNumber)"
      :key="page"
      :class="paginationButtonClass(parseInt(page))"
      :disabled="currentPage === parseInt(page) || page === '0'"
      @click="goToPage(parseInt(page))"
    >
      {{ page !== '0' ? page : '' }}
      <Icon v-show="page === '0'" icon="more_horiz" :size="16" />
    </button>
    <div
      :class="[
        'pagination__right-btn',
        currentPage === totalPageNumber
          ? 'pagination__right-btn--disabled'
          : 'pagination__right-btn--active',
      ]"
    >
      <Button
        color="neutral"
        type="text"
        size="medium"
        shape="square"
        icon="chevron_right"
        :disabled="currentPage === totalPageNumber"
        @click="goToNextPage()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Button from '../Button/Button.vue';
import Icon from '../Icon/Icon.vue';

interface Props {
  total?: number;
  itemsPerPage?: number;
  currentPage?: number;
}

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  itemsPerPage: 10,
  currentPage: 1,
});

const emit = defineEmits<{ (event: 'change', page: number): void }>();

const totalPageNumber = ref(Math.ceil(props.total / props.itemsPerPage));
const innerPage = ref(props.currentPage);

watch(
  () => props.currentPage,
  (currentValue) => {
    innerPage.value = currentValue;
  }
);

const goToNextPage = () => {
  if (props.currentPage < totalPageNumber.value) {
    innerPage.value = props.currentPage + 1;
    emit('change', props.currentPage + 1);
  }
};

const goToPreviousPage = () => {
  if (props.currentPage > 1) {
    innerPage.value = props.currentPage - 1;
    emit('change', props.currentPage - 1);
  }
};

const goToPage = (page: number) => {
  emit('change', page);
};

const getPageNumbers = (totalPages: number) => {
  const ellipsis = '0';
  const pageNeighbors = 1;
  const visibleNumbers = 5;
  const totalBlocks = visibleNumbers + 2;

  if (totalPages > totalBlocks) {
    const firstPage = Math.max(2, innerPage.value - pageNeighbors);
    const lastPage = Math.min(totalPages - 1, innerPage.value + pageNeighbors);
    let pages = getRange(firstPage, lastPage);
    const hiddenLeft = firstPage > 2;
    const hiddenRight = totalPages - lastPage > 1;
    const hiddenTotal = visibleNumbers - (pages.length + 1);

    switch (true) {
      case hiddenLeft && !hiddenRight: {
        const extraPages = getRange(firstPage - hiddenTotal, firstPage - 1);
        pages = [ellipsis, ...extraPages, ...pages];
        break;
      }
      case !hiddenLeft && hiddenRight: {
        const extraPages = getRange(lastPage + 1, lastPage + hiddenTotal);
        pages = [...pages, ...extraPages, ellipsis];
        break;
      }
      case hiddenLeft && hiddenRight:
      default: {
        pages = [ellipsis, ...pages, ellipsis];
        break;
      }
    }

    return ['1', ...pages, totalPages.toString()];
  }
  return getRange(1, totalPages);
};

const getRange = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];
  while (i <= to) {
    range.push(i.toString());
    i += step;
  }

  return range;
};

const paginationButtonClass = (page: number) => {
  const selectedClass =
    page === innerPage.value ? ['pagination__btn--selected'] : [];
  const ellipsisClass = page === 0 ? ['pagination__btn--ellipsis'] : [];

  return ['pagination-button', ...selectedClass, ...ellipsisClass].join(' ');
};
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  gap: 4px;
}

.pagination-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: $color-background-neutral--white;
  border-width: 1px;
  border-style: solid;
  border-color: $color-border-neutral--outline;
  padding: 4px;
  border-radius: 4px;
  outline: none;
}

.pagination-button:hover:enabled {
  background: $color-background-primary--light-01;
}

.pagination-button:active:enabled {
  background: $color-background-primary--light-00;
}

.pagination__btn--selected {
  background: $color-background-primary--main;
  border-width: 1px;
  border-style: solid;
  border-color: $color-background-primary--main;
  color: $color-content-neutral--white;
}

.pagination__btn--ellipsis {
  background: none;
  border: none;
}

.pagination__btn--ellipsis :deep(.icon) {
  color: $color-content-neutral--disable;
}
</style>
