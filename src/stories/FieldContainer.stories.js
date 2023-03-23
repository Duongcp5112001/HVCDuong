import FieldContainer from "../components/FieldContainer/FieldContainer.vue";
import TextField from "../components/TextField/TextField.vue";

export default {
  title: "Components/FieldContainer",
  component: FieldContainer,
  argTypes: {},
};

const Template = (args) => ({
  components: { FieldContainer, TextField },
  setup() {
    return { args };
  },
  template:
    '<FieldContainer v-bind="args"><TextField placeholder="Text Input"/></FieldContainer>',
});

export const Default = Template.bind({});
Default.args = {
  label: "会員番号",
};

export const Required = Template.bind({});
Required.args = {
  label: "会員番号",
  required: true,
};

export const FixedWidth = Template.bind({});
FixedWidth.args = {
  label: "会員番号",
  width: "250px",
};

export const NoLabel = Template.bind({});
NoLabel.args = {};
