import Switch from '../components/Switch/Switch.vue';

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    disabled: {
      type: 'boolean',
      description: '非活性か',
    },
    checked: {
      type: 'boolean',
      description: 'チェック状態か',
    },
    labelPosition: {
      type: 'string',
      description: 'ラベル',
      options: ['right', 'left'],
      control: { type: 'select' },
    },
  },
};

const Template = (args) => ({
  components: { Switch },
  setup() {
    return { args };
  },
  template: '<Switch v-bind="args"/>',
});
const LabelTemplate = (args) => ({
  components: { Switch },
  setup() {
    return { args };
  },
  template: '<Switch v-bind="args">Label</Switch>',
});

export const UnChecked = Template.bind({});
UnChecked.args = {};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const DisabledUnChecked = Template.bind({});
DisabledUnChecked.args = {
  disabled: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  disabled: true,
  checked: true,
};

export const UnCheckedLabelRight = LabelTemplate.bind({});
UnCheckedLabelRight.args = {};

export const CheckedLabelRight = LabelTemplate.bind({});
CheckedLabelRight.args = {
  checked: true,
};

export const DisabledUnCheckedLabelRight = LabelTemplate.bind({});
DisabledUnCheckedLabelRight.args = {
  disabled: true,
};

export const DisabledCheckedLabelRight = LabelTemplate.bind({});
DisabledCheckedLabelRight.args = {
  label: 'Switch Label',
  disabled: true,
  checked: true,
};

export const UnCheckedLabelLeft = LabelTemplate.bind({});
UnCheckedLabelLeft.args = {
  labelPosition: 'left',
};

export const CheckedLabelLeft = LabelTemplate.bind({});
CheckedLabelLeft.args = {
  checked: true,
  labelPosition: 'left',
};

export const DisabledUnCheckedLabelLeft = LabelTemplate.bind({});
DisabledUnCheckedLabelLeft.args = {
  disabled: true,
  labelPosition: 'left',
};

export const DisabledCheckedLabelLeft = LabelTemplate.bind({});
DisabledCheckedLabelLeft.args = {
  disabled: true,
  checked: true,
  labelPosition: 'left',
};
