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
import { ref } from 'vue';
import Panel from '../components/Panel/Panel.vue';
import TheSidebar from "@/containers/TheSidebar.vue";
import C012Cb from "@pages/C012Cb.vue";
import C012Eb from "@pages/C012Eb.vue";

const memberCode = ref('');
const clientName = ref('');
const telephone = ref('');
const selectedTab = ref(0);

const onClickSearch = () => {
  console.log('clickedSearch');
};

const onClickClear = () => {
  console.log('clickedClear');
};

const changeTab = (tab: number) => {
  selectedTab.value = tab;
}

const onChangeTab = (tab: number) => {
  console.log('onChangeTab', tab);
  selectedTab.value = tab;
};
</script>

<style scoped lang="scss"></style>
