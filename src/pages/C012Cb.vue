<template>
  <div class="lay-container lay-container--3panes">
    <the-sidebar/>
    <main class="lay-main">
      <div class="lay-main__container">
        <Tabs :selected-index="selectedTab" @change="onChangeTab">
          <Tab>予約</Tab>
          <Tab>利用券指定予約</Tab>
          <Tab>ビジター予約</Tab>
          <Tab>法人代行予約</Tab>
        </Tabs>
        <Panel v-if="selectedTab === 1" color="dark">
          <div
            class="
              util-flex util-flex--gap8 util-flex--align-end util-flex--wrap
            "
          >
            <FieldContainer label="代表会員権番号" width="88px">
              <TextField v-model="telephone" />
            </FieldContainer>
            <Button color="neutral" @click="onClickShowTickets">
              利用券表示
            </Button>
          </div>
        </Panel>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Button from '../components/Button/Button.vue';
import TextField from '../components/TextField/TextField.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import Tabs from '../components/Tabs/Tabs.vue';
import Tab from '../components/Tabs/Tab.vue';
import {ref, withDefaults} from 'vue';
import Panel from '../components/Panel/Panel.vue';
import TheSidebar from "@/containers/TheSidebar.vue";

type Props = {
  selectedTab?: number;
};

const props = withDefaults(defineProps<Props>(), {
  selectedTab: 1,
});
const emit = defineEmits<{ (event: 'changeTab', selectedTab: number): void }>();

const telephone = ref('');
const selectedTab = ref(props.selectedTab);

const onClickShowTickets = () => {
  console.log('clickedShowTickets');
};

const onChangeTab = (tab: number) => {
  console.log('onChangeTab', tab);
  emit('changeTab', tab);
};
</script>

<style scoped lang="scss"></style>
