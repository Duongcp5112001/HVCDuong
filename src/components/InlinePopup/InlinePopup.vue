<template>
  <span class="popup">
    <div ref="activatorRef">
      <slot />
    </div>
    <Popover
      :open="isOpen"
      :activator-ref="activatorRef"
      :width="width"
      :direction="direction"
      :aligned="aligned"
      @toggle-open="onPopoverToggleOpen"
    >
      <div class="popup-container" v-if="!disabled">
        <span class="popup__title">
          <slot name="popupTitle" />
          <Button
            v-if="closeType === 'top'"
            icon="close"
            shape="circle"
            size="small"
            color="neutral"
            type="text"
            @click="isOpen = false"
          />
        </span>
        <span class="popup__content">
          <slot name="popupContent" />
        </span>
        <span class="popup__footer">
          <Button
            v-if="closeType === 'bottom'"
            color="neutral"
            type="outlined"
            width="50%"
            @click="isOpen = false"
          >
            キャンセル
          </Button>
          <Button
            :color="confirmButtonColor"
            :type="confirmButtonType"
            :disabled="confirmButtonDisabled"
            width="50%"
            @click="onConfirm"
          >
            {{ confirmButtonLabel }}
          </Button>
        </span>
      </div>
    </Popover>
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Popover from '../Popover/Popover.vue';
import Button from '../Button/Button.vue';

const isOpen = ref(false);
const activatorRef = ref();

type Props = {
  direction?: 'top' | 'bottom' | 'left' | 'right';
  aligned?: 'left' | 'right';
  confirmButtonLabel?: string;
  confirmButtonColor?: 'primary' | 'critical' | 'neutral';
  confirmButtonType?: 'contained' | 'outlined' | 'text';
  confirmButtonDisabled?: boolean;
  width?: number;
  closeType?: 'top' | 'bottom';
  disabled?:boolean
};

withDefaults(defineProps<Props>(), {
  direction: 'bottom',
  aligned: 'left',
  confirmButtonLabel: '確定',
  confirmButtonColor: 'primary',
  confirmButtonType: 'contained',
  width: 360,
  closeType: 'bottom',
  disabled:false
});

const onPopoverToggleOpen = (open: boolean) => {
  isOpen.value = open;
};

const emit = defineEmits<{
  (event: 'confirm'): void
  (event: 'closePopup', isOpen: boolean): void
}>();

const onConfirm = () => {
  isOpen.value = false;
  emit('confirm');
};

watch(isOpen, async (newVal) => {
  emit('closePopup', newVal);
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.popup-container {
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
  border-radius: 16px;
  background-color: $color-background-neutral--white;
  box-shadow: $shadow-panel-1;
}

.popup__title {
  padding-bottom: 8px;
  text-align: left;
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
}

.popup__content {
  padding: 16px 0px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}

.popup__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}
</style>
