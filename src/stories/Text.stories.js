import Text from '../components/Text/Text.vue';

export default {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    color: {
      type: 'string',
      description: 'テキストの色',
      options: [
        'main',
        'light',
        'placeholder',
        'white',
        'primary',
        'critical',
        'success',
        'warning',
        'disable',
      ],
      control: { type: 'select' },
    },
    size: {
      type: 'string',
      description: 'テキストのサイズ',
      options: [
        '5xl',
        '4xl',
        '3xl',
        '2xl',
        'xl',
        'large',
        'base',
        'small',
        'xs',
        '2xs',
      ],
      control: { type: 'select' },
    },
    bold: {
      description: 'テキストを太字にするか',
      type: 'boolean',
    },
    lineHeight: {
      description: 'テキストの高さ',
      type: 'string',
    },
    width: {
      description: 'テキストの横幅',
      type: 'string',
    },
  },
};

const Template = (args) => ({
  components: { Text },
  setup() {
    return { args };
  },
  template: '<Text v-bind="args">Text</Text>',
});

export const Base = Template.bind({});
Base.args = {};

export const Bold = Template.bind({});
Bold.args = {
  bold: true,
};

/** Sizes */
export const Size5xl = Template.bind({});
Size5xl.args = {
  size: '5xl',
};

export const Size4xl = Template.bind({});
Size4xl.args = {
  size: '4xl',
};

export const Size3xl = Template.bind({});
Size3xl.args = {
  size: '3xl',
};
export const Size2xl = Template.bind({});
Size2xl.args = {
  size: '2xl',
};
export const SizeXl = Template.bind({});
SizeXl.args = {
  size: 'xl',
};
export const SizeLarge = Template.bind({});
SizeLarge.args = {
  size: 'large',
};
export const SizeBase = Template.bind({});
SizeBase.args = {
  size: 'base',
};
export const SizeSmall = Template.bind({});
SizeSmall.args = {
  size: 'small',
};
export const SizeXs = Template.bind({});
SizeXs.args = {
  size: 'xs',
};
export const Size2xs = Template.bind({});
Size2xs.args = {
  size: '2xs',
};

/** Colors */
export const Main = Template.bind({});
Main.args = {
  color: 'main',
};

export const Light = Template.bind({});
Light.args = {
  color: 'light',
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  color: 'placeholder',
};
export const White = Template.bind({});
White.parameters = {
  backgrounds: { default: 'dark' },
};
White.args = {
  color: 'white',
};

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
};

export const Critical = Template.bind({});
Critical.args = {
  color: 'critical',
};

export const Success = Template.bind({});
Success.args = {
  color: 'success',
};

export const Warning = Template.bind({});
Warning.args = {
  color: 'warning',
};

export const Disable = Template.bind({});
Disable.args = {
  color: 'disable',
};
