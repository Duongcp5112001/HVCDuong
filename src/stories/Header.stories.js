import Header from '../components/Header/Header.vue';

export default {
  title: 'Components/Header',
  component: Header,
};

const Template = (args) => ({
  components: { Header },
  setup() {
    return { args };
  },
  template:
    '<Header v-bind="args"><template #leftControl>Left Control</template>Content<template #rightControl>Right Control</template></Header>',
});

const TemplateNoLeftControl = (args) => ({
  components: { Header },
  setup() {
    return { args };
  },
  template:
    '<Header v-bind="args">Content<template #rightControl>Right Control</template></Header>',
});

const TemplateNoRightControl = (args) => ({
  components: { Header },
  setup() {
    return { args };
  },
  template:
    '<Header v-bind="args"><template #leftControl>Left Control</template>Content</Header>',
});

export const Basic = Template.bind({});
Basic.args = {};

export const NoLeftControl = TemplateNoLeftControl.bind({});
NoLeftControl.args = {};

export const NoRightControl = TemplateNoRightControl.bind({});
NoRightControl.args = {};
