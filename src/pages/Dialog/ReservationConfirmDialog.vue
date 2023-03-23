<template>
  <Dialog :open="open" size="large" @close-dialog="onCloseDialog">
    <template #header>
      <Text color="main" size="xl" bold>予約内容確認</Text>
    </template>
    <div class="util-flex util-flex--gap16 util-flex--wrap">
      <div
          class="
          util-flex util-flex--align-center util-flex--column-gap8
          lay-headline
        "
      >
        <Badge size="small" color="success">予約確定</Badge>
        <Text size="xl" bold>予約：９３２４２５</Text>
      </div>
      <div class="util-flex util-flex--align-end util-flex--column-gap40">
        <div class="util-flex util-flex--column util-flex--row-gap8">
          <Text size="2xs" color="light" line-height="10px">宿泊施設</Text>
          <Text size="xl" bold line-height="30px">裏磐梯グランデコ</Text>
        </div>
        <div class="util-flex util-flex--column util-flex--row-gap8">
          <Text size="2xs" color="light" line-height="10px">到着日</Text>
          <Text size="xl" bold line-height="30px">
            ２０２２年９月２０日(火)
          </Text>
        </div>
        <div class="util-flex util-flex--column util-flex--row-gap8">
          <Text size="2xs" color="light" line-height="10px">出発日</Text>
          <Text size="xl" bold line-height="30px">
            ２０２２年９月２２日(木)
          </Text>
        </div>
        <div class="util-flex util-flex--column util-flex--row-gap8">
          <Text size="2xs" color="light" line-height="10px">泊数</Text>
          <Text size="xl" bold line-height="30px">２泊</Text>
        </div>
      </div>
      <Panel width="100%">
        <div class="util-flex util-flex--column util-flex--gap16">
          <Text bold>部屋情報</Text>
          <span>
            <Badge size="small" color="slot01" icon="bedroom_parent">
              SDツイン
            </Badge>
          </span>
          <span class="util-flex util-flex--align-center util-flex--gap16">
            <Text size="2xs" color="light" line-height="10px">大人</Text>
            <Text bold line-height="21px">2人</Text>
          </span>
          <span class="util-flex util-flex--align-center util-flex--gap40">
            <span class="util-flex util-flex--align-center util-flex--gap16">
              <Text size="2xs" color="light" line-height="10px">部屋希望</Text>
              <Text bold line-height="21px">喫煙</Text>
            </span>
            <span class="util-flex util-flex--align-center util-flex--gap16">
              <Text size="2xs" color="light" line-height="10px">
                部屋リクエスト
              </Text>
              <Text bold line-height="21px">エレベーターに近い部屋</Text>
            </span>
          </span>
          <Text bold>プラン</Text>
          <Table :hover-effect="false" :fixed-layout="true">
            <template #head>
              <TableRow id="row-1">
                <TableColumn id="col-1" width="97px">
                  プランコード
                </TableColumn>
                <TableColumn id="col-2" width="370px">プラン名</TableColumn>
                <TableColumn id="col-3" width="77px" text-align="center">
                  大人
                </TableColumn>
                <TableColumn id="col-4" width="77px" text-align="center">
                  中人
                </TableColumn>
                <TableColumn id="col-5" width="77px" text-align="center">
                  小人
                </TableColumn>
                <TableColumn id="col-6" width="77px" text-align="center">
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
                <TableCell text-align="center">0</TableCell>
                <TableCell text-align="center">0</TableCell>
                <TableCell text-align="center">0</TableCell>
                <TableCell text-align="center">0</TableCell>
              </TableRow>
            </template>
          </Table>
          <Text bold>利用者情報</Text>
          <Table :hover-effect="false" :fixed-layout="true">
            <template #head>
              <TableRow id="row-1">
                <TableColumn id="col-1" width="64px">代表者</TableColumn>
                <TableColumn id="col-2" width="146px">氏名</TableColumn>
                <TableColumn id="col-3" width="146px">氏名(カナ)</TableColumn>
                <TableColumn id="col-4" width="158px">電話番号</TableColumn>
                <TableColumn id="col-5" width="100px">続柄</TableColumn>
                <TableColumn id="col-6" width="170px">生年月日</TableColumn>
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
      </Panel>
      <Panel width="100%">
        <div class="util-flex util-flex--column util-flex--gap16">
          <Text bold>レストラン</Text>
          <Text size="large" bold>２０２２年９月２０日(火)</Text>
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
      <Divider margin="0" />
      <span
          class="
          util-flex util-flex--align-center util-flex--justify-between
          util-full-width
        "
      >
        <Text bold>小計</Text>
        <Text bold size="large" line-height="24px">¥18,480</Text>
      </span>
      <Divider margin="0" />
      <span
          class="
          util-flex util-flex--align-center util-flex--justify-between
          util-full-width
        "
      >
        <Text bold>追加(入湯税など)</Text>
        <Text bold size="large" line-height="24px">¥18,480</Text>
      </span>
      <Divider margin="0" />
      <span
          class="
          util-flex util-flex--align-center util-flex--justify-between
          util-full-width
        "
      >
        <Text bold size="large">お支払い金額合計</Text>
        <Text bold size="2xl" line-height="36px">¥18,480</Text>
      </span>
    </div>
    <template #footer>
      <Button size="large" width="200px">印刷</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Text from '@components/Text/Text.vue';
import Dialog from '@components/Dialog/Dialog.vue';
import Button from '@components/Button/Button.vue';
import Icon from '@components/Icon/Icon.vue';
import Badge from '@components/Badge/Badge.vue';
import Panel from '@components/Panel/Panel.vue';
import Table from '@components/Table/Table.vue';
import TableCell from '@components/Table/TableCell.vue';
import TableColumn from '@components/Table/TableColumn.vue';
import TableRow from '@components/Table/TableRow.vue';
import Divider from '@components/Divider/Divider.vue';

const props = withDefaults(
    defineProps<{
      open: boolean
    }>(),
    {
      open: false
    }
);
const emit = defineEmits<{ (event: 'closeDialog'): void }>();

const onCloseDialog = () => {
  emit('closeDialog');
};
</script>

<style scoped>

</style>