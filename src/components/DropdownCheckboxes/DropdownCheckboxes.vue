<template>
  <div class="dropdowncheckboxes" :style="{ width }">
    <button
      ref="activatorRef"
      :class="dropdowncheckboxesButtonClass"
      :disabled="disabled"
    >
      <Icon
        v-if="icon"
        class="dropdowncheckboxes-icon"
        :icon="icon"
        :size="iconSize"
      />
      <span v-if="selectedOptions()" class="dropdowncheckboxes-button__inner">
        {{ selectedOptions() }}
      </span>
      <span
        v-else
        class="dropdowncheckboxes-button__inner dropdowncheckboxes-button__inner--placeholder"
      >
        {{ placeholder }}
      </span>
      <Icon icon="keyboard_arrow_down" :size="iconSize" />
    </button>
    <Popover
      :open="isOpen"
      :activator-ref="activatorRef"
      @toggle-open="onToggleOpen"
    >
      <div class="dropdowncheckboxes-container">
        <div class="dropdowncheckboxes__title">
          <Checkbox
            :checked="getAllIsChecked()"
            label="全て選択"
            :indeterminate="getAllIsIndeterminate()"
            @input="onCheckAll()"
          />
        </div>
        <div
          v-for="(option, index) in innerCheckOptions"
          :key="`${index}`"
          class="dropdowncheckboxes__item"
        >
          <Checkbox
            :checked="option.checked"
            :label="option.label"
            @input="onCheckOption(option)"
          />
        </div>
        <span class="dropdowncheckboxes__control">
          <Button width="100%" @click="onSelect">選択</Button>
        </span>
      </div>
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

type Props = {
  size?: 'default' | 'small';
  status?: 'error' | 'success' | 'default';
  value?: string;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  icon?: string;
  checkOptions: CheckOption[];
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

const innerCheckOptions = ref(props.checkOptions);

const selectedOptions = () => {
  return props.checkOptions
    .filter((options) => options.checked === true)
    .map((options) => options.label)
    .join(', ');
};

const getAllIsChecked = () => {
  return (
    innerCheckOptions.value.filter((options) => options.checked === true)
      .length === innerCheckOptions.value.length
  );
};

const getAllIsIndeterminate = () => {
  const checkedOptions = innerCheckOptions.value.filter(
    (option) => option.checked
  );
  return (
    checkedOptions.length > 0 &&
    checkedOptions.length < innerCheckOptions.value.length
  );
};

const onCheckAll = () => {
  const allChecked = getAllIsChecked();
  innerCheckOptions.value.forEach((option) => {
    option.checked = !allChecked;
  });
};

const onCheckOption = (option: CheckOption) => {
  option.checked = !option.checked;
};

const onSelect = () => {
  isOpen.value = false;
};

const onToggleOpen = (value: boolean) => {
  isOpen.value = value;
};

const dropdowncheckboxesButtonClass = computed(() => {
  const sizeClass = [`dropdowncheckboxes-button--${props.size}`];
  const statusClass =
    props.status !== 'default'
      ? [`dropdowncheckboxes-button--${props.status}`]
      : [];
  return ['dropdowncheckboxes-button', ...sizeClass, ...statusClass].join(' ');
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

.dropdowncheckboxes {
  text-align: left;
}

.dropdowncheckboxes-icon {
  margin-right: 8px;
}

.dropdowncheckboxes-button {
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

.dropdowncheckboxes-button :deep(.icon) {
  color: $color-content-neutral--light-00;
}

.dropdowncheckboxes-button:hover {
  border-color: $color-border-neutral--light;
}

.dropdowncheckboxes-button:disabled {
  background: $color-background-neutral--disable;
  border-color: $color-border-neutral--disable;
}

.dropdowncheckboxes-button.dropdowncheckboxes-button--small {
  @include \.font-component-label-small;
  padding: 4px;
  height: 32px;
}

.dropdowncheckboxes-button.dropdowncheckboxes-button--error {
  border-color: $color-border-error--main;
}

.dropdowncheckboxes-button.dropdowncheckboxes-button--success {
  border-color: $color-border-success--main;
}

.dropdowncheckboxes-button__inner {
  text-align: left;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdowncheckboxes-button__inner.dropdowncheckboxes-button__inner--placeholder {
  color: $color-content-text--placeholder;
}

.dropdowncheckboxes-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  border-radius: 4px;
  background-color: $color-background-neutral--white;
  box-shadow: $shadow-panel-1;
}

.dropdowncheckboxes__item {
  padding: 4px;
}

.dropdowncheckboxes__title {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--divider-light;
  padding: 4px 4px 8px 4px;
}

.dropdowncheckboxes__control {
  padding-top: 8px;
  display: flex;
}
</style>
