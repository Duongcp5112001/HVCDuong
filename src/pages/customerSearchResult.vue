<template>
  <div class="lay-container lay-container--3panes">
    <the-sidebar/>
    <main class="lay-main">
      <div class="lay-main__container">
        <Disclosure>
          <template #title>
            <Text class="util-mr-24" bold>顧客照会</Text>
            <ToggleButtonSet
              :selected-id="selectedToggleButtonId"
              width="195px"
              size="small"
              type="outlined"
              @click-item="onClickToggleButton"
            >
              <ToggleButton id="content-1">顧客検索</ToggleButton>
              <ToggleButton id="content-2">法人代行検索</ToggleButton>
            </ToggleButtonSet>
          </template>
          <div
            class="
              util-flex util-flex--align-end util-flex--gap8
              util-mb-16
              util-flex--wrap
            "
          >
            <FieldContainer label="顧客照会" width="200px">
              <TextField v-model="customerInquiry" />
            </FieldContainer>
            <FieldContainer label="顧客名（カタカナ）" width="200px">
              <TextField v-model="clientName" />
            </FieldContainer>
            <FieldContainer label="電話番号" width="200px">
              <TextField v-model="telephone" />
            </FieldContainer>
            <FieldContainer class="util-mr-8" label="利用券番号" width="200px">
              <TextField v-model="ticket" />
            </FieldContainer>
            <Button color="neutral" icon="search" @click="onClickSearch">
              検索
            </Button>
            <Button color="neutral" type="outlined" @click="onClickClear">
              クリア
            </Button>
          </div>
          <Table height="" width="100%">
            <template #head>
              <TableRow id="row-1">
                <TableColumn id="col-1" width="72px"> 選択</TableColumn>
                <TableColumn id="col-2" width="135px"> 顧客番号</TableColumn>
                <TableColumn id="col-3" width="120px"> 会員番号</TableColumn>
                <TableColumn id="col-4"> 顧客名（カナ）</TableColumn>
                <TableColumn id="col-5" width="160px"> 電話番号</TableColumn>
                <TableColumn id="col-6" width="160px">
                  携帯電話番号
                </TableColumn>
                <TableColumn id="col-7"> 住所</TableColumn>
                <TableColumn id="col-8" width="120px"> 生年月日</TableColumn>
              </TableRow>
            </template>
            <template #body>
              <TableRow id="row-2">
                <TableCell>
                  <Button @click="onClickTableSelect">選択</Button>
                </TableCell>
                <TableCell>1234567890</TableCell>
                <TableCell>NN9999</TableCell>
                <TableCell>タナカタロウ</TableCell>
                <TableCell>0312345678</TableCell>
                <TableCell>0312345678</TableCell>
                <TableCell>東京都練馬区西大泉1-4-16</TableCell>
                <TableCell>2022/10/18</TableCell>
              </TableRow>
              <TableRow id="row-3">
                <TableCell>
                  <Button @click="onClickTableSelect">選択</Button>
                </TableCell>
                <TableCell>1234567890</TableCell>
                <TableCell>NN9999</TableCell>
                <TableCell>タナカタロウ</TableCell>
                <TableCell>0312345678</TableCell>
                <TableCell>0312345678</TableCell>
                <TableCell>東京都練馬区西大泉1-4-16</TableCell>
                <TableCell>2022/10/18</TableCell>
              </TableRow>
              <TableRow id="row-4">
                <TableCell>
                  <Button @click="onClickTableSelect">選択</Button>
                </TableCell>
                <TableCell>1234567890</TableCell>
                <TableCell>NN9999</TableCell>
                <TableCell>タナカタロウ</TableCell>
                <TableCell>0312345678</TableCell>
                <TableCell>0312345678</TableCell>
                <TableCell>東京都練馬区西大泉1-4-16</TableCell>
                <TableCell>2022/10/18</TableCell>
              </TableRow>
              <TableRow id="row-5">
                <TableCell>
                  <Button @click="onClickTableSelect">選択</Button>
                </TableCell>
                <TableCell>1234567890</TableCell>
                <TableCell>NN9999</TableCell>
                <TableCell>タナカタロウ</TableCell>
                <TableCell>0312345678</TableCell>
                <TableCell>0312345678</TableCell>
                <TableCell>東京都練馬区西大泉1-4-16</TableCell>
                <TableCell>2022/10/18</TableCell>
              </TableRow>
            </template>
          </Table>
        </Disclosure>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Disclosure from '../components/Disclosure/Disclosure.vue';
import ToggleButtonSet from '../components/ToggleButton/ToggleButtonSet.vue';
import ToggleButton from '../components/ToggleButton/ToggleButton.vue';
import Text from '../components/Text/Text.vue';
import Button from '../components/Button/Button.vue';
import TextField from '../components/TextField/TextField.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import { ref } from 'vue';
import TheSidebar from "@/containers/TheSidebar.vue";

const customerInquiry = ref('');
const clientName = ref('');
const telephone = ref('');
const ticket = ref('');
const selectedToggleButtonId = ref('content-1');

const onClickToggleButton = (id: string) => {
  console.log('clicked toggle button: ', id);
  selectedToggleButtonId.value = id;
};

const onClickSearch = () => {
  console.log('clickedSearch');
};

const onClickClear = () => {
  console.log('clickedClear');
};

const onClickTableSelect = () => {
  console.log('clickedTableSelect');
};
</script>

<style scoped lang="scss"></style>
