import HeaderNotification from '../components/HeaderNotification/HeaderNotification.vue';

export default {
  title: 'Components/HeaderNotification',
  component: HeaderNotification,
  argTypes: {
    counter: {
      type: 'number',
      description: '通知の数',
    },
  },
};

const Template = (args) => ({
  components: { HeaderNotification },
  setup() {
    return { args };
  },
  template: '<HeaderNotification v-bind="args" />',
});

export const None = Template.bind({});
None.args = {};

export const Some = Template.bind({});
Some.args = {
  counter: 13,
};

export const Overflow = Template.bind({});
Overflow.args = {
  counter: 100,
};
