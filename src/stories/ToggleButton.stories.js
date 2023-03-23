import ToggleButton from '../components/ToggleButton/ToggleButton.vue';
import ToggleButtonSet from '../components/ToggleButton/ToggleButtonSet.vue';

export default {
  title: 'Components/ToggleButton',
  component: ToggleButtonSet,
  argTypes: {
    type: {
      type: 'string',
      description: 'ボタンセットの種類',
      options: ['contained', 'outlined'],
      control: { type: 'select' },
    },
    size: {
      type: 'string',
      description: 'ボタンセットのサイズ',
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    selectedId: {
      type: 'string',
      description: '選択中ID',
    },
    width: {
      type: 'string',
      description: 'ボタンセットの横幅',
    },
  },
};

const Template = (args) => ({
  components: { ToggleButtonSet, ToggleButton },
  setup() {
    const clickItem = (id) => {
      console.log('clickedItem', id);
    };
    return { args, clickItem };
  },
  template: `
  <ToggleButtonSet v-bind="args" @clickItem="clickItem" selectedId="content-2">
    <ToggleButton id="content-1">
      Button 1
    </ToggleButton>
    <ToggleButton id="content-2">
      Button Second
    </ToggleButton>
    <ToggleButton id="content-3">
      Button 3
    </ToggleButton>
    <ToggleButton id="content-4">
      Button Fourth
    </ToggleButton>
  </ToggleButtonSet>`,
});

const TemplateIcon = (args) => ({
  components: { ToggleButtonSet, ToggleButton },
  setup() {
    const clickItem = (id) => {
      console.log('clickedItem', id);
    };
    return { args, clickItem };
  },
  template: `
  <ToggleButtonSet v-bind="args" @clickItem="clickItem" selectedId="content-2">
    <ToggleButton id="content-1" icon="directions_car"/>
    <ToggleButton id="content-2" icon="directions_bike"/>
    <ToggleButton id="content-3" icon="train"/>
    <ToggleButton id="content-4" icon="directions_boat"/>
  </ToggleButtonSet>`,
});

const TemplateTextIcon = (args) => ({
  components: { ToggleButtonSet, ToggleButton },
  setup() {
    const clickItem = (id) => {
      console.log('clickedItem', id);
    };
    return { args, clickItem };
  },
  template: `
  <ToggleButtonSet v-bind="args" @clickItem="clickItem" selectedId="content-2">
    <ToggleButton id="content-1" icon="directions_car">
      Button 1
    </ToggleButton>
    <ToggleButton id="content-2" icon="directions_bike">
      Button 2
    </ToggleButton>
    <ToggleButton id="content-3" icon="train">
      Button 3
    </ToggleButton>
    <ToggleButton id="content-4" icon="directions_boat">
      Button 4
    </ToggleButton>
  </ToggleButtonSet>`,
});

/** Text */
export const TextContainedLarge = Template.bind({});
TextContainedLarge.args = {
  type: 'contained',
  size: 'large',
};

export const TextContainedMedium = Template.bind({});
TextContainedMedium.args = {
  type: 'contained',
  size: 'medium',
};

export const TextContainedSmall = Template.bind({});
TextContainedSmall.args = {
  type: 'contained',
  size: 'small',
};

export const TextOutlinedLarge = Template.bind({});
TextOutlinedLarge.args = {
  type: 'outlined',
  size: 'large',
};

export const TextOutlinedMedium = Template.bind({});
TextOutlinedMedium.args = {
  type: 'outlined',
  size: 'medium',
};

export const TextOutlinedSmall = Template.bind({});
TextOutlinedSmall.args = {
  type: 'outlined',
  size: 'small',
};

/** Icon */
export const IconContainedLarge = TemplateIcon.bind({});
IconContainedLarge.args = {
  type: 'contained',
  size: 'large',
  width: '164px',
};

export const IconContainedMedium = TemplateIcon.bind({});
IconContainedMedium.args = {
  type: 'contained',
  size: 'medium',
  width: '132px',
};

export const IconContainedSmall = TemplateIcon.bind({});
IconContainedSmall.args = {
  type: 'contained',
  size: 'small',
  width: '100px',
};

export const IconOutlinedLarge = TemplateIcon.bind({});
IconOutlinedLarge.args = {
  type: 'outlined',
  size: 'large',
  width: '164px',
};

export const IconOutlinedMedium = TemplateIcon.bind({});
IconOutlinedMedium.args = {
  type: 'outlined',
  size: 'medium',
  width: '132px',
};

export const IconOutlinedSmall = TemplateIcon.bind({});
IconOutlinedSmall.args = {
  type: 'outlined',
  size: 'small',
  width: '100px',
};

/** Icon */
export const TextIconContainedLarge = TemplateTextIcon.bind({});
TextIconContainedLarge.args = {
  type: 'contained',
  size: 'large',
};

export const TextIconContainedMedium = TemplateTextIcon.bind({});
TextIconContainedMedium.args = {
  type: 'contained',
  size: 'medium',
};

export const TextIconContainedSmall = TemplateTextIcon.bind({});
TextIconContainedSmall.args = {
  type: 'contained',
  size: 'small',
};

export const TextIconOutlinedLarge = TemplateTextIcon.bind({});
TextIconOutlinedLarge.args = {
  type: 'outlined',
  size: 'large',
};

export const TextIconOutlinedMedium = TemplateTextIcon.bind({});
TextIconOutlinedMedium.args = {
  type: 'outlined',
  size: 'medium',
};

export const TextIconOutlinedSmall = TemplateTextIcon.bind({});
TextIconOutlinedSmall.args = {
  type: 'outlined',
  size: 'small',
};

const TemplateCustomIconIconBadges = (args) => ({
  components: { ToggleButtonSet, ToggleButton },
  setup() {
    const clickItem = (id) => {
      console.log('clickedItem', id);
    };
    return { args, clickItem };
  },
  template: `
  <ToggleButtonSet v-bind="args" @clickItem="clickItem" selectedId="content-2">
    <ToggleButton id="content-1" custom-icon="ticket_not_available" :counter="2">
      Button 1
    </ToggleButton>
    <ToggleButton id="content-2" custom-icon="tickets" :counter="2">
      Button 2
    </ToggleButton>
    <ToggleButton id="content-3" custom-icon="ticket_in" :counter="2">
      Button 3
    </ToggleButton>
    <ToggleButton id="content-4" custom-icon="ticket_out" :counter="2">
      Button 4
    </ToggleButton>
  </ToggleButtonSet>`,
});

export const TextIconOutlinedSmallBadges = TemplateCustomIconIconBadges.bind(
  {}
);
TextIconOutlinedSmallBadges.args = {
  type: 'outlined',
  size: 'small',
};
