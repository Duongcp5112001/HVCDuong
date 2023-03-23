import { ref } from 'vue';
import AncillaryFacilities from '../components/AncillaryFacilities/AncillaryFacilities.vue';
import { ancillaryFacillitiesSampleData } from '../data/ancillaryFacilitiesTestData';

export default {
  title: 'Components/AncillaryFacilities',
  component: AncillaryFacilities,
  argTypes: {},
};

/** Sample 1 */
const Template = (args) => ({
  components: { AncillaryFacilities },

  setup() {
    const categories = ancillaryFacillitiesSampleData();
    const reservationName = ref('田中 太郎');
    const newReservations = ref([]);
    const selectedDate = ref(new Date());
    const currentNewReservationsId = ref(1);

    const onAddReservation = (newReservation) => {
      newReservations.value = [
        ...newReservations.value,
        { ...newReservation, id: `new-${currentNewReservationsId.value}` },
      ];
      currentNewReservationsId.value++;
    };

    const onUpdateReservation = (updatedNewReservation) => {
      newReservations.value = newReservations.value.map((reservation) => {
        if (reservation.id === updatedNewReservation.id) {
          return updatedNewReservation;
        }
        return reservation;
      });
    };

    return {
      args,
      categories,
      reservationName,
      newReservations,
      selectedDate,
      onAddReservation,
      onUpdateReservation,
    };
  },
  template: `<AncillaryFacilities
  v-bind="args"
  :categories="categories"
  :reservation-name="reservationName"
  :new-reservations="newReservations"
  :selected-date="selectedDate"
  @add-reservation="onAddReservation"
  @update-reservation="onUpdateReservation"
  >
  </AncillaryFacilities>`,
});

export const Sample1 = Template.bind({});
Sample1.args = {};
