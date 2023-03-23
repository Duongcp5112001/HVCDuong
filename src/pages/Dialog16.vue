<template>
  <Button @click="open = true ; disabled = true">Open Dialog</Button>
  <Dialog :open="open" size="large" @close-dialog="onCloseDialog" @vnode-before-update="onCheckButtonDisabled()">
    <template #header>
      <Text size="xl" bold>手配品・備品</Text>
    </template>
    <Panel class="util-mb-16" color="dark" width="100%">
      <span class="util-flex util-flex--align-end util-flex--column-gap16">
        <FieldContainer label="手配品・備品" width="272px">
          <Dropdown v-model:value="supply" size="small" width="272px">
            <DropdownItem
              v-for="(option, i) in supplyDropdownOptions"
              :key="i"
              :label="option.label"
              :value="option.value"
            >
            </DropdownItem>
          </Dropdown>
        </FieldContainer>
        <FieldContainer label="品名・コード" width="272px">
          <Dropdown v-model:value="code" size="small" width="272px">
            <DropdownItem
              v-for="(option, i) in codeDropdownOptions"
              :key="i"
              :label="option.label"
              :value="option.value"
            >
            </DropdownItem>
          </Dropdown>
        </FieldContainer>
        <Button color="neutral" icon="search">検索</Button>
      </span>
    </Panel>
    <template #table>
      <Table width="100%">
        <template #head>
          <TableRow id="head-row-1">
            <TableColumn id="col-2" min-width="56px" text-align="center">
              <Checkbox
                :checked="getAllIsChecked()"
                :indeterminate="getAllIsIndeterminate()"
                @input="onCheckAll()"
              />
            </TableColumn>
            <TableColumn id="col-3" min-width="520px" can-sort>
              品名
            </TableColumn>
            <TableColumn id="col-4" min-width="174px">数量</TableColumn>
            <TableColumn id="col-5" min-width="64px">一括追加</TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow v-for="row in rowsData" :id="row.id" :key="row.id">
            <TableCell text-align="center">
              <Checkbox :checked="row.checked" @input="onCheckRow(row.id)" />
            </TableCell>
            <TableCell>
              <span class="util-flex util-flex--justify-between">
                {{ row.supplyName }}
                <Text color="light" size="xs">
                  <span v-if="row.price">{{ row.price }} / 泊</span>
                </Text>
              </span>
            </TableCell>
            <TableCell>
              <TextField placeholder="0" width="80px" v-model="row.valueTextField"></TextField>
              <span v-if="row.maxQuantity" class="util-ml-8">
                <Text color="light" size="xs">/ {{ row.maxQuantity }}</Text>
              </span>
            </TableCell>
            <TableCell text-align="center">
              <Checkbox v-if="row.massAddition" :checked="false" />
            </TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <Button size="large" width="200px" :disabled="disabled" @click="">登録</Button>
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
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import Dropdown from '../components/Dropdown/Dropdown.vue';
import DropdownItem from '../components/Dropdown/DropdownItem.vue';
import Checkbox from '../components/Checkbox/Checkbox.vue';
import TextField from '../components/TextField/TextField.vue';
import { resolve } from 'path';
import { reject } from 'lodash';


const open = ref(true);

const supply = ref('');
const code = ref('');
const disabled = ref(true);

const supplyDropdownOptions = [
  {
    label: '浴衣',
    value: 'item1',
  },
  {
    label: '電気ケトル',
    value: 'item2',
  },
  {
    label: 'ベビーベッド',
    value: 'item3',
  },
];

const codeDropdownOptions = [
  {
    label: '0001',
    value: '0001',
  },
  {
    label: '0002',
    value: '0002',
  },
  {
    label: '0003',
    value: '0003',
  },
];

const rowsData = ref([
  {
    id: 'row-1',
    checked: false,
    supplyName: '浴衣S',
    maxQuantity: undefined,
    massAddition: true,
    valueTextField: 0,
  },
  {
    id: 'row-2',
    checked: false,
    supplyName: '浴衣M',
    maxQuantity: undefined,
    massAddition: true,
    valueTextField: 0,
  },
  {
    id: 'row-3',
    checked: false,
    supplyName: '浴衣L',
    maxQuantity: undefined,
    massAddition: true,
    valueTextField: 0,
  },
  {
    id: 'row-4',
    checked: false,
    supplyName: '子供用浴衣',
    maxQuantity: undefined,
    massAddition: true,
    valueTextField: 0,
  },
  {
    id: 'row-5',
    checked: false,
    supplyName: 'ロープウェイ往復乗車券',
    maxQuantity: undefined,
    massAddition: true,
    valueTextField: 0,
  },
  {
    id: 'row-6',
    checked: false,
    supplyName: '電気ケトル',
    maxQuantity: 6,
    massAddition: false,
    valueTextField: 0,
  },
  {
    id: 'row-7',
    checked: false,
    supplyName: 'ペットケージ小・中型',
    price: '¥2,200',
    maxQuantity: 8,
    massAddition: false,
    valueTextField: 0,
  },
  {
    id: 'row-8',
    checked: false,
    supplyName: 'ペットケージ大型',
    price: '¥3,300',
    maxQuantity: 3,
    massAddition: false,
    valueTextField: 0,
  },
  {
    id: 'row-9',
    checked: false,
    supplyName: 'ベビーベッド',
    price: '¥1,080',
    maxQuantity: 22,
    massAddition: false,
    valueTextField: 0,
  },
]);

const onCloseDialog = () => {
  open.value = false;
};

const onCheckRow = (id: string) => {
  const row = rowsData.value.find((row) => row.id === id);
  if (row) {
    row.checked = !row.checked;
  };
};

const getAllIsChecked = () => {
  return (
    rowsData.value.filter((options) => options.checked === true).length ===
    rowsData.value.length
  );
};

const getAllIsIndeterminate = () => {
  const checkedOptions = rowsData.value.filter((row) => row.checked);
  return (
    checkedOptions.length > 0 && checkedOptions.length < rowsData.value.length
  );
};

const onCheckAll = () => {
  const isChecked = getAllIsChecked();
  rowsData.value.forEach((row) => {
    row.checked = !isChecked;
  });
};

const checkTypeDataNumberMethod = (checkTypeDataNumber: any) => {
  for (var i = 0; i < checkTypeDataNumber.length; i++) {
    console.log("method number");
    const con1 = checkTypeDataNumber[i].maxQuantity as number >= checkTypeDataNumber[i].valueTextField;
    const con2 = checkTypeDataNumber[i].valueTextField > 0;
    const con3 = checkTypeDataNumber[i].valueTextField == 0 || checkTypeDataNumber[i].valueTextField == null;
    if (con1 && con2) {
      disabled.value = false;
    } else if (con3) {
      disabled.value = true;
      break;
    } else {
      disabled.value = true;
      break;
    }
  }
};

const checkTypeDataUndefinedMethod = (checkTypeDataUndefine: any) => {
  for (var i = 0; i < checkTypeDataUndefine.length; i++) {
    console.log("method Undefined");
    const con1 = checkTypeDataUndefine[i].valueTextField > 0;
    const con2 = checkTypeDataUndefine[i].valueTextField == 0 || checkTypeDataUndefine[i].valueTextField == null;
    if (con1) {
      disabled.value = false;
    } else if (con2) {
      disabled.value = true;
      break;
    } else {
      disabled.value = true;
      break;
    }
  }
} 

const onCheckButtonDisabled = () => {
  const rowValue = rowsData.value.filter((row) => row.checked === true);
  if(rowValue.length > 0){
    const checkTypeDataNumber = rowValue.filter((row) => typeof row.maxQuantity == 'number');
    const checkTypeDataUndefine = rowValue.filter((row) => typeof row.maxQuantity == 'undefined');
    if (checkTypeDataNumber.length > 0 && checkTypeDataUndefine.length > 0) {
      checkTypeDataUndefinedMethod(checkTypeDataUndefine); 
      checkTypeDataNumberMethod(checkTypeDataNumber);
    } else if (checkTypeDataNumber.length > 0 && checkTypeDataUndefine.length <= 0) {
      checkTypeDataNumberMethod(checkTypeDataNumber);
    } else if (checkTypeDataNumber.length <= 0 && checkTypeDataUndefine.length > 0) {
      checkTypeDataUndefinedMethod(checkTypeDataUndefine);
    } else {
      disabled.value = true;
    }
  } else {
    disabled.value = true;
  }
}
</script>

<style scoped lang="scss"></style>
