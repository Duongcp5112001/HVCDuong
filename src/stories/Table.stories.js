import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import Button from '../components/Button/Button.vue';
import RadioButton from '../components/RadioButton/RadioButton.vue';

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {},
};

const Template = (args) => ({
  components: { Table, TableCell, TableColumn, TableRow, Button },
  setup() {
    const onClickSort = (sortDirection, id) =>
      console.log('sort direction', sortDirection, 'id', id);

    return { args, onClickSort };
  },
  template: `
  <div>
    <Table height="300px" width="500px" :selected-rows-ids="['row-3', 'row-5']">
      <template #colgroups>
        <col span="2" class="colgrouptest" :style="{width: '200px'}">
      </template>
      <template #head>
        <TableRow>
          <TableColumn rowspan="2" canSort sortedDirection="desc" scope="col" id="col-1" @clickSort="onClickSort">
            Column Name 1-1
          </TableColumn>
          <TableColumn height="27px" textSize="small" scope="col" id="col-2">
            Column Name 1-2
          </TableColumn>
          <TableColumn rowspan="2" width="80px" maxWidth="80px" id="col-3">
            Short Column
          </TableColumn>
          <TableColumn rowspan="2" maxWidth="80px" canSort id="col-4" @clickSort="onClickSort">
            Column Name 1-3
          </TableColumn>
          <TableColumn rowspan="2" id="col-5">
            Column Name 1-4
          </TableColumn>
        </TableRow>
        <TableRow>
          <TableColumn id="col-6">
            Column Name 2-2
          </TableColumn>
        </TableRow>
      </template>
      <template #body>
        <TableRow id="row-1">
          <TableCell>
            Table Cell 1-1
          </TableCell>
          <TableCell>
            Table Cell 1-2
          </TableCell>
          <TableCell>
            Long Text Long Text Long Text
          </TableCell>
          <TableCell colspan="2">
            Table Cell 1-3
          </TableCell>
        </TableRow>
        <TableRow id="row-2">
          <TableCell>
            Table Cell 2-1
          </TableCell>
          <TableCell>
            Table Cell 2-2
          </TableCell>
          <TableCell>
            Long Text Long Text Long Text
          </TableCell>
          <TableCell colspan="2">
            Table Cell 2-3
          </TableCell>
        </TableRow>
        <TableRow id="row-3">
          <TableCell textAlign="center">
            <Button>Button Inside</Button>
          </TableCell>
          <TableCell>
            Table Cell 2-2
          </TableCell>
          <TableCell>
            Long Text Long Text Long Text
          </TableCell>
          <TableCell colspan="2">
            Table Cell 2-3
          </TableCell>
        </TableRow>
        <TableRow id="row-4">
          <TableCell>
            Table Cell 2-1
          </TableCell>
          <TableCell>
            Table Cell 2-2
          </TableCell>
          <TableCell>
            Long Text Long Text Long Text
          </TableCell>
          <TableCell colspan="2">
            Table Cell 2-3
          </TableCell>
        </TableRow>
        <TableRow id="row-5">
          <TableCell>
            Table Cell 2-1
          </TableCell>
          <TableCell>
            Table Cell 2-2
          </TableCell>
          <TableCell>
            Long Text Long Text Long Text
          </TableCell>
          <TableCell colspan="2">
            Table Cell 2-3
          </TableCell>
        </TableRow>
        <TableRow id="row-6">
          <TableCell>
            Table Cell 2-1
          </TableCell>
          <TableCell>
            Table Cell 2-2
          </TableCell>
          <TableCell>
            Long Text Long Text Long Text
          </TableCell>
          <TableCell colspan="2">
            Table Cell 2-3
          </TableCell>
        </TableRow>
      </template>
    </Table>
    <h3>Fixed Layout</h3>
    <Table height="300px" width="500px" fixedLayout>
      <template #colgroups>
        <col span="2" class="colgrouptest" :style="{width: '120px'}">
      </template>
      <template #head>
        <TableRow>
          <TableColumn rowspan="2" canSort sortedDirection="desc" scope="col" id="col-1" @clickSort="onClickSort">
            Column Name 1-1
          </TableColumn>
          <TableColumn height="27px" textSize="small" scope="col" id="col-2">
            Column Name 1-2
          </TableColumn>
          <TableColumn rowspan="2" width="80px" id="col-3">
            Short Column
          </TableColumn>
          <TableColumn rowspan="2" canSort width="100px" id="col-4" @clickSort="onClickSort">
            Column Name 1-3
          </TableColumn>
          <TableColumn rowspan="2" width="100px" id="col-5">
            Column Name 1-4
          </TableColumn>
        </TableRow>
        <TableRow>
          <TableColumn id="col-6">
            Column Name 2-2
          </TableColumn>
        </TableRow>
      </template>
      <template #body>
        <TableRow>
          <TableCell>
            Table Cell 1-1
          </TableCell>
          <TableCell>
            Table Cell 1-2
          </TableCell>
          <TableCell>
            Long Text Long Text Long Text
          </TableCell>
          <TableCell colspan="2">
            Table Cell 1-3
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Table Cell 2-1
          </TableCell>
          <TableCell>
            Table Cell 2-2
          </TableCell>
          <TableCell>
            Long Text Long Text Long Text
          </TableCell>
          <TableCell colspan="2">
            Table Cell 2-3
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell textAlign="center">
            <Button>Button Inside</Button>
          </TableCell>
          <TableCell>
            Table Cell 2-2
          </TableCell>
          <TableCell>
            Long Text Long Text Long Text
          </TableCell>
          <TableCell colspan="2">
            Table Cell 2-3
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Table Cell 2-1
          </TableCell>
          <TableCell>
            Table Cell 2-2
          </TableCell>
          <TableCell>
            Long Text Long Text Long Text
          </TableCell>
          <TableCell colspan="2">
            Table Cell 2-3
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Table Cell 2-1
          </TableCell>
          <TableCell>
            Table Cell 2-2
          </TableCell>
          <TableCell>
            Long Text Long Text Long Text
          </TableCell>
          <TableCell colspan="2">
            Table Cell 2-3
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Table Cell 2-1
          </TableCell>
          <TableCell>
            Table Cell 2-2
          </TableCell>
          <TableCell>
            Long Text Long Text Long Text
          </TableCell>
          <TableCell colspan="2">
            Table Cell 2-3
          </TableCell>
        </TableRow>
      </template>
    </Table>
  </div>
  `,
});

export const TableSample = Template.bind({});

TableSample.args = {
  // color: "#757575",
  // size: 32,
};

/** Vacancies Table Parts */
const TemplateVacanciesTable = (args) => ({
  components: { Table, TableCell, TableColumn, TableRow, RadioButton },
  setup() {
    return { args };
  },
  template: `
  <div>
    <Table :selected-rows-ids="['row-1']" fixedLayout selection-type="border">
      <template #head>
        <TableRow>
          <TableColumn width="48px" id="col-0">
          </TableColumn>
          <TableColumn width="429px" id="col-1">
            宿泊施設
          </TableColumn>
          <TableColumn width="240px" id="col-2">
            部屋タイプ
          </TableColumn>
          <TableColumn width="240px" id="col-3">
            宿泊開始日
          </TableColumn>
          <TableColumn width="80px" id="col-4">
            泊数
          </TableColumn>
          <TableColumn width="80px" id="col-5">
            室数
          </TableColumn>
          <TableColumn width="80px" id="col-6">
            大人
          </TableColumn>
          <TableColumn width="80px" id="col-7">
            中人
          </TableColumn>
          <TableColumn width="80px" id="col-8">
            小人
          </TableColumn>
          <TableColumn width="80px" id="col-9">
            幼児
          </TableColumn>
          <TableColumn width="80px" id="col-10">
            ペット
          </TableColumn>
          <TableColumn width="80px" id="col-10">
            喫煙可
          </TableColumn>
          <TableColumn width="160px" id="col-11">
            泊毎に内容を変更
          </TableColumn>
          <TableColumn width="80px" id="col-12">
            削除
          </TableColumn>
        </TableRow>
      </template>
      <template #body>
        <TableRow id="row-1">
          <TableCell text-align="center" slot-color="slot01">
            <span class="util-flex util-flex--justify-center">
              <RadioButton name="hotel-selection"/>
            </span>
          </TableCell>
          <TableCell>
            裏磐梯グランデコ
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            DatePicker
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            Icon
          </TableCell>
          <TableCell>
            Icon
          </TableCell>
          <TableCell>
            Popup Button
          </TableCell>
          <TableCell>
            Popup Button
          </TableCell>
        </TableRow>
        <TableRow id="row-2">
          <TableCell text-align="center" slot-color="slot02">
            <span class="util-flex util-flex--justify-center">
              <RadioButton name="hotel-selection"/>
            </span>
          </TableCell>
          <TableCell>
            裏磐梯グランデコ
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            DatePicker
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            Dropdown
          </TableCell>
          <TableCell>
            Icon
          </TableCell>
          <TableCell>
            Icon
          </TableCell>
          <TableCell>
            Popup Button
          </TableCell>
          <TableCell>
            Popup Button
          </TableCell>
        </TableRow>
      </template>
    </Table>
  </div>
  `,
});

export const VacanciesTable = TemplateVacanciesTable.bind({});

VacanciesTable.args = {
  // color: "#757575",
  // size: 32,
};
