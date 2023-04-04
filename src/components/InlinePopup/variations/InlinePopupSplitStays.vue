<template>
  <InlinePopup
    direction="top"
    :confirm-button-label="`${targetLabel}を分割`"
    :aligned="aligned"
    :width="384"
    @confirm="onConfirm"
    :disabled="disabled"
    :confirmButtonDisabled="!isTrueSplittedNight"
    @close-popup="closePopup"
  >
    <Button color="neutral" type="outlined" :size="size" :disabled="disabled">
      {{ targetLabel }}を分割
    </Button>
    <template #popupTitle> {{ targetLabel }}を分割する </template>
    <template #popupContent>
      <span class="util-flex util-flex--align-end">
        <Text class="util-px-16" line-height="150%">{{ daysToSplit }}</Text>
        <Text line-height="150%">{{ counterLabel }}を</Text>
        <Dropdown
          :value="splittedNights.length.toString()"
          class="util-mr-8 util-ml-8"
          placeholder=""
          size="small"
          width="64px"
          @update:value="onChangeSplitAmount"
        >
          <DropdownItem
            v-for="(option, i) in numericDropdownOptions"
            :key="i"
            :label="option.label"
            :value="option.value"
          >
          </DropdownItem>
        </Dropdown>
        <Text line-height="150%">つに分ける</Text>
      </span>
      <span
        class="
          util-flex util-flex--align-end util-flex--wrap util-flex--row-gap16
          util-mb-16
        "
      >
        <span
          v-for="(night, i) in splittedNights"
          :key="i"
          class="util-flex util-flex--align-end"
        >
          <Dropdown
            :value="night ? night.toString() : '1'"
            class="util-mr-4"
            placeholder=""
            size="small"
            width="64px"
            @update:value="(value) => onChangeSplittedNight(value, i)"
          >
            <DropdownItem
              v-for="(option, _i) in availableDays(i)"
              :key="_i"
              :label="option.label"
              :value="option.value"
            >
            </DropdownItem>
          </Dropdown>
          <Text line-height="150%">{{ counterLabel }}</Text>
          <Text
            v-if="i < splittedNights.length - 1"
            class="util-px-8 util-py-4"
            line-height="150%"
          >
            +
          </Text>
        </span>
      </span>
    </template>
  </InlinePopup>
</template>

<script setup lang="ts">
import { withDefaults, ref, computed } from 'vue';
import InlinePopup from '../InlinePopup.vue';
import Button from '../../Button/Button.vue';
import Dropdown from '../../Dropdown/Dropdown.vue';
import DropdownItem from '../../Dropdown/DropdownItem.vue';
import Text from '../../Text/Text.vue';

type Props = {
  daysToSplit: number;
  size?: 'small' | 'medium' | 'large';
  aligned?: 'left' | 'right';
  targetLabel?: string;
  counterLabel?: string;
  disabled?: boolean,
  rowId: string
};

const props = withDefaults(defineProps<Props>(), {
  daysToSplit: 1,
  size: 'medium',
  aligned: 'left',
  targetLabel: 'ターゲット',
  counterLabel: '個',
  disabled: false
});
const splittedNights = ref([1]);

const onChangeSplitAmount = (value: string) => {
  splittedNights.value = Array.from({ length: parseInt(value) }, () => 1);
};

const onChangeSplittedNight = (value: string, index: number) => {
  splittedNights.value[index] = parseInt(value);
};

const emit =
  defineEmits<{ (event: 'confirmSplit', splittedNights: number[], rowId: string): void }>();

const onConfirm = () => {
  emit('confirmSplit', splittedNights.value, props.rowId);
  console.log(props.rowId);
};

const availableDays = (index: number) => {
  const days = [];
  const thisDay = splittedNights.value[index];
  const assignedDays =
    splittedNights.value.reduce((partialSum, a) => partialSum + a, 0) - thisDay;
  const leftOverDays = props.daysToSplit - assignedDays;
  for (let i = 1; i <= leftOverDays; i++) {
    days.push({ label: i.toString(), value: i.toString() });
  }
  return days;
};

const numericDropdownOptions = computed(() => {
  const options = [];
  for (let i = 1; i <= props.daysToSplit; i++) {
    options.push({ label: i.toString(), value: i.toString() });
  }
  return options;
});
const closePopup = (isOpen: boolean) => {
  if(!isOpen) splittedNights.value = [1]
}

/** check splitted night **/
const isTrueSplittedNight = computed(() => {
  return splittedNights.value.reduce((preValue, curValue) =>  preValue + curValue, 0) === Number(props.daysToSplit)
})
</script>
