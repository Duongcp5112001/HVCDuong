<template>
  <Table class="util-mt-8 util-ml-8" width="200px" fixed-layout>
    <template #head>
      <TableRow id="head-row-1">
        <TableColumn id="col-1"> Sample </TableColumn>
      </TableRow>
    </template>
    <template #body>
      <TableRow id="sample-row">
        <TableCell text-align="center">
          <div>
            <div>
              <EditNewReservationPopup
                :new-reservation="reservation"
                :new-reservations="newReservations"
                :day-schedule="daySchedule"
                aligned="left"
                @confirm-update-reservation="onUpdateReservation"
                @cancel-reservation="onCancelReservation"
              >
                <Button>Open Popup</Button>
              </EditNewReservationPopup>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </template>
  </Table>
</template>

<script setup lang="ts">
import {
  DaySchedule,
  NewReservation,
} from '../components/AncillaryFacilities/AncillaryFacilities.vue';
import Button from '../components/Button/Button.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import EditNewReservationPopup from '../components/InlinePopup/variations/EditNewReservationPopup.vue';

const reservation: NewReservation = {
  id: '1',
  categoryId: 'cat-1',
  categoryLabel: 'Category Label',
  label: 'Reservation Label',
  startHour: 7,
  endHour: 12,
  day: 0,
  dayDate: new Date(),
  comments: 'Some comment',
  price: '9999円',
};

const newReservations: NewReservation[] = [];
const daySchedule: DaySchedule = {
  startHour: 6,
  endHour: 18,
  scheduled: [],
};

const onUpdateReservation = (updatedReservation: NewReservation) => {
  console.log('onUpdateReservation', updatedReservation);
};

const onCancelReservation = (id: string) => {
  console.log('onCancelReservation', id);
};
</script>

<style scoped lang="scss"></style>
