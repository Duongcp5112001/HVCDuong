<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog
    :open="open"
    size="large"
    custom-height="760px"
    @close-dialog="onCloseDialog"
  >
    <template #header>
      <Text size="xl" bold>WITH予約照会・変更</Text>
    </template>
    <div class="util-flex util-flex--column util-flex--gap16 util-full-width">
      <Panel class="util-mb-16" color="light" width="100%">
        <span class="util-flex util-flex--column util-flex--gap16">
          <Text size="large" bold> 親予約 </Text>
          <span class="util-flex util-flex--align-center util-flex--gap40">
            <span class="util-flex util-flex--align-center util-flex--gap16">
              <Text size="2xs" color="light" line-height="10px">
                予約番号
              </Text>
              <Text bold line-height="21px">1234567890</Text>
            </span>
            <span class="util-flex util-flex--align-center util-flex--gap16">
              <Text size="2xs" color="light" line-height="10px">
                代表会員権番号
              </Text>
              <Text bold line-height="21px">HN9999</Text>
            </span>
            <span class="util-flex util-flex--align-center util-flex--gap16">
              <Text size="2xs" color="light" line-height="10px">
                利用代表者名（カナ）
              </Text>
              <Text bold line-height="21px">タナカ タロウ</Text>
            </span>
          </span>
        </span>
      </Panel>
    </div>
    <ToggleButtonSet
      :selected-id="selectedToggleButtonId"
      width="292px"
      size="medium"
      type="outlined"
      @click-item="onClickToggleToggleButton"
    >
      <ToggleButton id="content-1" icon="calendar_today">予約単位</ToggleButton>
      <ToggleButton id="content-2" icon="bedroom_parent">部屋単位</ToggleButton>
    </ToggleButtonSet>
    <template #table>
      <template v-if="selectedToggleButtonId === 'content-1'">
        <Table :selected-rows-ids="['row-3']" fixed-layout>
          <template #head>
            <TableRow id="row-1" :hover-effect="false">
              <TableColumn id="col-1" width="48px" text-align="center">
                親
              </TableColumn>
              <TableColumn id="col-2" width="48px" text-align="center">
                幹事
              </TableColumn>
              <TableColumn id="col-3" width="100%">予約番号</TableColumn>
              <TableColumn id="col-4" width="120px">ルーム番号</TableColumn>
              <TableColumn id="col-5" width="116px">
                利用代表者名（カナ）
              </TableColumn>
              <TableColumn id="col-6" width="120px">到着日</TableColumn>
              <TableColumn id="col-7" width="120px">出発日</TableColumn>
              <TableColumn id="col-8" width="80px">泊数</TableColumn>
              <TableColumn id="col-9" width="64px" text-align="center">
                解除
              </TableColumn>
            </TableRow>
          </template>
          <template #body>
            <TableRow id="row-2">
              <TableCell text-align="center">
                <RadioButton
                  :checked="selectedRow1.includes('row-1')"
                  name="with-selection-edit1"
                  @input="onSelectRow1('row-1')"
                />
              </TableCell>
              <TableCell text-align="center">
                <RadioButton
                  :checked="selectedRow2.includes('row-1')"
                  name="with-selection-edit2"
                  @input="onSelectRow2('row-1')"
                />
              </TableCell>
              <TableCell>1234567890</TableCell>
              <TableCell wrap>101</TableCell>
              <TableCell>タナカ タロウ</TableCell>
              <TableCell>2023/01/03</TableCell>
              <TableCell>2023/01/03</TableCell>
              <TableCell>1泊</TableCell>
              <TableCell text-align="center">
                <Button
                  type="outlined"
                  color="critical"
                  size="small"
                  width="48px"
                  disabled
                >
                  解除
                </Button>
              </TableCell>
            </TableRow>
            <TableRow id="row-3">
              <TableCell text-align="center">
                <RadioButton
                  :checked="selectedRow1.includes('row-2')"
                  name="with-selection-edit1"
                  @input="onSelectRow1('row-2')"
                />
              </TableCell>
              <TableCell text-align="center">
                <RadioButton
                  :checked="selectedRow2.includes('row-2')"
                  name="with-selection-edit2"
                  @input="onSelectRow2('row-2')"
                />
              </TableCell>
              <TableCell>1234567891</TableCell>
              <TableCell wrap>102, 103</TableCell>
              <TableCell>タナカ ハナコ</TableCell>
              <TableCell>2023/01/03</TableCell>
              <TableCell>2023/01/03</TableCell>
              <TableCell>1泊</TableCell>
              <TableCell>
                <Button
                  type="outlined"
                  color="critical"
                  size="small"
                  width="48px"
                >
                  解除
                </Button>
              </TableCell>
            </TableRow>
            <TableRow id="row-4">
              <TableCell text-align="center">
                <RadioButton
                  :checked="selectedRow1.includes('row-3')"
                  name="with-selection-edit1"
                  @input="onSelectRow1('row-3')"
                />
              </TableCell>
              <TableCell text-align="center">
                <RadioButton
                  :checked="selectedRow2.includes('row-3')"
                  name="with-selection-edit2"
                  @input="onSelectRow2('row-3')"
                />
              </TableCell>
              <TableCell>1234567892</TableCell>
              <TableCell wrap>104</TableCell>
              <TableCell>タナカ ジロウ</TableCell>
              <TableCell>2023/01/03</TableCell>
              <TableCell>2023/01/03</TableCell>
              <TableCell>1泊</TableCell>
              <TableCell>
                <Button
                  type="outlined"
                  color="critical"
                  size="small"
                  width="48px"
                >
                  解除
                </Button>
              </TableCell>
            </TableRow>
          </template>
        </Table>
      </template>
      <template v-else>
        <Table :selected-rows-ids="['row-3', 'row-4']" fixed-layout>
          <template #head>
            <TableRow id="row-1" :hover-effect="false">
              <TableColumn id="col-2" width="120px">代表会員権番号</TableColumn>
              <TableColumn id="col-3" width="88px">ルーム番号</TableColumn>
              <TableColumn id="col-4" width="100%">
                利用代表者名（カナ）
              </TableColumn>
              <TableColumn id="col-5" width="120px">到着日</TableColumn>
              <TableColumn id="col-6" width="56px">泊数</TableColumn>
            </TableRow>
          </template>
          <template #body>
            <TableRow id="row-2">
              <TableCell>KY1111</TableCell>
              <TableCell wrap>101</TableCell>
              <TableCell>タナカ タロウ</TableCell>
              <TableCell>2023/01/03</TableCell>
              <TableCell>1泊</TableCell>
            </TableRow>
            <TableRow id="row-3">
              <TableCell>HN8888</TableCell>
              <TableCell wrap>102</TableCell>
              <TableCell>タナカ ハナコ</TableCell>
              <TableCell>2023/01/03</TableCell>
              <TableCell>1泊</TableCell>
            </TableRow>
            <TableRow id="row-4">
              <TableCell>HN8888</TableCell>
              <TableCell wrap>103</TableCell>
              <TableCell>タナカ ハナコ</TableCell>
              <TableCell>2023/01/03</TableCell>
              <TableCell>1泊</TableCell>
            </TableRow>
            <TableRow id="row-2">
              <TableCell>KY1111</TableCell>
              <TableCell wrap>104</TableCell>
              <TableCell>タナカ ジロウ</TableCell>
              <TableCell>2023/01/03</TableCell>
              <TableCell>1泊</TableCell>
            </TableRow>
          </template>
        </Table>
      </template>
    </template>
    <template #footer>
      <Button size="large" width="240px">更新</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Button from '../components/Button/Button.vue';
import Panel from '../components/Panel/Panel.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import ToggleButtonSet from '../components/ToggleButton/ToggleButtonSet.vue';
import ToggleButton from '../components/ToggleButton/ToggleButton.vue';
import RadioButton from '../components/RadioButton/RadioButton.vue';

const open = ref(true);

const selectedToggleButtonId = ref('content-1');

const onClickToggleToggleButton = (id: string) => {
  console.log('clicked toggle button: ', id);
  selectedToggleButtonId.value = id;
};

const selectedRow1 = ref(['row-1']);
const selectedRow2 = ref(['row-1']);
const onSelectRow1 = (rowId: string) => {
  console.log('onSelectRow1', rowId);
  selectedRow1.value = [rowId];
};
const onSelectRow2 = (rowId: string) => {
  console.log('onSelectRow2', rowId);
  selectedRow2.value = [rowId];
};

const onCloseDialog = () => {
  open.value = false;
};
</script>

<style scoped lang="scss"></style>
