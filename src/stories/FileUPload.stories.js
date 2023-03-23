import FileUpload from '../components/FileUpload/FileUpload.vue';
import Button from '../components/Button/Button.vue';

export default {
  title: 'Components/FileUpload',
  component: FileUpload,
  argTypes: {
    fileData: {
      type: [],
      description: 'アップロードするファイルデータ',
    },
    fileName: {
      type: 'string',
      description: 'アップロードするファイル',
    },
    type: {
      type: 'csv',
      description: 'アップロードするファイル形式',
    },
    fileSize: {
      type: 'number',
      description: 'アップロードする最大ファイルサイズ',
    },
  },
};

const Template = (args) => ({
  components: { FileUpload, Button },
  setup() {
    return { args };
  },
  template:
    '<FileUpload v-bind="args"><Button icon="attachment" type="outlined" size="medium" width="126px">ファイル選択</Button></FileUpload>',
});

export const CsvFile = Template.bind({});
CsvFile.args = {
  fileData: [],
  fileName: '',
  type: 'csv',
};
