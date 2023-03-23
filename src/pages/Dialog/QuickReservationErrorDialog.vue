<template>
  <Dialog :open="open" @close-dialog="onCloseDialog">
    <template #header>
      <Icon
          class="util-mr-24"
          icon="warning_amber"
          color="#BA1A1A"
          :size="40"
      ></Icon>
      <Text color="critical" size="xl" bold>部屋の確保ができませんでした </Text>
    </template>
    <span class="util-flex util-flex--gap16 util-mb-8">
      <Text bold size="2xs" color="light">利用施設</Text>
      <Text bold size="large">{{ facilityName }}</Text>
    </span>
    <Text class="util-mb-8" size="large" line-height="170%">
      {{ formatRangeDate }} {{ numberOfNight }}泊
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
            <TableCell>{{ `${formatedDate}(${dayOfWeek})` }}</TableCell>
            <TableCell><Text color="critical"> 残室なし </Text></TableCell>
            <TableCell text-align="right">{{ numberOfRoom || '0' }}</TableCell>
            <TableCell text-align="right">{{ numberOfNight || '0' }}</TableCell>
            <TableCell text-align="right">{{ numberOfAdult || '0' }}</TableCell>
            <TableCell text-align="right">{{ numberOfChildren || '0' }}</TableCell>
            <TableCell text-align="right">{{ numberOfSmallChildren || '0' }}</TableCell>
            <TableCell text-align="right">{{ numberOfBaby || '0' }}</TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <Button size="large" width="160px" @click="onClickRemainningRoomConfirm">
        残室確認
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '@components/Text/Text.vue';
import {computed, ref} from 'vue';
import Dialog from '@components/Dialog/Dialog.vue';
import Button from '@components/Button/Button.vue';
import Icon from '@components/Icon/Icon.vue';
import Table from '@components/Table/Table.vue';
import TableCell from '@components/Table/TableCell.vue';
import TableColumn from '@components/Table/TableColumn.vue';
import TableRow from '@components/Table/TableRow.vue';
import { getDayOfWeek, formatDateSymbol, addDateToDay,formatDateJp} from "@utils/handleDate"
const props = withDefaults(
    defineProps<{
      startDate : Date
      numberOfRoom : string
      numberOfNight: string
      numberOfAdult : string
      numberOfChildren : string
      numberOfSmallChildren : string
      numberOfBaby : string
      facilityName: string
    }>(), {}
);

const emit = defineEmits<{ (event: 'openRemainningRoomConfirm'): void }>();

const formatedDate = computed(() => formatDateSymbol(props.startDate, '/'))
const dayOfWeek = computed(() => getDayOfWeek(props.startDate))
const endDate = computed(() => addDateToDay(props.startDate, Number(props.numberOfNight)))
const formatRangeDate = computed(() => `${formatDateJp(props.startDate)}(${getDayOfWeek(props.startDate)}) ~ ${formatDateJp(endDate.value)}(${getDayOfWeek(endDate.value)})` )

const open = ref(true);

const onCloseDialog = () => {
  open.value = false;
};

const onClickRemainningRoomConfirm = () => {
  console.log('onClickReservationDetails');
  emit('openRemainningRoomConfirm');
};
</script>

<style scoped lang="scss"></style>
