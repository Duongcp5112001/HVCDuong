import CustomIcon from '../components/CustomIcon/CustomIcon.vue';

export default {
  title: 'Components/CustomIcon',
  component: CustomIcon,
  argTypes: {
    icon: {
      type: 'string',
      description: 'アイコン名',
    },
    color: {
      type: 'string',
      description: 'アイコンカラー',
    },
  },
};

const Template = (args) => ({
  components: { CustomIcon },
  setup() {
    return { args };
  },
  template: `
  <div :style="{ display: 'flex', gap: '4px' }">
    <CustomIcon v-bind="args" icon="ticket_not_available"/>
    <CustomIcon v-bind="args" icon="tickets"/>
    <CustomIcon v-bind="args" icon="ticket_in"/>
    <CustomIcon v-bind="args" icon="ticket_out"/>
  </div>`,
});

export const CustomIconSample = Template.bind({});

CustomIconSample.args = {
  color: '#757575',
  size: 32,
};
