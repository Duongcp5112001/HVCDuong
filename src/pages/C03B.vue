<template>
  <Dialog
    v-if="newReservationToDelete"
    :open="confirmDeleteNewReservationOpen"
    @close-dialog="confirmDeleteNewReservationOpen = false"
  >
    <template #header>
      <Text color="critical" size="xl" bold>
        付帯施設予約をキャンセルします
      </Text>
    </template>
    <Text class="util-mb-8" color="light" bold>
      宿泊の予約はキャンセルされません。
    </Text>
    <template #table>
      <Table width="100%">
        <template #head>
          <TableRow id="row-1">
            <TableColumn id="col-1" width="144px">施設名</TableColumn>
            <TableColumn id="col-2" min-width="173px">利用日</TableColumn>
            <TableColumn id="col-4" min-width="43px" text-align="center">
              時間
            </TableColumn>
          </TableRow>
        </template>
        <template #body>
          <TableRow id="row-1">
            <TableCell>{{ newReservationToDelete.categoryLabel }}</TableCell>
            <TableCell>
              {{ formatDate(newReservationToDelete.dayDate) }}
            </TableCell>
            <TableCell>
              {{
                formatTime(
                  newReservationToDelete.startHour,
                  newReservationToDelete.endHour
                )
              }}
            </TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #footer>
      <Button
        size="large"
        width="160px"
        color="critical"
        icon="delete"
        @click="onConfirmCancelReservation"
      >
        キャンセル
      </Button>
    </template>
  </Dialog>
  <div class="lay-container lay-container--4panes">
    <the-sidebar/>
    <main id="lay-main" class="lay-main">
      <ContentHeader class="lay-main__container--3-panes">
        <template #headlineLeft>
          <Badge size="small" color="success">予約確定</Badge>
          <Text class="util-ml-8" size="xl" bold>予約：９３２４２５</Text>
        </template>
        <template #headlineRight>
          <FieldContainer label="予約受付媒体区分" width="120px">
            <Dropdown
              v-model:value="reservationMethodDropdownSelection"
              placeholder="電話"
              size="small"
              width="120px"
            >
              <DropdownItem
                v-for="(option, i) in reservationMethodDropdownOptions"
                :key="i"
                :label="option.label"
                :value="option.value"
              >
              </DropdownItem>
            </Dropdown>
          </FieldContainer>
        </template>
        <template #content>
          <div
            class="
              util-flex
              util-flex--align-end
              util-flex--column-gap40
              util-flex--row-gap16
              util-flex--wrap
            "
          >
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
            <Button
              size="medium"
              type="outlined"
              color="neutral"
              icon="calendar_today"
            >
              日程変更
            </Button>
            <div class="util-flex util-flex--column util-flex--row-gap8">
              <Text size="2xs" color="light" line-height="10px">泊数</Text>
              <Text size="xl" bold line-height="30px">２泊</Text>
            </div>
            <div class="util-flex util-flex--column util-flex--row-gap8">
              <Text size="2xs" color="light" line-height="10px">
                合計部屋数
              </Text>
              <Text size="xl" bold line-height="30px">１部屋</Text>
            </div>
            <div class="util-flex util-flex--column util-flex--row-gap8">
              <Text size="2xs" color="light" line-height="10px">
                利用券枚数
              </Text>
              <Text size="xl" bold line-height="30px">２枚</Text>
            </div>
          </div>
        </template>
        <template #anchorNav>
          <Button
            size="medium"
            type="outlined"
            color="neutral"
            @click="navigateSections('section-1')"
          >
            顧客基本／利用者代表情報
          </Button>
          <Button
            size="medium"
            type="outlined"
            color="neutral"
            @click="navigateSections('section-2')"
          >
            宿泊情報
          </Button>
          <Button
            size="medium"
            type="outlined"
            color="neutral"
            @click="navigateSections('section-3')"
          >
            部屋情報
          </Button>
          <Button
            size="medium"
            type="outlined"
            color="neutral"
            @click="navigateSections('section-4')"
          >
            レストラン
          </Button>
          <Button
            size="medium"
            type="outlined"
            color="neutral"
            @click="navigateSections('section-5')"
          >
            付帯施設
          </Button>
        </template>
      </ContentHeader>
      <span class="lay-main__container lay-main__container--3-panes">
        <Panel id="section-1">
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
              <div class="util-flex util-flex--align-center util-flex--gap8">
                <Text color="light" no-wrap>TRSポイント</Text>
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
            class="util-flex util-flex--align-center util-flex--gap8 util-mb-16"
          >
            <Badge size="small" color="error" icon="error">年会費未納</Badge>
            <Badge size="small" color="warning" icon="confirmation_number">
              チケットレス
            </Badge>
            <Badge size="small" color="success" icon="sentiment_very_satisfied">
              優良
            </Badge>
          </span>
          <Divider margin="16px" />
          <span class="util-flex util-flex--align-center util-flex--gap16">
            <Text bold>利用代表者</Text>
          </span>
          <Table class="util-mt-16" width="100%" fixed-layout>
            <template #head>
              <TableRow id="row-1">
                <TableColumn id="col-1" width="176px"> 顧客番号 </TableColumn>
                <TableColumn id="col-2" width="160px"> 氏名</TableColumn>
                <TableColumn id="col-3" width="160px">
                  氏名（カナ）
                </TableColumn>
                <TableColumn id="col-4" width="160px"> 電話番号</TableColumn>
                <TableColumn id="col-5" width="160px">
                  携帯電話番号
                </TableColumn>
                <TableColumn id="col-6" width="104px" text-align="center">
                  続柄
                </TableColumn>
                <TableColumn id="col-6" width="176px"> 生年月日 </TableColumn>
                <TableColumn id="col-6" width="74px" text-align="center">
                  操作
                </TableColumn>
              </TableRow>
            </template>
            <template #body>
              <TableRow id="row-2">
                <TableCell> AT1234567890 </TableCell>
                <TableCell>田中 花子</TableCell>
                <TableCell>タナカ ハナコ</TableCell>
                <TableCell>03-3333-1234</TableCell>
                <TableCell>080-999-9999</TableCell>
                <TableCell>妻</TableCell>
                <TableCell>1986/10/21(38歳)</TableCell>
                <TableCell>
                  <Button color="neutral" type="outlined" text-align="center">
                    変更
                  </Button>
                </TableCell>
              </TableRow>
            </template>
          </Table>
        </Panel>
        <Disclosure id="section-2" color="light" :opened="true">
          <template #title><Text bold>宿泊情報</Text></template>
          <div
            class="
              util-flex util-flex--gap8 util-flex--wrap util-flex--align-end
            "
          >
            <FieldContainer label="予約タイプ" width="80px">
              <Dropdown
                v-model:value="reservationTypeDropdownSelection"
                placeholder="個人"
                size="small"
                width="80px"
              >
                <DropdownItem
                  v-for="(option, i) in reservationTypeDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </FieldContainer>
            <FieldContainer label="団体予約名" width="272px">
              <TextField v-model="clientName" />
            </FieldContainer>
            <FieldContainer label="到着予定時間" width="128px">
              <TimePicker size="small" width="128px" />
            </FieldContainer>
            <FieldContainer label="予約経路１" width="80px">
              <Dropdown
                v-model:value="reservationRoute1DropdownSelection"
                placeholder="HKW"
                size="small"
                width="80px"
              >
                <DropdownItem
                  v-for="(option, i) in reservationRouteDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </FieldContainer>
            <FieldContainer width="272px">
              <Dropdown
                v-model:value="reservationRouteDetail1DropdownSelection"
                placeholder="ホーム個人WEB"
                size="small"
                width="272px"
              >
                <DropdownItem
                  v-for="(option, i) in reservationRouteDetailDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </FieldContainer>
            <FieldContainer label="予約経路２" width="80px">
              <Dropdown
                v-model:value="reservationRoute2DropdownSelection"
                placeholder="-"
                size="small"
                width="80px"
              >
                <DropdownItem
                  v-for="(option, i) in reservationRouteDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </FieldContainer>
            <FieldContainer width="272px">
              <Dropdown
                v-model:value="reservationRouteDetail2DropdownSelection"
                placeholder="-"
                size="small"
                width="272px"
              >
                <DropdownItem
                  v-for="(option, i) in reservationRouteDetailDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
            </FieldContainer>
          </div>
          <Divider margin="16px" />
          <div class="util-flex util-flex--column util-flex--row-gap16">
            <Text bold>使用利用券</Text>
            <span>
              <span
                class="
                  util-flex util-flex--align-center util-flex--justify-between
                  util-mb-8
                "
              >
                <span class="util-flex util-flex--column-gap16">
                  <Text color="light" size="2xs">今回利用枚数</Text>
                  <Text bold size="large">１</Text>
                </span>
                <Button size="medium" type="outlined" color="neutral">
                  利用券指定
                </Button>
              </span>
              <Table height="" width="100%">
                <template #head>
                  <TableRow id="row-1">
                    <TableColumn id="col-1" width="120px">
                      代表会員権番号
                    </TableColumn>
                    <TableColumn id="col-2" width="120px"> 枝番</TableColumn>
                    <TableColumn id="col-3" width="120px">
                      パスコード
                    </TableColumn>
                    <TableColumn id="col-4"> 拠点</TableColumn>
                    <TableColumn id="col-5" width="132px"> 種類</TableColumn>
                    <TableColumn id="col-6" width="184px">
                      有効期限
                    </TableColumn>
                  </TableRow>
                </template>
                <template #body>
                  <TableRow id="row-2">
                    <TableCell> AT0001 </TableCell>
                    <TableCell>xxx</TableCell>
                    <TableCell>xxx</TableCell>
                    <TableCell>裏磐梯グランデコ</TableCell>
                    <TableCell>ホーム</TableCell>
                    <TableCell>2022/12/31</TableCell>
                  </TableRow>
                  <TableRow id="row-3">
                    <TableCell> AT0001 </TableCell>
                    <TableCell>xxx</TableCell>
                    <TableCell>xxx</TableCell>
                    <TableCell>裏磐梯グランデコ</TableCell>
                    <TableCell>ホーム</TableCell>
                    <TableCell>2022/12/31</TableCell>
                  </TableRow>
                </template>
              </Table>
            </span>
          </div>
        </Disclosure>
        <Disclosure id="section-3" color="light" :opened="true">
          <template #title><Text bold>部屋情報</Text></template>
          <div class="util-mb-16">
            <Button size="medium" type="outlined" color="neutral">
              部屋タイプの変更
            </Button>
          </div>
          <RoomTypeCard
            class="util-mb-16"
            :room-labels="['SDツイン']"
            color="slot01"
          >
            <template #header>
              <Text class="util-flex util-flex--gap16" bold size="large">
                <span>2022年9月20日(火)</span>
                <span>5泊</span>
                <span>3室</span>
              </Text>
            </template>
            <div class="util-flex util-flex--align-center util-flex--gap16">
              <Text bold size="large" width="60px"> 99室 </Text>
              <InlinePopupSplitStays
                :days-to-split="3"
                size="small"
                aligned="left"
                target-label="部屋"
                counter-label="室"
                @confirm-split="onConfirmSplit1"
              />
            </div>
            <Disclosure color="light" :shadow="false" fitted>
              <template #title>
                <span
                  class="
                    util-full-width
                    util-flex
                    util-flex--align-center
                    util-flex--row-gap8
                  "
                >
                  <Text
                    class="
                      util-flex util-flex--align-center
                      util-mr-40
                      util-flex--shrink-zero
                    "
                    bold
                  >
                    2022年9月20日（火） 5泊
                  </Text>
                  <span
                    class="
                      util-flex util-full-width
                      util-flex--row-gap8
                      util-flex--justify-between
                      util-flex--wrap
                    "
                  >
                    <span class="util-flex util-flex--align-center util-px-24">
                      <Text class="util-mr-32" size="xs">
                        大人 1 / 中人 1 / 小人 0 / 幼児 0
                      </Text>
                      <span class="util-flex util-flex--gap8 util-flex--wrap">
                        <Badge
                          size="small"
                          color="neutral-faded"
                          type="outlined"
                        >
                          プラン
                        </Badge>
                        <Badge size="small" color="neutral" type="outlined">
                          手配品・備品
                        </Badge>
                        <Badge
                          size="small"
                          color="neutral-faded"
                          type="outlined"
                        >
                          利用者
                        </Badge>
                      </span>
                    </span>
                    <InlinePopupSplitStays
                      :days-to-split="3"
                      size="small"
                      aligned="right"
                      target-label="連泊"
                      counter-label="泊"
                      @confirm-split="onConfirmSplit2"
                    />
                  </span>
                </span>
              </template>
              Disclosure Content
            </Disclosure>
          </RoomTypeCard>
          <RoomTypeCard
            class="util-mb-16"
            :room-labels="['ファミリーツイン']"
            color="slot02"
          >
            <template #header>
              <Text class="util-flex util-flex--gap16" bold size="large">
                <span>2022年9月20日(火)</span>
                <span>1泊</span>
                <span>1室</span>
              </Text>
            </template>
            <div class="util-flex util-flex--align-center util-flex--gap16">
              <Text bold size="large" width="60px"> 1室 </Text>
            </div>
            <Disclosure color="light" :shadow="false" fitted>
              <template #title>
                <span
                  class="
                    util-full-width
                    util-flex
                    util-flex--align-center
                    util-flex--justify-between
                    util-flex--row-gap8
                    util-flex--wrap
                  "
                >
                  <span class="util-flex">
                    <Text
                      class="
                        util-flex util-flex--align-center
                        util-mr-40
                        util-flex--shrink-zero
                      "
                      bold
                    >
                      2022年9月20日（火） 5泊
                    </Text>
                    <span class="util-flex util-flex--row-gap8 util-flex--wrap">
                      <span
                        class="util-flex util-flex--align-center util-px-24"
                      >
                        <Text class="util-mr-32" size="xs">
                          大人 1 / 中人 1 / 小人 0 / 幼児 0
                        </Text>
                        <span class="util-flex util-flex--gap8 util-flex--wrap">
                          <Badge
                            size="small"
                            color="neutral-faded"
                            type="outlined"
                          >
                            プラン
                          </Badge>
                          <Badge size="small" color="neutral" type="outlined">
                            手配品・備品
                          </Badge>
                          <Badge
                            size="small"
                            color="neutral-faded"
                            type="outlined"
                          >
                            利用者
                          </Badge>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </template>
              Disclosure Content
            </Disclosure>
          </RoomTypeCard>
          <RoomTypeCard
            class="util-mb-16"
            :room-labels="[
              'SDツイン（2泊）',
              'EXツイン（1泊）',
              'SDツイン（1泊）',
            ]"
            color="slot03"
          >
            <template #header>
              <Text class="util-flex util-flex--gap16" bold size="large">
                <span>2022年9月20日(火)</span>
                <span>5泊</span>
                <span>1室</span>
              </Text>
            </template>
            <div class="util-flex util-flex--align-center util-flex--gap16">
              <Text bold size="large" width="60px"> 1室 </Text>
            </div>
            <Disclosure color="light" :shadow="false" fitted>
              <template #title>
                <span
                  class="
                    util-full-width
                    util-flex
                    util-flex--align-center
                    util-flex--row-gap8
                  "
                >
                  <Text
                    class="
                      util-flex util-flex--align-center
                      util-mr-40
                      util-flex--shrink-zero
                    "
                    bold
                  >
                    2022年9月20日（火） 2泊/SDツイン
                  </Text>
                  <span
                    class="
                      util-flex util-full-width
                      util-flex--row-gap8
                      util-flex--justify-between
                      util-flex--wrap
                    "
                  >
                    <span class="util-flex util-flex--align-center util-px-24">
                      <Text class="util-mr-32" size="xs">
                        大人 1 / 中人 1 / 小人 0 / 幼児 0
                      </Text>
                      <span class="util-flex util-flex--gap8 util-flex--wrap">
                        <Badge
                          size="small"
                          color="neutral-faded"
                          type="outlined"
                        >
                          プラン
                        </Badge>
                        <Badge size="small" color="neutral" type="outlined">
                          手配品・備品
                        </Badge>
                        <Badge
                          size="small"
                          color="neutral-faded"
                          type="outlined"
                        >
                          利用者
                        </Badge>
                      </span>
                    </span>
                    <InlinePopupSplitStays
                      :days-to-split="3"
                      size="small"
                      aligned="right"
                      target-label="連泊"
                      counter-label="泊"
                      @confirm-split="onConfirmSplit3"
                    />
                  </span>
                </span>
              </template>
              <div
                class="
                  util-flex util-flex--gap40 util-flex--row-gap8 util-flex--wrap
                "
              >
                <div class="util-flex util-flex--gap8">
                  <span class="util-flex util-flex--align-end">
                    <FieldContainer label="大人" width="64px">
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
                </div>
                <FieldContainer label="到着予定時間" width="120px">
                  <TimePicker size="small" width="120px" />
                </FieldContainer>
                <div class="util-flex util-flex--gap8 util-flex--wrap">
                  <FieldContainer label="部屋希望" width="64px">
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
                  <FieldContainer label="部屋希望" width="555px">
                    <TextField width="555px"></TextField>
                  </FieldContainer>
                </div>
                <Divider margin="16px" />
                <div class="util-flex util-flex--align-center util-flex--gap40">
                  <Text bold width="80px"> プラン </Text>
                  <Button color="neutral" type="outlined"> 追加 </Button>
                </div>
                <Table width="100%" fixed-layout>
                  <template #head>
                    <TableRow id="row-1">
                      <TableColumn id="col-1" width="94px">
                        プランコード
                      </TableColumn>
                      <TableColumn id="col-2">プラン名</TableColumn>
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
                      <TableColumn id="col-7" width="75px" text-align="center">
                        変更
                      </TableColumn>
                      <TableColumn id="col-8" width="48px" text-align="center">
                        削除
                      </TableColumn>
                    </TableRow>
                  </template>
                  <template #body>
                    <TableRow id="row-2">
                      <TableCell>AAA</TableCell>
                      <TableCell>
                        雄大な絶景を望む！裏磐梯ロープウェイ往復乗車券付きプラン|1泊2食付き雄大な絶景を望む！裏磐梯ロープウェイ往復乗車券付きプラン|1泊2食付き
                      </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        <Button color="neutral" type="outlined"> 変更 </Button>
                      </TableCell>
                      <TableCell>
                        <Button color="critical" type="text" icon="delete" />
                      </TableCell>
                    </TableRow>
                    <TableRow id="row-2">
                      <TableCell>BBB</TableCell>
                      <TableCell>
                        東急ゴルフコース 1泊1プレー 昼食付プラン
                      </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>
                        <Button color="neutral" type="outlined"> 変更 </Button>
                      </TableCell>
                      <TableCell>
                        <Button color="critical" type="text" icon="delete" />
                      </TableCell>
                    </TableRow>
                  </template>
                </Table>
                <Divider margin="16px" />
                <div class="util-flex util-flex--align-center util-flex--gap40">
                  <Text bold width="80px"> 手配品・備品 </Text>
                  <Button color="neutral" type="outlined"> 追加 </Button>
                </div>
                <Table width="100%" fixed-layout>
                  <template #head>
                    <TableRow id="row-1">
                      <TableColumn id="col-1" width="94px">
                        プランコード
                      </TableColumn>
                      <TableColumn id="col-2" width="123px"> 品名</TableColumn>
                      <TableColumn id="col-3" width="97px"> 数量 </TableColumn>
                      <TableColumn id="col-4"> 備考</TableColumn>
                      <TableColumn id="col-5" width="48px" text-align="center">
                        削除
                      </TableColumn>
                    </TableRow>
                  </template>
                  <template #body>
                    <TableRow id="row-2">
                      <TableCell> - </TableCell>
                      <TableCell>浴衣S</TableCell>
                      <TableCell><TextField width="80px" /></TableCell>
                      <TableCell><TextField width="100%" /></TableCell>
                      <TableCell>
                        <Button color="critical" type="text" icon="delete" />
                      </TableCell>
                    </TableRow>
                    <TableRow id="row-3">
                      <TableCell> - </TableCell>
                      <TableCell>浴衣M</TableCell>
                      <TableCell><TextField width="80px" /></TableCell>
                      <TableCell><TextField width="100%" /></TableCell>
                      <TableCell>
                        <Button color="critical" type="text" icon="delete" />
                      </TableCell>
                    </TableRow>
                  </template>
                </Table>
                <Divider margin="16px" />
                <div class="util-flex util-flex--align-center util-flex--gap40">
                  <Text bold width="80px"> 利用者情報 </Text>
                  <Button color="neutral" type="outlined"> 追加 </Button>
                </div>
                <Table width="100%" fixed-layout>
                  <template #head>
                    <TableRow id="row-1">
                      <TableColumn id="col-1" width="64px" text-align="center">
                        代表者
                      </TableColumn>
                      <TableColumn id="col-2" width="176px">
                        顧客番号
                      </TableColumn>
                      <TableColumn id="col-3"> 氏名 </TableColumn>
                      <TableColumn id="col-4"> 氏名（カナ） </TableColumn>
                      <TableColumn id="col-5" width="160px">
                        電話番号
                      </TableColumn>
                      <TableColumn id="col-6" width="104px" text-align="center">
                        続柄
                      </TableColumn>
                      <TableColumn id="col-7" width="176px">
                        生年月日
                      </TableColumn>
                      <TableColumn id="col-8" width="48px" text-align="center">
                        削除
                      </TableColumn>
                    </TableRow>
                  </template>
                  <template #body>
                    <TableRow id="row-2">
                      <TableCell text-align="center">
                        <RadioButton />
                      </TableCell>
                      <TableCell> S023789300 </TableCell>
                      <TableCell>田中 太郎</TableCell>
                      <TableCell>タナカ タロウ</TableCell>
                      <TableCell>03-3333-1234</TableCell>
                      <TableCell> 本人 </TableCell>
                      <TableCell>1986/10/21(38歳)</TableCell>
                      <TableCell>
                        <Button color="critical" type="text" icon="delete" />
                      </TableCell>
                    </TableRow>
                    <TableRow id="row-3">
                      <TableCell text-align="center">
                        <RadioButton />
                      </TableCell>
                      <TableCell> - </TableCell>
                      <TableCell>田中 花子</TableCell>
                      <TableCell>タナカ ハナコ</TableCell>
                      <TableCell>03-3333-1234</TableCell>
                      <TableCell>妻</TableCell>
                      <TableCell> 1986/10/21(38歳) </TableCell>
                      <TableCell>
                        <Button color="critical" type="text" icon="delete" />
                      </TableCell>
                    </TableRow>
                    <TableRow id="row-4">
                      <TableCell text-align="center">
                        <RadioButton />
                      </TableCell>
                      <TableCell> - </TableCell>
                      <TableCell>田中 瞬</TableCell>
                      <TableCell>タナカ シュン</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>子</TableCell>
                      <TableCell>2020/12/30(2歳)</TableCell>
                      <TableCell>
                        <Button color="critical" type="text" icon="delete" />
                      </TableCell>
                    </TableRow>
                  </template>
                </Table>
              </div>
            </Disclosure>
            <Disclosure color="light" :shadow="false" fitted>
              <template #title>
                <span
                  class="
                    util-full-width
                    util-flex
                    util-flex--align-center
                    util-flex--row-gap8
                  "
                >
                  <Text
                    class="
                      util-flex util-flex--align-center
                      util-mr-40
                      util-flex--shrink-zero
                    "
                    bold
                  >
                    2022年9月22日（木） 2泊/EXツイン
                  </Text>
                  <span
                    class="
                      util-flex util-full-width
                      util-flex--row-gap8
                      util-flex--justify-between
                      util-flex--wrap
                    "
                  >
                    <span class="util-flex util-flex--align-center util-px-24">
                      <Text class="util-mr-32" size="xs">
                        大人 1 / 中人 1 / 小人 0 / 幼児 0
                      </Text>
                      <span class="util-flex util-flex--gap8 util-flex--wrap">
                        <Badge
                          size="small"
                          color="neutral-faded"
                          type="outlined"
                        >
                          プラン
                        </Badge>
                        <Badge size="small" color="neutral" type="outlined">
                          手配品・備品
                        </Badge>
                        <Badge
                          size="small"
                          color="neutral-faded"
                          type="outlined"
                        >
                          利用者
                        </Badge>
                      </span>
                    </span>
                    <InlinePopupSplitStays
                      :days-to-split="3"
                      size="small"
                      aligned="right"
                      target-label="連泊"
                      counter-label="泊"
                      @confirm-split="onConfirmSplit3"
                    />
                  </span>
                </span>
              </template>
              Disclosure Content
            </Disclosure>
            <Disclosure color="light" :shadow="false" fitted>
              <template #title>
                <span
                  class="
                    util-full-width
                    util-flex
                    util-flex--align-center
                    util-flex--justify-between
                    util-flex--row-gap8
                    util-flex--wrap
                  "
                >
                  <span class="util-flex">
                    <Text
                      class="
                        util-flex util-flex--align-center
                        util-mr-40
                        util-flex--shrink-zero
                      "
                      bold
                    >
                      2022年9月24日（金） 1泊/SDツイン
                    </Text>
                    <span class="util-flex util-flex--row-gap8 util-flex--wrap">
                      <span
                        class="util-flex util-flex--align-center util-px-24"
                      >
                        <Text class="util-mr-32" size="xs">
                          大人 1 / 中人 1 / 小人 0 / 幼児 0
                        </Text>
                        <span class="util-flex util-flex--gap8 util-flex--wrap">
                          <Badge
                            size="small"
                            color="neutral-faded"
                            type="outlined"
                          >
                            プラン
                          </Badge>
                          <Badge size="small" color="neutral" type="outlined">
                            手配品・備品
                          </Badge>
                          <Badge
                            size="small"
                            color="neutral-faded"
                            type="outlined"
                          >
                            利用者
                          </Badge>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </template>
              Disclosure Content
            </Disclosure>
          </RoomTypeCard>
        </Disclosure>
        <Disclosure id="section-4" color="light" :opened="true">
          <template #title><Text bold>レストラン</Text></template>
          <div class="util-flex util-flex--column util-flex--gap16">
            <Panel width="100%">
              <div class="util-mb-16">
                <Text bold size="large"> 2022年9月20日（火） </Text>
              </div>
              <div class="util-flex util-full-width">
                <Text
                  class="util-py-8 util-flex--shrink-zero"
                  bold
                  width="76px"
                >
                  夕食
                </Text>
                <Button
                  color="neutral"
                  type="outlined"
                  icon="open_in_new"
                  icon-position="right"
                  width="fit-content"
                >
                  追加
                </Button>
              </div>
            </Panel>
            <Panel width="100%" :scroll-x="false">
              <div class="util-mb-16">
                <Text bold size="large"> 2022年9月21日（火） </Text>
              </div>
              <div class="util-flex util-full-width util-mb-16">
                <Text
                  class="util-py-8 util-flex--shrink-zero"
                  bold
                  width="76px"
                >
                  朝食
                </Text>
                <Table width="100%" fixed-layout>
                  <template #head>
                    <TableRow id="row-1">
                      <TableColumn id="col-1" width="94px">
                        プランコード
                      </TableColumn>
                      <TableColumn id="col-2" width="120px"> 会場 </TableColumn>
                      <TableColumn id="col-3" width="120px">
                        カテゴリー
                      </TableColumn>
                      <TableColumn id="col-4" width="120px"> 時間 </TableColumn>
                      <TableColumn id="col-5" width="229px">
                        メニュー・料金
                      </TableColumn>
                      <TableColumn id="col-6" width="48px" text-align="center">
                        大人
                      </TableColumn>
                      <TableColumn id="col-7" width="48px" text-align="center">
                        中人
                      </TableColumn>
                      <TableColumn id="col-8" width="48px" text-align="center">
                        小人
                      </TableColumn>
                      <TableColumn id="col-9" width="48px" text-align="center">
                        幼児
                      </TableColumn>
                      <TableColumn id="col-10" width="160px">
                        備考
                      </TableColumn>
                      <TableColumn id="col-11" width="96px" text-align="center">
                        変更
                      </TableColumn>
                      <TableColumn id="col-12" width="96px" text-align="center">
                        キャンセル
                      </TableColumn>
                    </TableRow>
                  </template>
                  <template #body>
                    <TableRow id="row-2">
                      <TableCell> - </TableCell>
                      <TableCell wrap>ダイニングルーム「クレール」</TableCell>
                      <TableCell>会場食</TableCell>
                      <TableCell>19:00</TableCell>
                      <TableCell wrap>
                        朝食和洋ブッフェ（大人） \2,420 x2
                        朝食和洋ブッフェ（中人） \
                      </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>お子様用椅子１脚</TableCell>
                      <TableCell text-align="center">
                        <Button
                          icon="open_in_new"
                          color="neutral"
                          type="outlined"
                          icon-position="right"
                        >
                          変更
                        </Button>
                      </TableCell>
                      <TableCell text-align="center">
                        <Button icon="delete" color="critical" type="text">
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow id="row-3">
                      <TableCell> - </TableCell>
                      <TableCell wrap>日本料理「吾妻」</TableCell>
                      <TableCell>テイクアウト</TableCell>
                      <TableCell>19:30</TableCell>
                      <TableCell wrap> 和定食（大人） \2,420 x2 </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell></TableCell>
                      <TableCell text-align="center">
                        <Button
                          icon="open_in_new"
                          color="neutral"
                          type="outlined"
                          icon-position="right"
                        >
                          変更
                        </Button>
                      </TableCell>
                      <TableCell text-align="center">
                        <Button icon="delete" color="critical" type="text">
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow id="row-4">
                      <TableCell>AAA</TableCell>
                      <TableCell wrap>ダイニングルーム「クレール」</TableCell>
                      <TableCell>会場食</TableCell>
                      <TableCell>7:00〜10:00</TableCell>
                      <TableCell wrap> </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        朝食和洋ブッフェ（大人） \2,420 x2
                        朝食和洋ブッフェ（中人） \1,540
                      </TableCell>
                      <TableCell text-align="center">
                        <Button color="neutral" type="outlined" width="78px">
                          変更
                        </Button>
                      </TableCell>
                      <TableCell text-align="center">
                        <Button
                          icon="delete"
                          color="critical"
                          type="text"
                          disabled
                        >
                        </Button>
                      </TableCell>
                    </TableRow>
                  </template>
                </Table>
              </div>
              <div class="util-ml-76">
                <PulldownMenu
                  :menu-list-options="addRestaurantOptions"
                  @select-option="onSelectRestaurantOption"
                >
                  <Button
                    color="neutral"
                    type="outlined"
                    icon="keyboard_arrow_down"
                    icon-position="right"
                    width="fit-content"
                  >
                    追加
                  </Button>
                </PulldownMenu>
              </div>
              <Divider margin="16px" />
              <div class="util-flex util-full-width util-mb-16">
                <Text
                  class="util-py-8 util-flex--shrink-zero"
                  bold
                  width="76px"
                >
                  夕食
                </Text>
                <Table width="100%" fixed-layout>
                  <template #head>
                    <TableRow id="row-1">
                      <TableColumn id="col-1" width="94px">
                        プランコード
                      </TableColumn>
                      <TableColumn id="col-2" width="120px"> 会場 </TableColumn>
                      <TableColumn id="col-3" width="120px">
                        カテゴリー
                      </TableColumn>
                      <TableColumn id="col-4" width="120px"> 時間 </TableColumn>
                      <TableColumn id="col-5" width="229px">
                        メニュー・料金
                      </TableColumn>
                      <TableColumn id="col-6" width="48px" text-align="center">
                        大人
                      </TableColumn>
                      <TableColumn id="col-7" width="48px" text-align="center">
                        中人
                      </TableColumn>
                      <TableColumn id="col-8" width="48px" text-align="center">
                        小人
                      </TableColumn>
                      <TableColumn id="col-9" width="48px" text-align="center">
                        幼児
                      </TableColumn>
                      <TableColumn id="col-10" width="160px">
                        備考
                      </TableColumn>
                      <TableColumn id="col-11" width="96px" text-align="center">
                        変更
                      </TableColumn>
                      <TableColumn id="col-12" width="96px" text-align="center">
                        キャンセル
                      </TableColumn>
                    </TableRow>
                  </template>
                  <template #body>
                    <TableRow id="row-2">
                      <TableCell> - </TableCell>
                      <TableCell wrap>ダイニングルーム「クレール」</TableCell>
                      <TableCell>会場食</TableCell>
                      <TableCell>19:00</TableCell>
                      <TableCell wrap>
                        朝食和洋ブッフェ（大人） \2,420 x2
                        朝食和洋ブッフェ（中人） \
                      </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>お子様用椅子１脚</TableCell>
                      <TableCell text-align="center">
                        <Button
                          icon="open_in_new"
                          color="neutral"
                          type="outlined"
                          icon-position="right"
                        >
                          変更
                        </Button>
                      </TableCell>
                      <TableCell text-align="center">
                        <Button icon="delete" color="critical" type="text">
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow id="row-3">
                      <TableCell> - </TableCell>
                      <TableCell wrap>日本料理「吾妻」</TableCell>
                      <TableCell>テイクアウト</TableCell>
                      <TableCell>19:30</TableCell>
                      <TableCell wrap> 和定食（大人） \2,420 x2 </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell></TableCell>
                      <TableCell text-align="center">
                        <Button
                          icon="open_in_new"
                          color="neutral"
                          type="outlined"
                          icon-position="right"
                        >
                          変更
                        </Button>
                      </TableCell>
                      <TableCell text-align="center">
                        <Button icon="delete" color="critical" type="text">
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow id="row-4">
                      <TableCell>AAA</TableCell>
                      <TableCell wrap>ダイニングルーム「クレール」</TableCell>
                      <TableCell>会場食</TableCell>
                      <TableCell>7:00〜10:00</TableCell>
                      <TableCell wrap> </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        朝食和洋ブッフェ（大人） \2,420 x2
                        朝食和洋ブッフェ（中人） \1,540
                      </TableCell>
                      <TableCell text-align="center">
                        <Button color="neutral" type="outlined" width="78px">
                          変更
                        </Button>
                      </TableCell>
                      <TableCell text-align="center">
                        <Button
                          icon="delete"
                          color="critical"
                          type="text"
                          disabled
                        >
                        </Button>
                      </TableCell>
                    </TableRow>
                  </template>
                </Table>
              </div>
              <div class="util-ml-76">
                <PulldownMenu
                  :menu-list-options="addRestaurantOptions"
                  @select-option="onSelectRestaurantOption"
                >
                  <Button
                    color="neutral"
                    type="outlined"
                    icon="keyboard_arrow_down"
                    icon-position="right"
                    width="fit-content"
                  >
                    追加
                  </Button>
                </PulldownMenu>
              </div>
            </Panel>
            <Panel width="100%">
              <div class="util-mb-16">
                <Text bold size="large"> 2022年9月22日（火） </Text>
              </div>
              <div class="util-flex util-flex--align-start">
                <Text
                  class="util-py-8 util-flex--shrink-zero"
                  bold
                  width="76px"
                >
                  朝食
                </Text>
                <div class="util-flex util-flex--column">
                  <PulldownMenu
                    :menu-list-options="addRestaurantOptions"
                    @select-option="onSelectRestaurantOption"
                  >
                    <Button
                      color="neutral"
                      type="outlined"
                      icon="keyboard_arrow_down"
                      icon-position="right"
                      width="fit-content"
                    >
                      追加
                    </Button>
                  </PulldownMenu>
                </div>
              </div>
            </Panel>
          </div>
        </Disclosure>
        <Disclosure id="section-5" color="light" :opened="true">
          <template #title><Text bold>付帯施設</Text></template>
          <Panel scroll-x>
            <div class="util-flex util-flex--gap8 util-mb-8">
              <Button
                type="outlined"
                icon="keyboard_arrow_left"
                color="neutral"
                :disabled="previousDateIsDisabled()"
                @click="onPrevDate"
              />
              <Button
                type="outlined"
                icon="keyboard_arrow_right"
                color="neutral"
                :disabled="nextDateIsDisabled()"
                @click="onNextDate"
              />
              <Dropdown
                v-model:value="selectedDateText"
                size="small"
                width="240px"
              >
                <DropdownItem
                  v-for="(option, i) in dateSelectionOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
              <Dropdown
                v-model:value="facilitiesSelectedCategory"
                placeholder="0"
                size="small"
                width="240px"
              >
                <DropdownItem
                  v-for="(option, i) in facilitiesCategoriesOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </DropdownItem>
              </Dropdown>
              <TextField
                v-model="searchField"
                icon="search"
                placeholder="施設名・コード"
                width="240px"
              />
              <Button icon="search" color="neutral"> 検索 </Button>
              <Button type="outlined" color="neutral"> クリア </Button>
            </div>
            <AncillaryFacilities
              :categories="categories"
              :reservation-name="reservationName"
              :new-reservations="newReservations"
              :selected-date="new Date(selectedDateText)"
              @add-reservation="onAddReservation"
              @update-reservation="onUpdateReservation"
              @cancel-reservation="onCancelReservation"
            >
            </AncillaryFacilities>
          </Panel>
          <div
            v-for="(reservationDay, index) in orderedReservations"
            :key="`reservation-table-${index}`"
            class="util-mt-16"
          >
            <Text bold size="large">
              {{ formatDate(reservationDay.dayDate) }}
            </Text>
            <Table class="util-mt-16" width="100%">
              <template #head>
                <TableRow id="head-row-1">
                  <TableColumn id="col-1" min-width="160px" width="160px">
                    施設名
                  </TableColumn>
                  <TableColumn id="col-1" min-width="83px" width="83px">
                    時間
                  </TableColumn>
                  <TableColumn id="col-1" min-width="240px" width="240px">
                    料金
                  </TableColumn>
                  <TableColumn id="col-1" min-width="160px"> 備考 </TableColumn>
                  <TableColumn
                    id="col-1"
                    min-width="96px"
                    width="96px"
                    text-align="center"
                  >
                    変更
                  </TableColumn>
                  <TableColumn
                    id="col-1"
                    min-width="96px"
                    width="96px"
                    text-align="center"
                  >
                    キャンセル
                  </TableColumn>
                </TableRow>
              </template>
              <template #body>
                <TableRow
                  v-for="reservation in reservationDay.reservations"
                  :id="`reservation-${reservation.id}`"
                  :key="`reservation-${reservation.id}`"
                >
                  <TableCell>{{ reservation.categoryLabel }}</TableCell>
                  <TableCell>
                    {{ formatTime(reservation.startHour, reservation.endHour) }}
                  </TableCell>
                  <TableCell>{{ reservation.price }}</TableCell>
                  <TableCell>{{ reservation.comments }}</TableCell>
                  <TableCell text-align="center">
                    <EditNewReservationPopup
                      :new-reservation="reservation"
                      :new-reservations="newReservations"
                      :day-schedule="
                        getDaySchedule(reservation.categoryId, reservation.day)
                      "
                      aligned="right"
                      @confirm-update-reservation="onUpdateReservation"
                      @cancel-reservation="onCancelReservation"
                    >
                      <Button color="neutral" type="outlined">変更</Button>
                    </EditNewReservationPopup>
                  </TableCell>
                  <TableCell text-align="center">
                    <Button
                      color="critical"
                      icon="delete"
                      type="text"
                      @click="onCancelReservation(reservation.id)"
                    ></Button>
                  </TableCell>
                </TableRow>
              </template>
            </Table>
          </div>
        </Disclosure>
      </span>
      <ContentFooter class="lay-main__container--3-panes" align-start>
        <template #footerLeft>
          <Button size="medium" type="outlined" color="neutral" width="64px">
            戻る
          </Button>
        </template>
        <template #footerRight>
          <span
            class="
              util-flex
              util-flex--align-center
              util-flex--column-gap32
              util-flex--row-gap16
              util-full-width
              util-flex--wrap util-flex--justify-end
            "
          >
            <span
              class="util-flex util-flex--align-center util-flex--column-gap16"
            >
              <Text bold width="84px">お支払い金額</Text>
              <Text bold size="xl">¥18,480</Text>
              <Button type="outlined" color="neutral" icon="refresh" disabled>
                再計算
              </Button>
            </span>
            <span
              class="
                util-flex
                util-flex--align-center
                util-flex--column-gap32
                util-flex--row-gap16
                util-flex--wrap
                util-flex--justify-end
              "
            >
              <span
                class="
                  util-flex util-flex--align-center util-flex--column-gap32
                "
              >
                <Button
                  size="large"
                  type="outlined"
                  color="critical"
                  icon="delete"
                  width="163px"
                >
                  予約キャンセル
                </Button>
                <Button
                  size="large"
                  type="outlined"
                  color="primary"
                  width="170px"
                >
                  プレビュー
                </Button>
              </span>
              <span class="util-flex">
                <PulldownMenu
                  :menu-list-options="menuListOptions"
                  @select-option="onSelectReservationOption"
                >
                  <Button
                    color="neutral"
                    width="172px"
                    size="large"
                    icon="expand_more"
                    icon-position="right"
                    joint-end="right"
                  >
                    {{ toggleButtonLabel }}
                  </Button>
                </PulldownMenu>
                <Button
                  color="primary"
                  width="200px"
                  size="large"
                  joint-end="left"
                >
                  登録
                </Button>
              </span>
            </span>
          </span>
        </template>
      </ContentFooter>
    </main>
    <aside class="lay-aside">
      <div class="sidebar-dummy"></div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Ref } from 'vue';
import Badge from '../components/Badge/Badge.vue';
import Disclosure from '../components/Disclosure/Disclosure.vue';
import Text from '../components/Text/Text.vue';
import Button from '../components/Button/Button.vue';
import Panel from '../components/Panel/Panel.vue';
import TextField from '../components/TextField/TextField.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import Dropdown from '../components/Dropdown/Dropdown.vue';
import DropdownItem from '../components/Dropdown/DropdownItem.vue';
import Divider from '../components/Divider/Divider.vue';
import TimePicker from '../components/TimePicker/TimePicker.vue';
import ContentFooter from '../components/ContentFooter/ContentFooter.vue';
import ContentHeader from '../components/ContentHeader/ContentHeader.vue';
import RoomTypeCard from '../components/RoomTypeCard/RoomTypeCard.vue';
import RadioButton from '../components/RadioButton/RadioButton.vue';
import PulldownMenu from '../components/PulldownMenu/PulldownMenu.vue';
import InlinePopupSplitStays from '../components/InlinePopup/variations/InlinePopupSplitStays.vue';
import { ancillaryFacillitiesSampleData } from '../data/ancillaryFacilitiesTestData';
import EditNewReservationPopup from '../components/InlinePopup/variations/EditNewReservationPopup.vue';
import AncillaryFacilities, {
  NewReservation,
} from '../components/AncillaryFacilities/AncillaryFacilities.vue';
import Dialog from '../components/Dialog/Dialog.vue';
import TheSidebar from "@/containers/TheSidebar.vue";

const reservationMethodDropdownSelection = ref('');
const reservationTypeDropdownSelection = ref('');
const reservationRoute1DropdownSelection = ref('');
const reservationRoute2DropdownSelection = ref('');
const reservationRouteDetail1DropdownSelection = ref('');
const reservationRouteDetail2DropdownSelection = ref('');

const onConfirmSplit1 = (splitted: number[]) => {
  console.log('onConfirmSplit1', splitted);
};

const onConfirmSplit2 = (splitted: number[]) => {
  console.log('onConfirmSplit2', splitted);
};

const onConfirmSplit3 = (splitted: number[]) => {
  console.log('onConfirmSplit3', splitted);
};

const reservationMethodDropdownOptions = [
  {
    label: '電話',
    value: 'phone',
  },
  {
    label: 'メール',
    value: 'mail',
  },
];

const reservationTypeDropdownOptions = [
  {
    label: '個人',
    value: 'Individuals',
  },
  {
    label: '団体',
    value: 'groups',
  },
];

const reservationRouteDropdownOptions = [
  {
    label: 'HKW',
    value: 'HKW',
  },
  {
    label: 'HKW2',
    value: 'HKW2',
  },
];

const reservationRouteDetailDropdownOptions = [
  {
    label: 'ホーム個人WEB',
    value: 'HKW',
  },
  {
    label: 'ホーム個人WEB',
    value: 'HKW2',
  },
];

const clientName = ref('');
const toggleButtonValue = ref('option1');

const menuListOptions = [
  {
    label: '確定予約',
    abbreviatedLabel: '確定予約',
    value: 'option1',
  },
  {
    label: 'カレンダーオプション仮予約',
    abbreviatedLabel: 'カレンダーOP仮',
    value: 'option2',
  },
  {
    label: 'キャンセル待ち仮予約',
    abbreviatedLabel: 'キャンセル待ち仮',
    value: 'option3',
  },
  {
    label: 'キャンセル待ち',
    abbreviatedLabel: 'キャンセル待ち',
    value: 'option4',
  },
];

const addRestaurantOptions = [
  {
    label: '会場食',
    value: 'option1',
  },
  {
    label: 'テイクアウト・ルームサービス',
    value: 'option2',
    icon: 'open_in_new',
  },
];

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

const toggleButtonLabel = computed(() => {
  return menuListOptions.find(
    (option) => option.value == toggleButtonValue.value
  )?.abbreviatedLabel;
});

const navigateSections = (id: string) => {
  location.href = `#${id}`;
  const rect = document.getElementById(id)?.getBoundingClientRect();
  if (rect?.top) {
    document.getElementById('lay-main')?.scrollBy(0, -(300 - rect?.top));
  }
};

const onSelectReservationOption = (value: string) => {
  toggleButtonValue.value = value;
};

const onSelectRestaurantOption = (value: string) => {
  console.log('selected restaurant option: ', value);
};

/** 付帯施設 (Ancillary Facilities) */

const categories = ancillaryFacillitiesSampleData();
const reservationName = ref('田中 太郎');

const selectedDateText = ref('2022/09/20');
const facilitiesSelectedCategory = ref('すべてのカテゴリー');
const searchField = ref('');
const currentNewReservationsId = ref(1);
const newReservations: Ref<NewReservation[]> = ref([]);
const confirmDeleteNewReservationOpen = ref(false);
const newReservationToDelete: Ref<NewReservation | undefined> = ref(undefined);

const orderedReservations = computed(() => {
  const orderedReservations: {
    dayDate: Date;
    reservations: NewReservation[];
  }[] = [];
  newReservations.value.forEach((reservation) => {
    const index = orderedReservations.findIndex((orderedReservation) => {
      return (
        orderedReservation.dayDate.getTime() === reservation.dayDate.getTime()
      );
    });
    if (index === -1) {
      orderedReservations.push({
        dayDate: reservation.dayDate,
        reservations: [reservation],
      });
    } else {
      orderedReservations[index].reservations.push(reservation);
    }
  });

  const orderedByDate = orderedReservations.sort((a, b) => {
    return a.dayDate.getTime() - b.dayDate.getTime();
  });

  const orderedByTime = orderedByDate.map((orderedReservation) => {
    return {
      ...orderedReservation,
      reservations: orderedReservation.reservations.sort((a, b) => {
        return a.startHour - b.startHour;
      }),
    };
  });

  return orderedByTime;
});

const dateSelectionOptions = [
  {
    label: '2022/09/20',
    value: '2022/09/20',
  },
  {
    label: '2022/09/21',
    value: '2022/09/21',
  },
  {
    label: '2022/09/22',
    value: '2022/09/22',
  },
  {
    label: '2022/09/23',
    value: '2022/09/23',
  },
];

const nextDateIsDisabled = () => {
  const currentSelectionOption = getCurrentSelectedOption();
  if (currentSelectionOption) {
    const currentIndex = dateSelectionOptions.indexOf(currentSelectionOption);
    return currentIndex === dateSelectionOptions.length - 1;
  }
};
const onNextDate = () => {
  const currentSelectionOption = getCurrentSelectedOption();
  if (currentSelectionOption) {
    const currentSelectionOptionIndex = dateSelectionOptions.indexOf(
      currentSelectionOption
    );
    if (currentSelectionOptionIndex < dateSelectionOptions.length - 1) {
      selectedDateText.value =
        dateSelectionOptions[currentSelectionOptionIndex + 1].value;
    }
  }
};

const previousDateIsDisabled = () => {
  const currentSelectionOption = getCurrentSelectedOption();
  if (currentSelectionOption) {
    const currentIndex = dateSelectionOptions.indexOf(currentSelectionOption);
    return currentIndex === 0;
  }
};

const onPrevDate = () => {
  const currentSelectionOption = getCurrentSelectedOption();
  if (currentSelectionOption) {
    const currentSelectionOptionIndex = dateSelectionOptions.indexOf(
      currentSelectionOption
    );
    if (currentSelectionOptionIndex > 0) {
      selectedDateText.value =
        dateSelectionOptions[currentSelectionOptionIndex - 1].value;
    }
  }
};

const getCurrentSelectedOption = () => {
  return dateSelectionOptions.find(
    (option) => option.value === selectedDateText.value
  );
};

const facilitiesCategoriesOptions = [
  {
    label: 'すべてのカテゴリー',
    value: '0',
  },
  {
    label: 'テニスコート',
    value: '2',
  },
  {
    label: 'カラオケルーム',
    value: '3',
  },
  {
    label: 'ペットケージ',
    value: '4',
  },
];

const onAddReservation = (newReservation: NewReservation) => {
  newReservations.value = [
    ...newReservations.value,
    { ...newReservation, id: `new-${currentNewReservationsId.value}` },
  ];
  currentNewReservationsId.value++;
};

const onUpdateReservation = (updatedNewReservation: NewReservation) => {
  newReservations.value = newReservations.value.map((reservation) => {
    if (reservation.id === updatedNewReservation.id) {
      return updatedNewReservation;
    }
    return reservation;
  });
};

const onCancelReservation = (id: string) => {
  newReservationToDelete.value = newReservations.value.find(
    (reservation) => reservation.id === id
  );
  confirmDeleteNewReservationOpen.value = true;
};

const onConfirmCancelReservation = () => {
  if (newReservationToDelete.value) {
    newReservations.value = newReservations.value.filter(
      (reservation) => reservation.id !== newReservationToDelete.value?.id
    );
  }
  newReservationToDelete.value = undefined;
  confirmDeleteNewReservationOpen.value = false;
};

const formatDate = (date: Date) => {
  const lang = 'ja',
    year = date.toLocaleString(lang, { year: 'numeric' }),
    month = date.toLocaleString(lang, { month: 'short' }),
    day = date.toLocaleString(lang, { day: 'numeric' }),
    dayName = date.toLocaleString(lang, { weekday: 'short' });

  return `${year}${month}${day}(${dayName})`;
};

const formatTime = (startHour: number, endHour: number) => {
  const startHourMinutes = startHour % 1 === 0 ? 0 : 30;
  const startHourString = new Date(
    0,
    0,
    0,
    startHour,
    startHourMinutes
  ).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endHourMinutes = endHour % 1 === 0 ? 0 : 30;
  const endHourString = new Date(
    0,
    0,
    0,
    endHour,
    endHourMinutes
  ).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${startHourString}〜${endHourString}`;
};

const getDaySchedule = (categoryId: string, day: number) => {
  const category = categories.find((category) => category.id === categoryId);

  const categoryContainingSubcategory = categories.find(
    (category) =>
      category.subCategories.filter(
        (subCategory) => subCategory.id === categoryId
      ).length > 0
  );

  const subCategory = categoryContainingSubcategory
    ? categoryContainingSubcategory.subCategories.filter(
        (subCategory) => subCategory.id === categoryId
      )[0]
    : undefined;

  if (category) {
    return category.daysSchedule[day];
  } else if (subCategory) {
    return subCategory.daysSchedule[day];
  }

  return {
    startHour: 0,
    endHour: 24,
    scheduled: [],
  };
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
