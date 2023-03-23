<template>
  <Button @click="openDialog = true">Open Dialog</Button>
  <Dialog
    :open="openDialog"
    size="fullscreen"
    color="dark"
    @close-dialog="onCloseDialog"
  >
    <template #header>
      <Text size="xl" bold>顧客名寄せ</Text>
    </template>
    <Panel width="100%" padding="wide">
      <Text size="large" bold> 統合後に使用する顧客番号を選択 </Text>
      <div class="util-flex util-flex--gap16 util-mt-16 util-mb-24">
        <RadioButton
          v-for="userData in duplicatedUserData"
          :key="userData.id"
          :label="userData.id"
          :checked="userData.id === selectedUserId"
          name="user-id"
          @input="onSelectUserId(userData.id)"
        />
      </div>
      <Text size="large" bold>使用するデータを選択</Text>
      <Table class="util-mt-16" width="100%">
        <template #head>
          <TableRow id="row-1">
            <TableColumn id="col-1" min-width="176px">顧客番号</TableColumn>
            <template v-for="userData in duplicatedUserData" :key="userData.id">
              <TableColumn
                :id="`${userData.id}-header-radio`"
                width="47px"
                min-width="47px"
              ></TableColumn>
              <TableColumn :id="`${userData.id}-header`" min-width="272px">
                {{ userData.id }}
              </TableColumn>
            </template>
          </TableRow>
        </template>
        <template #body>
          <TableRow id="tel-row">
            <TableCell slot-color="title">電話番号</TableCell>
            <template
              v-for="(tel, index) in userDataTels"
              :key="`${index}-tel`"
            >
              <TableCell
                text-align="center"
                :slot-color="isSelected(tel) ? 'selected' : ''"
              >
                <RadioButton
                  name="tel"
                  :checked="isSelected(tel)"
                  @input="onSelect(tel)"
                />
              </TableCell>
              <TableCell :slot-color="isSelected(tel) ? 'selected' : ''">
                {{ tel.tel }}
              </TableCell>
            </template>
          </TableRow>

          <TableRow id="mail-row">
            <TableCell slot-color="title">メールアドレス</TableCell>
            <template
              v-for="(mail, index) in userDataMails"
              :key="`${index}-mail`"
            >
              <TableCell
                text-align="center"
                :slot-color="isSelected(mail) ? 'selected' : ''"
              >
                <RadioButton
                  name="mail"
                  :checked="isSelected(mail)"
                  @input="onSelect(mail)"
                />
              </TableCell>
              <TableCell :slot-color="isSelected(mail) ? 'selected' : ''">
                {{ mail.mail }}
              </TableCell>
            </template>
          </TableRow>
          <TableRow id="area-row">
            <TableCell slot-color="title">エリア</TableCell>
            <template
              v-for="(area, index) in userDataAreas"
              :key="`${index}-area`"
            >
              <TableCell
                text-align="center"
                :slot-color="isSelected(area) ? 'selected' : ''"
              >
                <RadioButton
                  name="area"
                  :checked="isSelected(area)"
                  @input="onSelect(area)"
                />
              </TableCell>
              <TableCell :slot-color="isSelected(area) ? 'selected' : ''">
                {{ area.area }}
              </TableCell>
            </template>
          </TableRow>
          <TableRow id="assignee-row">
            <TableCell slot-color="title">担当営業</TableCell>
            <template
              v-for="(assignee, index) in userDataAssignees"
              :key="`${index}-assignee`"
            >
              <TableCell
                text-align="center"
                :slot-color="isSelected(assignee) ? 'selected' : ''"
              >
                <RadioButton
                  name="assignee"
                  :checked="isSelected(assignee)"
                  @input="onSelect(assignee)"
                />
              </TableCell>
              <TableCell :slot-color="isSelected(assignee) ? 'selected' : ''">
                {{ assignee.assignee }}
              </TableCell>
            </template>
          </TableRow>
          <TableRow id="address-row">
            <TableCell slot-color="title">住所</TableCell>
            <template
              v-for="(address, index) in userDataAddresses"
              :key="`${index}-address`"
            >
              <TableCell
                text-align="center"
                :slot-color="isSelected(address) ? 'selected' : ''"
              >
                <RadioButton
                  name="address"
                  :checked="isSelected(address)"
                  @input="onSelect(address)"
                />
              </TableCell>
              <TableCell :slot-color="isSelected(address) ? 'selected' : ''">
                {{ address.address }}
              </TableCell>
            </template>
          </TableRow>
        </template>
      </Table>
      <div class="util-flex util-flex--justify-end util-mt-24">
        <Button
          size="large"
          color="primary"
          :disabled="isSubmitDisabled()"
          @click="onSubmit"
        >
          名寄せを実行
        </Button>
      </div>
    </Panel>
    <template #footer> </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '@components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '@components/Dialog/Dialog.vue';
import Button from '@components/Button/Button.vue';
import Panel from '@components/Panel/Panel.vue';
import RadioButton from '@components/RadioButton/RadioButton.vue';
import Table from '@components/Table/Table.vue';
import TableCell from '@components/Table/TableCell.vue';
import TableColumn from '@components/Table/TableColumn.vue';
import TableRow from '@components/Table/TableRow.vue';

const openDialog = ref(true);

const duplicatedUserData = [
  {
    id: '1234567890',
    tel: '03-1234-5678',
    mail: 'tanacchi9876@gmail.com',
    area: '関東',
    assignee: '大河内雄三',
    address: '〒150-0043 東京都渋谷区道玄坂1-21-1',
  },
  {
    id: '9934567890',
    tel: '03-2333-5666',
    mail: 'tanacchi3456@gmail.com	',
    area: '',
    assignee: '',
    address: '',
  },
  {
    id: '7643245679	',
    tel: '',
    mail: '',
    area: '',
    assignee: '前田菜々子',
    address: '',
  },
  {
    id: '654444434567',
    tel: '',
    mail: '',
    area: '',
    assignee: '',
    address: '',
  },
  {
    id: '2345678901',
    tel: '',
    mail: '',
    area: '',
    assignee: '',
    address: '〒450-1234 富山県大谷市小坂321-1',
  },
];

const userDataTels = duplicatedUserData.map((data) => {
  return { id: data.id, tel: data.tel };
});

const userDataMails = duplicatedUserData.map((data) => {
  return { id: data.id, mail: data.mail };
});

const userDataAreas = duplicatedUserData.map((data) => {
  return { id: data.id, area: data.area };
});

const userDataAssignees = duplicatedUserData.map((data) => {
  return { id: data.id, assignee: data.assignee };
});

const userDataAddresses = duplicatedUserData.map((data) => {
  return { id: data.id, address: data.address };
});

const selectedUserId = ref('');

const onSelectUserId = (id: string) => {
  selectedUserId.value = id;
};

const selectedUserData = ref({
  tel: {
    id: '',
    tel: '',
  },
  mail: {
    id: '',
    mail: '',
  },
  area: {
    id: '',
    area: '',
  },
  assignee: {
    id: '',
    assignee: '',
  },
  address: {
    id: '',
    address: '',
  },
});

const onSelect = (item: { id: string; [key: string]: string }) => {
  const name = Object.keys(item)[1] as
    | 'tel'
    | 'mail'
    | 'area'
    | 'assignee'
    | 'address';
  selectedUserData.value = {
    ...selectedUserData.value,
    [name]: item,
  };
};

const isSelected = (item: { id: string; [key: string]: string }) => {
  const name = Object.keys(item)[1] as
    | 'tel'
    | 'mail'
    | 'area'
    | 'assignee'
    | 'address';
  return selectedUserData.value[name].id === item.id;
};

const onCloseDialog = () => {
  openDialog.value = false;
};

const isSubmitDisabled = () => {
  return (
    selectedUserId.value === '' ||
    selectedUserData.value.tel.id === '' ||
    selectedUserData.value.mail.id === '' ||
    selectedUserData.value.area.id === '' ||
    selectedUserData.value.assignee.id === '' ||
    selectedUserData.value.address.id === ''
  );
};

const onSubmit = () => {
  console.log('selected Id', selectedUserId.value);
  console.log('selected Data', selectedUserData.value);
};
</script>

<style scoped lang="scss"></style>
