<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" size="large" @close-dialog="onCloseDialog">
    <template #header>
      <Icon
        class="util-mr-16"
        icon="warning_amber"
        color="#BA1A1A"
        :size="40"
      ></Icon>
      <Text color="critical" size="xl" bold>以下の顧客ではありませんか？</Text>
    </template>
    <template #table>
      <Table class="util-mt-16" :hover-effect="false" :fixed-layout="true">
        <template #head>
          <TableRow id="row-1">
            <TableColumn id="col-1" width="73px">選択</TableColumn>
            <TableColumn id="col-2" width="126px">顧客番号</TableColumn>
            <TableColumn id="col-3" width="86px">会員番号</TableColumn>
            <TableColumn id="col-4" width="155px">顧客名(カナ)</TableColumn>
            <TableColumn id="col-5" width="127px">電話番号</TableColumn>
            <TableColumn id="col-6" width="156px" max-width="156px">
              住所
            </TableColumn>
            <TableColumn id="col-7" width="111px"> 生年月日 </TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow id="row-2">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>１２３４５６７８９０</TableCell>
            <TableCell>ＮＮ９９９９</TableCell>
            <TableCell>タナカタロウ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
            <TableCell>２０２２/１０/１８</TableCell>
          </TableRow>
          <TableRow id="row-3">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>０９８７６５４３２１</TableCell>
            <TableCell></TableCell>
            <TableCell>サガラクミコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="青森県八戸市石堂２丁目３－１">
              <span> 青森県八戸市石堂２丁目３－１ </span>
            </TableCell>
            <TableCell>２０２２/１１/１１</TableCell>
          </TableRow>
          <TableRow id="row-4">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>１２３４５６７８９０</TableCell>
            <TableCell>ＮＮ８９９９</TableCell>
            <TableCell>タナカタロウ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
            <TableCell>２０２２/１０/１８</TableCell>
          </TableRow>
          <TableRow id="row-5">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>１２３４５６７８９０</TableCell>
            <TableCell>ＮＮ７９９９</TableCell>
            <TableCell>タナカタロウ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
            <TableCell>２０２２/１０/１８</TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <Button size="large" width="200px">顧客新規登録</Button>
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
</script>

<style scoped lang="scss"></style>
