<template>
  <span
    :class="`icon`"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
  >
    <svg
      v-if="icon === 'ticket_not_available'"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5.54546"
        y="5.2693"
        width="18"
        height="1.03728"
        transform="rotate(45 5.54546 5.2693)"
        :fill="color"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.73585 6.5243C6.408 6.77299 6.19453 7.18074 6.19453 7.6443V10.3943C6.90953 10.3943 7.48803 11.0131 7.48803 11.7693C7.48803 12.5256 6.90953 13.1443 6.18803 13.1443V15.8943C6.18803 16.6506 6.77303 17.2693 7.48803 17.2693H17.4809L12.6684 12.4568H12.038V11.8265L6.73585 6.5243ZM13.338 11.7123V11.0818H12.7076L7.89507 6.2693H17.888C18.603 6.2693 19.188 6.88118 19.188 7.6443V10.3943C18.473 10.3943 17.888 11.0131 17.888 11.7693C17.888 12.5256 18.473 13.1443 19.188 13.1443V15.8943C19.188 16.3548 18.9711 16.7644 18.64 17.0142L13.338 11.7123ZM12.038 15.5506H13.338V14.1756H12.038V15.5506ZM12.038 9.36305H13.338V7.98805H12.038V9.36305Z"
        :fill="color"
      />
    </svg>
    <svg
      v-else-if="icon === 'tickets'"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.5 5.33333V8C19.785 8 19.1999 8.6 19.1999 9.33333C19.1999 10.0667 19.785 10.6667 20.5 10.6667V13.3333C20.5 14.0667 19.915 14.6667 19.1999 14.6667H17.5V13.5V12.125V9.375C17.5 8.61188 16.915 8 16.2 8H7.50664C7.50638 8 7.50612 8 7.50586 8V5.33333C7.50586 4.59333 8.08439 4 8.79942 4H19.1999C19.915 4 20.5 4.59333 20.5 5.33333ZM13.3496 7H14.6497V5.66667H13.3496V7Z"
        :fill="color"
      />
      <path
        d="M16.5 13.125V10.375C16.5 9.61187 15.915 9 15.2 9H4.8C4.085 9 3.5065 9.61187 3.5065 10.375V13.125C4.2215 13.125 4.8 13.7438 4.8 14.5C4.8 15.2562 4.2215 15.875 3.5 15.875V18.625C3.5 19.3813 4.085 20 4.8 20H15.2C15.915 20 16.5 19.3813 16.5 18.625V15.875C15.785 15.875 15.2 15.2562 15.2 14.5C15.2 13.7438 15.785 13.125 16.5 13.125ZM10.65 18.2812H9.35V16.9062H10.65V18.2812ZM10.65 15.1875H9.35V13.8125H10.65V15.1875ZM10.65 12.0938H9.35V10.7188H10.65V12.0938Z"
        :fill="color"
      />
    </svg>
    <svg
      v-else-if="icon === 'ticket_in'"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.5 5.375V8.125C19.7846 8.125 19.1994 8.74375 19.1994 9.5C19.1994 10.2562 19.7846 10.875 20.5 10.875V13.625C20.5 14.3813 19.9147 15 19.1994 15H11.5014L11.5019 14.9995L7.70306 10.8573C8.32419 10.7513 8.79415 10.1815 8.79415 9.5C8.79415 8.74375 8.21536 8.125 7.5 8.125V5.375C7.5 4.61187 8.07879 4 8.79415 4H19.1994C19.9147 4 20.5 4.61187 20.5 5.375ZM13.3464 13.2812H14.6471V11.9062H13.3464V13.2812ZM13.3464 10.1875H14.6471V8.8125H13.3464V10.1875ZM13.3464 7.09375H14.6471V5.71875H13.3464V7.09375Z"
        :fill="color"
      />
      <path d="M7.5 14V12L11.5 16L7.5 20V18H3.5V14H7.5Z" :fill="color" />
    </svg>
    <svg
      v-else-if="icon === 'ticket_out'"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 5.375V8.125C15.285 8.125 14.7 8.74375 14.7 9.5C14.7 10.2562 15.285 10.875 16 10.875V13H12V15H4.3C3.585 15 3 14.3813 3 13.625V10.875C3.7215 10.875 4.3 10.2562 4.3 9.5C4.3 8.74375 3.7215 8.125 3.0065 8.125V5.375C3.0065 4.61187 3.585 4 4.3 4H14.7C15.415 4 16 4.61187 16 5.375ZM8.85 13.2812H10.15V11.9062H8.85V13.2812ZM8.85 10.1875H10.15V8.8125H8.85V10.1875ZM8.85 7.09375H10.15V5.71875H8.85V7.09375Z"
        :fill="color"
      />
      <path d="M17 14V12L21 16L17 20V18H13V14H17Z" :fill="color" />
    </svg>
  </span>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';

type Props = {
  icon?: string;
  color?: string;
  size?: number;
};

withDefaults(defineProps<Props>(), {
  icon: 'ticket_not_available',
  color: '#727272',
  size: 24,
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>
