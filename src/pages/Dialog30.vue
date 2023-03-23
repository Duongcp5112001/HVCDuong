<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" custom-height="359px" @close-dialog="onCloseDialog">
    <template #header>
      <Text color="main" size="xl" bold>予約の複製</Text>
    </template>
    <div class="util-flex util-flex--column util-full-width">
      <Text bold>複製元予約:932425</Text>
      <div class="util-flex util-flex--column util-mt-12">
        <FieldContainer label="宿泊施設" width="416px" required>
          <ComboBox
            v-model:value="currentTextDropdownSelection1"
            size="small"
            width="416px"
            :search-icon="false"
          >
            <ComboBoxItem
              v-for="(option, i) in textDropdownOptions"
              :key="i"
              :label="option.label"
              :value="option.value"
            >
            </ComboBoxItem>
          </ComboBox>
        </FieldContainer>
      </div>
      <div class="util-flex util-mt-12">
        <FieldContainer class="util-mr-16" label="部屋タイプ" width="272px">
          <ComboBox
            v-model:value="currentTextDropdownSelection2"
            size="small"
            width="272px"
            :disabled="isRoomType"
            :search-icon="false"
          >
            <ComboBoxItem
              v-for="(option, i) in textDropdownOptions"
              :key="i"
              :label="option.label"
              :value="option.value"
            >
            </ComboBoxItem>
          </ComboBox>
        </FieldContainer>
        <FieldContainer label="宿泊日" width="128px" required>
          <DatePicker size="small" width="128px"></DatePicker>
        </FieldContainer>
      </div>
      <div
        class="
          util-flex util-flex--align-center util-flex--column-gap4
          util-mt-12
        "
      >
        <Icon icon="warning_amber" color="#BA1A1A" :size="24" />
        <Text color="critical">
          変更前のレストラン、付帯施設、手配品の予約はコピーされません。
        </Text>
      </div>
    </div>
    <template #footer>
      <Button size="large" width="200px">予約を複製</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import { ref, withDefaults } from 'vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Button from '../components/Button/Button.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import ComboBox from '../components/ComboBox/ComboBox.vue';
import ComboBoxItem from '../components/ComboBox/ComboBoxItem.vue';
import DatePicker from '../components/DatePicker/DatePicker.vue';
import Icon from '../components/Icon/Icon.vue';

type Props = {
  isRoomType?: boolean;
};

withDefaults(defineProps<Props>(), {
  isRoomType: false,
});

const open = ref(true);

const currentTextDropdownSelection1 = ref('');
const currentTextDropdownSelection2 = ref('');

const textDropdownOptions = [
  {
    label: 'オプション1',
    value: 'option1',
  },
  {
    label: 'オプション2',
    value: 'option2',
  },
  {
    label: 'オプション3',
    value: 'option3',
  },
];

const onCloseDialog = () => {
  open.value = false;
};
</script>

<style scoped lang="scss"></style>
