import DatePicker from '../components/DatePicker/DatePicker.vue';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    size: {
      type: 'string',
      description: 'デートピッカーのサイズ',
      options: ['default', 'small'],
      control: { type: 'select' },
    },
    type: {
      type: 'string',
      description: 'デートピッカーのタイプ',
      options: ['single', 'range'],
      control: { type: 'select' },
    },
    status: {
      type: 'string',
      description: 'デートピッカーのステータス',
      options: ['default', 'error', 'success'],
      control: { type: 'select' },
    },
    date: {
      type: 'string',
      description: 'デートピッカーの日付',
    },
    dateRange: {
      type: 'Object',
      description: 'デートピッカーの日付範囲',
    },
    placeholder: {
      type: 'string',
      description: 'デートピッカーのプレースホルダー',
    },
    width: {
      type: 'string',
      description: 'デートピッカーの幅',
    },
    titleFormat: {
      type: 'string',
      description: 'デートピッカーのタイトルフォーマット',
    },
    inputFormat: {
      type: 'string',
      description: 'デートピッカーの入力フォーマット',
    },
    error: {
      type: 'boolean',
      description: 'エラー',
    },
  },
};

const Template = (args) => ({
  components: { DatePicker },
  setup() {
    return { args };
  },
  template: '<DatePicker v-bind="args"/>',
});

export const DatePickerSample = Template.bind({});

DatePickerSample.args = {};

export const DatePickerError = Template.bind({});

DatePickerError.args = {
  error: true,
};
