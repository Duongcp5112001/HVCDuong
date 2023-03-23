import Button from '../components/Button/Button.vue';

export default {
  title: 'Components/Button',
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
    disabled: {
      type: 'boolean',
    },
    jointEnd: {
      type: 'string',
      description: '横並びでボタンを繋げる箇所',
      options: ['right', 'left', 'both'],
      control: { type: 'select' },
    },
  },
};

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">Label</Button>',
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

export const ContainedCritical = Template.bind({});
ContainedCritical.args = {
  type: 'contained',
  color: 'critical',
  size: 'medium',
};

export const ContainedNeutral = Template.bind({});
ContainedNeutral.args = {
  type: 'contained',
  color: 'neutral',
  size: 'medium',
};

export const ContainedDisabled = Template.bind({});
ContainedDisabled.args = {
  type: 'contained',
  color: 'primary',
  size: 'medium',
  disabled: true,
};

export const OutlinedPrimary = Template.bind({});
OutlinedPrimary.args = {
  type: 'outlined',
  color: 'primary',
  size: 'medium',
};

export const OutlinedCritical = Template.bind({});
OutlinedCritical.args = {
  type: 'outlined',
  color: 'critical',
  size: 'medium',
};

export const OutlinedNeutral = Template.bind({});
OutlinedNeutral.args = {
  type: 'outlined',
  color: 'neutral',
  size: 'medium',
};

export const OutlinedDisabled = Template.bind({});
OutlinedDisabled.args = {
  type: 'outlined',
  color: 'primary',
  size: 'medium',
  disabled: true,
};

export const TextPrimary = Template.bind({});
TextPrimary.args = {
  type: 'text',
  color: 'primary',
  size: 'medium',
};

export const TextCritical = Template.bind({});
TextCritical.args = {
  type: 'text',
  color: 'critical',
  size: 'medium',
};

export const TextNeutral = Template.bind({});
TextNeutral.args = {
  type: 'text',
  color: 'neutral',
  size: 'medium',
};

export const TextDisabled = Template.bind({});
TextDisabled.args = {
  type: 'text',
  color: 'primary',
  size: 'medium',
  disabled: true,
};

/** Icon Left Type & Color */
export const ContainedPrimaryIconLeft = Template.bind({});
ContainedPrimaryIconLeft.args = {
  type: 'contained',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_left',
};

export const ContainedCriticalIconLeft = Template.bind({});
ContainedCriticalIconLeft.args = {
  type: 'contained',
  color: 'critical',
  size: 'medium',
  icon: 'chevron_left',
};

export const ContainedNeutralIconLeft = Template.bind({});
ContainedNeutralIconLeft.args = {
  type: 'contained',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_left',
};

export const OutlinedPrimaryIconLeft = Template.bind({});
OutlinedPrimaryIconLeft.args = {
  type: 'outlined',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_left',
};

export const OutlinedCriticalIconLeft = Template.bind({});
OutlinedCriticalIconLeft.args = {
  type: 'outlined',
  color: 'critical',
  size: 'medium',
  icon: 'chevron_left',
};

export const OutlinedNeutralIconLeft = Template.bind({});
OutlinedNeutralIconLeft.args = {
  type: 'outlined',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_left',
};

export const TextPrimaryIconLeft = Template.bind({});
TextPrimaryIconLeft.args = {
  type: 'text',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_left',
};

export const TextCriticalIconLeft = Template.bind({});
TextCriticalIconLeft.args = {
  type: 'text',
  color: 'critical',
  size: 'medium',
  icon: 'chevron_left',
};

export const TextNeutralIconLeft = Template.bind({});
TextNeutralIconLeft.args = {
  type: 'text',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_left',
};

/** Icon Right Type & Color */
export const ContainedPrimaryIconRight = Template.bind({});
ContainedPrimaryIconRight.args = {
  type: 'contained',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_right',
  iconPosition: 'right',
};

export const ContainedCriticalIconRight = Template.bind({});
ContainedCriticalIconRight.args = {
  type: 'contained',
  color: 'critical',
  size: 'medium',
  icon: 'chevron_right',
  iconPosition: 'right',
};

export const ContainedNeutralIconRight = Template.bind({});
ContainedNeutralIconRight.args = {
  type: 'contained',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_right',
  iconPosition: 'right',
};

export const OutlinedPrimaryIconRight = Template.bind({});
OutlinedPrimaryIconRight.args = {
  type: 'outlined',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_right',
  iconPosition: 'right',
};

export const OutlinedCriticalIconRight = Template.bind({});
OutlinedCriticalIconRight.args = {
  type: 'outlined',
  color: 'critical',
  size: 'medium',
  icon: 'chevron_right',
  iconPosition: 'right',
};

export const OutlinedNeutralIconRight = Template.bind({});
OutlinedNeutralIconRight.args = {
  type: 'outlined',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_right',
  iconPosition: 'right',
};

export const TextPrimaryIconRight = Template.bind({});
TextPrimaryIconRight.args = {
  type: 'text',
  color: 'primary',
  size: 'medium',
  icon: 'chevron_right',
  iconPosition: 'right',
};

export const TextCriticalIconRight = Template.bind({});
TextCriticalIconRight.args = {
  type: 'text',
  color: 'critical',
  size: 'medium',
  icon: 'chevron_right',
  iconPosition: 'right',
};

export const TextNeutralIconRight = Template.bind({});
TextNeutralIconRight.args = {
  type: 'text',
  color: 'neutral',
  size: 'medium',
  icon: 'chevron_right',
  iconPosition: 'right',
};

/** Joint */
export const jointEndRight = Template.bind({});
jointEndRight.args = {
  type: 'contained',
  color: 'primary',
  size: 'medium',
  jointEnd: 'right',
};

export const jointEndLeft = Template.bind({});
jointEndLeft.args = {
  type: 'contained',
  color: 'primary',
  size: 'medium',
  jointEnd: 'left',
};

export const jointEndBoth = Template.bind({});
jointEndBoth.args = {
  type: 'contained',
  color: 'primary',
  size: 'medium',
  jointEnd: 'both',
};
