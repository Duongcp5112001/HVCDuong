import ContentFooter from '../components/ContentFooter/ContentFooter.vue';
import Button from '../components/Button/Button.vue';

export default {
  title: 'Components/ContentFooter',
  component: ContentFooter,
  argTypes: {},
};

const RightLeftTemplate = (args) => ({
  components: { ContentFooter, Button },
  setup() {
    return { args };
  },
  template: `
    <div class="util-overflow-y" style="height: 500px">
      <div style="height: 800px; background: #fff">
        <h2>Body</h2>
      </div>
      <ContentFooter v-bind="args">
        <template #footerLeft>
          <Button size="large" color="danger" type="secondary" icon='delete'>削除</Button>
        </template>
        <template #footerRight>
          <Button size="large" color="neutral" type="sub">キャンセル</Button>
          <Button size="large">保存</Button>
        </template>
      </ContentFooter>
    </div>
  `,
});

const CenterTemplate = (args) => ({
  components: { ContentFooter, Button },
  setup() {
    return { args };
  },
  template: `
    <div class="util-overflow-y" style="height: 500px">
      <div style="height: 800px; background: #fff">
          <h2>Body</h2>
      </div>
      <ContentFooter v-bind="args">
        <template #footerCenter>
        <Button size="large" color="neutral" type="sub" icon='arrow_back'>入力に戻る</Button>
        <Button size="large">確認</Button>
      </template>
      </ContentFooter>
    </div>
  `,
});

const RightTemplate = (args) => ({
  components: { ContentFooter, Button },
  setup() {
    return { args };
  },
  template: `
    <div class="util-overflow-y" style="height: 500px">
      <div style="height: 800px; background: #fff">
        <h2>Body</h2>
      </div>
      <ContentFooter v-bind="args">
        <template #footerRight>
          <Button size="large" color="main" type="secondary" icon="file_copy">複製</Button>
          <Button size="large" icon="edit">編集</Button>
        </template>
      </ContentFooter>
    </div>
  `,
});

export const LeftRight = RightLeftTemplate.bind({});
LeftRight.args = {};

export const Center = CenterTemplate.bind({});
Center.args = {};

export const Right = RightTemplate.bind({});
Right.args = {};
