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
              util-flex util-flex--gap8 util-flex--align-end util-flex--wrap
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
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import { ref } from 'vue';
import TheSidebar from "@/containers/TheSidebar.vue";

const memberCode = ref('');
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
</script>

<style scoped lang="scss"></style>
