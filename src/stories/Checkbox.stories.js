import Checkbox from '../components/Checkbox/Checkbox.vue';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    modelValue: {
      type: 'boolean',
    },
    label: {
      type: 'string',
    },
    disabled: {
      type: 'boolean',
    },
    background: {
      type: 'boolean',
    },
  },
};

const Template = (args) => ({
  components: { Checkbox },
  setup() {
    return { args };
  },
  template: '<div><Checkbox v-bind="args" /></div>',
});

export const On = Template.bind({});
On.args = {
  label: 'checkbox on',
  checked: true,
  disabled: false,
};

export const Off = Template.bind({});
Off.args = {
  label: 'checkbox off',
  checked: false,
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'checkbox on',
  checked: true,
  disabled: true,
};

export const DisabledOff = Template.bind({});
DisabledOff.args = {
  label: 'checkbox off',
  checked: false,
  disabled: true,
};

export const indeterminate = Template.bind({});
indeterminate.args = {
  label: 'checkbox',
  checked: true,
  disabled: false,
  indeterminate: true,
};

export const Background = Template.bind({});
Background.args = {
  label: 'Background',
  background: true,
};
