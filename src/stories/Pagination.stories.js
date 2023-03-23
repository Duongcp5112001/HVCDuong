import { ref } from 'vue';
import Pagination from '../components/Pagination/Pagination.vue';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    total: {
      type: 'number',
    },
    itemsPerPage: {
      type: 'number',
    },
    currentPage: {
      type: 'number',
    },
    showPagesInfo: {
      type: 'boolean',
    },
  },
};

const Template = (args) => ({
  components: { Pagination },
  setup() {
    const currentPage = ref(1);

    const onChange = (page) => {
      currentPage.value = page;
    };
    return { args, currentPage, onChange };
  },
  template:
    '<Pagination v-bind="args" :current-page="currentPage" @change="onChange"/>',
});

export const Simple = Template.bind({});
Simple.args = {
  total: 600,
  itemsPerPage: 20,
};

export const WithInfo = Template.bind({});
WithInfo.args = {
  total: 600,
  itemsPerPage: 20,
};
