import Balloon from '../components/Balloon/Balloon.vue';

export default {
  title: 'Components/Balloon',
  component: Balloon,
  argTypes: {
    direction: {
      type: 'string',
      description: 'ツールチップの表示方向',
      options: ['top', 'bottom'],
      control: { type: 'select' },
    },
  },
};

const Template = (args) => ({
  components: { Balloon },
  setup() {
    return { args };
  },
  template: `
  <div :style="{ width: '400px', height:'200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}">
    <Balloon v-bind="args">
      Hover me
      <template #balloonContent>
        <span>Balloon text, Balloon text, Balloon text,</span>
        <span>Balloon text, Balloon text, Balloon text,</span>
        <span>Balloon text, Balloon text, Balloon text,</span>
        <span>Balloon text, Balloon text, Balloon text,</span>
        <span>Balloon text, Balloon text, Balloon text </span>
      </template>
    </Balloon>
  </div>
  `,
});

export const Bottom = Template.bind({});
Bottom.args = {
  direction: 'bottom',
};

export const Top = Template.bind({});
Top.args = {
  direction: 'top',
};
