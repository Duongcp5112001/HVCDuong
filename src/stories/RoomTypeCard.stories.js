import RoomTypeCard from '../components/RoomTypeCard/RoomTypeCard.vue';
import Disclosure from '../components/Disclosure/Disclosure.vue';

export default {
  title: 'Components/RoomTypeCard',
  component: RoomTypeCard,
  argTypes: {
    color: {
      type: 'string',
      description: '部屋Cardの色',
      options: [
        'slot01',
        'slot02',
        'slot03',
        'slot04',
        'slot05',
        'slot06',
        'slot07',
        'slot08',
        'slot09',
        'slot10',
      ],
      control: { type: 'select' },
    },
  },
};

const Template = (args) => ({
  components: { RoomTypeCard, Disclosure },
  setup() {
    const badges = ['badge01', 'badge02', 'badge03'];
    return { args, badges };
  },
  template: `
  <div :style="{display: 'flex', flexDirection: 'column', gap: '16px'}">
  <RoomTypeCard v-bind="args" :room-labels="badges" color="slot01">
    <template #header>
    Header
    </template>
    <div>
      Simple Content
    </div>
    <Disclosure color="light" :shadow="false" fitted>
      <template #title>
        <Text bold>Disclosure Title</Text>
      </template>
      Disclosure Content
    </Disclosure>
    <Disclosure color="light" :shadow="false" fitted>
      <template #title>
        <Text bold>Disclosure Title</Text>
      </template>
      Disclosure Content
    </Disclosure>
    <div>
      Simple Content
    </div>
    <Disclosure color="light" :shadow="false" fitted>
      <template #title>
        <Text bold>Disclosure Title</Text>
      </template>
      Disclosure Content
    </Disclosure>
  </RoomTypeCard>
  <RoomTypeCard v-bind="args" :room-labels="badges" color="slot02">
  <template #header>
  Header
  </template>
    <div>
      Simple Content
    </div>
    <Disclosure color="light" :shadow="false" fitted>
      <template #title>
        <Text bold>Disclosure Title</Text>
      </template>
      Disclosure Content
    </Disclosure>
    <Disclosure color="light" :shadow="false" fitted>
      <template #title>
        <Text bold>Disclosure Title</Text>
      </template>
      Disclosure Content
    </Disclosure>
    <div>
      Simple Content
    </div>
    <Disclosure color="light" :shadow="false" fitted>
      <template #title>
        <Text bold>Disclosure Title</Text>
      </template>
      Disclosure Content
    </Disclosure>
  </RoomTypeCard>
  <RoomTypeCard v-bind="args" :room-labels="badges" color="slot03">
  <template #header>
  Header
  </template>
    <div>
      Simple Content
    </div>
    <Disclosure color="light" :shadow="false" fitted>
      <template #title>
        <Text bold>Disclosure Title</Text>
      </template>
      Disclosure Content
    </Disclosure>
    <Disclosure color="light" :shadow="false" fitted>
      <template #title>
        <Text bold>Disclosure Title</Text>
      </template>
      Disclosure Content
    </Disclosure>
    <div>
      Simple Content
    </div>
    <Disclosure color="light" :shadow="false" fitted>
      <template #title>
        <Text bold>Disclosure Title</Text>
      </template>
      Disclosure Content
    </Disclosure>
  </RoomTypeCard>
  </div>
  `,
});

export const Sample = Template.bind({});
Sample.args = {
  color: 'slot01',
};
