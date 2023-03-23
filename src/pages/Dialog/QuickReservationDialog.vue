<template>
  <ReservationConfirmDialog
      :open="openReservationConfirmDialog"
      @close-dialog="closeReservationConfirmDialog"
  ></ReservationConfirmDialog>
  <Dialog v-if="reservationInfo" :open="open" @close-dialog="onCloseDialog">
    <template #header>
      <Icon class="util-mr-24" icon="check" color="#236C2D" :size="40"></Icon>
      <Text color="success" size="xl" bold> 部屋を確保しました </Text>
    </template>
    <span class="util-flex util-flex--gap16 util-mb-8">
      <Text bold size="2xs" color="light">予約番号</Text>
      <Text class="util-mr-8" bold size="large">{{reservationInfo?.reservation_number}}</Text>
      <Text bold size="2xs" color="light">利用施設</Text>
      <Text bold size="large">{{reservationInfo?.hotel_name}}</Text>
    </span>
    <Text class="util-mb-8" size="large" line-height="170%">
      {{
       `${formatRangeDate(reservationInfo.stay_patterns.stay_date_range_start, reservationInfo.stay_patterns.stay_date_range_end)} ${reservationInfo?.stay_patterns.nights_count}泊`
      }}
    </Text>
    <template #table>
      <Table :hover-effect="false">
        <template #head>
          <TableRow id="row-1">
            <TableColumn id="col-1" width="144px">宿泊日</TableColumn>
            <TableColumn id="col-2" min-width="99px">部屋タイプ</TableColumn>
            <TableColumn id="col-4" min-width="43px" text-align="center">
              部屋
            </TableColumn>
            <TableColumn id="col-4" min-width="43px" text-align="center">
              泊数
            </TableColumn>
            <TableColumn id="col-4" min-width="43px" text-align="center">
              大人
            </TableColumn>
            <TableColumn id="col-5" min-width="43px" text-align="center">
              中人
            </TableColumn>
            <TableColumn id="col-6" min-width="43px" text-align="center">
              小人
            </TableColumn>
            <TableColumn id="col-7" min-width="43px" text-align="center">
              幼児
            </TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow id="row-2">
            <TableCell>{{formatStartDate(reservationInfo.stay_patterns.stay_date_range_start)}}</TableCell>
            <TableCell>{{reservationInfo.stay_patterns?.room_type_id}}</TableCell>
            <TableCell text-align="right">{{reservationInfo.stay_patterns?.rooms_count}}</TableCell>
            <TableCell text-align="right">{{reservationInfo.stay_patterns?.nights_count}}</TableCell>
            <TableCell text-align="right">{{reservationInfo?.person_count[0]}}</TableCell>
            <TableCell text-align="right">{{reservationInfo?.person_count[1]}}</TableCell>
            <TableCell text-align="right">{{reservationInfo?.person_count[2]}}</TableCell>
            <TableCell text-align="right">{{reservationInfo?.person_count[3]}}</TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <Button
          class="util-mr-16"
          size="large"
          color="neutral"
          type="outlined"
          @click="onClickDeleteReservation"
      >
        別の予約を取る
      </Button>
      <Button size="large" width="160px" @click="onClickReservationDetails">
        予約詳細
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '@components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '@components/Dialog/Dialog.vue';
import Button from '@components/Button/Button.vue';
import Icon from '@components/Icon/Icon.vue';
import Table from '@components/Table/Table.vue';
import TableCell from '@components/Table/TableCell.vue';
import TableColumn from '@components/Table/TableColumn.vue';
import TableRow from '@components/Table/TableRow.vue';
import ReservationConfirmDialog from '@pages/Dialog/ReservationConfirmDialog.vue';
import {storeToRefs} from "pinia";
import router from "@/router";
import {formatDateJp, getDayOfWeek} from "@utils/handleDate";
import {useMembershipReservationsStore} from "@stores/membership/membershipReservation";

const {data: reservationInfo} = storeToRefs(useMembershipReservationsStore());
const formatStartDate = (startDate: string)=>{
  const dayOfWeek = getDayOfWeek(new Date(startDate));
  return startDate.split('-').join("/") + `(${dayOfWeek})`;
}
const formatRangeDate = (startDate: string, endDate: string) =>{
  return `${formatDateJp(new Date(startDate))} ~ ${formatDateJp( new Date(endDate))}`
}

const props = withDefaults(
    defineProps<{
      open: boolean
    }>(),
    {
      open: false
    }
);
const emit = defineEmits<{ (event: 'closeDialog'): void }>();

const onCloseDialog = () => {
  emit('closeDialog');
};

const onClickDeleteReservation = () => {
  console.log('onClickDeleteReservation');
};
let openReservationConfirmDialog = ref<boolean>(false)

const onClickReservationDetails = () => {
  router.push({name: "C03A"})
};
const closeReservationConfirmDialog = () => {
  openReservationConfirmDialog.value = false
}
</script>

<style scoped>

</style>