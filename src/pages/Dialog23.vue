<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" custom-height="531px" @close-dialog="onCloseDialog">
    <template #header>
      <Text color="main" size="xl" bold>２０２２年９月２１日(水) 朝食</Text>
    </template>
    <div
      class="util-flex util-flex--column util-flex--row-gap24 util-full-width"
    >
      <div class="util-flex util-flex--column util-flex--row-gap8">
        <Text color="light" line-height="14px">会場</Text>
        <Text line-height="21px">ダイニングルーム「クレール」</Text>
      </div>
      <div class="util-flex util-flex--column util-flex--row-gap8">
        <Text color="light" line-height="14px">時間</Text>
        <span class="util-flex util-flex--column-gap8">
          <Dropdown
            v-model:value="mealTime"
            placeholder="7:00"
            size="small"
            width="80px"
          >
            <DropdownItem
              v-for="(option, i) in mealTimeDropdownOptions"
              :key="i"
              :label="option.label"
              :value="option.value"
            >
            </DropdownItem>
          </Dropdown>
          <Button color="neutral" type="outlined">空席照会</Button>
          <span
            class="util-flex util-flex--align-center util-flex--column-gap4"
          >
            <Icon icon="check" color="#236C2D" :size="16" />
            <Text color="success">空席があります</Text>
          </span>
        </span>
      </div>
      <div class="util-flex util-flex--column util-flex--row-gap8">
        <Text color="light" line-height="14px">人数</Text>
        <span class="util-flex util-flex--gap8 util-flex--wrap">
          <span class="util-flex util-flex--align-end">
            <FieldContainer label="大人" width="64px">
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
            <Text class="util-ml-4" color="light" bold size="2xs">人</Text>
          </span>
          <span class="util-flex util-flex--align-end">
            <FieldContainer label="中人" width="64px">
              <Dropdown
                v-model:value="currentNumericDropdownSelection2"
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
            <Text class="util-ml-4" color="light" bold size="2xs">人</Text>
          </span>
          <span class="util-flex util-flex--align-end">
            <FieldContainer label="小人" width="64px">
              <Dropdown
                v-model:value="currentNumericDropdownSelection3"
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
            <Text class="util-ml-4" color="light" bold size="2xs">人</Text>
          </span>
          <span class="util-flex util-flex--align-end">
            <FieldContainer label="幼児" width="64px">
              <Dropdown
                v-model:value="currentNumericDropdownSelection4"
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
            <Text class="util-ml-4" color="light" bold size="2xs">人</Text>
          </span>
        </span>
      </div>
      <div class="util-flex util-flex--column util-flex--row-gap8">
        <Text color="light" line-height="14px">備考</Text>
        <TextField
          placeholder="備考"
          multi-line
          multi-line-height="80px"
        ></TextField>
      </div>
    </div>
    <template #footer>
      <Button size="large" width="200px">登録</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Button from '../components/Button/Button.vue';
import Icon from '../components/Icon/Icon.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import TextField from '../components/TextField/TextField.vue';
import Dropdown from '../components/Dropdown/Dropdown.vue';
import DropdownItem from '../components/Dropdown/DropdownItem.vue';

const open = ref(true);

const mealTime = ref('7:00');
const currentNumericDropdownSelection1 = ref('');
const currentNumericDropdownSelection2 = ref('');
const currentNumericDropdownSelection3 = ref('');
const currentNumericDropdownSelection4 = ref('');

const mealTimeDropdownOptions = [
  {
    label: '7:00',
    value: '7',
  },
  {
    label: '8:00',
    value: '8',
  },
  {
    label: '9:00',
    value: '9',
  },
];

const numericDropdownOptions = [
  {
    label: '0',
    value: '0',
  },
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
];

const onCloseDialog = () => {
  open.value = false;
};
</script>

<style scoped lang="scss"></style>
