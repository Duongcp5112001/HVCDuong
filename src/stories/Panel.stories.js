import Panel from '../components/Panel/Panel.vue';

export default {
  title: 'Components/Panel',
  component: Panel,
  argTypes: {
    color: {
      type: 'string',
      description: 'パネルの色',
      options: ['light', 'dark'],
      control: { type: 'select' },
    },
    borderRadius: {
      type: 'string',
      description: 'パネルの角丸',
      options: ['default', 'small'],
      control: { type: 'select' },
    },
    width: {
      type: 'string',
      description: 'パネルの幅',
    },
    height: {
      type: 'string',
      description: 'パネルの高さ',
    },
    minWidth: {
      type: 'string',
      description: 'パネルの最小幅',
    },
    minHeight: {
      type: 'string',
      description: 'パネルの最小高さ',
    },
  },
};

const Template = (args) => ({
  components: { Panel },
  setup() {
    return { args };
  },
  template: `<Panel v-bind="args" width="250px">
  <div>Content</div>
  <div>Content</div>
  <div>Content</div>
  <div>Content</div>
  <div>Content</div>
  </Panel>`,
});

export const Light = Template.bind({});
Light.args = {
  color: 'light',
  borderRadius: 'default',
};

export const Dark = Template.bind({});
Dark.args = {
  color: 'dark',
  borderRadius: 'default',
};

export const SmallBorder = Template.bind({});
SmallBorder.args = {
  color: 'light',
  borderRadius: 'small',
};

export const NoShadow = Template.bind({});
NoShadow.args = {
  color: 'dark',
  borderRadius: 'small',
  shadow: false,
};
