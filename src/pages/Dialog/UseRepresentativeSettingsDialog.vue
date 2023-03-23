<template>
  <Dialog
      :open="open"
      size="large"
      custom-height="760px"
      @close-dialog="onCloseDialog"
  >
    <template #header>
      <Text size="xl" bold>利用代表者設定</Text>
    </template>
    <Panel class="util-mb-16" color="dark" width="100%">
      <span
          class="util-flex util-flex--align-end util-flex--gap16 util-flex--wrap"
      >
        <FieldContainer label="姓(カナ)" width="128px">
          <TextField v-model="lastNameKana" />
        </FieldContainer>
        <FieldContainer label="名(カナ)" width="128px">
          <TextField v-model="firstNameKana" />
        </FieldContainer>
        <FieldContainer label="電話番号" width="128px">
          <TextField v-model="phoneNumber" />
        </FieldContainer>
        <FieldContainer label="携帯番号" width="128px">
          <TextField v-model="cellPhoneNumber" />
        </FieldContainer>
        <Button color="neutral" icon="search">検索</Button>
      </span>
    </Panel>
    <div class="util-flex util-flex--justify-between util-full-width">
      <ToggleButtonSet
          :selected-id="selectedToggleButtonId"
          width="293px"
          type="outlined"
          @click-item="onClickToggleButton"
      >
        <ToggleButton id="content-1" icon="groups">
          家族／グループ
        </ToggleButton>
        <ToggleButton id="content-2" icon="person_add">顧客</ToggleButton>
      </ToggleButtonSet>
      <Button color="neutral" type="outlined" icon="add">顧客新規追加</Button>
    </div>
    <template #table>
      <Table :hover-effect="false" :fixed-layout="true" max-height="483px">
        <template #head>
          <TableRow id="row-1">
            <TableColumn id="col-1" width="73px">選択</TableColumn>
            <TableColumn id="col-2" width="100px">顧客番号</TableColumn>
            <TableColumn id="col-3" width="120px">氏名</TableColumn>
            <TableColumn id="col-4" width="130px">氏名(カナ)</TableColumn>
            <TableColumn id="col-5" width="130px">電話番号</TableColumn>
            <TableColumn id="col-6" width="130px">携帯電話番号</TableColumn>
            <TableColumn id="col-7" width="130px" max-width="156px">
              住所
            </TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow id="row-2">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
          </TableRow>
          <TableRow id="row-3">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="青森県八戸市石堂２丁目３－１">
              <span> 青森県八戸市石堂２丁目３－１ </span>
            </TableCell>
          </TableRow>
          <TableRow id="row-4">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
          </TableRow>
          <TableRow id="row-5">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
          </TableRow>
          <TableRow id="row-6">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
          </TableRow>
          <TableRow id="row-7">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
          </TableRow>
          <TableRow id="row-8">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
          </TableRow>
          <TableRow id="row-9">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
          </TableRow>
          <TableRow id="row-10">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
          </TableRow>
          <TableRow id="row-11">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
          </TableRow>
          <TableRow id="row-12">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
          </TableRow>
          <TableRow id="row-13">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
          </TableRow>
          <TableRow id="row-14">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
          </TableRow>
          <TableRow id="row-15">
            <TableCell>
              <Button width="56px">選択</Button>
            </TableCell>
            <TableCell>AT0001</TableCell>
            <TableCell>田中花子</TableCell>
            <TableCell>タナカハナコ</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell>０３１２３４５６７８</TableCell>
            <TableCell tooltip-text="東京都渋谷区道玄坂1-21-1aaaa">
              <span> 東京都渋谷区道玄坂1-21-1aaaa </span>
            </TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '@components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '@components/Dialog/Dialog.vue';
import Button from '@components/Button/Button.vue';
import Panel from '@components/Panel/Panel.vue';
import FieldContainer from '@components/FieldContainer/FieldContainer.vue';
import TextField from '@components/TextField/TextField.vue';
import Table from '@components/Table/Table.vue';
import TableCell from '@components/Table/TableCell.vue';
import TableColumn from '@components/Table/TableColumn.vue';
import TableRow from '@components/Table/TableRow.vue';
import ToggleButtonSet from '@components/ToggleButton/ToggleButtonSet.vue';
import ToggleButton from '@components/ToggleButton/ToggleButton.vue';


const props = withDefaults(
    defineProps<{
      open: boolean
    }>(),
    {
      open: false
    }
);

const lastNameKana = ref('タナカ');
const firstNameKana = ref('ハナコ');
const phoneNumber = ref('');
const cellPhoneNumber = ref('');

const selectedToggleButtonId = ref('content-2');

const emit = defineEmits<{ (event: 'closeDialog'): void }>();
const onCloseDialog = () => {
  emit('closeDialog');
};

const onClickToggleButton = (id: string) => {
  console.log('clicked toggle button: ', id);
  selectedToggleButtonId.value = id;
};
</script>

<style scoped lang="scss"></style>
