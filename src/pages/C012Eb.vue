<template>
  <QuickReservationDialog
      :open="openQuickReservationDialog"
      @close-dialog="closeQuickReservationDialog"
  ></QuickReservationDialog>
  <QuickReservationErrorDialog
      :open="openQuickReservationErrorDialog"
      @close-dialog="closeQuickReservationErrorDialog"
      :startDate="selectedDate"
      :numberOfRoom="numberRoom"
      :numberOfNight="numberNight"
      :numberOfAdult="numberAdult"
      :numberOfChildren="numberChildren"
      :numberOfSmallChildren="numberSmallChildren"
      :numberOfBaby="numberBaby"
  ></QuickReservationErrorDialog>
  <div class="lay-container lay-container--3panes">
    <the-sidebar/>
    <main class="lay-main">
      <div class="lay-main__container">
        <Tabs :selected-index="selectedTab" @change="onChangeTab">
          <Tab>予約</Tab>
          <Tab>利用券指定予約</Tab>
          <Tab>ビジター予約</Tab>
          <Tab>法人代行予約</Tab>
        </Tabs>
        <Panel v-if="selectedTab === 2" color="dark">
          <span class="util-flex util-flex--align-center">
            <span class="util-flex util-flex--column util-full-width">
              <span
                class="
                  util-flex util-flex--align-center util-flex--gap16
                  util-mb-16
                  util-flex--wrap
                "
              >
                <FieldContainer label="宿泊施設" width="416px" required>
                  <Dropdown
                    v-model:value="facilitiesSelection"
                    placeholder=""
                    size="small"
                    width="416px"
                    :error="v$.facilitiesSelection.$errors.length > 0"
                  >
                    <DropdownItem
                      v-for="(option, i) in listHotels"
                      :key="i"
                      :label="option.name"
                      :value="option.hotel_id"
                    >
                    </DropdownItem>
                  </Dropdown>
                </FieldContainer>

                <FieldContainer label="部屋タイプ" width="272px">
                  <Dropdown
                    v-model:value="roomTypeSelection"
                    placeholder=""
                    size="small"
                    width="272px"
                    :disabled="facilitiesSelection === '' || isRoomTypeSelectable"
                  >
                    <DropdownItem
                      v-for="(option) in listRoomtypes"
                      :key="option.room_type_id"
                      :label="option.name"
                      :value="`${option.room_type_id}_${facilitiesSelection}`"
                    >
                    </DropdownItem>
                  </Dropdown>
                </FieldContainer>

                <FieldContainer label="宿泊日" required>
                  <DatePicker
                    size="small"
                    :date="selectedDate"
                    @change-date="onChangeDate"
                  />
                </FieldContainer>
                <span class="util-flex util-flex--align-end">
                  <FieldContainer label="泊数" width="64px" required>
                    <Dropdown
                      v-model:value="numberNight"
                      placeholder="0"
                      size="small"
                      width="64px"
                    >
                      <DropdownItem
                        v-for="(option, i) in numericDropdownOptionsAdultRoomNight"
                        :key="i"
                        :label="option.label"
                        :value="option.value"
                      >
                      </DropdownItem>
                    </Dropdown>
                  </FieldContainer>
                  <Text class="util-ml-4" color="light" bold size="2xs">
                    泊
                  </Text>
                </span>
                <span class="util-flex util-flex--align-end">
                  <FieldContainer label="部屋数" width="64px" required>
                    <Dropdown
                      v-model:value="numberRoom"
                      placeholder="0"
                      size="small"
                      width="64px"
                    >
                      <DropdownItem
                        v-for="(option, i) in numericDropdownOptionsAdultRoomNight"
                        :key="i"
                        :label="option.label"
                        :value="option.value"
                      >
                      </DropdownItem>
                    </Dropdown>
                  </FieldContainer>
                  <Text class="util-ml-4" color="light" bold size="2xs">
                    室
                  </Text>
                </span>
                <span
                  class="util-flex util-flex--align-center util-flex--gap16"
                >
                  <Text color="light" size="2xs"> 一部屋あたり </Text>
                  <span class="util-flex util-flex--align-end">
                    <FieldContainer label="大人" width="64px" required>
                      <Dropdown
                        v-model:value="numberAdult"
                        placeholder="0"
                        size="small"
                        width="64px"
                      >
                        <DropdownItem
                          v-for="(option, i) in numericDropdownOptionsAdultRoomNight"
                          :key="i"
                          :label="option.label"
                          :value="option.value"
                        >
                        </DropdownItem>
                      </Dropdown>
                    </FieldContainer>
                    <Text class="util-ml-4" color="light" bold size="2xs">
                      人
                    </Text>
                  </span>
                  <span class="util-flex util-flex--align-end">
                    <FieldContainer label="中人" width="64px">
                      <Dropdown
                        v-model:value="numberChildren"
                        placeholder="0"
                        size="small"
                        width="64px"
                      >
                        <DropdownItem
                          v-for="(option, i) in numericDropdownOptions"
                          :key="i"
                          :label="option.label"
                          :value="option.value"
                        >
                        </DropdownItem>
                      </Dropdown>
                    </FieldContainer>
                    <Text class="util-ml-4" color="light" bold size="2xs">
                      人
                    </Text>
                  </span>
                  <span class="util-flex util-flex--align-end">
                    <FieldContainer label="小人" width="64px">
                      <Dropdown
                        v-model:value="numberSmallChildren"
                        placeholder="0"
                        size="small"
                        width="64px"
                      >
                        <DropdownItem
                          v-for="(option, i) in numericDropdownOptions"
                          :key="i"
                          :label="option.label"
                          :value="option.value"
                        >
                        </DropdownItem>
                      </Dropdown>
                    </FieldContainer>
                    <Text class="util-ml-4" color="light" bold size="2xs">
                      人
                    </Text>
                  </span>
                  <span class="util-flex util-flex--align-end">
                    <FieldContainer label="幼児" width="64px">
                      <Dropdown
                        v-model:value="numberBaby"
                        placeholder="0"
                        size="small"
                        width="64px"
                      >
                        <DropdownItem
                          v-for="(option, i) in numericDropdownOptions"
                          :key="i"
                          :label="option.label"
                          :value="option.value"
                        >
                        </DropdownItem>
                      </Dropdown>
                    </FieldContainer>
                    <Text class="util-ml-4" color="light" bold size="2xs">
                      人
                    </Text>
                  </span>
                </span>
              </span>
              <span
                class="
                  util-flex
                  util-flex--align-center
                  util-flex--justify-end
                  util-flex--gap16
                "
              >
                <Button
                  size="large"
                  color="neutral"
                  width="240px"
                  @click="onClickCheckAvailableRooms"
                >
                  残室確認／特殊予約
                </Button>
                <Button
                  size="large"
                  width="240px"
                  disabled
                  @click="onClickQuickReservation"
                >
                  クイック予約
                </Button>
              </span>
            </span>
          </span>
        </Panel>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import Button from '../components/Button/Button.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import Tabs from '../components/Tabs/Tabs.vue';
import Tab from '../components/Tabs/Tab.vue';
import {computed, ref, watch, withDefaults} from 'vue';
import Panel from '../components/Panel/Panel.vue';
import DatePicker from '../components/DatePicker/DatePicker.vue';
import Dropdown from '../components/Dropdown/Dropdown.vue';
import DropdownItem from '../components/Dropdown/DropdownItem.vue';
import TheSidebar from "@/containers/TheSidebar.vue";
import {useMembershipHotelsStore} from "@stores/membership/membershipHotels";
import {storeToRefs} from "pinia";
import {MembershipHotelsApiListMembershipHotelsRequest} from "@openapi/membership";
import {useRoomsTypesStore} from "@stores/front/roomTypes";
import {
  CreateReservationRequest, ReservationDynamic,
  ReservationsApiCreateReservationRequest, ReservationStatusId, ReservationClassId,
  RoomTypesApiListRoomTypesRequest, StayPattern
} from "@openapi/front";
import {formatDateSymbol} from "@utils/handleDate";
import {useReservationsStore} from "@stores/front/reservations";
import QuickReservationDialog from '@pages/Dialog/QuickReservationDialog.vue';
import QuickReservationErrorDialog from "@pages/Dialog/QuickReservationErrorDialog.vue";
import {helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

type Props = {
  selectedTab?: number;
};

const props = withDefaults(defineProps<Props>(), {
  selectedTab: 1,
});
const emit = defineEmits<{ (event: 'changeTab', selectedTab: number): void }>();

const selectedTab = ref(props.selectedTab);

/***ListHotelsDropdown***/
let openQuickReservationDialog = ref<boolean>(false)
let openQuickReservationErrorDialog = ref<boolean>(false)
const membershipHotelsStore = useMembershipHotelsStore()
const { data: listHotels } = storeToRefs(membershipHotelsStore)
const isRoomTypeSelectable = ref(false);
const facilitiesSelection = ref<string>('');
const getListHotel = async () => {
  const apiParams = new MembershipHotelsApiListMembershipHotelsRequest()
  apiParams.businessId = import.meta.env.VITE_HVC_BUSINESS_ID
  await membershipHotelsStore.fetch(apiParams)
}
getListHotel()

/*** ListRoomTypesDropdown ***/
const roomTypeStore = useRoomsTypesStore();
let roomTypeSelection = ref<string | undefined>('');
const { data: listRoomtypes } = storeToRefs(roomTypeStore)
const getListRoomtype = async(hotel_id: string) => {
  const apiParams = new RoomTypesApiListRoomTypesRequest()
  apiParams.hotelId = hotel_id
  await roomTypeStore.fetch(apiParams)
}

watch(facilitiesSelection, async (facilitiesSelection: string) => {
  const selectedHotel = listHotels.value.find((hotel) => hotel.hotel_id == facilitiesSelection)
  if(selectedHotel.membership_hotel_type.is_room_type_selectable) {
    isRoomTypeSelectable.value = false
    roomTypeSelection.value = ''
    await getListRoomtype(facilitiesSelection)
  } else {
    isRoomTypeSelectable.value = true
    roomTypeSelection.value = ''
  }
})

const numberNight = ref('1');
const numberRoom = ref('1');
const numberAdult = ref('1');
const numberChildren = ref('0');
const numberSmallChildren = ref('0');
const numberBaby = ref('0');

const numericDropdownOptions = computed(() => {
  const options = [];
  for (let i = 0; i <= 3; i++) {
    options.push({ label: i.toString(), value: i.toString() });
  }
  return options;
});

const numericDropdownOptionsAdultRoomNight = computed(() => {
  const options = [];
  for (let i = 1; i <= 3; i++) {
    options.push({ label: i.toString(), value: i.toString() });
  }
  return options;
});

const selectedDate = ref(new Date());

const onChangeDate = (date: Date) => {
  console.log('onChangeDate', date);
  selectedDate.value = date;
};

const onChangeTab = (tab: number) => {
  console.log('onChangeTab', tab);
  emit('changeTab', tab);
};

const onClickCheckAvailableRooms = () => {
  console.log('clickedCheckAvailableRooms');
};

const reservationsStore = useReservationsStore();
const onClickQuickReservation = async () => {
  console.log('clickedQuickReservation');
  const result = await v$.value.$validate();
  if(!result) return;
  const apiParams = new ReservationsApiCreateReservationRequest();
  const createReservation = new CreateReservationRequest();
  const stayPattern = new StayPattern();
  stayPattern.nights_count = Number(numberNight.value);
  stayPattern.room_type_id = roomTypeSelection.value?.slice(0,-3);
  stayPattern.rooms_count = Number(numberRoom.value);
  stayPattern.sequence = 1;
  stayPattern.stay_date_range_start = formatDateSymbol(selectedDate.value, '-');

  const reservationDynamic = new ReservationDynamic();
  reservationDynamic.reservation_class_id = ReservationClassId.Stay;
  reservationDynamic.reservation_status_id = ReservationStatusId.KeepInventory;
  reservationDynamic.person_count = [
    Number(numberAdult.value),
    Number(numberChildren.value),
    Number(numberSmallChildren.value),
    Number(numberBaby.value)
  ];
  reservationDynamic.stay_patterns = stayPattern;
  createReservation.reservation = reservationDynamic;
  apiParams.hotelId = "18";
  apiParams.createReservationRequest = createReservation;

  await reservationsStore.postReservations(apiParams)
      .then((res)=>{
        openQuickReservationDialog.value = true
      })
      .catch((err)=>{
        openQuickReservationErrorDialog.value = true
      });
};

const closeQuickReservationDialog = () => {
  openQuickReservationDialog.value = false
}
const closeQuickReservationErrorDialog = () => {
  openQuickReservationErrorDialog.value = false
}

/***** vuelidate *****/
const rules = {
  facilitiesSelection: {
    required: helpers.withMessage('This field cannot be empty', required)
  }
}

const v$ = useVuelidate(rules, {
  facilitiesSelection
})

</script>

<style scoped lang="scss"></style>
