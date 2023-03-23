<template>
  <div ref="activatorRef">
    <slot />
  </div>
  <Popover
    :open="isOpen"
    :activator-ref="activatorRef"
    :width="240"
    :aligned="aligned"
    with-shadow
    @toggle-open="toggleOpen"
  >
    <MenuList>
      <MenuListItem
        v-for="(option, i) in menuListOptions"
        :key="i"
        :label="option.label"
        :value="option.value"
        :icon="option.icon"
        @click="onSelectOption"
      />
    </MenuList>
  </Popover>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Popover from '../Popover/Popover.vue';
import MenuList from './MenuList.vue';
import MenuListItem from './MenuListItem.vue';

const activatorRef = ref();
const isOpen = ref(false);

type Props = {
  aligned?: 'left' | 'right' | 'center';
  menuListOptions: { label: string; value: string; icon?: string }[];
};

withDefaults(defineProps<Props>(), {
  aligned: 'left',
  menuListOptions: () => [],
});

const emit = defineEmits<{ (event: 'selectOption', value: string): void }>();

const toggleOpen = (open: boolean) => {
  isOpen.value = open;
};

const onSelectOption = (value: string) => {
  isOpen.value = false;
  emit('selectOption', value);
};
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';
</style>
