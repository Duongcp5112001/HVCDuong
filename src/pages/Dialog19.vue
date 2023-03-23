<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog
    :open="open"
    size="large"
    custom-height="292px"
    @close-dialog="onCloseDialog"
  >
    <template #header>
      <Button
        icon="arrow_back"
        type="text"
        color="neutral"
        size="large"
      ></Button>
      <Text class="util-ml-2" color="main" size="xl" bold>顧客新規追加</Text>
    </template>
    <span class="util-flex util-flex--gap16 util-flex--wrap">
      <FieldContainer label="姓(カナ)" width="128px" required>
        <TextField v-model="lastNameKana" />
      </FieldContainer>
      <FieldContainer label="名(カナ)" width="128px" required>
        <TextField v-model="firstNameKana" />
      </FieldContainer>
      <FieldContainer label="姓" width="128px">
        <TextField v-model="lastName" />
      </FieldContainer>
      <FieldContainer label="名" width="128px">
        <TextField v-model="firstName" />
      </FieldContainer>
      <FieldContainer label="電話番号" width="128px" required>
        <TextField v-model="phoneNumber" />
      </FieldContainer>
      <FieldContainer label="携帯番号" width="128px">
        <TextField v-model="cellPhoneNumber" />
      </FieldContainer>
    </span>
    <template #footer>
      <Button size="large" width="200px">登録</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Button from '../components/Button/Button.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import TextField from '../components/TextField/TextField.vue';

const open = ref(true);

const lastNameKana = ref('');
const firstNameKana = ref('');
const lastName = ref('');
const firstName = ref('');
const phoneNumber = ref('');
const cellPhoneNumber = ref('');

const onCloseDialog = () => {
  open.value = false;
};
</script>

<style scoped lang="scss"></style>
