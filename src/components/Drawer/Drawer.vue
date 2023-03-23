<template>
  <div :class="getNarrowClass('drawer')">
    <button class="drawer__control-button" @click="onClickControl">
      <Icon :icon="isOpen ? 'arrow_back' : 'arrow_forward'" :size="20" />
    </button>
    <div class="drawer__menu">
      <div :class="getNarrowClass('drawer__menu-body')">
        <slot name="body" :is-open="isOpen" />
      </div>
      <div :class="getNarrowClass('drawer__menu-footer')">
        <slot name="footer" :is-open="isOpen" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, ref, provide } from 'vue';
import Icon from '../Icon/Icon.vue';

type Props = {
  isDefaultOpen?: boolean;
  selectedId?: string;
};

const props = withDefaults(defineProps<Props>(), {
  isDefaultOpen: true,
  selectedId: '',
});

const emit = defineEmits<{ (event: 'clickItem', id: string): void }>();

const isOpen = ref(props.isDefaultOpen);

const getNarrowClass = (className: string) => {
  return isOpen.value ? className : `${className} ${className}--narrow`;
};

const onClickControl = () => {
  isOpen.value = !isOpen.value;
};

const onClickItem = (id: string) => {
  emit('clickItem', id);
};

provide('drawerState', {
  isOpen: isOpen,
  selectedId: ref(props.selectedId),
  onClickItem: onClickItem,
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.drawer {
  position: relative;
  width: 216px;
  height: 100%;
  background-color: $color-background-neutral--dark-00;
  transition: width 0.2s ease-in-out;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.drawer__control-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: none;
  border: none;
  padding: 0px;
  outline: none;
  padding: 6px 8px;
}

.drawer__control-button:hover {
  background: $color-background-neutral--hover;
}

.drawer__control-button :deep(.icon) {
  color: $color-content-neutral--white;
}

.drawer--narrow {
  width: 40px;
}

.drawer__menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  overflow-y: auto;
  overflow-x: hidden;
}

.drawer__menu-body {
  padding: 0 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  overflow-y: auto;
  overflow-x: hidden;
}

.drawer__menu-body.drawer__menu-body--narrow {
  padding: 0;
}

.drawer__menu-footer {
  padding: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: $color-border-neutral--divider-dark;
}

.drawer__menu-footer.drawer__menu-footer--narrow {
  padding: 0;
}
</style>
