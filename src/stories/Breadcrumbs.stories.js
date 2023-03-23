import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs.vue';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
};

const Template = (args) => ({
  components: { Breadcrumbs },
  setup() {
    return { args };
  },
  template: '<div><Breadcrumbs v-bind="args" /></div>',
});

export const Normal = Template.bind({});
Normal.args = {
  crumbs: [
    {
      id: 'bc-01',
      label: 'HOME',
      href: '#',
    },
    {
      id: 'bc-02',
      label: 'Page',
      href: '#',
    },
    {
      id: 'bc-03',
      label: 'Page',
      href: '#',
    },
    {
      id: 'bc-04',
      label: 'Page',
      href: '#',
    },
  ],
};
