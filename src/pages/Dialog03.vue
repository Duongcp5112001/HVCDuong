<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog
    :open="open"
    size="large"
    custom-height="676px"
    @close-dialog="onCloseDialog"
  >
    <template #header>
      <Icon
        class="util-mr-24"
        icon="warning_amber"
        color="#BA1A1A"
        :size="40"
      ></Icon>
      <Text color="critical" size="xl" bold>泊数制限を超えています</Text>
    </template>
    <Text bold size="large" line-height="170%">泊数チェック</Text>
    <Text class="util-mb-24" color="light" line-height="150%" bold>
      泊数を確認してください
    </Text>
    <span class="util-flex util-mb-8">
      <Text class="util-mr-16" color="light" bold size="2xs">今回利用枚数</Text>
      <Text class="util-mr-24" bold size="large">4</Text>
      <Text class="util-mr-16" color="light" bold size="2xs">宿泊制限</Text>
      <Text size="large" bold>1</Text>
    </span>
    <Table :critical-columns-ids="['col-thisyear-8']">
      <template #head>
        <TableRow id="01">
          <TableColumn id="col-type" rowspan="2" min-width="66px">
            種類
          </TableColumn>
          <TableColumn
            id="col-prevyear"
            height="24px"
            min-width="48px"
            text-align="center"
          >
            2021
          </TableColumn>
          <TableColumn
            id="col-thisyear"
            height="24px"
            colspan="12"
            width="565px"
            text-align="center"
          >
            2022
          </TableColumn>
          <TableColumn
            id="col-nextyear"
            height="24px"
            min-width="48px"
            text-align="center"
          >
            2023
          </TableColumn>
          <TableColumn
            id="col-total"
            rowspan="2"
            min-width="48px"
            text-align="center"
          >
            計
          </TableColumn>
          <TableColumn
            id="col-remaining"
            rowspan="2"
            min-width="48px"
            text-align="center"
          >
            残数
          </TableColumn>
        </TableRow>
        <TableRow id="01">
          <TableColumn id="col-prevyear-12" text-align="center" width="48px">
            12
          </TableColumn>
          <TableColumn id="col-thisyear-1" text-align="center" width="48px">
            1月
          </TableColumn>
          <TableColumn id="col-thisyear-2" text-align="center" width="48px">
            2月
          </TableColumn>
          <TableColumn id="col-thisyear-3" text-align="center" width="48px">
            3月
          </TableColumn>
          <TableColumn id="col-thisyear-4" text-align="center" width="48px">
            4月
          </TableColumn>
          <TableColumn id="col-thisyear-5" text-align="center" width="48px">
            5月
          </TableColumn>
          <TableColumn id="col-thisyear-6" text-align="center" width="48px">
            6月
          </TableColumn>
          <TableColumn id="col-thisyear-7" text-align="center" width="48px">
            7月
          </TableColumn>
          <TableColumn id="col-thisyear-8" text-align="center" width="48px">
            8月
          </TableColumn>
          <TableColumn id="col-thisyear-9" text-align="center" width="48px">
            9月
          </TableColumn>
          <TableColumn id="col-thisyear-10" text-align="center" width="48px">
            10月
          </TableColumn>
          <TableColumn id="col-thisyear-11" text-align="center" width="48px">
            11月
          </TableColumn>
          <TableColumn id="col-thisyear-12" text-align="center" width="48px">
            12月
          </TableColumn>
          <TableColumn id="col-nextyear-1" text-align="center" width="48px">
            1月
          </TableColumn>
        </TableRow>
      </template>
      <template #body>
        <TableRow id="row-1">
          <TableCell id="col-type">ホーム</TableCell>
          <TableCell id="col-prevyear-12" text-align="right">3</TableCell>
          <TableCell id="col-thisyear-1" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-2" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-3" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-4" text-align="right">4</TableCell>
          <TableCell id="col-thisyear-5" text-align="right">14</TableCell>
          <TableCell id="col-thisyear-6" text-align="right">10</TableCell>
          <TableCell id="col-thisyear-7" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-8" text-align="right">2</TableCell>
          <TableCell id="col-thisyear-9" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-10" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-11" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-12" text-align="right">0</TableCell>
          <TableCell id="col-nextyear-1" text-align="right">0</TableCell>
          <TableCell id="col-total" text-align="right">23</TableCell>
          <TableCell id="col-remaining" text-align="right">3</TableCell>
        </TableRow>
        <TableRow id="row-2">
          <TableCell id="col-type">相互</TableCell>
          <TableCell id="col-prevyear-12" text-align="right">3</TableCell>
          <TableCell id="col-thisyear-1" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-2" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-3" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-4" text-align="right">4</TableCell>
          <TableCell id="col-thisyear-5" text-align="right">14</TableCell>
          <TableCell id="col-thisyear-6" text-align="right">10</TableCell>
          <TableCell id="col-thisyear-7" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-8" text-align="right">2</TableCell>
          <TableCell id="col-thisyear-9" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-10" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-11" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-12" text-align="right">0</TableCell>
          <TableCell id="col-nextyear-1" text-align="right">0</TableCell>
          <TableCell id="col-total" text-align="right">23</TableCell>
          <TableCell id="col-remaining" text-align="right">3</TableCell>
        </TableRow>
        <TableRow id="row-3">
          <TableCell id="col-type">宿泊制限</TableCell>
          <TableCell id="col-prevyear-12" text-align="right">3</TableCell>
          <TableCell id="col-thisyear-1" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-2" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-3" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-4" text-align="right">4</TableCell>
          <TableCell id="col-thisyear-5" text-align="right">14</TableCell>
          <TableCell id="col-thisyear-6" text-align="right">10</TableCell>
          <TableCell id="col-thisyear-7" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-8" text-align="right">2</TableCell>
          <TableCell id="col-thisyear-9" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-10" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-11" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-12" text-align="right">0</TableCell>
          <TableCell id="col-nextyear-1" text-align="right">0</TableCell>
          <TableCell id="col-total" text-align="right">23</TableCell>
          <TableCell id="col-remaining" text-align="right">3</TableCell>
        </TableRow>
        <TableRow id="row-4">
          <TableCell id="col-type">繰越（ホ）</TableCell>
          <TableCell id="col-prevyear-12" text-align="right">3</TableCell>
          <TableCell id="col-thisyear-1" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-2" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-3" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-4" text-align="right">4</TableCell>
          <TableCell id="col-thisyear-5" text-align="right">14</TableCell>
          <TableCell id="col-thisyear-6" text-align="right">10</TableCell>
          <TableCell id="col-thisyear-7" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-8" text-align="right">2</TableCell>
          <TableCell id="col-thisyear-9" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-10" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-11" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-12" text-align="right">0</TableCell>
          <TableCell id="col-nextyear-1" text-align="right">0</TableCell>
          <TableCell id="col-total" text-align="right">23</TableCell>
          <TableCell id="col-remaining" text-align="right">3</TableCell>
        </TableRow>
        <TableRow id="row-5">
          <TableCell id="col-type">繰越（相）</TableCell>
          <TableCell id="col-prevyear-12" text-align="right">3</TableCell>
          <TableCell id="col-thisyear-1" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-2" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-3" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-4" text-align="right">4</TableCell>
          <TableCell id="col-thisyear-5" text-align="right">14</TableCell>
          <TableCell id="col-thisyear-6" text-align="right">10</TableCell>
          <TableCell id="col-thisyear-7" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-8" text-align="right">2</TableCell>
          <TableCell id="col-thisyear-9" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-10" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-11" text-align="right">0</TableCell>
          <TableCell id="col-thisyear-12" text-align="right">0</TableCell>
          <TableCell id="col-nextyear-1" text-align="right">0</TableCell>
          <TableCell id="col-total" text-align="right">23</TableCell>
          <TableCell id="col-remaining" text-align="right">3</TableCell>
        </TableRow>
      </template>
    </Table>
    <template #footer>
      <Button
        class="util-mr-16"
        size="large"
        color="critical"
        icon="delete"
        type="outlined"
        width="160px"
        @click="onClickCancel"
      >
        キャンセル
      </Button>
      <Button size="large" @click="onClickBookMoreThanLimit">
        泊数制限を超えて予約
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

const onClickCancel = () => {
  console.log('onClickCancel');
};

const onClickBookMoreThanLimit = () => {
  console.log('onClickBookMoreThanLimit');
};
</script>

<style scoped lang="scss"></style>
