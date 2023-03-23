<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" size="large" @close-dialog="onCloseDialog">
    <template #header>
      <Icon
        class="util-mr-24"
        icon="warning_amber"
        color="#BA1A1A"
        :size="40"
      ></Icon>
      <Text color="critical" size="xl" bold>泊数制限を超えています</Text>
    </template>
    <span class="util-flex util-flex--column util-flex--gap8 util-mb-8">
      <Text bold size="large" line-height="170%">泊数チェック</Text>
      <Text color="light" line-height="150%" bold>
        泊数を確認してください
      </Text>
      <span class="util-flex">
        <Text class="util-mr-16" color="light" bold size="2xs">
          今回利用枚数
        </Text>
        <Text class="util-mr-24" bold size="large">4</Text>
        <Text class="util-mr-16" color="light" bold size="2xs">宿泊制限</Text>
        <Text size="large" bold>1</Text>
      </span>
    </span>
    <template #table>
      <Table :hover-effect="false" :is-striped="false">
        <template #head>
          <TableRow id="01">
            <TableColumn id="col-type" rowspan="2" colspan="2" min-width="70px">
              利用券
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
              width="529px"
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
              min-width="38px"
              text-align="center"
            >
              合計
            </TableColumn>
            <TableColumn
              id="col-remaining"
              rowspan="2"
              min-width="38px"
              text-align="center"
            >
              残数
            </TableColumn>
            <TableColumn
              id="col-total-number"
              rowspan="2"
              min-width="38px"
              text-align="center"
            >
              総数
            </TableColumn>
          </TableRow>
          <TableRow id="01">
            <TableColumn id="col-prevyear-12" text-align="center" width="48px">
              12月
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
            <TableCell id="col-type" colspan="2">利用数合計</TableCell>
            <TableCell id="col-prevyear-12" text-align="right" bold>
              5
            </TableCell>
            <TableCell id="col-thisyear-1" text-align="right" bold>5</TableCell>
            <TableCell id="col-thisyear-2" text-align="right" bold>2</TableCell>
            <TableCell id="col-thisyear-3" text-align="right" bold>2</TableCell>
            <TableCell id="col-thisyear-4" text-align="right" bold>2</TableCell>
            <TableCell id="col-thisyear-5" text-align="right" bold>2</TableCell>
            <TableCell id="col-thisyear-6" text-align="right" bold>2</TableCell>
            <TableCell id="col-thisyear-7" text-align="right" bold>2</TableCell>
            <TableCell id="col-thisyear-8" text-align="right" bold>2</TableCell>
            <TableCell id="col-thisyear-9" text-align="right" bold>0</TableCell>
            <TableCell id="col-thisyear-10" text-align="right" bold>
              2
            </TableCell>
            <TableCell id="col-thisyear-11" text-align="right" bold>
              2
            </TableCell>
            <TableCell id="col-thisyear-12" text-align="right" bold>
              2
            </TableCell>
            <TableCell id="col-nextyear-1" text-align="right" bold>5</TableCell>
            <TableCell id="col-total" text-align="right" bold>19</TableCell>
            <TableCell id="col-remaining" text-align="right" bold>4</TableCell>
            <TableCell id="col-total-number" text-align="right" bold>
              4
            </TableCell>
          </TableRow>
          <TableRow id="row-2">
            <TableCell id="col-type-title" rowspan="4" width="12px" wrap>
              宿泊
            </TableCell>
            <TableCell id="col-type">ホーム</TableCell>
            <TableCell id="col-prevyear-12" text-align="right">6</TableCell>
            <TableCell id="col-thisyear-1" text-align="right">6</TableCell>
            <TableCell id="col-thisyear-2" text-align="right">6</TableCell>
            <TableCell id="col-thisyear-3" text-align="right">6</TableCell>
            <TableCell id="col-thisyear-4" text-align="right">6</TableCell>
            <TableCell id="col-thisyear-5" text-align="right">6</TableCell>
            <TableCell id="col-thisyear-6" text-align="right">6</TableCell>
            <TableCell id="col-thisyear-7" text-align="right">6</TableCell>
            <TableCell id="col-thisyear-8" text-align="right">6</TableCell>
            <TableCell id="col-thisyear-9" text-align="right">6</TableCell>
            <TableCell id="col-thisyear-10" text-align="right">6</TableCell>
            <TableCell id="col-thisyear-11" text-align="right">6</TableCell>
            <TableCell id="col-thisyear-12" text-align="right">6</TableCell>
            <TableCell id="col-nextyear-1" text-align="right">6</TableCell>
            <TableCell id="col-total" text-align="right">6</TableCell>
            <TableCell id="col-remaining" text-align="right">6</TableCell>
            <TableCell id="col-total-number" text-align="right">6</TableCell>
          </TableRow>
          <TableRow id="row-3">
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
            <TableCell id="col-total-number" text-align="right">0</TableCell>
          </TableRow>
          <TableRow id="row-4">
            <TableCell id="col-type">繰越ホーム</TableCell>
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
            <TableCell id="col-total-number" text-align="right">0</TableCell>
          </TableRow>
          <TableRow id="row-5">
            <TableCell id="col-type">繰越相互</TableCell>
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
            <TableCell id="col-total-number" text-align="right">0</TableCell>
          </TableRow>
          <TableRow id="row-6">
            <TableCell id="col-type-title" rowspan="2" width="12px" wrap>
              譲渡
            </TableCell>
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
            <TableCell id="col-total-number" text-align="right">0</TableCell>
          </TableRow>
          <TableRow id="row-7">
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
            <TableCell id="col-total-number" text-align="right">0</TableCell>
          </TableRow>
          <TableRow id="row-7" row-color="neutralLight02">
            <TableCell id="col-type" colspan="2">宿泊制限対象</TableCell>
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
            <TableCell id="col-total-number" text-align="right">0</TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <Button
        class="util-mr-16"
        size="large"
        width="200px"
        @click="onClickMemberTicket"
      >
        会員権/利用券
      </Button>
      <Button size="large" width="200px" @click="onClickBookMoreThanLimit">
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

const onClickMemberTicket = () => {
  console.log('onClickMemberTicket');
};

const onClickBookMoreThanLimit = () => {
  console.log('onClickBookMoreThanLimit');
};
</script>

<style scoped lang="scss"></style>
