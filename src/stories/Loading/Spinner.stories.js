import Spinner from '../../components/Loading/Spinner.vue';

export default {
  title: 'Components/Loading/Spinner',
  component: Spinner,
  argTypes: {
    color: {
      type: 'string',
      description: 'スピナーの色',
      options: ['main', 'white', 'neutral', 'danger'],
      control: { type: 'select' },
    },
    size: {
      type: 'string',
      description: 'スピナーのサイズ',
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
  },
};

const Template = (args) => ({
  components: { Spinner },
  setup() {
    return { args };
  },
  template: `<Spinner v-bind="args">
  </Spinner>`,
});

export const Small = Template.bind({});
Small.args = {
  color: 'main',
  size: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  color: 'main',
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  color: 'main',
  size: 'large',
};

export const Main = Template.bind({});
Main.args = {
  color: 'main',
  size: 'medium',
};

export const White = Template.bind({});
White.parameters = {
  backgrounds: { default: 'dark' },
};
White.args = {
  color: 'white',
  size: 'medium',
};
