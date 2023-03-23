import TimePicker from '../components/TimePicker/TimePicker.vue';

export default {
  title: 'Components/TimePicker',
  component: TimePicker,
  argTypes: {
    size: {
      type: 'string',
      description: 'デートピッカーのサイズ',
      options: ['default', 'small'],
      control: { type: 'select' },
    },
    status: {
      type: 'string',
      description: 'デートピッカーのステータス',
      options: ['default', 'error', 'success'],
      control: { type: 'select' },
    },
    width: {
      type: 'string',
    },
  },
};

const Template = (args) => ({
  components: { TimePicker },
  setup() {
    return { args };
  },
  template: '<TimePicker v-bind="args"/>',
});

export const TimePickerSample = Template.bind({});

TimePickerSample.args = {};
