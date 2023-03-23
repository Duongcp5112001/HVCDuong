<template>
  <div class="lay-container lay-container--3panes">
    <header class="lay-header">
      <Header>
        <img :src="logo" />
        <Badge color="neutral" size="small">予約システム</Badge>
        <template #rightControl><HeaderNotification :counter="99" /></template>
      </Header>
    </header>
    <nav class="lay-nav">
      <Drawer selected-id="drawer-item-2" @click-item="onClickDrawerItem">
        <template #body>
          <DrawerItem id="drawer-item-1" is-subtitle>予約管理</DrawerItem>
          <DrawerItem id="drawer-item-2" icon="call">予約登録</DrawerItem>
          <DrawerItem id="drawer-item-3" icon="list">予約一覧</DrawerItem>
          <DrawerItem id="drawer-item-4" is-subtitle>在庫管理</DrawerItem>
          <DrawerItem id="drawer-item-5" icon="list">在庫一覧</DrawerItem>
          <DrawerItem id="drawer-item-6" is-subtitle>顧客管理</DrawerItem>
          <DrawerItem id="drawer-item-7" icon="people">顧客一覧</DrawerItem>
          <DrawerItem id="drawer-item-8" is-subtitle>利用券管理</DrawerItem>
          <DrawerItem id="drawer-item-9" icon="people">利用券一覧</DrawerItem>
          <DrawerItem id="drawer-item-10" is-subtitle>抽選管理</DrawerItem>
          <DrawerItem id="drawer-item-11" icon="supervised_user_circle">
            抽選登録
          </DrawerItem>
          <DrawerItem id="drawer-item-12" icon="tune">抽選管理</DrawerItem>
          <DrawerItem id="drawer-item-13" is-subtitle>法人代行管理</DrawerItem>
          <DrawerItem id="drawer-item-14" icon="business">
            法人予約代行業者一覧
          </DrawerItem>
        </template>
        <template #footer>
          <DrawerItem id="drawer-item-15" icon="control_point_duplicate">
            サイトコントローラ
          </DrawerItem>
          <DrawerItem id="drawer-item-16" icon="settings">
            マスタ管理
          </DrawerItem>
        </template>
      </Drawer>
    </nav>
    <main class="lay-main">
      <div class="lay-main__container">
        <Tabs :selected-index="selectedTab" @change="onChangeTab">
          <Tab>予約</Tab>
          <Tab>利用券指定予約</Tab>
          <Tab>ビジター予約</Tab>
          <Tab>法人代行予約</Tab>
        </Tabs>
        <Panel v-if="selectedTab === 3" color="dark">
          <span class="util-flex util-flex--column util-flex--gap16">
            <span
              class="
                util-flex util-flex--gap8 util-flex--align-end util-flex--wrap
              "
            >
              <FieldContainer label="法人番号" width="200px">
                <TextField v-model="corporateCode" />
              </FieldContainer>
              <FieldContainer label="法人名（カナ）" width="272px">
                <TextField v-model="CorporateName" />
              </FieldContainer>
              <Button
                class="util-ml-16"
                color="neutral"
                icon="search"
                width="76px"
                @click="onClickSearch"
              >
                検索
              </Button>
              <Button
                color="neutral"
                type="outlined"
                width="65px"
                @click="onClickClear"
              >
                クリア
              </Button>
            </span>
          </span>
        </Panel>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header/Header.vue';
import Drawer from '../components/Drawer/Drawer.vue';
import Badge from '../components/Badge/Badge.vue';
import HeaderNotification from '../components/HeaderNotification/HeaderNotification.vue';
import logo from '../assets/logo.svg';
import DrawerItem from '../components/Drawer/DrawerItem.vue';
import Button from '../components/Button/Button.vue';
import TextField from '../components/TextField/TextField.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import Tabs from '../components/Tabs/Tabs.vue';
import Tab from '../components/Tabs/Tab.vue';
import Panel from '../components/Panel/Panel.vue';
import { ref } from 'vue';

const corporateCode = ref('');
const CorporateName = ref('');
const selectedTab = ref(3);

const onClickDrawerItem = (id: string) => {
  console.log('clicked drawer item: ', id);
};

const onClickSearch = () => {
  console.log('clickedSearch');
};

const onClickClear = () => {
  console.log('clickedClear');
};

const onChangeTab = (tab: number) => {
  console.log('onChangeTab', tab);
  selectedTab.value = tab;
};
</script>

<style scoped lang="scss"></style>
