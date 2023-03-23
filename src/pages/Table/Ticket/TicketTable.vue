<template>
  <Table width="100%">
    <template #head>
      <TableRow id="head-row-1">
        <TableColumn
            id="col-1"
            rowspan="2"
            width="64px"
            text-align="center"
        >
          代表
        </TableColumn>
        <TableColumn id="col-2" rowspan="2" min-width="105px">
          代表会員権番号
        </TableColumn>
        <TableColumn id="col-3" rowspan="2" min-width="153px">
          ホーム施設
        </TableColumn>
        <TableColumn id="col-4" rowspan="2" min-width="128px">
          有効期限
        </TableColumn>
        <TableColumn
            id="col-5"
            colspan="2"
            min-width="120px"
            text-align="center"
            height="24px"
        >
          使用可能数
        </TableColumn>
        <TableColumn
            id="col-6"
            rowspan="2"
            min-width="72px"
            text-align="center"
        >
          残数合計
        </TableColumn>
        <TableColumn
            id="col-7"
            colspan="2"
            min-width="200px"
            text-align="center"
            height="24px"
        >
          今回利用数
        </TableColumn>
      </TableRow>
      <TableRow id="head-row-2">
        <TableColumn
            id="col-7"
            text-align="center"
            height="24px"
            width="60px"
        >
          ホーム
        </TableColumn>
        <TableColumn
            id="col-7"
            text-align="center"
            height="24px"
            width="60px"
        >
          相互
        </TableColumn>
        <TableColumn
            id="col-7"
            text-align="center"
            height="24px"
            width="100px"
        >
          ホーム
        </TableColumn>
        <TableColumn
            id="col-7"
            text-align="center"
            height="24px"
            width="100px"
        >
          相互
        </TableColumn>
      </TableRow>
    </template>
    <template #body>
      <TableRow
          v-for="(item, index ) in membershipTicketSummaries"
          :id="`row-${index + 1}`"
      >
        <TableCell text-align="center">
          <RadioButton
              :checked="selectedRow.includes(`row-${index+1}`)"
              name="hotel-selection"
              @input="onSelectRow(`row-${index+1}`)"
          />
        </TableCell>
        <TableCell>{{ item.hotel_right_id }}</TableCell>
        <TableCell>{{ item.hotel_name }}</TableCell>
        <TableCell>{{ getValueUseDateEnd(item) }}</TableCell>
        <TableCell text-align="right"> {{ getValueTicketTypes(item, '1') }}</TableCell>
        <TableCell text-align="right">{{getValueTicketTypes(item, '2')}}</TableCell>
        <TableCell text-align="right">
          {{Number(getValueTicketTypes(item, '1')) + Number(getValueTicketTypes(item, '2'))}}
        </TableCell>
        <TableCell>
          <Dropdown
              v-model:value="currentSelectionA[index]"
              placeholder="0"
              size="small"
              width="85px"
              @update:value="countCoupon"
          >
            <DropdownItem
                v-for="(option, i) in getSelectionTicketA(item.ticket_types)"
                :key="i"
                :label="option.label"
                :value="option.value"
            >
            </DropdownItem>
          </Dropdown>
        </TableCell>
        <TableCell>
          <Dropdown
              v-model:value="currentSelectionB[index]"
              placeholder="0"
              size="small"
              width="85px"
              @update:value="countCoupon"
          >
            <DropdownItem
                v-for="(option2, i) in getSelectionTicketB(item.ticket_types)"
                :key="i"
                :label="option2.label"
                :value="option2.value"
            >
            </DropdownItem>
          </Dropdown>
        </TableCell>
      </TableRow>
    </template>
  </Table>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import Table from '@components/Table/Table.vue';
import TableCell from '@components/Table/TableCell.vue';
import TableColumn from '@components/Table/TableColumn.vue';
import TableRow from '@components/Table/TableRow.vue';
import RadioButton from '@components/RadioButton/RadioButton.vue';
import Dropdown from '@components/Dropdown/Dropdown.vue';
import DropdownItem from '@components/Dropdown/DropdownItem.vue';
import {useMembershipTicketSummariesStore} from "@stores/membership/membershipTicketSummaries";
import {storeToRefs} from "pinia";

/*** ticket summary ***/
const ticketSummaryStore = useMembershipTicketSummariesStore()
const {data: membershipTicketSummaries} = storeToRefs(ticketSummaryStore)

const getValueUseDateEnd = (item:any) => {
  return item.use_date_end.split('-').join('/')
}

const getValueTicketTypes = (item: any, typeId: string) => {
  return item.ticket_types.find((i: any) => i.ticket_type_id === typeId)?.number_available || 0
}
const currentSelectionA = ref<string[]>([]);
const currentSelectionB = ref<string[]>([]);

const getSelectionTicketA = (selectionTicket: any) => {
  const totalSelection = selectionTicket.find((item: any) => item.ticket_type_id === '1')?.number_available || 0
  const result = []
  for (let i = 0; i <= totalSelection; i++) {
    result.push({label: i.toString(), value: i.toString()})
  }
  return result
}

const getSelectionTicketB = (selectionTicket: any) => {
  const totalSelection = selectionTicket.find((item: any) => item.ticket_type_id === '2')?.number_available || 0
  const result = []
  for (let i = 0; i <= totalSelection; i++) {
    result.push({label: i.toString(), value: i.toString()})
  }
  return result
}
const emit = defineEmits<{ (e: 'countCoupon', coupon: any): void }>();

const selectedToggleButtonId = ref('content-1');

const countCoupon = () => {
  const initialValue = [...currentSelectionA.value, currentSelectionB.value].filter(item => item && Number(item) > 0).map(item => {
    if(item){
      return Number(item)
    }
  });
  if(initialValue.length > 0){
    const sumWithInitial = initialValue.reduce((accumulator: any, currentValue: any) => Number(accumulator) + Number(currentValue));
    emit('countCoupon', sumWithInitial)
  } else {
    emit('countCoupon', 0)
  }
}

const selectedRow = ref(['row-1']);
const onSelectRow = (rowId: string) => {
  selectedRow.value = [rowId]
};

const onClickToggleButton = (id: string) => {
  console.log('clicked toggle button: ', id);
  selectedToggleButtonId.value = id;
};

const onClickMakeReservation = () => {
  console.log('onClickMakeReservation');
};

const onClickMakeQuickReservation = () => {
  console.log('onClickMakeQuickReservation');
};



</script>

<style scoped>

</style>
