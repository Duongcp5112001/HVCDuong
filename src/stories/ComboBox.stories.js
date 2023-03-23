import ComboBox from '../components/ComboBox/ComboBox.vue';
import ComboBoxItem from '../components/ComboBox/ComboBoxItem.vue';

export default {
  title: 'Components/ComboBox',
  component: ComboBox,
  subcomponents: { ComboBoxItem },
  argTypes: {
    width: {
      type: 'string',
    },
    size: {
      type: 'string',
      description: 'サイズ',
      options: ['default', 'small'],
      control: { type: 'select' },
    },
    disabled: {
      type: 'boolean',
      description: '無効化',
    },
    status: {
      type: 'string',
      description: 'ステータス',
      options: ['default', 'error', 'success'],
      control: { type: 'select' },
    },
    error: {
      type: 'boolean',
      description: 'エラー',
    },
  },
};

const Template = (args) => ({
  components: { ComboBox, ComboBoxItem },
  setup() {
    const options = [
      {
        label: 'GO',
        value: 'go',
      },
      {
        label: 'Python',
        value: 'py',
      },
      {
        label: 'Rust',
        value: 'rs',
      },
      {
        label: 'Javascript',
        value: 'js',
      },
      {
        label: 'Typescript',
        value: 'ts',
      },
      {
        label: 'Java',
        value: 'java',
      },
      {
        label: 'C++',
        value: 'cpp',
      },
      {
        label: 'C#',
        value: 'csharp',
      },
      {
        label: 'Swift',
        value: 'swift',
      },
      {
        label: 'PHP',
        value: 'php',
      },
      {
        label: 'Ruby',
        value: 'ruby',
      },
    ];
    const japaneseOptions = [
      {
        label: 'GD 裏磐梯グランデコ',
        value: 'option-1',
      },
      {
        label: 'NU 那須',
        value: 'option-2',
      },
      {
        label: 'NG 那須リトリート',
        value: 'option-3',
      },
      {
        label: 'KN 鬼怒川',
        value: 'option-4',
      },
      {
        label: 'KA 勝浦',
        value: 'option-5',
      },
    ];
    return { args, options, japaneseOptions };
  },
  template: `
  <div :style="{display: 'flex', flexDirection:'column' , gap:'16px'}">
    <ComboBox v-bind="args" v-model:value="args.value">
      <ComboBoxItem v-for="(option,i) in options" :label="option.label" :value="option.value" :key="i">
      </ComboBoxItem>
    </ComboBox>
    <ComboBox v-bind="args" v-model:value="args.value">
      <ComboBoxItem v-for="(option,i) in japaneseOptions" :label="option.label" :value="option.value" :key="i">
      </ComboBoxItem>
    </ComboBox>
  </div>
    `,
});

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Placeholder',
  value: '',
};

export const Small = Template.bind({});
Small.args = {
  placeholder: 'Placeholder',
  size: 'small',
  value: '',
};

export const NormalError = Template.bind({});
NormalError.args = {
  placeholder: 'Placeholder',
  error: true,
  value: '',
};

export const SmallError = Template.bind({});
SmallError.args = {
  placeholder: 'Placeholder',
  error: true,
  size: 'small',
  value: '',
};

export const NormalDisabled = Template.bind({});
NormalDisabled.args = {
  placeholder: 'Placeholder',
  disabled: true,
  value: '',
};

export const SmallDisabled = Template.bind({});
SmallDisabled.args = {
  placeholder: 'Placeholder',
  disabled: true,
  size: 'small',
  value: '',
};
