import Button from '../components/Button/Button.vue';

export default {
  title: 'Components/IconButton',
  component: Button,
  argTypes: {
    color: {
      type: 'string',
      description: 'ボタンの色',
      options: ['primary', 'neutral', 'critical'],
      control: { type: 'select' },
    },
    type: {
      type: 'string',
      description: 'ボタンの種類',
      options: ['contained', 'outlined', 'text'],
      control: { type: 'select' },
    },
    shape: {
      type: 'string',
      description: 'ボタンの形',
      options: ['square', 'circle'],
      control: { type: 'select' },
    },
    size: {
      type: 'string',
      description: 'ボタンのサイズ',
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    icon: {
      type: 'string',
      description: 'アイコン名 (MaterialIcons名)',
    },
    iconPosition: {
      type: 'string',
      description: 'アイコンの位置',
      options: ['right', 'left'],
      control: { type: 'select' },
    },
  },
};

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args"></Button>',
});

/** Sizes */
export const Large = Template.bind({});
Large.args = {
  type: 'contained',
  color: 'primary',
  size: 'large',
  icon: 'chevron_left',
};

export const Medium = Template.bind({});
Medium.args = {
  type: 'contained',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_left',
};

export const Small = Template.bind({});
Small.args = {
  type: 'contained',
  color: 'primary',
  size: 'small',
  icon: 'chevron_left',
};

export const LargeCircle = Template.bind({});
LargeCircle.args = {
  type: 'contained',
  color: 'primary',
  size: 'large',
  icon: 'chevron_left',
  shape: 'circle',
};
export const MediumCircle = Template.bind({});
MediumCircle.args = {
  type: 'contained',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_left',
  shape: 'circle',
};

export const SmallCircle = Template.bind({});
SmallCircle.args = {
  type: 'contained',
  color: 'primary',
  size: 'small',
  icon: 'chevron_left',
  shape: 'circle',
};

/** Type & Color */
export const ContainedPrimary = Template.bind({});
ContainedPrimary.args = {
  type: 'contained',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_left',
};

export const ContainedCritical = Template.bind({});
ContainedCritical.args = {
  type: 'contained',
  color: 'critical',
  size: 'medium',
  icon: 'chevron_left',
};

export const ContainedNeutral = Template.bind({});
ContainedNeutral.args = {
  type: 'contained',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_left',
};

export const ContainedDisabled = Template.bind({});
ContainedDisabled.args = {
  type: 'contained',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_left',
  disabled: true,
};

export const OutlinedPrimary = Template.bind({});
OutlinedPrimary.args = {
  type: 'outlined',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_left',
};

export const OutlinedCritical = Template.bind({});
OutlinedCritical.args = {
  type: 'outlined',
  color: 'critical',
  size: 'medium',
  icon: 'chevron_left',
};

export const OutlinedNeutral = Template.bind({});
OutlinedNeutral.args = {
  type: 'outlined',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_left',
};

export const OutlinedDisabled = Template.bind({});
OutlinedDisabled.args = {
  type: 'outlined',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_left',
  disabled: true,
};

export const TextPrimary = Template.bind({});
TextPrimary.args = {
  type: 'text',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_left',
};

export const TextCritical = Template.bind({});
TextCritical.args = {
  type: 'text',
  color: 'critical',
  size: 'medium',
  icon: 'chevron_left',
};

export const TextNeutral = Template.bind({});
TextNeutral.args = {
  type: 'text',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_left',
};

export const TextDisabled = Template.bind({});
TextDisabled.args = {
  type: 'text',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_left',
  disabled: true,
};

export const ContainedPrimaryCircle = Template.bind({});
ContainedPrimaryCircle.args = {
  type: 'contained',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_left',
  shape: 'circle',
};

export const ContainedCriticalCircle = Template.bind({});
ContainedCriticalCircle.args = {
  type: 'contained',
  color: 'critical',
  size: 'medium',
  icon: 'chevron_left',
  shape: 'circle',
};

export const ContainedNeutralCircle = Template.bind({});
ContainedNeutralCircle.args = {
  type: 'contained',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_left',
  shape: 'circle',
};

export const OutlinedPrimaryCircle = Template.bind({});
OutlinedPrimaryCircle.args = {
  type: 'outlined',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_left',
  shape: 'circle',
};

export const OutlinedCriticalCircle = Template.bind({});
OutlinedCriticalCircle.args = {
  type: 'outlined',
  color: 'critical',
  size: 'medium',
  icon: 'chevron_left',
  shape: 'circle',
};

export const OutlinedNeutralCircle = Template.bind({});
OutlinedNeutralCircle.args = {
  type: 'outlined',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_left',
  shape: 'circle',
};

export const TextPrimaryCircle = Template.bind({});
TextPrimaryCircle.args = {
  type: 'text',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_left',
  shape: 'circle',
};

export const TextCriticalCircle = Template.bind({});
TextCriticalCircle.args = {
  type: 'text',
  color: 'critical',
  size: 'medium',
  icon: 'chevron_left',
  shape: 'circle',
};

export const TextNeutralCircle = Template.bind({});
TextNeutralCircle.args = {
  type: 'text',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_left',
  shape: 'circle',
};
