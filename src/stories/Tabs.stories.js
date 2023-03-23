import Tabs from '../components/Tabs/Tabs.vue';
import Tab from '../components/Tabs/Tab.vue';
import TabPanels from '../components/Tabs/TabPanels.vue';
import TabPanel from '../components/Tabs/TabPanel.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: { Tab, TabPanels, TabPanel },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Tabs, Tab, TabPanels, TabPanel },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<tabs v-bind="args">
              <tab>A</tab>
              <tab>B</tab>
              <tab>C</tab>
            </tabs>
            <tab-panels v-bind="args">
              <tab-panel>Content A</tab-panel>
              <tab-panel>Content B</tab-panel>
              <tab-panel>Content C</tab-panel>
            </tab-panels>`,
});

export const Normal = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Normal.args = {
  selectedIndex: 1,
};
