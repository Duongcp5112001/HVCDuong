<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" custom-height="207px" @close-dialog="onCloseDialog">
    <template #header>
      <Icon
        class="util-mr-24"
        icon="warning_amber"
        color="#BA1A1A"
        :size="40"
      ></Icon>
      <Text color="critical" size="xl" bold>再設定が必要です</Text>
    </template>
    <span class="util-mb-10">
      <Text bold color="light" line-height="21px">
        以下の項目は再設定が必要です。
      </Text>
    </span>
    <span class="util-flex util-flex--column-gap8">
      <Badge color="error" size="small" icon="error">レストラン</Badge>
      <Badge color="error" size="small" icon="error">付帯施設</Badge>
    </span>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Button from '../components/Button/Button.vue';
import Icon from '../components/Icon/Icon.vue';
import Badge from '../components/Badge/Badge.vue';

const open = ref(true);

const onCloseDialog = () => {
  open.value = false;
};
</script>

<style scoped lang="scss"></style>
