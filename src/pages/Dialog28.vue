<template>
  <Button @click="open = true">Open Dialog</Button>
  <Dialog
    :open="open"
    size="large"
    custom-height="760px"
    @close-dialog="onCloseDialog"
  >
    <template #header>
      <div class="util-flex util-flex-gap8">
        <Button
          color="neutral"
          icon="arrow_back"
          type="text"
          size="medium"
          @click="onClickBack"
        />
        <div class="util-flex util-flex--column">
          <Text color="main" size="xl" bold>予約更新履歴</Text>
          <Text line-height="30px"> 2022/08/30 14:29 予約登録 </Text>
        </div>
      </div>
    </template>
    <div class="util-flex util-flex--gap16 util-flex--wrap">
      <div
        class="
          util-flex util-flex--align-center util-flex--column-gap8
          lay-headline
        "
      >
        <Badge size="small" color="success">予約確定</Badge>
        <Text size="xl" bold>予約：932425</Text>
      </div>
      <div class="util-flex util-flex--align-end util-flex--column-gap40">
        <div class="util-flex util-flex--column util-flex--row-gap8">
          <Text size="2xs" color="light" line-height="10px">宿泊施設</Text>
          <Text size="xl" bold line-height="30px">裏磐梯グランデコ</Text>
        </div>
        <div class="util-flex util-flex--column util-flex--row-gap8">
          <Text size="2xs" color="light" line-height="10px">到着日</Text>
          <Text size="xl" bold line-height="30px"> 2022年9月20日(火) </Text>
        </div>
        <div class="util-flex util-flex--column util-flex--row-gap8">
          <Text size="2xs" color="light" line-height="10px">出発日</Text>
          <Text size="xl" bold line-height="30px"> 2022年9月21日(木) </Text>
        </div>
        <div class="util-flex util-flex--column util-flex--row-gap8">
          <Text size="2xs" color="light" line-height="10px">泊数</Text>
          <Text size="xl" bold line-height="30px">1泊</Text>
        </div>
      </div>
      <Panel width="100%">
        <RoomTypeContent color="slot01">
          <template #title>
            <Text bold>部屋情報</Text>
          </template>
          <template #header>
            <div class="util-flex util-flex--align-center util-flex--gap16">
              <Text bold line-height="21px">部屋1</Text>
              <Badge size="small" color="slot01" icon="bedroom_parent">
                NE1 禁煙ファミリー和洋室
              </Badge>
            </div>
            <div class="util-flex util-flex--align-center util-flex--gap16">
              <Text size="2xs" color="light" line-height="10px">
                部屋番号
              </Text>
              <Text bold line-height="21px">101</Text>
            </div>
          </template>

          <div class="util-flex util-flex--column util-flex--gap16">
            <Text size="large" bold>2022年9月20日（火）</Text>
            <div class="util-flex util-flex--column util-flex--gap8">
              <div class="util-flex util-flex--align-center util-flex--gap40">
                <span
                  class="util-flex util-flex--align-center util-flex--gap16"
                >
                  <Text size="2xs" color="light" line-height="10px">
                    大人
                  </Text>
                  <Text bold line-height="21px">2人</Text>
                </span>
                <span
                  class="util-flex util-flex--align-center util-flex--gap16"
                >
                  <Text size="2xs" color="light" line-height="10px">
                    幼児
                  </Text>
                  <Text bold line-height="21px">1人</Text>
                </span>
              </div>
              <div class="util-flex util-flex--align-center util-flex--gap40">
                <span
                  class="util-flex util-flex--align-center util-flex--gap16"
                >
                  <Text size="2xs" color="light" line-height="10px">
                    お部屋条件
                  </Text>
                  <Text bold line-height="21px">禁煙</Text>
                </span>
                <span
                  class="util-flex util-flex--align-center util-flex--gap16"
                >
                  <Text size="2xs" color="light" line-height="10px">
                    リクエスト
                  </Text>
                  <Text bold line-height="21px">エレベーター近く</Text>
                </span>
                <span
                  class="util-flex util-flex--align-center util-flex--gap16"
                >
                  <Text size="2xs" color="light" line-height="10px">
                    部屋番号希望
                  </Text>
                  <Text bold line-height="21px">101</Text>
                </span>
              </div>
            </div>
            <Text :class="{ updated: isUpdated }" color="main" bold>
              プラン
            </Text>
            <Table
              :hover-effect="false"
              :fixed-layout="true"
              :is-cell-emphasis-color="isUpdated"
            >
              <template #head>
                <TableRow id="row-1">
                  <TableColumn id="col-1" width="97px">
                    プランコード
                  </TableColumn>
                  <TableColumn id="col-2" width="100%"> プラン名 </TableColumn>
                  <TableColumn id="col-3" width="78px" text-align="center">
                    大人
                  </TableColumn>
                  <TableColumn id="col-4" width="78px" text-align="center">
                    中人
                  </TableColumn>
                  <TableColumn id="col-5" width="78px" text-align="center">
                    小人
                  </TableColumn>
                  <TableColumn id="col-6" width="78px" text-align="center">
                    幼児
                  </TableColumn>
                </TableRow>
              </template>
              <template #body>
                <TableRow id="row-2">
                  <TableCell>AT0001</TableCell>
                  <TableCell
                    tooltip-text="雄大な絶景を望む！裏磐梯ロープウェイ往復乗車券付プラン|1泊2食付き雄大な"
                  >
                    <span>
                      雄大な絶景を望む！裏磐梯ロープウェイ往復乗車券付プラン|
                      1泊2食付き雄大な
                    </span>
                  </TableCell>
                  <TableCell text-align="center">2</TableCell>
                  <TableCell text-align="center">0</TableCell>
                  <TableCell text-align="center">0</TableCell>
                  <TableCell text-align="center">1</TableCell>
                </TableRow>
              </template>
            </Table>
            <Text bold>利用者情報</Text>
            <Table :hover-effect="false" :fixed-layout="true">
              <template #head>
                <TableRow id="row-1">
                  <TableColumn id="col-1" width="64px">代表者</TableColumn>
                  <TableColumn id="col-2" width="146px">氏名</TableColumn>
                  <TableColumn id="col-3" width="146px">
                    氏名(カナ)
                  </TableColumn>
                  <TableColumn id="col-4" width="152px"> 電話番号 </TableColumn>
                  <TableColumn id="col-5" width="90px" text-align="center">
                    続柄
                  </TableColumn>
                  <TableColumn id="col-6" width="150px"> 生年月日 </TableColumn>
                </TableRow>
              </template>
              <template #body>
                <TableRow id="row-2">
                  <TableCell text-align="center">
                    <Icon icon="check" color="#0061A3"></Icon>
                  </TableCell>
                  <TableCell>田中 太郎</TableCell>
                  <TableCell>タナカ タロウ</TableCell>
                  <TableCell>03-3333-1234</TableCell>
                  <TableCell text-align="center">本人</TableCell>
                  <TableCell>1986/10/21(38歳)</TableCell>
                </TableRow>
                <TableRow id="row-3">
                  <TableCell text-align="center"> </TableCell>
                  <TableCell>田中 花子</TableCell>
                  <TableCell>タナカ ハナコ</TableCell>
                  <TableCell>03-3333-1234</TableCell>
                  <TableCell text-align="center">妻</TableCell>
                  <TableCell>1986/10/21(38歳)</TableCell>
                </TableRow>
                <TableRow id="row-4">
                  <TableCell text-align="center"> </TableCell>
                  <TableCell>田中 瞬</TableCell>
                  <TableCell>タナカ シュン</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell text-align="center">子</TableCell>
                  <TableCell>2020/12/30(2歳)</TableCell>
                </TableRow>
              </template>
            </Table>
          </div>
        </RoomTypeContent>
      </Panel>
      <Panel width="100%">
        <div class="util-flex util-flex--column util-flex--gap16">
          <Text bold>レストラン</Text>
          <Text size="large" bold>2022年9月20日（火）</Text>
          <Text bold>夕食</Text>
          <Table :hover-effect="false" :fixed-layout="true">
            <template #head>
              <TableRow id="row-1">
                <TableColumn id="col-1" width="94px">
                  プランコード
                </TableColumn>
                <TableColumn id="col-2" width="122px">会場</TableColumn>
                <TableColumn id="col-3" width="104px">時間</TableColumn>
                <TableColumn id="col-4" width="134px">
                  メニュー・料金
                </TableColumn>
                <TableColumn id="col-5" width="48px" text-align="center">
                  大人
                </TableColumn>
                <TableColumn id="col-6" width="48px" text-align="center">
                  中人
                </TableColumn>
                <TableColumn id="col-7" width="48px" text-align="center">
                  小人
                </TableColumn>
                <TableColumn id="col-8" width="48px" text-align="center">
                  幼児
                </TableColumn>
                <TableColumn id="col-9" width="138px">備考</TableColumn>
              </TableRow>
            </template>
            <template #body>
              <TableRow id="row-2">
                <TableCell>AAA</TableCell>
                <TableCell wrap>ダイニングルーム「クレール」</TableCell>
                <TableCell>19:00</TableCell>
                <TableCell></TableCell>
                <TableCell text-align="center">1</TableCell>
                <TableCell text-align="center">1</TableCell>
                <TableCell text-align="center">1</TableCell>
                <TableCell text-align="center">1</TableCell>
                <TableCell wrap>
                  ステーキディナー(13歳以上) x1 ステーキディナー（7～12歳） x1
                  ステーキディナー（4～6歳
                </TableCell>
              </TableRow>
              <TableRow id="row-3">
                <TableCell>-</TableCell>
                <TableCell wrap>日本料理「吾妻」</TableCell>
                <TableCell>19:30</TableCell>
                <TableCell>やまなみ 8,800 ×1</TableCell>
                <TableCell text-align="center">1</TableCell>
                <TableCell text-align="center">0</TableCell>
                <TableCell text-align="center">0</TableCell>
                <TableCell text-align="center">0</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </template>
          </Table>
        </div>
      </Panel>
      <Panel width="100%">
        <div class="util-flex util-flex--column util-flex--gap16">
          <Text bold>利用代表者情報</Text>
          <Table :hover-effect="false" :fixed-layout="true">
            <template #head>
              <TableRow id="row-1">
                <TableColumn id="col-1" width="100px">続柄</TableColumn>
                <TableColumn id="col-2" width="100px">氏名</TableColumn>
                <TableColumn id="col-3" width="100px">氏名(カナ)</TableColumn>
                <TableColumn id="col-4" width="156px">電話番号</TableColumn>
                <TableColumn id="col-5" width="156px">
                  携帯電話番号
                </TableColumn>
                <TableColumn id="col-6" width="170px">生年月日</TableColumn>
              </TableRow>
            </template>
            <template #body>
              <TableRow id="row-2">
                <TableCell>会員本人</TableCell>
                <TableCell>田中 花子</TableCell>
                <TableCell>タナカ ハナコ</TableCell>
                <TableCell>03-3333-1234</TableCell>
                <TableCell>080-999-9999</TableCell>
                <TableCell>1986/10/21(38歳)</TableCell>
              </TableRow>
            </template>
          </Table>
        </div>
      </Panel>
      <Panel width="100%">
        <div class="util-flex util-flex--column util-flex--gap16">
          <Text bold>宿泊情報</Text>
          <span class="util-flex util-flex--align-center util-flex--gap16">
            <Text size="2xs" color="light" line-height="30px">
              到着予定時間
            </Text>
            <Text bold size="xl" line-height="30px">14:00</Text>
          </span>
          <Divider margin="0" />
          <Text bold>使用利用券</Text>
          <span class="util-flex util-flex--align-center util-flex--gap16">
            <Text size="2xs" color="light" line-height="30px">
              今回利用枚数
            </Text>
            <Text bold size="xl" line-height="30px">2枚</Text>
          </span>
          <Table :hover-effect="false" :fixed-layout="true">
            <template #head>
              <TableRow id="row-1">
                <TableColumn id="col-1" width="118px">
                  代表会員権番号
                </TableColumn>
                <TableColumn id="col-2" width="115px">利用者番号</TableColumn>
                <TableColumn id="col-3" width="245px">拠点</TableColumn>
                <TableColumn id="col-4" width="125px">種類</TableColumn>
                <TableColumn id="col-5" width="180px">有効期限</TableColumn>
              </TableRow>
            </template>
            <template #body>
              <TableRow id="row-2">
                <TableCell>AT0001</TableCell>
                <TableCell>xxxxxxxx</TableCell>
                <TableCell>裏磐梯グランデコ</TableCell>
                <TableCell>ホーム（譲渡）</TableCell>
                <TableCell>2022/12/31</TableCell>
              </TableRow>
              <TableRow id="row-3">
                <TableCell>AT0001</TableCell>
                <TableCell>xxxxxxxx</TableCell>
                <TableCell>裏磐梯グランデコ</TableCell>
                <TableCell>ホーム（譲渡）</TableCell>
                <TableCell>2022/12/31</TableCell>
              </TableRow>
            </template>
          </Table>
        </div>
      </Panel>
      <Panel width="100%">
        <div class="util-flex util-flex--column util-flex--gap16">
          <Text bold>ご宿泊料金</Text>
          <Table :hover-effect="false" :fixed-layout="true">
            <template #head>
              <TableRow id="row-1">
                <TableColumn id="col-1" width="160px">日付</TableColumn>
                <TableColumn id="col-2" width="154px">プラン</TableColumn>
                <TableColumn id="col-3" width="100%">料金区分</TableColumn>
                <TableColumn id="col-4" width="88px">単価</TableColumn>
                <TableColumn id="col-5" width="56px">人数</TableColumn>
                <TableColumn id="col-6" width="88px">内税</TableColumn>
                <TableColumn id="col-7" width="144px">税込金額</TableColumn>
              </TableRow>
            </template>
            <template #body>
              <TableRow id="row-2">
                <TableCell>2022年9月20日（火）</TableCell>
                <TableCell>お部屋のみ</TableCell>
                <TableCell>大人</TableCell>
                <TableCell text-align="right">￥4,620</TableCell>
                <TableCell>4</TableCell>
                <TableCell text-align="right">￥1,680</TableCell>
                <TableCell text-align="right">￥18,480</TableCell>
              </TableRow>
              <TableRow id="row-3">
                <TableCell></TableCell>
                <TableCell>お部屋のみ</TableCell>
                <TableCell>中人・小人</TableCell>
                <TableCell text-align="right">￥3,520</TableCell>
                <TableCell>2</TableCell>
                <TableCell text-align="right">￥640</TableCell>
                <TableCell text-align="right">￥7,040</TableCell>
              </TableRow>
              <TableRow id="row-4">
                <TableCell>2022年9月20日（火）</TableCell>
                <TableCell>お部屋のみ</TableCell>
                <TableCell>大人</TableCell>
                <TableCell text-align="right">￥4,620</TableCell>
                <TableCell>4</TableCell>
                <TableCell text-align="right">￥1,680</TableCell>
                <TableCell text-align="right">￥18,480</TableCell>
              </TableRow>
              <TableRow id="row-5">
                <TableCell></TableCell>
                <TableCell>お部屋のみ</TableCell>
                <TableCell>中人・小人</TableCell>
                <TableCell text-align="right">￥3,520</TableCell>
                <TableCell>2</TableCell>
                <TableCell text-align="right">￥640</TableCell>
                <TableCell text-align="right">￥7,040</TableCell>
              </TableRow>
            </template>
          </Table>
          <Text bold>前受金</Text>
          <Table :hover-effect="false" :fixed-layout="true">
            <template #head>
              <TableRow id="row-1">
                <TableColumn id="col-1" width="651px">日付</TableColumn>
                <TableColumn id="col-2" width="144px">金額</TableColumn>
              </TableRow>
            </template>
            <template #body>
              <TableRow id="row-2">
                <TableCell>2022年9月20日（火）</TableCell>
                <TableCell text-align="right">￥18,480</TableCell>
              </TableRow>
            </template>
          </Table>

          <Text bold>伝票</Text>
          <Table :hover-effect="false" :fixed-layout="true">
            <template #head>
              <TableRow id="row-1">
                <TableColumn id="col-1" width="100%">科目</TableColumn>
                <TableColumn id="col-2" width="88px">単価</TableColumn>
                <TableColumn id="col-3" width="56px">数量</TableColumn>
                <TableColumn id="col-4" width="144px">金額</TableColumn>
              </TableRow>
            </template>
            <template #body>
              <TableRow id="row-2">
                <TableCell>科目名科目名科目名科目名科目名科目名</TableCell>
                <TableCell text-align="right">￥4,620</TableCell>
                <TableCell>4</TableCell>
                <TableCell text-align="right">￥18,480</TableCell>
              </TableRow>
            </template>
          </Table>
        </div>
      </Panel>
      <Divider margin="0" />
      <div class="util-flex util-full-width">
        <div class="util-full-width util-flex--grow-one"></div>
        <div class="util-full-width util-flex--grow-one">
          <span
            class="
              util-flex util-flex--justify-between util-flex--align-center
              util-full-width
            "
          >
            <Text bold>小計</Text>
            <Text bold size="large" line-height="24px">¥ 88,000</Text>
          </span>
          <Divider margin="8px" />
          <span
            class="
              util-flex util-flex--justify-between util-flex--align-center
              util-full-width
            "
          >
            <span class="util-flex util-flex--column">
              <Text bold> ホテル税</Text>
              <Text size="2xs">※別途入湯税がかかります</Text>
            </span>
            <Text bold size="large" line-height="24px">¥ 1,200</Text>
          </span>
          <Divider margin="8px" />
          <span
            class="
              util-flex util-flex--justify-between util-flex--align-center
              util-full-width
            "
          >
            <Text bold size="large">お支払い金額合計</Text>
            <Text bold size="2xl" line-height="36px">¥ 89,200</Text>
          </span>
        </div>
      </div>
      <Divider margin="0" />
    </div>
    <template #footer> </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '../components/Text/Text.vue';
import { ref } from 'vue';
import Dialog from '../components/Dialog/Dialog.vue';
import Button from '../components/Button/Button.vue';
import Icon from '../components/Icon/Icon.vue';
import Badge from '../components/Badge/Badge.vue';
import Panel from '../components/Panel/Panel.vue';
import RoomTypeContent from '../components/RoomTypeContent/RoomTypeContent.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import Divider from '../components/Divider/Divider.vue';

const open = ref(true);

const isUpdated = ref(true);

const onClickBack = () => {
  console.log('clicked arrow back button');
};

const onCloseDialog = () => {
  open.value = false;
};
</script>

<style scoped lang="scss">
.updated {
  color: #2196f3;
}
</style>
