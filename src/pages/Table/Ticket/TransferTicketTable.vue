<template>
  <Table width="100%">
    <template #head>
      <TableRow id="head-row-1">
        <TableColumn id="col-2" width="56px" text-align="center">
          <Checkbox
              :checked="getAllIsChecked()"
              :indeterminate="getAllIsIndeterminate()"
              @input="onCheckAll()"
          />
        </TableColumn>
        <TableColumn id="col-3" min-width="105px">
          代表会員権番号
        </TableColumn>
        <TableColumn id="col-4" min-width="154px"> ホーム施設 </TableColumn>
        <TableColumn id="col-5" min-width="65px"> 枝番 </TableColumn>
        <TableColumn id="col-6" min-width="79px"> パスコード </TableColumn>
        <TableColumn id="col-7" min-width="132px"> 年度 </TableColumn>
        <TableColumn id="col-8" min-width="132px"> 有効期限 </TableColumn>
        <TableColumn id="col-9" min-width="120px">
          ホーム／相互
        </TableColumn>
      </TableRow>
    </template>
    <template #body>
      <TableRow v-for="row in ticketsData" :id="row.id" :key="row.id">
        <TableCell text-align="center">
          <Checkbox :checked="row.checked" @input="onCheckRow(row.id)" />
        </TableCell>
        <TableCell>{{ row.representativeMemberNumber }}</TableCell>
        <TableCell>{{ row.homeFacility }}</TableCell>
        <TableCell>{{ row.branchNumber }}</TableCell>
        <TableCell>{{ row.passcode }}</TableCell>
        <TableCell>{{ row.fiscalYear }}</TableCell>
        <TableCell>{{ row.expirationDate }}</TableCell>
        <TableCell>{{ row.homeOrMutual === "1" ? 'ホーム' : '相互' }}</TableCell>
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
import Checkbox from '@components/Checkbox/Checkbox.vue';
import { useMembershipTicketStore} from "@stores/membership/membershipTickets";
import {storeToRefs} from "pinia";
interface TicketData {
  id: string,
  checked: boolean,
  representativeMemberNumber: string | undefined,
  homeFacility: string | undefined,
  branchNumber: string,
  passcode: string,
  fiscalYear: string | undefined,
  expirationDate: string | undefined,
  homeOrMutual: string
}

const membershipTicketStore = useMembershipTicketStore()
let {  data: membershipTicket } = storeToRefs(membershipTicketStore)

const emit = defineEmits<{ (e: 'countTransferTicket', ticketsData: TicketData[] | undefined): void }>();
const selectedToggleButtonId = ref('content-2');

/*** tickets data ***/
let ticketsData = ref<TicketData[] | undefined>([])
ticketsData.value = membershipTicket.value?.map((elems, index) => {
  const startYear = Number(elems.use_date_start?.split('-')[0])
  return {
    id: `row-${index + 1}`,
    checked: false,
    representativeMemberNumber: elems.hotel_name,
    homeFacility: elems.hotel_right_id,
    branchNumber: elems.sequence,
    passcode: elems.pass_code,
    fiscalYear: startYear < new Date().getFullYear() ? `${startYear}年(前年)` : `${startYear}年(本年)`,
    expirationDate: elems.use_date_end?.split('-').join('/'),
    homeOrMutual: elems.ticket_type_id
  }
})

const onCheckRow = (id: string) => {
  const row = ticketsData.value?.find((row) => row.id === id);
  if (row) {
    row.checked = !row.checked;
  }
  emit('countTransferTicket', ticketsData.value)
};

const getAllIsChecked = () => {
  return (
      ticketsData.value?.filter((options) => options.checked).length ===
      ticketsData.value?.length
  );
};

const getAllIsIndeterminate = () => {
  const checkedOptions = ticketsData.value?.filter((row) => row.checked);
  return (
      !(checkedOptions && ticketsData.value) || ( checkedOptions.length > 0 && checkedOptions.length < ticketsData.value.length )
  );
};

const onCheckAll = () => {
  const isChecked = getAllIsChecked();
  ticketsData.value?.forEach((row) => {
    row.checked = !isChecked;
  });
  emit('countTransferTicket', ticketsData.value)
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