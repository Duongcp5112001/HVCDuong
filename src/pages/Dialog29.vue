<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog
    :open="open"
    size="large"
    custom-height="760px"
    @close-dialog="onCloseDialog"
  >
    <template #header>
      <Text size="xl" bold>アクション履歴</Text>
    </template>
    <div class="util-flex util-flex--column util-flex--gap16 util-full-width">
      <Disclosure color="light" :opened="true">
        <template #title><Text bold>アクション登録</Text></template>
        <div class="util-flex util-flex--column util-flex--gap16">
          <div class="util-flex util-flex--gap16 util-flex--wrap">
            <FieldContainer label="日付" width="128px">
              <DatePicker size="small" width="128px"></DatePicker>
            </FieldContainer>
            <FieldContainer label="時間" width="128px">
              <TimePicker size="small" width="128px" :minute-increment="0" />
            </FieldContainer>
            <FieldContainer label="アクション" width="128px">
              <ComboBox
                v-model:value="currentTextDropdownSelection1"
                placeholder="-"
                size="small"
                width="128px"
                :search-icon="false"
              >
                <ComboBoxItem
                  v-for="(option, i) in textDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </ComboBoxItem>
              </ComboBox>
            </FieldContainer>
            <FieldContainer label="担当者" width="128px">
              <ComboBox
                v-model:value="currentTextDropdownSelection2"
                placeholder="-"
                size="small"
                width="128px"
                :search-icon="false"
              >
                <ComboBoxItem
                  v-for="(option, i) in textDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </ComboBoxItem>
              </ComboBox>
            </FieldContainer>
          </div>
          <FieldContainer label="備考" width="100%">
            <TextField />
          </FieldContainer>
          <div class="util-flex util-flex--justify-end">
            <Button size="large" width="240px">登録</Button>
          </div>
        </div>
      </Disclosure>
      <Panel class="util-mb-16" color="dark" width="100%">
        <div
          class="
            util-flex util-flex--align-end util-flex--gap16 util-flex--wrap
          "
        >
          <FieldContainer label="アクション" width="128px">
            <ComboBox
              v-model="currentTextDropdownSelection3"
              size="small"
              width="128px"
              :search-icon="false"
            >
              <ComboBoxItem
                v-for="(option, i) in textDropdownOptions"
                :key="i"
                :label="option.label"
                :value="option.value"
              >
              </ComboBoxItem>
            </ComboBox>
          </FieldContainer>
          <FieldContainer label="担当者" width="128px">
            <ComboBox
              v-model="currentTextDropdownSelection4"
              size="small"
              width="128px"
              :search-icon="false"
            >
              <ComboBoxItem
                v-for="(option, i) in textDropdownOptions"
                :key="i"
                :label="option.label"
                :value="option.value"
              >
              </ComboBoxItem>
            </ComboBox>
          </FieldContainer>
          <FieldContainer label="日付" width="128px">
            <DatePicker size="small" width="128px"></DatePicker>
          </FieldContainer>
          <Button color="neutral" icon="search">検索</Button>
        </div>
      </Panel>
    </div>
    <template #table>
      <Table fixed-layout>
        <template #head>
          <TableRow id="row-1" :hover-effect="false">
            <TableColumn
              id="col-1"
              can-sort
              :sorted-direction="'desc'"
              width="184px"
            >
              日時
            </TableColumn>
            <TableColumn id="col-2" width="120px">アクション</TableColumn>
            <TableColumn id="col-3" width="184px">担当者</TableColumn>
            <TableColumn id="col-4" width="100%">備考</TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow id="row-2">
            <TableCell> 2022/09/02 18:55 </TableCell>
            <TableCell>コンファーム済</TableCell>
            <TableCell>石川 智久</TableCell>
            <TableCell>C/Bあり。ブッフェOK19:00で確定</TableCell>
          </TableRow>
          <TableRow id="row-3">
            <TableCell>2022/08/30 14:29</TableCell>
            <TableCell>電話連絡</TableCell>
            <TableCell>米田 寿子</TableCell>
            <TableCell>
              お電話出られず。C/Bｱﾚﾊﾞ以下お伝えください。 竹ノ内
              全時間帯が満席。ﾌﾞｯﾌｪ
              19：00で仮おさえ中。※ﾚｽﾄﾗﾝについて携帯に連絡希望。
            </TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Button from '../components/Button/Button.vue';
import Panel from '../components/Panel/Panel.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import DatePicker from '../components/DatePicker/DatePicker.vue';
import TimePicker from '../components/TimePicker/TimePicker.vue';
import ComboBox from '../components/ComboBox/ComboBox.vue';
import ComboBoxItem from '../components/ComboBox/ComboBoxItem.vue';
import TextField from '../components/TextField/TextField.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import Disclosure from '../components/Disclosure/Disclosure.vue';

const open = ref(true);

const currentTextDropdownSelection1 = ref('');
const currentTextDropdownSelection2 = ref('');
const currentTextDropdownSelection3 = ref('');
const currentTextDropdownSelection4 = ref('');

const textDropdownOptions = [
  {
    label: 'オプション1',
    value: 'option1',
  },
  {
    label: 'オプション2',
    value: 'option2',
  },
  {
    label: 'オプション3',
    value: 'option3',
  },
];

const onCloseDialog = () => {
  open.value = false;
};
</script>

<style scoped lang="scss"></style>
