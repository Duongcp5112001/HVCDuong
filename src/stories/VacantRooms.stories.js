import VacantRooms from '../components/VacantRooms/VacantRooms.vue';
import {
  vacanciesSampleDataPatternA,
  vacanciesSampleDataPatternB,
  vacanciesSampleDataPatternC,
} from '../data/vacantRoomsTestData.ts';

export default {
  title: 'Components/VacantRooms',
  component: VacantRooms,
  argTypes: {},
};

/** Sample 1 */
const Template = (args) => ({
  components: { VacantRooms },

  setup() {
    const sampleData = vacanciesSampleDataPatternA();

    const selectDays = (selectedDays) => {
      console.log(
        'This is the blockId: ',
        selectedDays.blockId,
        'This is the categoryId: ',
        selectedDays.categoryId,
        'This is the highlightedDays: ',
        selectedDays.highlightedDays
      );
    };

    const goToPrevTwoWeeks = () => {
      console.log('goToPrevTwoWeeks');
    };

    const goToNextTwoWeeks = () => {
      console.log('goToNextTwoWeeks');
    };

    return { args, sampleData, selectDays, goToPrevTwoWeeks, goToNextTwoWeeks };
  },
  template: `<VacantRooms v-bind="args" 
  :thisMonthAndYear="sampleData.thisMonthAndYear" :blocks="sampleData.blocks" 
  :calendar="sampleData.calendar" :colorForSelection="sampleData.colorForSelection"
  :daysForSelection="sampleData.daysForSelection"
  @selected-days="selectDays" @go-to-prev-two-weeks="goToPrevTwoWeeks" @go-to-next-two-weeks="goToNextTwoWeeks">
  </VacantRooms>`,
});

export const Sample1 = Template.bind({});
Sample1.args = {};

/** Sample 2 */
const Template2 = (args) => ({
  components: { VacantRooms },

  setup() {
    const sampleData = vacanciesSampleDataPatternB();

    const selectDays = (selectedDays) => {
      console.log(
        'This is the blockId: ',
        selectedDays.blockId,
        'This is the categoryId: ',
        selectedDays.categoryId,
        'This is the highlightedDays: ',
        selectedDays.highlightedDays
      );
    };

    const goToPrevTwoWeeks = () => {
      console.log('goToPrevTwoWeeks');
    };

    const goToNextTwoWeeks = () => {
      console.log('goToNextTwoWeeks');
    };

    return { args, sampleData, selectDays, goToPrevTwoWeeks, goToNextTwoWeeks };
  },
  template: `<VacantRooms v-bind="args" 
  :thisMonthAndYear="sampleData.thisMonthAndYear" :blocks="sampleData.blocks" 
  :calendar="sampleData.calendar" :colorForSelection="sampleData.colorForSelection"
  :daysForSelection="sampleData.daysForSelection"
  @selected-days="selectDays" @go-to-prev-two-weeks="goToPrevTwoWeeks" @go-to-next-two-weeks="goToNextTwoWeeks">
  </VacantRooms>`,
});
export const Sample2 = Template2.bind({});
Sample2.args = {};

/** Sample 3 */

const Template3 = (args) => ({
  components: { VacantRooms },

  setup() {
    const sampleData = vacanciesSampleDataPatternC();

    const selectDays = (selectedDays) => {
      console.log(
        'This is the blockId: ',
        selectedDays.blockId,
        'This is the categoryId: ',
        selectedDays.categoryId,
        'This is the highlightedDays: ',
        selectedDays.highlightedDays
      );
    };

    const goToPrevTwoWeeks = () => {
      console.log('goToPrevTwoWeeks');
    };

    const goToNextTwoWeeks = () => {
      console.log('goToNextTwoWeeks');
    };

    return { args, sampleData, selectDays, goToPrevTwoWeeks, goToNextTwoWeeks };
  },
  template: `<VacantRooms v-bind="args" 
  :thisMonthAndYear="sampleData.thisMonthAndYear" :blocks="sampleData.blocks" 
  :calendar="sampleData.calendar" :colorForSelection="sampleData.colorForSelection"
  :daysForSelection="sampleData.daysForSelection"
  @selected-days="selectDays" @go-to-prev-two-weeks="goToPrevTwoWeeks" @go-to-next-two-weeks="goToNextTwoWeeks">
  </VacantRooms>`,
});

export const Sample3 = Template3.bind({});
Sample3.args = {};
