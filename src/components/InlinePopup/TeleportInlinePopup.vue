<template>
  <span class="popup">
    <div ref="activatorRef">
      <slot />
    </div>
    <TeleportPopover
      :open="isOpen"
      :activator-ref="activatorRef"
      :width="width"
      :direction="direction"
      :aligned="aligned"
      :default-open="defaultOpen || false"
      @toggle-open="onPopoverToggleOpen"
    >
      <div class="popup-container">
        <span class="popup__title">
          <slot name="popupTitle" />
          <Button
            v-if="closeType === 'top'"
            icon="close"
            shape="circle"
            size="small"
            color="neutral"
            type="text"
            @click="onClose"
          />
        </span>
        <span class="popup__content">
          <slot name="popupContent" />
        </span>
        <span class="popup__footer">
          <slot name="secondaryActionButton" />
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
    </TeleportPopover>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TeleportPopover from '../Popover/TeleportPopover.vue';
import Button from '../Button/Button.vue';

type Props = {
  direction?: 'top' | 'bottom' | 'left' | 'right';
  aligned?: 'left' | 'right';
  confirmButtonLabel?: string;
  confirmButtonColor?: 'primary' | 'critical' | 'neutral';
  confirmButtonType?: 'contained' | 'outlined' | 'text';
  confirmButtonDisabled?: boolean;
  width?: number;
  closeType?: 'top' | 'bottom';
  defaultOpen?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  direction: 'bottom',
  aligned: 'left',
  confirmButtonLabel: '確定',
  confirmButtonColor: 'primary',
  confirmButtonType: 'contained',
  width: 360,
  closeType: 'bottom',
});

const emit = defineEmits<{
  (event: 'confirm'): void;
  (event: 'closedPopup'): void;
}>();

const onPopoverToggleOpen = (open: boolean) => {
  isOpen.value = open;
  if (!open) {
    emit('closedPopup');
  }
};

const isOpen = ref(props.defaultOpen || false);
const activatorRef = ref();

const onConfirm = () => {
  isOpen.value = false;
  emit('confirm');
};

const onClose = () => {
  onPopoverToggleOpen(false);
};
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
