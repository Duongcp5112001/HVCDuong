import Tooltip from '../components/Tooltip/Tooltip.vue';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    direction: {
      type: 'string',
      description: 'ツールチップの表示方向',
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
    },
    hasPointer: {
      type: 'boolean',
      description: 'ツールチップのポインターを表示するかどうか',
    },
  },
};

const Template = (args) => ({
  components: { Tooltip },
  setup() {
    return { args };
  },
  template: `
  <div :style="{ width: '400px', height:'200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}">
    <Tooltip v-bind="args">
      Hover me
      <template #toolTipContent>
        <span>Tooltip text, Tooltip text, Tooltip text,</span>
        <span>Tooltip text, Tooltip text, Tooltip text,</span>
        <span>Tooltip text, Tooltip text, Tooltip text,</span>
        <span>Tooltip text, Tooltip text, Tooltip text,</span>
        <span>Tooltip text, Tooltip text, Tooltip text </span>
      </template>
    </Tooltip>
  </div>
  `,
});

export const Bottom = Template.bind({});
Bottom.args = {
  direction: 'bottom',
};

export const Left = Template.bind({});
Left.args = {
  direction: 'left',
};

export const Top = Template.bind({});
Top.args = {
  direction: 'top',
};

export const Right = Template.bind({});
Right.args = {
  direction: 'right',
};

export const NoPointer = Template.bind({});
NoPointer.args = {
  direction: 'bottom',
  hasPointer: false,
};
