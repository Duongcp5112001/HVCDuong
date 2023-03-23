<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" custom-height="219px" @close-dialog="onCloseDialog">
    <template #header>
      <Icon
        class="util-mr-24"
        icon="warning_amber"
        color="#BA1A1A"
        :size="40"
      ></Icon>
      <Text color="critical" size="xl" bold>
        カレンダーデータを取り込めませんでした
      </Text>
    </template>
    <Text class="util-mt-16" size="large">
      カレンダーデータを確認の上、やり直してください。
    </Text>

    <template #footer>
      <Button
        size="large"
        color="neutral"
        type="outlined"
        width="160px"
        @click="onClickCloseButton"
      >
        閉じる
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Button from '../components/Button/Button.vue';
import Icon from '../components/Icon/Icon.vue';

const open = ref(true);

const onCloseDialog = () => {
  open.value = false;
};

const onClickCloseButton = () => {
  open.value = false;
  console.log('onClickCloseButton');
};
</script>

<style scoped lang="scss"></style>
