<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog
    :open="open"
    size="large"
    custom-height="760px"
    @close-dialog="onCloseDialog"
  >
    <template #header>
      <Text size="xl" bold> WITH予約 </Text>
    </template>
    <Panel
      class="util-flex util-flex--column util-flex--gap16 util-full-width"
      color="dark"
      :shadow="false"
    >
      <div class="util-flex util-flex--gap16 util-flex--wrap">
        <FieldContainer label="会員権番号" width="128px">
          <TextField />
        </FieldContainer>
        <FieldContainer label="利用代表者(カナ)" width="128px">
          <TextField />
        </FieldContainer>
        <FieldContainer label="期間" width="416px">
          <div
            class="
              util-flex
              util-flex--column-gap16
              util-flex--row-gap8
              util-flex--wrap
            "
          >
            <DatePicker
              size="small"
              type="range"
              :date-range="range"
              @change-range-date="onChangeRangeDate"
            />
            <ComboBox
              v-model:value="dateRangeDropdownValue"
              width="128px"
              size="small"
              :search-icon="false"
            >
              <ComboBoxItem
                v-for="(option, i) in dateRangeDropdownOptions"
                :key="i"
                :label="option.label"
                :value="option.value"
              >
              </ComboBoxItem>
            </ComboBox>
          </div>
        </FieldContainer>
      </div>
      <div
        class="util-flex util-flex--align-end util-flex--gap16 util-flex--wrap"
      >
        <FieldContainer label="予約番号" width="704px">
          <div
            class="
              util-flex
              util-flex--column-gap16
              util-flex--row-gap8
              util-flex--wrap
            "
          >
            <TextField width="128px" />
            <TextField width="128px" />
            <TextField width="128px" />
            <TextField width="128px" />
            <TextField width="128px" />
          </div>
        </FieldContainer>
        <Button
          color="neutral"
          icon="search"
          width="76px"
          @click="onClickSearch"
        >
          検索
        </Button>
      </div>
    </Panel>
    <template #table>
      <Table v-if="searched" width="100%">
        <template #head>
          <TableRow id="head-row-1">
            <TableColumn id="col-1" min-width="42px" text-align="center">
              親
            </TableColumn>
            <TableColumn id="col-2" min-width="42px" text-align="center">
              子
            </TableColumn>
            <TableColumn id="col-3" min-width="120px"> 予約番号 </TableColumn>
            <TableColumn id="col-4" min-width="120px"> ステータス </TableColumn>
            <TableColumn id="col-5" min-width="110px" height="24px">
              代表会員権番号
            </TableColumn>
            <TableColumn id="col-6" min-width="80px" text-align="center">
              ルーム番号
            </TableColumn>
            <TableColumn id="col-7" min-width="140px" height="24px">
              利用代表者名（カナ）
            </TableColumn>
            <TableColumn id="col-7" min-width="110px" height="24px">
              到着日
            </TableColumn>
            <TableColumn id="col-7" min-width="43px" height="24px">
              泊数
            </TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow id="row-1">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-1')"
                name="with-selection"
                @input="onSelectRow('row-1')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check1" />
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>
              <Badge size="small" color="success" width="100%" type="outlined">
                予約確定
              </Badge>
            </TableCell>
            <TableCell>KY1111</TableCell>
            <TableCell>101</TableCell>
            <TableCell>タナカ タロウ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-2">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-2')"
                name="with-selection"
                @input="onSelectRow('row-2')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check2" />
            </TableCell>
            <TableCell>2222222222</TableCell>
            <TableCell>
              <Badge size="small" color="success" width="100%" type="outlined">
                予約確定
              </Badge>
            </TableCell>
            <TableCell>HN8888</TableCell>
            <TableCell>102</TableCell>
            <TableCell>タナカ ハナコ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-3">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-3')"
                name="with-selection"
                @input="onSelectRow('row-3')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check3" />
            </TableCell>
            <TableCell>2222222222</TableCell>
            <TableCell>
              <Badge size="small" color="warning" width="100%" type="outlined">
                カレンダーOP仮
              </Badge>
            </TableCell>
            <TableCell>HN8888</TableCell>
            <TableCell>103</TableCell>
            <TableCell>タナカ ハナコ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-4">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-4')"
                name="with-selection"
                @input="onSelectRow('row-4')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check4" />
            </TableCell>
            <TableCell>3333333333</TableCell>
            <TableCell>
              <Badge size="small" color="error" width="100%">
                キャンセル
              </Badge>
            </TableCell>
            <TableCell>KY1111</TableCell>
            <TableCell>104</TableCell>
            <TableCell>タナカ ジロウ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-5">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-5')"
                name="with-selection"
                @input="onSelectRow('row-5')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check5" />
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>
              <Badge size="small" color="success" width="100%" type="outlined">
                予約確定
              </Badge>
            </TableCell>
            <TableCell>GD9999</TableCell>
            <TableCell>104</TableCell>
            <TableCell>タナカ ジロウ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-6">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-6')"
                name="with-selection"
                @input="onSelectRow('row-6')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check6" />
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>
              <Badge size="small" color="success" width="100%" type="outlined">
                予約確定
              </Badge>
            </TableCell>
            <TableCell>GD9999</TableCell>
            <TableCell>105</TableCell>
            <TableCell>タナカ モモコ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-7">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-7')"
                name="with-selection"
                @input="onSelectRow('row-7')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check7" />
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>
              <Badge size="small" color="warning" width="100%" type="outlined">
                カレンダーOP仮
              </Badge>
            </TableCell>
            <TableCell>GD9999</TableCell>
            <TableCell>106</TableCell>
            <TableCell>タナカ ジロウ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
          <TableRow id="row-8">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-8')"
                name="with-selection"
                @input="onSelectRow('row-8')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check8" />
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>
              <Badge size="small" color="error" width="100%" type="outlined">
                キャンセル待ち
              </Badge>
            </TableCell>
            <TableCell>GD9999</TableCell>
            <TableCell>202</TableCell>
            <TableCell>タナカ モモコ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-9">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-9')"
                name="with-selection"
                @input="onSelectRow('row-9')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check9" />
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>
              <Badge size="small" color="success" width="100%" type="outlined">
                予約確定
              </Badge>
            </TableCell>
            <TableCell>GD9999</TableCell>
            <TableCell>206</TableCell>
            <TableCell>タナカ ジロウ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-10">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-10')"
                name="with-selection"
                @input="onSelectRow('row-10')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check10" />
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>
              <Badge size="small" color="success" width="100%" type="outlined">
                予約確定
              </Badge>
            </TableCell>
            <TableCell>GD9999</TableCell>
            <TableCell>108</TableCell>
            <TableCell>タナカ モモコ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-11">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-11')"
                name="with-selection"
                @input="onSelectRow('row-11')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check11" />
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>
              <Badge size="small" color="success" width="100%" type="outlined">
                予約確定
              </Badge>
            </TableCell>
            <TableCell>KY1111</TableCell>
            <TableCell>101</TableCell>
            <TableCell>タナカ タロウ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-12">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-12')"
                name="with-selection"
                @input="onSelectRow('row-12')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check12" />
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>
              <Badge size="small" color="success" width="100%" type="outlined">
                予約確定
              </Badge>
            </TableCell>
            <TableCell>KY1111</TableCell>
            <TableCell>101</TableCell>
            <TableCell>タナカ タロウ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-13">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-13')"
                name="with-selection"
                @input="onSelectRow('row-13')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check13" />
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>
              <Badge size="small" color="success" width="100%" type="outlined">
                予約確定
              </Badge>
            </TableCell>
            <TableCell>KY1111</TableCell>
            <TableCell>101</TableCell>
            <TableCell>タナカ タロウ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-14">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-14')"
                name="with-selection"
                @input="onSelectRow('row-14')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check14" />
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>
              <Badge size="small" color="success" width="100%" type="outlined">
                予約確定
              </Badge>
            </TableCell>
            <TableCell>KY1111</TableCell>
            <TableCell>101</TableCell>
            <TableCell>タナカ タロウ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-15">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-15')"
                name="with-selection"
                @input="onSelectRow('row-15')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check15" />
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>
              <Badge size="small" color="success" width="100%" type="outlined">
                予約確定
              </Badge>
            </TableCell>
            <TableCell>KY1111</TableCell>
            <TableCell>101</TableCell>
            <TableCell>タナカ タロウ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow id="row-16">
            <TableCell text-align="center">
              <RadioButton
                :checked="selectedRow.includes('row-16')"
                name="with-selection"
                @input="onSelectRow('row-16')"
              />
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-model:checked="check16" />
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>
              <Badge size="small" color="success" width="100%" type="outlined">
                予約確定
              </Badge>
            </TableCell>
            <TableCell>KY1111</TableCell>
            <TableCell>101</TableCell>
            <TableCell>タナカ タロウ</TableCell>
            <TableCell>2023/01/03</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <Button size="large" width="240px" @click="onClickConfirm"> 決定 </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Badge from '../components/Badge/Badge.vue';
import Button from '../components/Button/Button.vue';
import Checkbox from '../components/Checkbox/Checkbox.vue';
import DatePicker from '../components/DatePicker/DatePicker.vue';
import Dialog from '../components/Dialog/Dialog.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import Panel from '../components/Panel/Panel.vue';
import RadioButton from '../components/RadioButton/RadioButton.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import Text from '../components/Text/Text.vue';
import TextField from '../components/TextField/TextField.vue';
import ComboBox from '../components/ComboBox/ComboBox.vue';
import ComboBoxItem from '../components/ComboBox/ComboBoxItem.vue';
import { ref } from 'vue';

const open = ref(true);

const selectedRow = ref(['row-1']);
const onSelectRow = (rowId: string) => {
  console.log('onSelectRow', rowId);
  selectedRow.value = [rowId];
};

const onCloseDialog = () => {
  open.value = false;
  searched.value = false;
};

const onClickConfirm = () => {
  console.log('onClickConfirm');
  open.value = false;
  searched.value = false;
};

const range = ref({
  start: new Date(),
  end: new Date(),
});

const onChangeRangeDate = (dateRange: { start?: Date; end?: Date }) => {
  if (dateRange.start) {
    range.value.start = dateRange.start;
  }
  if (dateRange.end) {
    range.value.end = dateRange.end;
  }
};

const dateRangeDropdownValue = ref('到着日');

const dateRangeDropdownOptions = [
  {
    label: '到着日',
    value: 'arrival',
  },
  {
    label: '出発日',
    value: 'departure',
  },
  {
    label: '予約日',
    value: 'reservation',
  },
];

const searched = ref(false);

const onClickSearch = () => {
  console.log('onClickSearch');
  searched.value = true;
};

const check1 = ref(false);
const check2 = ref(false);
const check3 = ref(false);
const check4 = ref(false);
const check5 = ref(false);
const check6 = ref(false);
const check7 = ref(false);
const check8 = ref(false);
const check9 = ref(false);
const check10 = ref(false);
const check11 = ref(false);
const check12 = ref(false);
const check13 = ref(false);
const check14 = ref(false);
const check15 = ref(false);
const check16 = ref(false);
</script>

<style scoped lang="scss"></style>
