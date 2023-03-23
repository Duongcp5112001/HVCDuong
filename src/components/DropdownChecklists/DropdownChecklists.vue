<template>
  <div class="dropdownchecklists" :style="{ width }">
    <button
      ref="activatorRef"
      :class="dropdownchecklistsButtonClass"
      :disabled="disabled"
    >
      <Icon
        v-if="icon"
        class="dropdownchecklists-icon"
        :icon="icon"
        :size="iconSize"
      />
      <span v-if="selectedOptions()" class="dropdownchecklists-button__inner">
        {{ selectedOptions() }}
      </span>
      <span
        v-else
        class="dropdownchecklists-button__inner dropdownchecklists-button__inner--placeholder"
      >
        {{ placeholder }}
      </span>
      <Icon icon="keyboard_arrow_down" :size="iconSize" />
    </button>
    <Popover
      :open="isOpen"
      :activator-ref="activatorRef"
      :width="popoverWidth"
      @toggle-open="onToggleOpen"
    >
      <span class="dropdownchecklists-container">
        <span class="dropdownchecklists-items-container">
          <span
            v-for="(category, index) in innerCheckOptions"
            :key="index"
            class="dropdownchecklists-section"
          >
            <span class="dropdownchecklists-section__title">
              <Checkbox
                :checked="category.checked"
                :label="category.label"
                :indeterminate="getIsIndeterminate(category)"
                @input="onCheckCategory(category)"
              />
            </span>
            <span
              v-for="(option, _index) in category.options"
              :key="`${index}-${_index}`"
              class="dropdownchecklists-section__item"
            >
              <Checkbox
                :checked="option.checked"
                :label="option.label"
                @input="onCheckOption(option, category)"
              />
            </span>
          </span>
        </span>
        <span class="dropdownchecklists__control">
          <Button
            width="110px"
            color="neutral"
            type="outlined"
            @click="onClear"
          >
            クリア
          </Button>
          <Button width="110px" @click="onSelect">選択</Button>
        </span>
      </span>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Icon from '../Icon/Icon.vue';
import Checkbox from '../Checkbox/Checkbox.vue';
import Popover from '../Popover/Popover.vue';
import Button from '../Button/Button.vue';

export type CheckOption = {
  label: string;
  checked?: boolean;
};
export type CheckOptionCategory = {
  label: string;
  checked?: boolean;
  options: CheckOption[];
};

type Props = {
  size?: 'default' | 'small';
  status?: 'error' | 'success' | 'default';
  value?: string;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  icon?: string;
  checkOptions: CheckOptionCategory[];
};

const props = withDefaults(defineProps<Props>(), {
  type: 'single',
  size: 'default',
  status: 'default',
  value: '',
  placeholder: '',
  width: '240px',
  icon: '',
  checkOptions: () => [],
});

const selectedValue = ref(props.value);
const isOpen = ref(false);
const activatorRef = ref();
const popoverWidth = 848;

const innerCheckOptions = ref(props.checkOptions);

const selectedOptions = (): string => {
  const checkedOptions = props.checkOptions
    .map((category) => {
      return category.options.filter((option) => option.checked);
    })
    .flat();
  return checkedOptions.map((option) => option.label).join(', ');
};

const getIsIndeterminate = (category: CheckOptionCategory) => {
  const checkedOptions = category.options.filter((option) => option.checked);
  return (
    checkedOptions.length > 0 && checkedOptions.length < category.options.length
  );
};

const onCheckCategory = (category: CheckOptionCategory) => {
  category.checked = !category.checked;
  category.options.forEach((option) => {
    option.checked = category.checked;
  });
};

const onCheckOption = (option: CheckOption, category: CheckOptionCategory) => {
  option.checked = !option.checked;
  category.checked = category.options.every((option) => option.checked);
};

const onClear = () => {
  innerCheckOptions.value = props.checkOptions.map((category) => {
    category.checked = false;
    category.options.forEach((option) => {
      option.checked = false;
    });
    return category;
  });
};

const onSelect = () => {
  isOpen.value = false;
};

const onToggleOpen = (value: boolean) => {
  isOpen.value = value;
};

const dropdownchecklistsButtonClass = computed(() => {
  const sizeClass = [`dropdownchecklists-button--${props.size}`];
  const statusClass =
    props.status !== 'default'
      ? [`dropdownchecklists-button--${props.status}`]
      : [];
  return ['dropdownchecklists-button', ...sizeClass, ...statusClass].join(' ');
});

const iconSize = computed(() => {
  if (props.size === 'default') {
    return 20;
  }
  if (props.size === 'small') {
    return 16;
  }
  return 20;
});

watch(
  () => props.value,
  (value) => {
    selectedValue.value = value;
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.dropdownchecklists {
  text-align: left;
}

.dropdownchecklists-icon {
  margin-right: 8px;
}

.dropdownchecklists-button {
  @include \.font-component-label-large;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  color: $color-content-text--main;
  background-color: $color-background-neutral--light-02;
  border-color: $color-border-neutral--input;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  width: 100%;
  outline: 0;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
}

.dropdownchecklists-button :deep(.icon) {
  color: $color-content-neutral--light-00;
}

.dropdownchecklists-button:hover {
  border-color: $color-border-neutral--light;
}

.dropdownchecklists-button:disabled {
  background: $color-background-neutral--disable;
  border-color: $color-border-neutral--disable;
}

.dropdownchecklists-button.dropdownchecklists-button--small {
  @include \.font-component-label-small;
  padding: 4px;
  height: 32px;
}

.dropdownchecklists-button.dropdownchecklists-button--error {
  border-color: $color-border-error--main;
}

.dropdownchecklists-button.dropdownchecklists-button--success {
  border-color: $color-border-success--main;
}

.dropdownchecklists-button__inner {
  text-align: left;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdownchecklists-button__inner.dropdownchecklists-button__inner--placeholder {
  color: $color-content-text--placeholder;
}

.dropdownchecklists-container {
  width: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: $color-background-neutral--white;
  box-shadow: $shadow-panel-1;
}

.dropdownchecklists-items-container {
  display: flex;
  flex-direction: column;
  column-gap: 32px;
  width: 100%;
  max-height: 659px;
  flex-wrap: wrap;
}

.dropdownchecklists-section {
  display: flex;
  width: 240px;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
}

.dropdownchecklists-section__item {
  padding: 4px;
}

.dropdownchecklists-section__title {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--divider-light;
  padding: 4px 4px 8px 4px;
}

.dropdownchecklists__control {
  padding-top: 32px;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}
</style>
