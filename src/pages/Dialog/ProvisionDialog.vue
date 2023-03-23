<template>
  <Dialog :open="open" size="large" @close-dialog="onCloseDialog" :customHeight="`calc(100% - 80px)`">
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
                v-for="(option, i) in provisionItems"
                :key="i"
                :label="option.name"
                :value="option.provision_item_id"
            >
            </DropdownItem>
          </Dropdown>
        </FieldContainer>
        <Button color="neutral" icon="search" @click="onSearch">検索</Button>
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
            <!--            <TableColumn id="col-5" min-width="64px">一括追加</TableColumn>-->
          </TableRow>
        </template>
        <template #body>
          <TableRow v-for="(row, index) in provisionInventories" :id="row.provision_item_id" :key="index">
            <TableCell text-align="center">
              <Checkbox :checked="row.checked" @input="onCheckRow(row)" />
            </TableCell>
            <TableCell>
              <span class="util-flex util-flex--justify-between">
                {{ row.name }}
                <!--                <Text color="light" size="xs">-->
                <!--                  <span v-if="row.tentative">{{ row.tentative }} / 泊</span>-->
                <!--                </Text>-->
              </span>
            </TableCell>
            <TableCell>
              <TextField placeholder="0" width="80px"></TextField>
              <span v-if="row.sequence" class="util-ml-8">
                <Text color="light" size="xs">/ {{ row.sequence }}</Text>
              </span>
            </TableCell>
            <!--            <TableCell text-align="center">-->
            <!--              <Checkbox v-if="row.waiting" :checked="false" />-->
            <!--            </TableCell>-->
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <Button size="large" width="200px" @click="onRegister">登録</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '@components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '@components/Dialog/Dialog.vue';
import Button from '@components/Button/Button.vue';
import Panel from '@components/Panel/Panel.vue';
import Table from '@components/Table/Table.vue';
import TableCell from '@components/Table/TableCell.vue';
import TableColumn from '@components/Table/TableColumn.vue';
import TableRow from '@components/Table/TableRow.vue';
import FieldContainer from '@components/FieldContainer/FieldContainer.vue';
import Dropdown from '@components/Dropdown/Dropdown.vue';
import DropdownItem from '@components/Dropdown/DropdownItem.vue';
import Checkbox from '@components/Checkbox/Checkbox.vue';
import TextField from '@components/TextField/TextField.vue';
import { useProvisionInventories } from '@stores/front/provisionInventories'
import { useProvisionItems } from '@stores/front/provisionItems'
import {
  ExtraServiceItemGroup,
  ProvisionItem,
  ProvisionItemsApiListProvisionItemsRequest
} from '@openapi/front/api'

const props = withDefaults(
    defineProps<{
      open: boolean
    }>(),
    {
      open: false
    }
);
const emit = defineEmits<{ (event: 'closeDialog'): void, (event: 'register', arr: ExtraServiceItemGroup[] | undefined): void }>();

const supply = ref('');
const code = ref('');

const supplyDropdownOptions = [
  {
    label: '手配品',
    value: 'false',
  },
  {
    label: '備品',
    value: 'true',
  },
  {
    label: '全て',
    value: 'null',
  }
];

const provisionInventories = ref<ExtraServiceItemGroup[] | undefined>([])
const storeProvisionInventories = useProvisionInventories();
const getProvisionInventories = async () => {
  const apiParams = new ProvisionItemsApiListProvisionItemsRequest()
  apiParams.hotelId = '18'
  apiParams.isProvisionHasInventory = supply.value === 'true' ? true : supply.value === 'false' ? false : undefined
  apiParams.provisionItemId = code.value
  await storeProvisionInventories.fetch(apiParams);
  provisionInventories.value = storeProvisionInventories.data?.map(item => {
    return {
      ...item,
      checked: false,
    }
  })
}
getProvisionInventories()

const provisionItems = ref<ProvisionItem[] | undefined>([])
const storeProvisionItems = useProvisionItems()
const getProvisionItems = async () => {
  const apiParams = new ProvisionItemsApiListProvisionItemsRequest()
  apiParams.hotelId = '18'
  await storeProvisionItems.fetch(apiParams)
  provisionItems.value = storeProvisionItems.data
}
getProvisionItems()

const onCloseDialog = () => {
  supply.value = ''
  code.value = ''
  getProvisionInventories()
  emit('closeDialog');
}

const onCheckRow = (provision: any) => {
  provision.checked = !provision.checked
};

const getAllIsChecked = () => {
  return (
      provisionInventories.value?.filter((options: any) => options.checked === true).length ===
      provisionInventories.value?.length
  );
};

const getAllIsIndeterminate = () => {
  const checkedOptions = provisionInventories.value?.filter((provision: any) => provision.checked);
  if(!checkedOptions) return
  return (
      checkedOptions.length > 0 && checkedOptions.length < provisionInventories.value.length
  );
};

const onCheckAll = () => {
  const isChecked = getAllIsChecked();
  provisionInventories.value?.forEach((provision: any) => {
    provision.checked = !isChecked;
  });
};

const onRegister = () => {
  const provision = provisionInventories.value?.filter((provision: any) => provision.checked).map(provision => {
    delete provision.checked
    return provision
  })
  supply.value = ''
  code.value = ''
  getProvisionInventories()
  emit('register', provision)
};

const onSearch = async () => {
  const apiParams = new ProvisionItemsApiListProvisionItemsRequest()
  apiParams.hotelId = '18'
  apiParams.isProvisionHasInventory = supply.value === 'true' ? true : supply.value === 'false' ? false : undefined
  apiParams.provisionItemId = code.value
  await storeProvisionInventories.fetch(apiParams);
  provisionInventories.value = storeProvisionInventories.data?.map(item => {
    return {
      ...item,
      checked: false
    }
  })
}

</script>

<style scoped lang="scss"></style>