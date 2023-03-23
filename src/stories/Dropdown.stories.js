import Dropdown from '../components/Dropdown/Dropdown.vue';
import DropdownItem from '../components/Dropdown/DropdownItem.vue';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  subcomponents: { DropdownItem },
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
  components: { Dropdown, DropdownItem },
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
        label: 'C++',
        value: 'cpp',
      },
      {
        label: 'Swift',
        value: 'swift',
      },
    ];
    return { args, options };
  },
  template: `
            <Dropdown v-bind="args" v-model:value="args.value">
              <DropdownItem v-for="(option,i) in options" :label="option.label" :value="option.value" :key="i">
              </DropdownItem>
            </Dropdown>`,
});

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Simple Dropdown',
  value: '',
};

export const Small = Template.bind({});
Small.args = {
  placeholder: 'Simple Dropdown',
  size: 'small',
  value: '',
};

export const NormalError = Template.bind({});
NormalError.args = {
  placeholder: 'Simple Dropdown',
  value: '',
  error: true,
};

export const SmallError = Template.bind({});
SmallError.args = {
  placeholder: 'Simple Dropdown',
  size: 'small',
  value: '',
  error: true,
};
