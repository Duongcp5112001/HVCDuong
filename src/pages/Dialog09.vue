<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog :open="open" size="xlarge" @close-dialog="onCloseDialog">
    <template #header>
      <Text size="xl" bold>プラン設定</Text>
    </template>
    <Panel class="util-mb-8 util-mt-8" color="dark" width="100%">
      <span class="util-flex util-flex--align-end util-flex--gap16">
        <FieldContainer label="宿泊日" width="128px">
          <DatePicker size="small" width="128px"></DatePicker>
        </FieldContainer>
        <FieldContainer label="プランID" width="68px">
          <TextField v-model="planId" />
        </FieldContainer>
        <FieldContainer label="プラン名(カナ)" width="272px">
          <TextField v-model="planName" />
        </FieldContainer>
        <span class="util-flex util-flex--gap8">
          <Button color="neutral" icon="search">検索</Button>
          <Button color="neutral" type="outlined">クリア</Button>
        </span>
      </span>
    </Panel>
    <span
      class="
        util-flex util-flex--align-center util-flex--justify-between
        util-full-width util-px-10 util-py-10
      "
    >
      <span class="util-flex util-flex--align-center util-flex--gap16">
        <Text size="2xs" color="light" line-height="10px">プラン数</Text>
        <Text bold size="large" line-height="24px">14</Text>
      </span>
      <span class="util-flex util-flex--column-gap8">
        <Text color="light" size="2xs">宿泊人数</Text>
        <Text color="light" size="2xs">大人</Text>
        <Text cold size="large">{{ totalAdults }} </Text>
        <Text color="light" size="2xs">中人</Text>
        <Text cold size="large">{{ totalChildren }} </Text>
        <Text color="light" size="2xs">小人</Text>
        <Text cold size="large">{{ totalSmallChildren }} </Text>
        <Text color="light" size="2xs">幼児</Text>
        <Text cold size="large">{{ totalBabies }} </Text>
      </span>
    </span>
    <template #table>
      <Table class="util-mt-8" :hover-effect="false" :fixed-layout="true">
        <template #head>
          <TableRow id="row-1">
            <TableColumn id="col-1" width="45px">選択</TableColumn>
            <TableColumn id="col-2" width="70px">プランID</TableColumn>
            <TableColumn id="col-4" width="200px">プラン名</TableColumn>
            <TableColumn id="col-5" width="190px">内容</TableColumn>
            <TableColumn id="col-6" width="155px">利用期間</TableColumn>
            <TableColumn id="col-7" width="155px">販売期間</TableColumn>
            <TableColumn id="col-8" width="72px">人数制限</TableColumn>
            <TableColumn id="col-9" width="78px" text-align="center">
              大人
            </TableColumn>
            <TableColumn id="col-9" width="78px" text-align="center">
              中人
            </TableColumn>
            <TableColumn id="col-9" width="78px" text-align="center">
              小人
            </TableColumn>
            <TableColumn id="col-9" width="78px" text-align="center">
              幼児
            </TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow v-for="row in rowsData" :id="row.id" :key="row.id">
            <TableCell text-align="center">
              <Checkbox :checked="row.checked" @input="onCheckRow(row.id)" />
            </TableCell>
            <TableCell>
              {{ row.planId }}
            </TableCell>
            <TableCell wrap>
              {{ row.planName }}
            </TableCell>
            <TableCell wrap>
              {{ row.planContent }}
            </TableCell>
            <TableCell wrap>
              {{ row.usagePeriod }}
            </TableCell>
            <TableCell wrap>
              {{ row.salesPeriod }}
            </TableCell>
            <TableCell>
              {{ row.limit }}
            </TableCell>
            <TableCell>
              <Dropdown
                v-model:value="row.adults"
                placeholder="0"
                size="small"
                width="64px"
                @update:value="countPeople"
              >
                <DropdownItem
                  v-for="(option, i) in numericDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
            <TableCell>
              <Dropdown
                v-model:value="row.children"
                placeholder="0"
                size="small"
                width="64px"
                @update:value="countPeople"
              >
                <DropdownItem
                  v-for="(option, i) in numericDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
            <TableCell>
              <Dropdown
                v-model:value="row.smallChildren"
                placeholder="0"
                size="small"
                width="64px"
                @update:value="countPeople"
              >
                <DropdownItem
                  v-for="(option, i) in numericDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
            <TableCell>
              <Dropdown
                v-model:value="row.babies"
                placeholder="0"
                size="small"
                width="64px"
                @update:value="countPeople"
              >
                <DropdownItem
                  v-for="(option, i) in numericDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <Text bold>プラン設定人数合計</Text>
      <span class="util-flex util-flex--column-gap8 util-ml-24 util-mr-16">
        <Text color="light" size="2xs">大人</Text>
        <Text
          cold
          :color="totalAdults != '0' ? 'critical' : 'main'"
          size="large"
          >{{ totalAdults }}
        </Text>
        <Text color="light" size="2xs">中人</Text>
        <Text
          cold
          :color="totalChildren != '0' ? 'critical' : 'main'"
          size="large"
          >{{ totalChildren }}
        </Text>
        <Text color="light" size="2xs">小人</Text>
        <Text
          cold
          :color="totalSmallChildren != '0' ? 'critical' : 'main'"
          size="large"
          >{{ totalSmallChildren }}
        </Text>
        <Text color="light" size="2xs">幼児</Text>
        <Text
          cold
          :color="totalBabies != '0' ? 'critical' : 'main'"
          size="large"
          >{{ totalBabies }}
        </Text>
      </span>
      <Button size="large" width="200px">設定変更</Button>
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
import TextField from '../components/TextField/TextField.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import DatePicker from '../components/DatePicker/DatePicker.vue';
import Dropdown from '../components/Dropdown/Dropdown.vue';
import DropdownItem from '../components/Dropdown/DropdownItem.vue';
import Checkbox from '../components/Checkbox/Checkbox.vue';

const open = ref(true);

const planId = ref('');
const planName = ref('');

const totalAdults = ref('0');
const totalChildren = ref('0');
const totalSmallChildren = ref('0');
const totalBabies = ref('0');

const rowsData = ref([
  {
    id: 'row-1',
    checked: true,
    planId: 'AAA',
    planName:
      '雄大な絶景を望む！裏磐梯ロープウェイ往復乗車券付プラン|1泊2食付き雄大な',
    planContent: '1泊 2食付 裏磐梯ロープウェイ往復乗車券付き',
    usagePeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    salesPeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    limit: '1~5名',
    adults: '0',
    children: '0',
    smallChildren: '0',
    babies: '0',
  },
  {
    id: 'row-2',
    checked: true,
    planId: 'AAA',
    planName:
      '雄大な絶景を望む！裏磐梯ロープウェイ往復乗車券付プラン|1泊2食付き雄大な',
    planContent: '1泊 2食付 裏磐梯ロープウェイ往復乗車券付き',
    usagePeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    salesPeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    limit: '1~5名',
    adults: '0',
    children: '0',
    smallChildren: '0',
    babies: '0',
  },
  {
    id: 'row-3',
    checked: false,
    planId: 'AAA',
    planName:
      '雄大な絶景を望む！裏磐梯ロープウェイ往復乗車券付プラン|1泊2食付き雄大な',
    planContent: '1泊 2食付 裏磐梯ロープウェイ往復乗車券付き',
    usagePeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    salesPeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    limit: '1~5名',
    adults: '0',
    children: '0',
    smallChildren: '0',
    babies: '0',
  },
  {
    id: 'row-4',
    checked: false,
    planId: 'AAA',
    planName:
      '雄大な絶景を望む！裏磐梯ロープウェイ往復乗車券付プラン|1泊2食付き雄大な',
    planContent: '1泊 2食付 裏磐梯ロープウェイ往復乗車券付き',
    usagePeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    salesPeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    limit: '1~5名',
    adults: '0',
    children: '0',
    smallChildren: '0',
    babies: '0',
  },
  {
    id: 'row-5',
    checked: false,
    planId: 'AAA',
    planName:
      '雄大な絶景を望む！裏磐梯ロープウェイ往復乗車券付プラン|1泊2食付き雄大な',
    planContent: '1泊 2食付 裏磐梯ロープウェイ往復乗車券付き',
    usagePeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    salesPeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    limit: '1~5名',
    adults: '0',
    children: '0',
    smallChildren: '0',
    babies: '0',
  },
  {
    id: 'row-6',
    checked: false,
    planId: 'AAA',
    planName:
      '雄大な絶景を望む！裏磐梯ロープウェイ往復乗車券付プラン|1泊2食付き雄大な',
    planContent: '1泊 2食付 裏磐梯ロープウェイ往復乗車券付き',
    usagePeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    salesPeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    limit: '1~5名',
    adults: '0',
    children: '0',
    smallChildren: '0',
    babies: '0',
  },
  {
    id: 'row-7',
    checked: false,
    planId: 'AAA',
    planName:
      '雄大な絶景を望む！裏磐梯ロープウェイ往復乗車券付プラン|1泊2食付き雄大な',
    price: '¥2,200',
    planContent: '1泊 2食付 裏磐梯ロープウェイ往復乗車券付き',
    usagePeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    salesPeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    limit: '1~5名',
    adults: '0',
    children: '0',
    smallChildren: '0',
    babies: '0',
  },
  {
    id: 'row-8',
    checked: false,
    planId: 'AAA',
    planName:
      '雄大な絶景を望む！裏磐梯ロープウェイ往復乗車券付プラン|1泊2食付き雄大な',
    price: '¥3,300',
    planContent: '1泊 2食付 裏磐梯ロープウェイ往復乗車券付き',
    usagePeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    salesPeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    limit: '1~5名',
    adults: '0',
    children: '0',
    smallChildren: '0',
    babies: '0',
  },
  {
    id: 'row-9',
    checked: false,
    planId: 'AAA',
    planName:
      '雄大な絶景を望む！裏磐梯ロープウェイ往復乗車券付プラン|1泊2食付き雄大な',
    price: '¥1,080',
    planContent: '1泊 2食付 裏磐梯ロープウェイ往復乗車券付き',
    usagePeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    salesPeriod: '2022/9/17/(土) ～ 2022/11/5/(土) ',
    limit: '1~5名',
    adults: '0',
    children: '0',
    smallChildren: '0',
    babies: '0',
  },
]);

const numericDropdownOptions = [
  {
    label: '0',
    value: '0',
  },
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];

const onCloseDialog = () => {
  open.value = false;
};

const onCheckRow = (id: string) => {
  const row = rowsData.value.find((row) => row.id === id);
  if (row) {
    row.checked = !row.checked;
  }
  countPeople();
};

const countPeople = () => {
  let adultsCount = 0;
  let childrenCount = 0;
  let smallChildrenCount = 0;
  let babiesCount = 0;
  rowsData.value
    .filter((x) => x.checked)
    .forEach((x) => {
      adultsCount += Number(x.adults);
      childrenCount += Number(x.children);
      smallChildrenCount += Number(x.smallChildren);
      babiesCount += Number(x.babies);
    });
  totalAdults.value = String(adultsCount);
  totalChildren.value = String(childrenCount);
  totalSmallChildren.value = String(smallChildrenCount);
  totalBabies.value = String(babiesCount);
};
</script>

<style scoped lang="scss"></style>
