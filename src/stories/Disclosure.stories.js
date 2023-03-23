import Disclosure from '../components/Disclosure/Disclosure.vue';
import Button from '../components/Button/Button.vue';

export default {
  title: 'Components/Disclosure',
  component: Disclosure,
  argTypes: {
    opened: {
      type: 'boolean',
      description: 'デフォルトで開いているかどうか',
    },
    color: {
      type: 'string',
      description: '色',
      options: ['dark', 'light'],
      control: { type: 'select' },
    },
  },
};

const Template = (args) => ({
  components: { Disclosure, Button },
  setup() {
    return { args };
  },
  template: `
    <Disclosure v-bind="args">
      <template #title>Disclosure Title <Button>Click</Button></template>
      Disclosure Content
    </Disclosure>`,
});

export const Dark = Template.bind({});
Dark.args = {
  opened: false,
  color: 'dark',
};

export const Light = Template.bind({});
Light.args = {
  opened: false,
  color: 'light',
};
