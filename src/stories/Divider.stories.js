import Divider from '../components/Divider/Divider.vue';

export default {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    vertical: {
      type: 'boolean',
    },
    width: {
      type: 'string',
    },
    height: {
      type: 'string',
    },
    margin: {
      type: 'string',
    },
  },
};

const Template = (args) => ({
  components: { Divider },
  setup() {
    return { args };
  },
  template: '<div><Divider v-bind="args" /></div>',
});

export const Horizontal = Template.bind({});
Horizontal.args = {
  width: '666px',
  height: '2px',
};

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true,
  width: '2px',
  height: '666px',
};
