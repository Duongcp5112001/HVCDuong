<template>
  <div>
    <div v-if="selectedTab === 0 || selectedTab === 3" class="lay-container lay-container--3panes">
      <the-sidebar/>
      <main class="lay-main">
        <div class="lay-main__container">
          <Tabs :selected-index="selectedTab" @change="onChangeTab">
            <Tab>予約</Tab>
            <Tab>利用券指定予約</Tab>
            <Tab>ビジター予約</Tab>
            <Tab>法人代行予約</Tab>
          </Tabs>
          <Panel v-if="selectedTab === 0" color="dark">
          <span class="util-flex util-flex--column util-flex--gap16">
            <Text class="util-mr-24" bold>顧客照会</Text>
            <span
              class="
                util-flex util-flex--gap8 util-flex--align-end util-flex--wrap
              "
            >
              <FieldContainer label="代表会員権番号" width="128px">
                <TextField v-model="memberCode" />
              </FieldContainer>
              <FieldContainer label="顧客名（カタカナ）" width="272px">
                <TextField v-model="clientName" />
              </FieldContainer>
              <FieldContainer label="電話番号" width="128px">
                <TextField v-model="telephone" />
              </FieldContainer>
              <Button
                  class="util-ml-16"
                  color="neutral"
                  icon="search"
                  @click="onClickSearch"
              >
                検索
              </Button>
              <Button color="neutral" type="outlined" @click="onClickClear">
                クリア
              </Button>
            </span>
            <Table height="" width="100%" v-if="listCustomers && listCustomers.length > 0">
              <template #head >
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
              <!--              <template #body>-->
              <!--                <TableRow id="row-2">-->
              <!--                  <TableCell>-->
              <!--                    <Button @click="onClickTableSelect">選択</Button>-->
              <!--                  </TableCell>-->
              <!--                  <TableCell>1234567890</TableCell>-->
              <!--                  <TableCell>NN9999</TableCell>-->
              <!--                  <TableCell>タナカタロウ</TableCell>-->
              <!--                  <TableCell>0312345678</TableCell>-->
              <!--                  <TableCell>0312345678</TableCell>-->
              <!--                  <TableCell>東京都練馬区西大泉1-4-16</TableCell>-->
              <!--                  <TableCell>2022/10/18</TableCell>-->
              <!--                </TableRow>-->
              <!--                <TableRow id="row-3">-->
              <!--                  <TableCell>-->
              <!--                    <Button @click="onClickTableSelect">選択</Button>-->
              <!--                  </TableCell>-->
              <!--                  <TableCell>1234567890</TableCell>-->
              <!--                  <TableCell>NN9999</TableCell>-->
              <!--                  <TableCell>タナカタロウ</TableCell>-->
              <!--                  <TableCell>0312345678</TableCell>-->
              <!--                  <TableCell>0312345678</TableCell>-->
              <!--                  <TableCell>東京都練馬区西大泉1-4-16</TableCell>-->
              <!--                  <TableCell>2022/10/18</TableCell>-->
              <!--                </TableRow>-->
              <!--                <TableRow id="row-4">-->
              <!--                  <TableCell>-->
              <!--                    <Button @click="onClickTableSelect">選択</Button>-->
              <!--                  </TableCell>-->
              <!--                  <TableCell>1234567890</TableCell>-->
              <!--                  <TableCell>NN9999</TableCell>-->
              <!--                  <TableCell>タナカタロウ</TableCell>-->
              <!--                  <TableCell>0312345678</TableCell>-->
              <!--                  <TableCell>0312345678</TableCell>-->
              <!--                  <TableCell>東京都練馬区西大泉1-4-16</TableCell>-->
              <!--                  <TableCell>2022/10/18</TableCell>-->
              <!--                </TableRow>-->
              <!--                <TableRow id="row-5">-->
              <!--                  <TableCell>-->
              <!--                    <Button @click="onClickTableSelect">選択</Button>-->
              <!--                  </TableCell>-->
              <!--                  <TableCell>1234567890</TableCell>-->
              <!--                  <TableCell>NN9999</TableCell>-->
              <!--                  <TableCell>タナカタロウ</TableCell>-->
              <!--                  <TableCell>0312345678</TableCell>-->
              <!--                  <TableCell>0312345678</TableCell>-->
              <!--                  <TableCell>東京都練馬区西大泉1-4-16</TableCell>-->
              <!--                  <TableCell>2022/10/18</TableCell>-->
              <!--                </TableRow>-->
              <!--              </template>-->
               <template #body  >
                <TableRow v-for="(row, index) in listCustomers" :id="'row' + index">
                  <TableCell>
                    <Button @click="onClickTableSelect(row)">選択</Button>
                  </TableCell>
                  <TableCell>{{row.customer_id}}</TableCell>
                  <TableCell>{{row.membership_hotel_right_ids[0]}}</TableCell>
                  <TableCell>{{row.name_alias}}</TableCell>
                  <TableCell>{{row.phone_no_0 }}</TableCell>
                  <TableCell>{{row.phone_no_1}}</TableCell>
                  <TableCell>{{row.address_lines[0]}}</TableCell>
                  <TableCell>{{row.birth_date}}</TableCell>
                </TableRow>
              </template>
            </Table>
          </span>
          </Panel>
        </div>
      </main>
    </div>
    <C012Cb @change-tab="changeTab" v-if="selectedTab === 1" :selected-tab="selectedTab"/>
    <C012Eb @change-tab="changeTab" v-if="selectedTab === 2" :selectedTab="selectedTab"/>
  </div>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import Button from '../components/Button/Button.vue';
import TextField from '../components/TextField/TextField.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import Tabs from '../components/Tabs/Tabs.vue';
import Tab from '../components/Tabs/Tab.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import Panel from '../components/Panel/Panel.vue';
import TheSidebar from "@/containers/TheSidebar.vue";
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import {storeToRefs} from "pinia";
import {
  useMembershipCustomersStore
} from "@stores/membership/membershipCustomer";
import {
  MembershipCustomersApiListMembershipCustomersRequest
} from '@openapi/membership/api'
import C012Cb from "@pages/C012Cb.vue";
import C012Eb from "@pages/C012Eb.vue";

const router = useRouter()
const memberCode = ref('');
const clientName = ref('');
const telephone = ref('');
const selectedTab = ref(0);

/** list customers **/
const membershipCustomerStore = useMembershipCustomersStore();
membershipCustomerStore.$reset();
const {data: listCustomers} = storeToRefs(membershipCustomerStore);
const getMembershipCustomerList = async () => {
  const apiParams = new MembershipCustomersApiListMembershipCustomersRequest()
  apiParams.businessId = import.meta.env.VITE_HVC_BUSINESS_ID
  apiParams.hotelRightId = memberCode.value
  apiParams.name = clientName.value
  apiParams.phoneNo = telephone.value
  await membershipCustomerStore.fetch(apiParams);
}

const onClickSearch = async() => {
  await getMembershipCustomerList();
  if(listCustomers.value?.length === 1){
    await onClickTableSelect(listCustomers.value[0]);
  }
};

const onClickClear = () => {
  memberCode.value = '';
  clientName.value = '';
  telephone.value = '';
  membershipCustomerStore.$reset();
};

const onChangeTab = (tab: number) => {
  console.log('onChangeTab', tab);
  selectedTab.value = tab;
};

const changeTab = (tab: number) => {
  selectedTab.value = tab;
}

const onClickTableSelect = (customerInfo: {}) => {
  membershipCustomerStore.selectedCustomer(customerInfo);
  router.push({
    name: 'reservationRegistMember'
  })
};
</script>

<style scoped lang="scss"></style>
