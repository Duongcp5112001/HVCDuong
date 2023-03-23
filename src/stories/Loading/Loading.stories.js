import Loading from '../../components/Loading/Loading.vue';

export default {
  title: 'Components/Loading/Loading',
  component: Loading,
  argTypes: {
    show: {
      type: 'boolean',
      description: 'スピナーの表示',
      control: { type: 'boolean' },
    },
  },
};

const Template = (args) => ({
  components: { Loading },
  setup() {
    return { args };
  },
  template: `<Loading v-bind="args">
  </Loading>`,
});

export const LoadingSample = Template.bind({});
LoadingSample.args = {
  show: true,
};
