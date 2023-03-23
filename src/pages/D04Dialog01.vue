<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" size="large" @close-dialog="onCloseDialog">
    <template #header>
      <Text size="xl" bold> カレンダーデータ取込 </Text>
    </template>
    <template #table>
      <Table class="util-mt-16" :hover-effect="false">
        <template #head>
          <TableRow id="row-1">
            <TableColumn id="col-1" min-width="167px">施設</TableColumn>
            <TableColumn id="col-2" min-width="80px">年度</TableColumn>
            <TableColumn id="col-3" min-width="167px"> カテゴリー </TableColumn>
            <TableColumn id="col-4" min-width="167px"> ステータス </TableColumn>
            <TableColumn id="col-5" width="190px"> ファイル </TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow id="row-2">
            <TableCell>裏磐梯グランデコ</TableCell>
            <TableCell>2023年</TableCell>
            <TableCell>基礎カレンダー</TableCell>
            <TableCell>未設定</TableCell>
            <TableCell text-align="center">
              <FileUpload
                :file-name="fileName"
                :file-data="fileData"
                @upload="handleUploadFile($event)"
              >
                <Button
                  icon="attachment"
                  type="outlined"
                  size="medium"
                  width="126px"
                >
                  ファイル選択
                </Button>
              </FileUpload>
            </TableCell>
          </TableRow>
        </template>
      </Table>
    </template>

    <template #footer>
      <Button size="large" width="160px" @click="onClickUpdateButton">
        取り込み
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Button from '../components/Button/Button.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import FileUpload from '../components/FileUpload/FileUpload.vue';

type uploadFileType = [string[], string, string];

const open = ref(true);
const fileData = ref<string[]>();
const fileName = ref('');
const message = ref('');

const onCloseDialog = () => {
  open.value = false;
};

const onClickUpdateButton = () => {
  console.log('onClickUpdateButton');
};

const handleUploadFile = (data: uploadFileType) => {
  fileData.value = data[0];
  fileName.value = data[1];
  message.value = data[2];
  console.log(data);
};
</script>

<style scoped lang="scss"></style>
