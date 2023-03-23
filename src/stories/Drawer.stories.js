import Drawer from '../components/Drawer/Drawer.vue';
import DrawerItem from '../components/Drawer/DrawerItem.vue';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    isDefaultOpen: 'boolean',
    description: 'デフォルトのオープン状態',
  },
};

const Template = (args) => ({
  components: { Drawer, DrawerItem },
  setup() {
    const clickItem = (id) => {
      console.log('clickedItem', id);
    };
    return { args, clickItem };
  },
  template: `<div style="height:100vh;">
    <Drawer v-bind="args" selectedId="item-4" @clickItem="clickItem">
      <template #body>
        <DrawerItem id="item-1" isSubtitle>カテゴリー 1</DrawerItem>
        <DrawerItem id="item-2" icon="call">ラベル 1</DrawerItem>
        <DrawerItem id="item-3" icon="list">ラベル 2</DrawerItem>
        <DrawerItem id="item-4" icon="list">ラベル 3</DrawerItem>
        <DrawerItem id="item-5" isSubtitle>カテゴリー 2</DrawerItem>
        <DrawerItem id="item-6" icon="people">ラベル 4</DrawerItem>
        <DrawerItem id="item-7" icon="tune">ラベル 5</DrawerItem>
      </template>
      <template #footer>
        <DrawerItem id="item-8" icon="tune">ボトムラベル 1</DrawerItem>
        <DrawerItem id="item-9" icon="tune">ボトムラベル 2</DrawerItem>
      </template>
    </Drawer>
  </div>`,
});

export const DrawerSample = Template.bind({});

DrawerSample.args = {
  isDefaultOpen: true,
};
