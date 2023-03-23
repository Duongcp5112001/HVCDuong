import Icon from '../components/Icon/Icon.vue';

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    icon: {
      type: 'string',
      description: 'アイコン名 (MaterialIcons名)',
    },
    type: {
      type: 'string',
      description: 'アイコンの種類',
      options: ['outlined', 'filled', 'round', 'sharp', 'two-tone'],
      control: { type: 'select' },
    },
    color: {
      type: 'string',
      description: 'アイコンカラー',
    },
  },
};

const Template = (args) => ({
  components: { Icon },
  setup() {
    return { args };
  },
  template: '<Icon v-bind="args"/>',
});

export const IconSample = Template.bind({});

IconSample.args = {
  icon: 'star',
  color: '#757575',
  size: 32,
};
