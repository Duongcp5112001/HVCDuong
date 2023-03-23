<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" @close-dialog="onCloseDialog">
    <template #header>
      <Icon class="util-mr-24" icon="check" color="#236C2D" :size="40"></Icon>
      <Text color="success" size="xl" bold> 部屋を確保しました </Text>
    </template>
    <span class="util-flex util-flex--gap16 util-mb-8">
      <Text bold size="2xs" color="light">予約番号</Text>
      <Text class="util-mr-8" bold size="large">789300</Text>
      <Text bold size="2xs" color="light">利用施設</Text>
      <Text bold size="large">裏磐梯グランデコ</Text>
    </span>
    <Text class="util-mb-8" size="large" line-height="170%">
      2022年10月2日(月) 〜 2022年10月3日(火) 2泊
    </Text>
    <template #table>
      <Table :hover-effect="false">
        <template #head>
          <TableRow id="row-1">
            <TableColumn id="col-1" width="144px">宿泊日</TableColumn>
            <TableColumn id="col-2" min-width="99px">部屋タイプ</TableColumn>
            <TableColumn id="col-4" min-width="43px" text-align="center">
              部屋
            </TableColumn>
            <TableColumn id="col-4" min-width="43px" text-align="center">
              泊数
            </TableColumn>
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
            <TableCell>SDツイン</TableCell>
            <TableCell text-align="right">2</TableCell>
            <TableCell text-align="right">2</TableCell>
            <TableCell text-align="right">2</TableCell>
            <TableCell text-align="right">0</TableCell>
            <TableCell text-align="right">0</TableCell>
            <TableCell text-align="right">0</TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <Button
        class="util-mr-16"
        size="large"
        color="neutral"
        type="outlined"
        @click="onClickDeleteReservation"
      >
        別の予約を取る
      </Button>
      <Button size="large" width="160px" @click="onClickReservationDetails">
        予約詳細
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

const onClickDeleteReservation = () => {
  console.log('onClickDeleteReservation');
};

const onClickReservationDetails = () => {
  console.log('onClickReservationDetails');
};
</script>

<style scoped lang="scss"></style>
