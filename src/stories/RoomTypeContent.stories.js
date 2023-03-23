import RoomTypeContent from '../components/RoomTypeContent/RoomTypeContent.vue';

export default {
  title: 'Components/RoomTypeContent',
  component: RoomTypeContent,
  argTypes: {
    color: {
      type:
        'slot01' |
        'slot02' |
        'slot03' |
        'slot04' |
        'slot05' |
        'slot06' |
        'slot07' |
        'slot08' |
        'slot09' |
        'slot10',
      description: 'ルームタイプ',
    },
  },
};

const Template = (args) => ({
  components: { RoomTypeContent },
  setup() {
    return { args };
  },
  template: '<RoomTypeContent v-bind="args">content</RoomTypeContent>',
});

export const Slot01 = Template.bind({});
Slot01.args = {
  color: 'slot01',
};

export const Slot02 = Template.bind({});
Slot02.args = {
  color: 'slot02',
};

export const Slot03 = Template.bind({});
Slot03.args = {
  color: 'slot03',
};

export const Slot04 = Template.bind({});
Slot04.args = {
  color: 'slot04',
};

export const Slot05 = Template.bind({});
Slot05.args = {
  color: 'slot05',
};

export const Slot06 = Template.bind({});
Slot06.args = {
  color: 'slot06',
};

export const Slot07 = Template.bind({});
Slot07.args = {
  color: 'slot07',
};

export const Slot08 = Template.bind({});
Slot08.args = {
  color: 'slot08',
};

export const Slot09 = Template.bind({});
Slot09.args = {
  color: 'slot09',
};

export const Slot10 = Template.bind({});
Slot10.args = {
  color: 'slot10',
};
