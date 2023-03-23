<template>
  <Dialog :open="open" custom-height="272px" @close-dialog="onCloseDialog">
    <template #header>
      <Text color="main" size="xl" bold>日程変更</Text>
    </template>
    <span class="util-flex util-flex--column-gap8 util-mb-10">
      <FieldContainer label="到着日" width="128px" required>
        <DatePicker size="small" width="128px" />
      </FieldContainer>
      <span class="util-flex util-flex--align-end">
        <FieldContainer label="泊数" width="64px" required>
          <Dropdown
              v-model:value="currentNumericDropdownSelection1"
              placeholder="0"
              size="small"
              width="64px"
          >
            <DropdownItem
                v-for="(option, i) in numericDropdownOptions"
                :key="i"
                :label="option.label"
                :value="option.value"
            >
            </DropdownItem>
          </Dropdown>
        </FieldContainer>
        <Text class="util-ml-4" color="light" bold size="2xs">泊</Text>
      </span>
    </span>
    <span class="util-flex util-flex--column-gap8 util-flex--align-center">
      <Icon
          icon="warning_amber"
          color="#BA1A1A"
          type="filled"
          :size="24"
      ></Icon>
      <Text color="critical" bold line-height="24px">
        変更前のレストラン、付帯施設、手配品の予約はすべてキャンセルとなります。
      </Text>
    </span>
    <template #footer>
      <Button class="util-mb-8" color="critical" size="large" width="200px">
        日程を変更
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '@components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '@components/Dialog/Dialog.vue';
import Button from '@components/Button/Button.vue';
import Icon from '@components/Icon/Icon.vue';
import FieldContainer from '@components/FieldContainer/FieldContainer.vue';
import DatePicker from '@components/DatePicker/DatePicker.vue';
import Dropdown from '@components/Dropdown/Dropdown.vue';
import DropdownItem from '@components/Dropdown/DropdownItem.vue';

const props = withDefaults(
    defineProps<{
      open: boolean
    }>(),
    {
      open: false
    }
);

const currentNumericDropdownSelection1 = ref('');

const numericDropdownOptions = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '5',
    value: '5',
  },
  {
    label: '6',
    value: '6',
  },
];

const emit = defineEmits<{ (event: 'closeDialog'): void }>();
const onCloseDialog = () => {
  emit('closeDialog');
};

</script>

<style scoped lang="scss"></style>
