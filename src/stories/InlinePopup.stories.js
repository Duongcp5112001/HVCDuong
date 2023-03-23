import { ref } from 'vue';
import InlinePopup from '../components/InlinePopup/InlinePopup.vue';
import Button from '../components/Button/Button.vue';

export default {
  title: 'Components/InlinePopup',
  component: InlinePopup,
  argTypes: {
    position: {
      type: 'string',
      description: 'ポップアップの上下位置',
      options: ['top', 'bottom'],
      control: { type: 'select' },
    },
    align: {
      type: 'string',
      description: 'ポップアップの左右位置',
      options: ['left', 'right'],
      control: { type: 'select' },
    },
  },
};

const Template = (args) => ({
  components: { InlinePopup, Button },
  setup() {
    const isPopupOpen = ref(false);
    const popupPos = ref({ x: 100, y: 10 });

    const openPopup = (event) => {
      console.log('THE EVENT', event);
      isPopupOpen.value = !isPopupOpen.value;
    };
    return { args, openPopup, isPopupOpen, popupPos };
  },
  template: `<div :style="{ width: '400px', height:'200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}">
    <InlinePopup v-bind="args">
    InlinePopup Content
    <template #popupContent>
    </template>
    </InlinePopup>
  </div>
  `,
});

export const InlinePopupBottom = Template.bind({});

InlinePopupBottom.args = {
  direction: 'bottom',
};

export const InlinePopupTop = Template.bind({});

InlinePopupTop.args = {
  direction: 'top',
};
