import RadioButton from '../components/RadioButton/RadioButton.vue';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
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
  components: { RadioButton },
  setup() {
    return { args };
  },
  template: '<div><RadioButton v-bind="args" /></div>',
});

export const On = Template.bind({});
On.args = {
  label: 'radio on',
  checked: true,
  disabled: false,
};

export const Off = Template.bind({});
Off.args = {
  label: 'radio off',
  checked: false,
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'radio on',
  checked: true,
  disabled: true,
};

export const DisabledOff = Template.bind({});
DisabledOff.args = {
  label: 'radio off',
  checked: false,
  disabled: true,
};

export const Background = Template.bind({});
Background.args = {
  label: 'Background',
  background: true,
};
