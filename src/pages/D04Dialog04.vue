<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" @close-dialog="onCloseDialog">
    <template #header>
      <Icon class="util-mr-24" icon="check" color="#236C2D" :size="40"></Icon>
      <Text color="success" size="xl" bold>
        カレンダーデータを取り込みました
      </Text>
    </template>
    <template #table>
      <Table class="util-mt-16" :hover-effect="false">
        <template #head>
          <TableRow id="row-1">
            <TableColumn id="col-1" width="160px">施設</TableColumn>
            <TableColumn id="col-2" min-width="80px">年度</TableColumn>
            <TableColumn id="col-3" min-width="153px"> カテゴリー </TableColumn>
            <TableColumn id="col-4" min-width="153px"> 取り込み日 </TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow id="row-2">
            <TableCell>裏磐梯グランデコ</TableCell>
            <TableCell>2023年</TableCell>
            <TableCell>基礎カレンダー</TableCell>
            <TableCell>2022/09/10</TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <Button
        size="large"
        color="neutral"
        type="outlined"
        width="160px"
        @click="onClickCloseButton"
      >
        閉じる
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Button from '../components/Button/Button.vue';
import Icon from '../components/Icon/Icon.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';

const open = ref(true);

const onCloseDialog = () => {
  open.value = false;
};

const onClickCloseButton = () => {
  open.value = false;
  console.log('onClickCloseButton');
};
</script>

<style scoped lang="scss"></style>
