import Badge from '../components/Badge/Badge.vue';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    color: {
      type: 'string',
      description: 'バッジの色',
      options: [
        'primary',
        'error',
        'success',
        'warning',
        'neutral',
        'neutral-faded',
        'information',
        'slot01',
        'slot02',
        'slot03',
        'slot04',
        'slot05',
        'slot06',
        'slot07',
        'slot08',
        'slot09',
        'slot10',
      ],
      control: { type: 'select' },
    },
    type: {
      type: 'string',
      description: 'バッジの種類',
      options: ['contained', 'outlined'],
      control: { type: 'select' },
    },
    size: {
      type: 'string',
      description: 'バッジのサイズ',
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    icon: {
      type: 'string',
      description: 'アイコン名 (MaterialIcons名)',
    },
    counter: {
      type: 'number',
      description: 'カウンターのバッジ用のカウンター数字',
    },
  },
};

const Template = (args) => ({
  components: { Badge },
  setup() {
    return { args };
  },
  template: '<Badge v-bind="args">Label</Badge>',
});

/** Sizes */
export const Large = Template.bind({});
Large.args = {
  type: 'contained',
  color: 'primary',
  size: 'large',
};

export const Medium = Template.bind({});
Medium.args = {
  type: 'contained',
  color: 'primary',
  size: 'medium',
};

export const Small = Template.bind({});
Small.args = {
  type: 'contained',
  color: 'primary',
  size: 'small',
};

/** Type & Color */

export const ContainedPrimary = Template.bind({});
ContainedPrimary.args = {
  type: 'contained',
  color: 'primary',
  size: 'medium',
};

export const ContainedError = Template.bind({});
ContainedError.args = {
  type: 'contained',
  color: 'error',
  size: 'medium',
};

export const ContainedSuccess = Template.bind({});
ContainedSuccess.args = {
  type: 'contained',
  color: 'success',
  size: 'medium',
};

export const ContainedWarning = Template.bind({});
ContainedWarning.args = {
  type: 'contained',
  color: 'warning',
  size: 'medium',
};

export const ContainedNeutral = Template.bind({});
ContainedNeutral.args = {
  type: 'contained',
  color: 'neutral',
  size: 'medium',
};

export const ContainedNeutralFaded = Template.bind({});
ContainedNeutralFaded.args = {
  type: 'contained',
  color: 'neutral-faded',
  size: 'medium',
};

export const ContainedInformation = Template.bind({});
ContainedInformation.args = {
  type: 'contained',
  color: 'information',
  size: 'medium',
};

export const ContainedSlot01 = Template.bind({});
ContainedSlot01.args = {
  type: 'contained',
  color: 'slot01',
  size: 'medium',
};

export const ContainedSlot02 = Template.bind({});
ContainedSlot02.args = {
  type: 'contained',
  color: 'slot02',
  size: 'medium',
};

export const ContainedSlot03 = Template.bind({});
ContainedSlot03.args = {
  type: 'contained',
  color: 'slot03',
  size: 'medium',
};

export const ContainedSlot04 = Template.bind({});
ContainedSlot04.args = {
  type: 'contained',
  color: 'slot04',
  size: 'medium',
};

export const ContainedSlot05 = Template.bind({});
ContainedSlot05.args = {
  type: 'contained',
  color: 'slot05',
  size: 'medium',
};

export const ContainedSlot06 = Template.bind({});
ContainedSlot06.args = {
  type: 'contained',
  color: 'slot06',
  size: 'medium',
};

export const ContainedSlot07 = Template.bind({});
ContainedSlot07.args = {
  type: 'contained',
  color: 'slot07',
  size: 'medium',
};

export const ContainedSlot08 = Template.bind({});
ContainedSlot08.args = {
  type: 'contained',
  color: 'slot08',
  size: 'medium',
};

export const ContainedSlot09 = Template.bind({});
ContainedSlot09.args = {
  type: 'contained',
  color: 'slot09',
  size: 'medium',
};

export const ContainedSlot10 = Template.bind({});
ContainedSlot10.args = {
  type: 'contained',
  color: 'slot10',
  size: 'medium',
};

export const OutlinedPrimary = Template.bind({});
OutlinedPrimary.args = {
  type: 'outlined',
  color: 'primary',
  size: 'medium',
};

export const OutlinedError = Template.bind({});
OutlinedError.args = {
  type: 'outlined',
  color: 'error',
  size: 'medium',
};

export const OutlinedSuccess = Template.bind({});
OutlinedSuccess.args = {
  type: 'outlined',
  color: 'success',
  size: 'medium',
};

export const OutlinedWarning = Template.bind({});
OutlinedWarning.args = {
  type: 'outlined',
  color: 'warning',
  size: 'medium',
};

export const OutlinedNeutral = Template.bind({});
OutlinedNeutral.args = {
  type: 'outlined',
  color: 'neutral',
  size: 'medium',
};

export const OutlinedNeutralFaded = Template.bind({});
OutlinedNeutralFaded.args = {
  type: 'outlined',
  color: 'neutral-faded',
  size: 'medium',
};

export const OutlinedInformation = Template.bind({});
OutlinedInformation.args = {
  type: 'outlined',
  color: 'information',
  size: 'medium',
};

/** Icon */
export const IconContainedPrimary = Template.bind({});
IconContainedPrimary.args = {
  type: 'contained',
  color: 'primary',
  size: 'medium',
  icon: 'star',
};

export const IconContainedError = Template.bind({});
IconContainedError.args = {
  type: 'contained',
  color: 'error',
  size: 'medium',
  icon: 'star',
};

export const IconContainedSuccess = Template.bind({});
IconContainedSuccess.args = {
  type: 'contained',
  color: 'success',
  size: 'medium',
  icon: 'star',
};

export const IconContainedWarning = Template.bind({});
IconContainedWarning.args = {
  type: 'contained',
  color: 'warning',
  size: 'medium',
  icon: 'star',
};

export const IconContainedNeutral = Template.bind({});
IconContainedNeutral.args = {
  type: 'contained',
  color: 'neutral',
  size: 'medium',
  icon: 'star',
};

export const IconContainedNeutralFaded = Template.bind({});
IconContainedNeutralFaded.args = {
  type: 'contained',
  color: 'neutral-faded',
  size: 'medium',
  icon: 'star',
};

export const IconContainedInformation = Template.bind({});
IconContainedInformation.args = {
  type: 'contained',
  color: 'information',
  size: 'medium',
  icon: 'star',
};

export const IconOutlinedPrimary = Template.bind({});
IconOutlinedPrimary.args = {
  type: 'outlined',
  color: 'primary',
  size: 'medium',
  icon: 'star',
};

export const IconOutlinedError = Template.bind({});
IconOutlinedError.args = {
  type: 'outlined',
  color: 'error',
  size: 'medium',
  icon: 'star',
};

export const IconOutlinedSuccess = Template.bind({});
IconOutlinedSuccess.args = {
  type: 'outlined',
  color: 'success',
  size: 'medium',
  icon: 'star',
};

export const IconOutlinedWarning = Template.bind({});
IconOutlinedWarning.args = {
  type: 'outlined',
  color: 'warning',
  size: 'medium',
  icon: 'star',
};

export const IconOutlinedNeutral = Template.bind({});
IconOutlinedNeutral.args = {
  type: 'outlined',
  color: 'neutral',
  size: 'medium',
  icon: 'star',
};

export const IconOutlinedNeutralFaded = Template.bind({});
IconOutlinedNeutralFaded.args = {
  type: 'outlined',
  color: 'neutral-faded',
  size: 'medium',
  icon: 'star',
};

export const IconOutlinedInformation = Template.bind({});
IconOutlinedInformation.args = {
  type: 'outlined',
  color: 'information',
  size: 'medium',
  icon: 'star',
};

/** Counter Badge */
export const CounterBadge = Template.bind({});
CounterBadge.args = {
  counter: 50,
};
export const CounterBadgeOverflow = Template.bind({});
CounterBadgeOverflow.args = {
  counter: 100,
};
