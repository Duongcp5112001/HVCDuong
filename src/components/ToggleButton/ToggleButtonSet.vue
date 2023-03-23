<template>
  <div class="toggle-button-set" :style="{ width }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { withDefaults, provide, computed, ref } from 'vue';

type Props = {
  type?: 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  selectedId?: string;
  width?: string;
};
const props = withDefaults(defineProps<Props>(), {
  type: 'contained',
  size: 'medium',
  selectedId: '',
  width: '',
});

const emit = defineEmits<{ (event: 'clickItem', id: string): void }>();

const selectedIdRef = ref(props.selectedId);
const selectedId = computed(() => selectedIdRef.value);

const onClick = (id: string) => {
  selectedIdRef.value = id;
  emit('clickItem', id);
};

provide('toggleButtonSetState', {
  selectedId,
  onClickItem: onClick,
  type: props.type,
  size: props.size,
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.toggle-button-set {
  display: flex;
  justify-content: space-around;
}
</style>
