import Heading from '../components/Heading/Heading.vue';

export default {
  title: 'Components/Heading',
  component: Heading,
  argTypes: {
    icon: {
      type: 'string',
    },
    tag: {
      type: 'string',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
    level: {
      type: 'number',
      options: [1, 2],
      control: { type: 'select ' },
    },
  },
};

const Template = (args) => ({
  components: { Heading },
  setup() {
    return { args };
  },
  template: '<div><Heading v-bind="args">heading</Heading></div>',
});

export const Normal = Template.bind({});
Normal.args = {
  tag: 'h1',
  level: '1',
};
