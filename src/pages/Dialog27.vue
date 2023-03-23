<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" size="large" @close-dialog="onCloseDialog">
    <template #header>
      <Text size="xl" bold>予約更新履歴</Text>
    </template>
    <template #table>
      <Table class="util-mt-16 util-mb-8" :hover-effect="false">
        <template #head>
          <TableRow id="row-1">
            <TableColumn
              id="col-1"
              can-sort
              sorted-direction="desc"
              width="184px"
            >
              更新日時
            </TableColumn>
            <TableColumn id="col-2" width="192px">イベント</TableColumn>
            <TableColumn id="col-3" width="192px">項目</TableColumn>
            <TableColumn id="col-4" width="80px">経由</TableColumn>
            <TableColumn id="col-5" width="120px">更新者</TableColumn>
            <TableColumn id="col-6" width="72px">詳細</TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow id="row-2">
            <TableCell>2022/09/02 18:55</TableCell>
            <TableCell>予約変更</TableCell>
            <TableCell>プラン</TableCell>
            <TableCell>WEB</TableCell>
            <TableCell>-</TableCell>
            <TableCell>
              <Button color="neutral" type="outlined"> 詳細 </Button>
            </TableCell>
          </TableRow>
          <TableRow id="row-3">
            <TableCell>2022/08/30 14:29</TableCell>
            <TableCell>新規予約登録</TableCell>
            <TableCell></TableCell>
            <TableCell>TEL</TableCell>
            <TableCell>米田 寿子</TableCell>
            <TableCell>
              <Button color="neutral" type="outlined"> 詳細 </Button>
            </TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer> </template>
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

type Props = {
  isRoomType?: boolean;
};

withDefaults(defineProps<Props>(), {
  isRoomType: false,
});

const open = ref(true);

const onCloseDialog = () => {
  open.value = false;
};
</script>

<style scoped lang="scss"></style>
