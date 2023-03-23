<template>
  <div :class="disclosureClass">
    <div class="disclosure__control" @click.self="onClick">
      <span class="disclosure__control-icon-container">
        <Icon
          :icon="isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          :size="16"
        />
      </span>
      <slot name="title" />
    </div>
    <div v-show="isOpen" class="disclosure__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, computed, onUnmounted } from 'vue';
import Icon from '../Icon/Icon.vue';

type Props = {
  color?: 'dark' | 'light';
  opened?: boolean;
  shadow?: boolean;
  fitted?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  color: 'dark',
  shadow: true,
});

const emits = defineEmits(['update:value']);

const isOpen = ref(props.opened);

const onClick = () => {
  isOpen.value = !isOpen.value;
  emits('update:value', isOpen);
};

const disclosureClass = computed(() => {
  const colorClass = [`disclosure--${props.color}`];
  const shadowClass = props.shadow ? [] : ['disclosure--no-shadow'];
  const fittedClass = props.fitted ? ['disclosure--fitted'] : [];
  return ['disclosure', ...colorClass, ...shadowClass, ...fittedClass].join(
    ' '
  );
});

onUnmounted(() => {
  emits('update:value', false);
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.disclosure {
  width: 100%;
  border-radius: 8px;
  border: none;
}

.disclosure--dark {
  background: $color-background-neutral--light-01;
}

.disclosure--light {
  background: $color-background-neutral--white;
  box-shadow: $shadow-panel-1;
}

.disclosure--no-shadow {
  box-shadow: none;
}

.disclosure__control {
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
}

.disclosure__control-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  pointer-events: none;
}

.disclosure--light
  .disclosure__control:hover
  .disclosure__control-icon-container {
  background: $color-background-neutral--light-01;
}

.disclosure--dark
  .disclosure__control:hover
  .disclosure__control-icon-container {
  background: $color-background-neutral--light-02;
}

.disclosure__control-icon-container :deep(.icon) {
  color: $color-content-neutral--main;
}

.disclosure__content {
  padding: 0px 16px 16px 16px;
}

.disclosure--fitted {
  border-radius: 0;
}

.disclosure--fitted .disclosure__control {
  padding-left: 0px;
  padding-right: 0px;
}

.disclosure--fitted .disclosure__content {
  padding-left: 32px;
  padding-right: 0px;
}
</style>
