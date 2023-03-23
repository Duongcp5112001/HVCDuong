import PulldownMenu from '../components/PulldownMenu/PulldownMenu.vue';
import Button from '../components/Button/Button.vue';

export default {
  title: 'Components/PulldownMenu',
  component: PulldownMenu,
  argTypes: {},
};

const Template = (args) => ({
  components: { PulldownMenu, Button },
  setup() {
    const options = [
      {
        label: 'GO',
        value: 'go',
      },
      {
        label: 'Python',
        value: 'py',
      },
      {
        label: 'Rust',
        value: 'rs',
      },
      {
        label: 'Javascript',
        value: 'js',
      },
      {
        label: 'C++',
        value: 'cpp',
      },
      {
        label: 'Swift',
        value: 'swift',
      },
    ];

    const onSelectOption = (option) => {
      console.log(option, 'was clicked');
    };

    return { args, options, onSelectOption };
  },
  template: `
    <PulldownMenu
    v-bind="args"
    :menu-list-options="options"
    @select-option="onSelectOption">
      <Button
        color="neutral"
        width="172px"
        size="large"
        icon="expand_more"
        icon-position="right"
        joint-end="right">
        Click me
      </Button>
    </PulldownMenu>
   `,
});

export const Example = Template.bind({});
Example.args = {};
