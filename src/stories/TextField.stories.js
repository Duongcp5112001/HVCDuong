import { ref } from 'vue';
import TextField from '../components/TextField/TextField.vue';

export default {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    iconPosition: {
      type: 'string',
    },
    size: {
      type: 'string',
      description: 'インプットのサイズ',
      options: ['normal', 'large'],
      control: { type: 'select' },
    },
  },
};

const Template = (args) => ({
  components: { TextField },
  setup() {
    const inputValue = ref();

    return { args, inputValue };
  },
  template:
    '<TextField v-bind="args" v-model="inputValue" @input="if ($event !== undefined) inputValue = $event;" />',
});

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Normal TextField',
  size: 'normal',
};

export const Large = Template.bind({});
Large.args = {
  placeholder: 'Normal TextField',
  size: 'large',
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Normal TextField',
  disabled: true,
};

export const Success = Template.bind({});
Success.args = {
  placeholder: 'Success TextField',
  inputStatus: 'success',
};

export const Error = Template.bind({});
Error.args = {
  placeholder: 'Error TextField',
  inputStatus: 'error',
};

export const Readonly = Template.bind({});
Readonly.args = {
  placeholder: 'Error TextField',
  readonly: true,
};

export const IconTextField = Template.bind({});
IconTextField.args = {
  placeholder: 'Error TextField',
  icon: 'search',
};

export const NumberNormal = Template.bind({});
NumberNormal.args = {
  placeholder: '0',
  inputType: 'number',
  width: '80px',
};

export const NumberLarge = Template.bind({});
NumberLarge.args = {
  placeholder: '0',
  inputType: 'number',
  size: 'large',
  width: '80px',
};

export const NumberSuccess = Template.bind({});
NumberSuccess.args = {
  placeholder: '0',
  inputType: 'number',
  inputStatus: 'success',
  width: '80px',
};

export const NumberError = Template.bind({});
NumberError.args = {
  placeholder: '0',
  inputType: 'number',
  inputStatus: 'error',
  width: '80px',
};

export const NumberReadonly = Template.bind({});
NumberReadonly.args = {
  placeholder: '0',
  inputType: 'number',
  readonly: true,
  width: '80px',
};

export const NumberDisabled = Template.bind({});
NumberDisabled.args = {
  placeholder: '0',
  inputType: 'number',
  disabled: true,
  width: '80px',
};

export const Multiline = Template.bind({});
Multiline.args = {
  placeholder: 'Multiline TextArea',
  multiLine: true,
};
