<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" custom-height="338px" @close-dialog="onCloseDialog">
    <template #header>
      <Icon
        class="util-mr-24"
        icon="warning_amber"
        color="#BA1A1A"
        :size="40"
      ></Icon>
      <Text color="critical" size="xl" bold>部屋の確保ができませんでした </Text>
    </template>
    <Text bold size="large" line-height="170%">裏磐梯グランデコ</Text>
    <Text class="util-mb-8" size="large" line-height="170%">
      2022年10月2日(月) 〜 2022年10月3日(火)1泊
    </Text>
    <Table width="100%">
      <template #head>
        <TableRow id="row-1">
          <TableColumn id="col-1" width="144px">宿泊日</TableColumn>
          <TableColumn id="col-2" min-width="173px">部屋タイプ</TableColumn>
          <TableColumn id="col-4" min-width="43px" text-align="center">
            大人
          </TableColumn>
          <TableColumn id="col-5" min-width="43px" text-align="center">
            中人
          </TableColumn>
          <TableColumn id="col-6" min-width="43px" text-align="center">
            小人
          </TableColumn>
          <TableColumn id="col-7" min-width="43px" text-align="center">
            幼児
          </TableColumn>
        </TableRow>
      </template>
      <template #body>
        <TableRow id="row-2">
          <TableCell>2022/10/02(月)</TableCell>
          <TableCell><Text color="critical"> 残室なし </Text></TableCell>
          <TableCell text-align="right">2</TableCell>
          <TableCell text-align="right">0</TableCell>
          <TableCell text-align="right">0</TableCell>
          <TableCell text-align="right">0</TableCell>
        </TableRow>
      </template>
    </Table>
    <template #footer>
      <Button size="large" width="160px" @click="onClickConfirmRooms">
        残室確認
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

const onClickConfirmRooms = () => {
  console.log('onClickConfirmRooms');
};
</script>

<style scoped lang="scss"></style>
