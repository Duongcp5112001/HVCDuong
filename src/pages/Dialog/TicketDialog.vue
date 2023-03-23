<template>
  <Dialog
      :open="open"
      size="large"
      custom-height="760px"
      @close-dialog="onCloseDialog"
      @open-dialog="onOpenDialog"
  >
    <RemainingRoomDialog
        :open="openReservationDialog"
        :ticketSelected="selectedToggleButtonId === 'content-1' ? '利用券' : '譲渡利用券'"
        :numberSelected="totalSelected"
        :isShowArrow="true"
        :hotelName="facilityName"
        @close-dialog="onCloseReservationDialog"
    ></RemainingRoomDialog>
    <template #header>
      <Text size="xl" bold> 使用利用券設定 </Text>
    </template>
    <span class="util-flex util-flex--gap16 util-mb-16">
      <Text bold size="2xs" color="light">利用施設</Text>
      <Text class="util-mr-8" bold size="large">{{ facilityName }}</Text>
      <Text bold size="2xs" color="light">利用開始日</Text>
      <Text bold size="large">{{ formatDateJp(startDate) }}({{ getDayOfWeek(startDate) }})</Text>
      <Text bold size="2xs" color="light">泊数</Text>
      <Text class="util-mr-8" bold size="large">{{ numberOfNight }}泊</Text>
      <Text bold size="2xs" color="light">部屋数</Text>
      <Text bold size="large">{{ numberOfRoom }}部屋</Text>
    </span>
    <ToggleButtonSet
        class="util-mb-16"
        :selected-id="selectedToggleButtonId"
        width="291px"
        type="outlined"
        @click-item="onClickToggleButton"
    >
      <ToggleButton
          id="content-1"
          custom-icon="tickets"
          :counter="totalCoupon"
      >
        利用券
      </ToggleButton>
      <ToggleButton
          id="content-2"
          custom-icon="ticket_in"
          :counter="totalTranferTicket"
      >
        譲渡利用券
      </ToggleButton>
    </ToggleButtonSet>
    <KeepAlive>
      <TicketTable v-if="selectedToggleButtonId === 'content-1' " @count-coupon="getTotalCoupon"></TicketTable>
      <TransferTicketTable v-else @count-transfer-ticket="getTotalTransferTicket"></TransferTicketTable>
    </KeepAlive>
    <template #footer>
      <span class="util-flex util-flex--align-center util-flex--gap16">
        <Text bold size="2xs" color="light">合計設定枚数</Text>
        <Text bold size="large">{{ totalSelected }}</Text>
        <Button
            size="large"
            color="neutral"
            width="240px"
            @click="onClickMakeReservation"
        >
          残室確認／詳細設定予約
        </Button>
        <Button size="large" width="200px" @click="onClickMakeQuickReservation">
          クイック予約
        </Button>
      </span>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '@components/Text/Text.vue';
import {computed, ref, watch} from 'vue';
import Dialog from '@components/Dialog/Dialog.vue';
import Button from '@components/Button/Button.vue';
import ToggleButtonSet from '@components/ToggleButton/ToggleButtonSet.vue';
import ToggleButton from '@components/ToggleButton/ToggleButton.vue';
import TicketTable from '@pages/Table/Ticket/TicketTable.vue'
import TransferTicketTable from '@pages/Table/Ticket/TransferTicketTable.vue'
import RemainingRoomDialog from '@pages/Dialog/RemainingRoomDialog.vue';
import {formatDateJp, getDayOfWeek} from "@utils/handleDate";
import {storeToRefs} from "pinia";
import {useMembershipHotelsStore} from "@stores/membership/membershipHotels";

const props = withDefaults(
    defineProps<{
      open: boolean
      startDate : Date
      numberOfRoom : string
      numberOfNight: string
      numberOfAdult : string
      numberOfChildren : string
      numberOfSmallChildren : string
      numberOfBaby : string
      facility: string
    }>(),
    {
      open: false
    }
);
const emit = defineEmits<{
  (event: 'closeDialog'): void
  (event: 'openDialog'): void
}>();

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

/** get total ticket **/
const totalTranferTicket = ref<number>(0)
const getTotalTransferTicket = (ticketsData: TicketData[] | undefined) => {
  totalTranferTicket.value = <number>ticketsData?.length
}
const totalCoupon = ref<number>(0)
const getTotalCoupon = (params: any) => {
  totalCoupon.value = params
}
const totalSelected = ref(0)
watch(
    () => totalCoupon.value,
    (value) => {
      totalSelected.value = value + totalTranferTicket.value;
    },
    { immediate: true }
);
watch(
    () => totalTranferTicket.value,
    (value) => {
      totalSelected.value = value + totalCoupon.value;
    },
    { immediate: true }
);

/** **/

const onCloseDialog = () => {
  emit('closeDialog');
};

const onOpenDialog = () => {
  emit('openDialog');
}

const onClickMakeQuickReservation = () => {
  console.log('onClickMakeQuickReservation');
};

const selectedToggleButtonId = ref('content-1');
const onClickToggleButton = (id: string) => {
  selectedToggleButtonId.value = id;
};

/*** facility name ***/
const membershipCustomerStore = useMembershipHotelsStore()
const {data: listHotels} = storeToRefs(membershipCustomerStore)
const facilityName =  computed(() => {
   return listHotels.value?.find(elems => elems.hotel_id === props.facility)?.name
})

/*** open reservation dialog ***/
let openReservationDialog = ref<boolean>(false)
const onClickMakeReservation = () => {
  openReservationDialog.value = true
  onCloseDialog()
};
const onCloseReservationDialog = () => {
  openReservationDialog.value = false
  onOpenDialog()
}




</script>

<style scoped>

</style>