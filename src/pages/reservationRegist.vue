<template>
  <div class="lay-container lay-container--4panes">
    <the-sidebar/>
    <main class="lay-main">
      <div class="lay-main__container lay-main__container--3-panes">
        <Disclosure>
          <template #title>
            <Text class="util-mr-24" bold>顧客照会</Text>
          </template>
          <div
            class="
              util-flex util-flex--gap8 util-flex--wrap util-flex--align-end
            "
          >
            <FieldContainer label="会員番号" width="200px">
              <TextField v-model="memberCode" />
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
        </Disclosure>
        <Panel>
          <span class="util-flex util-flex--justify-between util-mb-24">
            <span
              class="
                util-flex
                util-flex--align-center
                util-flex--wrap
                util-flex--column-gap40
                util-flex--row-gap16
              "
            >
              <span class="stretch-on-small-screen util-flex">
                <Badge size="small">会員</Badge>
              </span>
              <span class="util-flex util-flex--align-center util-flex--gap16">
                <Text color="light" bold size="2xs">顧客番号</Text>
                <Text bold size="large">S023789300</Text>
              </span>
              <span class="util-flex util-flex--align-center util-flex--gap8">
                <Text size="large" bold>田中 太郎</Text>
                <Text bold size="xs">（タナカタロウ）</Text>
              </span>
              <span class="util-flex util-flex--align-center util-flex--gap16">
                <Text color="light" bold size="2xs">有効利用券</Text>
                <Text bold size="large">264</Text>
              </span>
              <Panel
                class="util-flex util-flex--align-center"
                color="dark"
                padding="short"
                border-radius="small"
                :shadow="false"
              >
                <Text class="util-mr-4" color="light" bold size="2xs">
                  ホーム
                </Text>
                <Badge class="util-mr-16" :counter="2" />
                <Text class="util-mr-24" bold size="large">150</Text>
                <Text class="util-mr-16" color="light" bold size="2xs">
                  相互
                </Text>
                <Text bold size="large">114</Text>
              </Panel>
            </span>
            <span class="util-flex util-flex--align-start">
              <div class="util-flex util-flex--align-center util-flex--gap4">
                <Text color="light" no-wrap>TRSポイント残高</Text>
                <Badge color="success" icon="paid">1200P</Badge>
              </div>
            </span>
          </span>
          <span
            class="
              util-flex util-flex--align-center
              util-mb-24
              util-flex--wrap util-flex--column-gap40 util-flex--row-gap16
            "
          >
            <span class="util-flex util-flex--column">
              <Text class="util-mb-8" color="light" bold size="2xs">
                電話番号
              </Text>
              <Text bold size="xs">03-3333-1234</Text>
            </span>
            <span class="util-flex util-flex--column">
              <Text class="util-mb-8" color="light" bold size="2xs">
                携帯電話
              </Text>
              <Text bold size="xs">090-8888-8888</Text>
            </span>
            <span class="util-flex util-flex--column">
              <Text class="util-mb-8" color="light" bold size="2xs">
                性別
              </Text>
              <Text bold size="xs">男性</Text>
            </span>
            <span class="util-flex util-flex--column">
              <Text class="util-mb-8" color="light" bold size="2xs">
                家族
              </Text>
              <Text bold size="xs">４人</Text>
            </span>
            <span class="util-flex util-flex--column">
              <Text class="util-mb-8" color="light" bold size="2xs">
                禁煙区分
              </Text>
              <Text bold size="xs">喫煙</Text>
            </span>
            <span class="util-flex util-flex--column">
              <Text class="util-mb-8" color="light" bold size="2xs">
                生年月日
              </Text>
              <Text bold size="xs">2002/03/01（21歳）</Text>
            </span>
            <span class="util-flex util-flex--column">
              <Text class="util-mb-8" color="light" bold size="2xs">
                メールアドレス
              </Text>
              <Text bold size="xs">tanakataro@gmail.com</Text>
            </span>
            <span class="util-flex util-flex--column">
              <Text class="util-mb-8" color="light" bold size="2xs">
                住所
              </Text>
              <Text bold size="xs">〒150-0043 東京都渋谷区道玄坂1-21-1</Text>
            </span>
          </span>
          <span
            class="util-flex util-flex--align-center util-flex--gap8 util-mb-24"
          >
            <Badge size="small" color="error" icon="error">年会費未納</Badge>
            <Badge size="small" color="warning" icon="confirmation_number">
              チケットレス
            </Badge>
            <Badge size="small" color="success" icon="sentiment_very_satisfied">
              優良
            </Badge>
          </span>
          <Panel color="dark">
            <span class="util-flex util-flex--align-center">
              <span class="util-flex util-mr-32">
                <Text bold size="large" no-wrap>新規予約</Text>
              </span>
              <span class="util-flex util-flex--column util-full-width">
                <Text
                  v-if="insufficientTicketError"
                  class="util-mb-16"
                  color="critical"
                  size="xs"
                  no-wrap
                >
                  利用券が不足しています。
                </Text>
                <span
                  class="
                    util-flex util-flex--align-center util-flex--gap16
                    util-mb-16
                    util-flex--wrap
                  "
                >
                  <FieldContainer label="宿泊施設" width="456px" required>
                    <Dropdown
                      v-model:value="currentTextDropdownSelection1"
                      placeholder=""
                      size="small"
                      width="456px"
                    >
                      <DropdownItem
                        v-for="(option, i) in textDropdownOptions"
                        :key="i"
                        :label="option.label"
                        :value="option.value"
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
                        v-model:value="currentNumericDropdownSelection1"
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
                      泊
                    </Text>
                  </span>
                  <span class="util-flex util-flex--align-end">
                    <FieldContainer label="部屋数" width="64px" required>
                      <Dropdown
                        v-model:value="currentNumericDropdownSelection2"
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
                      室
                    </Text>
                  </span>
                  <span class="util-flex util-flex--align-end">
                    <FieldContainer label="大人" width="64px" required>
                      <Dropdown
                        v-model:value="currentNumericDropdownSelection3"
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
                    <FieldContainer label="中人" width="64px">
                      <Dropdown
                        v-model:value="currentNumericDropdownSelection4"
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
                        v-model:value="currentNumericDropdownSelection5"
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
                        v-model:value="currentNumericDropdownSelection6"
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
                <span
                  class="
                    util-flex util-flex--align-center util-flex--justify-between
                  "
                >
                  <span
                    class="
                      util-flex
                      util-flex--align-end
                      util-flex--wrap
                      util-flex--gap16
                    "
                  >
                    <FieldContainer label="優待券" width="160px">
                      <Dropdown
                        v-model:value="currentTextDropdownSelection2"
                        placeholder="VV0000"
                        size="small"
                        width="160px"
                      >
                        <DropdownItem
                          v-for="(option, i) in textDropdownOptions"
                          :key="i"
                          :label="option.label"
                          :value="option.value"
                        >
                        </DropdownItem>
                      </Dropdown>
                    </FieldContainer>
                    <span
                      class="
                        util-flex
                        util-flex--align-center
                        util-flex--gap8
                        util-flex--wrap
                        util-mb-8
                      "
                    >
                      <Checkbox v-model:checked="isSmoking" label="喫煙可" />
                      <Checkbox v-model:checked="isPets" label="ペット可" />
                      <Checkbox
                        v-model:checked="isConnectedRoom"
                        label="コネクトルーム"
                      />
                    </span>
                  </span>
                  <span
                    class="util-flex util-flex--align-center util-flex--gap8"
                  >
                    <Button size="large" @click="onClickGetRoom">
                      部屋確保
                    </Button>
                    <Button
                      size="large"
                      color="neutral"
                      @click="onClickCheckAvailableRooms"
                    >
                      残室確認／特殊予約
                    </Button>
                  </span>
                </span>
              </span>
            </span>
          </Panel>
        </Panel>
        <Tabs :selected-index="selectedTab" @change="onChangeTab">
          <Tab>予約／利用実績</Tab>
          <Tab>会員権／利用券</Tab>
          <Tab>抽選</Tab>
          <Tab>顧客情報</Tab>
        </Tabs>
        <TabPanels :selected-index="selectedTab">
          <TabPanel class="util-flex util-flex--column">
            <ToggleButtonSet
              class="util-mb-16"
              :selected-id="selectedToggleButtonId"
              width="219px"
              type="outlined"
              @click-item="onClickToggleButton"
            >
              <ToggleButton id="content-1" icon="list">リスト</ToggleButton>
              <ToggleButton id="content-2" icon="grid_on">
                テーブル
              </ToggleButton>
            </ToggleButtonSet>
            <Dropdown
              v-model:value="currentTextDropdownSelection3"
              class="util-mb-8"
              placeholder="すべて"
              size="small"
              width="160px"
              icon="filter_list"
            >
              <DropdownItem
                v-for="(option, i) in textDropdownOptions"
                :key="i"
                :label="option.label"
                :value="option.value"
              >
              </DropdownItem>
            </Dropdown>
            <Table height="" width="100%">
              <template #head>
                <TableRow id="row-1">
                  <TableColumn id="col-1" width="160px">ステータス</TableColumn>
                  <TableColumn id="col-2" min-width="160px">
                    予約番号
                  </TableColumn>
                  <TableColumn
                    id="col-3"
                    can-sort
                    :sorted-direction="hotelSort"
                    @click-sort="onSortHotel"
                  >
                    宿泊施設
                  </TableColumn>
                  <TableColumn
                    id="col-4"
                    width="120px"
                    can-sort
                    :sorted-direction="dateUsageSort"
                    @click-sort="onSortDateUsage"
                  >
                    利用日
                  </TableColumn>
                  <TableColumn id="col-5" min-width="64px" text-align="center">
                    部屋数
                  </TableColumn>
                  <TableColumn id="col-6" min-width="64px" text-align="center">
                    泊数
                  </TableColumn>
                  <TableColumn id="col-7" min-width="64px" text-align="center">
                    人数
                  </TableColumn>
                  <TableColumn id="col-8" min-width="72px" text-align="center">
                    プラン
                  </TableColumn>
                  <TableColumn id="col-9" min-width="72px" text-align="center">
                    レストラン
                  </TableColumn>
                  <TableColumn id="col-10" min-width="72px" text-align="center">
                    付帯施設
                  </TableColumn>
                  <TableColumn id="col-11" min-width="72px" text-align="center">
                    備品
                  </TableColumn>
                  <TableColumn id="col-12" min-width="72px" text-align="center">
                    手配品
                  </TableColumn>
                  <TableColumn id="col-13" min-width="72px" text-align="center">
                    詳細
                  </TableColumn>
                </TableRow>
              </template>
              <template #body>
                <TableRow id="row-2">
                  <TableCell>カレンダーOP（仮）</TableCell>
                  <TableCell>932425</TableCell>
                  <TableCell>裏磐梯グランデコ</TableCell>
                  <TableCell>2022/10/18</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">5</TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Button
                      type="outlined"
                      color="neutral"
                      @click="onClickTableDetails"
                    >
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow id="row-3">
                  <TableCell>カレンダーOP（仮）</TableCell>
                  <TableCell>932425</TableCell>
                  <TableCell>裏磐梯グランデコ</TableCell>
                  <TableCell>2022/10/18</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">5</TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Button
                      type="outlined"
                      color="neutral"
                      @click="onClickTableDetails"
                    >
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow id="row-4">
                  <TableCell>カレンダーOP（仮）</TableCell>
                  <TableCell>932425</TableCell>
                  <TableCell>裏磐梯グランデコ</TableCell>
                  <TableCell>2022/10/18</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">5</TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Button
                      type="outlined"
                      color="neutral"
                      @click="onClickTableDetails"
                    >
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow id="row-5">
                  <TableCell>カレンダーOP（仮）</TableCell>
                  <TableCell>932425</TableCell>
                  <TableCell>裏磐梯グランデコ</TableCell>
                  <TableCell>2022/10/18</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">5</TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Button
                      type="outlined"
                      color="neutral"
                      @click="onClickTableDetails"
                    >
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
              </template>
            </Table>
          </TabPanel>
          <TabPanel>Content B</TabPanel>
          <TabPanel>Content C</TabPanel>
          <TabPanel>Content D</TabPanel>
        </TabPanels>
      </div>
    </main>
    <aside class="lay-aside">
      <div class="sidebar-dummy"></div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import Badge from '../components/Badge/Badge.vue';
import Disclosure from '../components/Disclosure/Disclosure.vue';
import ToggleButtonSet from '../components/ToggleButton/ToggleButtonSet.vue';
import ToggleButton from '../components/ToggleButton/ToggleButton.vue';
import Text from '../components/Text/Text.vue';
import Button from '../components/Button/Button.vue';
import Panel from '../components/Panel/Panel.vue';
import Checkbox from '../components/Checkbox/Checkbox.vue';
import TextField from '../components/TextField/TextField.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import Icon from '../components/Icon/Icon.vue';
import Tabs from '../components/Tabs/Tabs.vue';
import Tab from '../components/Tabs/Tab.vue';
import TabPanels from '../components/Tabs/TabPanels.vue';
import TabPanel from '../components/Tabs/TabPanel.vue';
import DatePicker from '../components/DatePicker/DatePicker.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import Dropdown from '../components/Dropdown/Dropdown.vue';
import DropdownItem from '../components/Dropdown/DropdownItem.vue';
import { ref } from 'vue';
import TheSidebar from "@/containers/TheSidebar.vue";

const insufficientTicketError = ref(false);
const selectedTab = ref(0);
const selectedDate = ref(new Date());

const currentNumericDropdownSelection1 = ref('');
const currentNumericDropdownSelection2 = ref('');
const currentNumericDropdownSelection3 = ref('');
const currentNumericDropdownSelection4 = ref('');
const currentNumericDropdownSelection5 = ref('');
const currentNumericDropdownSelection6 = ref('');

const numericDropdownOptions = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];

const currentTextDropdownSelection1 = ref('');
const currentTextDropdownSelection2 = ref('');
const currentTextDropdownSelection3 = ref('');

const textDropdownOptions = [
  {
    label: 'First Option',
    value: 'First Option',
  },
  {
    label: 'Second Option',
    value: 'Second Option',
  },
  {
    label: 'Third Option',
    value: 'Third Option',
  },
];

const memberCode = ref('');
const clientName = ref('');
const telephone = ref('');
const ticket = ref('');
const isSmoking = ref(false);
const isPets = ref(true);
const isConnectedRoom = ref(false);
const selectedToggleButtonId = ref('content-1');

const hotelSort = ref<'asc' | 'desc' | ''>('');
const dateUsageSort = ref<'asc' | 'desc' | ''>('');

const onSortHotel = (sortStatus: 'asc' | 'desc') => {
  console.log('sorted hotels as:', sortStatus);
  hotelSort.value = sortStatus;
};

const onSortDateUsage = (sortStatus: 'asc' | 'desc') => {
  console.log('sorted date usage as:', sortStatus);
  dateUsageSort.value = sortStatus;
};

const onClickToggleButton = (id: string) => {
  console.log('clicked toggle button: ', id);
  selectedToggleButtonId.value = id;
};

const onChangeDate = (date: Date) => {
  console.log('onChangeDate', date);
  selectedDate.value = date;
};

const onChangeTab = (tab: number) => {
  console.log('onChangeTab', tab);
  selectedTab.value = tab;
};

const onClickSearch = () => {
  console.log('clickedSearch');
};

const onClickClear = () => {
  console.log('clickedClear');
};

const onClickGetRoom = () => {
  console.log('clickedGetRoom');
};

const onClickCheckAvailableRooms = () => {
  console.log('clickedCheckAvailableRooms');
};

const onClickTableDetails = () => {
  console.log('clickedTableDetails');
};
</script>

<style scoped lang="scss">
@media only screen and (max-width: 1680px) {
  .stretch-on-small-screen {
    width: 100%;
  }
}
.sidebar-dummy {
  width: 300px;
  background: #282828;
  height: 100%;
}
</style>
