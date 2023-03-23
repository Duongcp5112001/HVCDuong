import Dialog from '../components/Dialog/Dialog.vue';
import Button from '../components/Button/Button.vue';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    size: {
      type: 'string',
      description: 'ダイアログのサイズ',
      options: ['medium', 'large', 'xlarge', 'fullscreen'],
      control: { type: 'select' },
    },
    customHeight: {
      type: 'string',
      description: 'ダイアログの高さ',
    },
    footerHeight: {
      type: 'string',
      description: 'フッターの高さ',
    },
  },
};

const Template = (args) => ({
  components: { Dialog, Button },
  setup() {
    return { args };
  },
  template: `
            <div v-bind="args">
              <Button @click="open=true">
                Open dialog
              </Button>
              <Dialog :open="open" :size="args.size" :customHeight="args.customHeight" @closeDialog="open=false">
                <template #header>
                  Dialog Header
                </template>
                Dialog Content
                <template #footer>
                  Dialog Footer
                </template>
              </Dialog>
            </div>`,
  data() {
    return {
      open: false,
    };
  },
});

const TemplateOverflow = (args) => ({
  components: { Dialog, Button },
  setup() {
    return { args };
  },
  template: `
            <div v-bind="args">
              <Button @click="open=true">
                Open dialog
              </Button>
              <Dialog :open="open" :size="args.size" :customHeight="args.customHeight" :footerHeight="args.footerHeight" @closeDialog="open=false">
                <template #header>
                  Dialog Header
                </template>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <div>Dialog Content</div>
                <template #footer>
                  Dialog Footer
                </template>
              </Dialog>
            </div>`,
  data() {
    return {
      open: false,
    };
  },
});

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

export const XLarge = Template.bind({});
XLarge.args = {
  size: 'xlarge',
};

export const FullScreen = Template.bind({});
FullScreen.args = {
  size: 'fullscreen',
};

export const MediumOverflow = TemplateOverflow.bind({});
MediumOverflow.args = {
  size: 'medium',
};

export const LargeOverflow = TemplateOverflow.bind({});
LargeOverflow.args = {
  size: 'large',
};

export const XLargeOverflow = TemplateOverflow.bind({});
XLargeOverflow.args = {
  size: 'xlarge',
};

export const FullscreenOverflow = TemplateOverflow.bind({});
FullscreenOverflow.args = {
  size: 'fullscreen',
};

export const MediumCustomHeightOverflow = TemplateOverflow.bind({});
MediumCustomHeightOverflow.args = {
  size: 'medium',
  customHeight: '400px',
};

export const MediumFooterHeightSmallOverflow = TemplateOverflow.bind({});
MediumFooterHeightSmallOverflow.args = {
  size: 'medium',
  footerHeight: 'small',
};

export const MediumCustomHeightFooterHeightSmallOverflow =
  TemplateOverflow.bind({});
MediumCustomHeightFooterHeightSmallOverflow.args = {
  size: 'medium',
  customHeight: '400px',
  footerHeight: 'small',
};
