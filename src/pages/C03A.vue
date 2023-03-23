<template>
  <ProvisionDialog
      :open="openProvisionDialog"
      @close-dialog="onCloseProvisionDialog"
      @register="provisionRegister"
  ></ProvisionDialog>
  <QuickReservationDialog
      :open="openQuickReservationDialog"
      @close-dialog="closeQuickReservationDialog"
  ></QuickReservationDialog>
  <ChangeScheduleDialog
    :open="openChangeScheduleDialog"
    @close-dialog="closeChangeScheduleDialog"
  />
  <UseRepresentativeSettingsDialog
      :open="openUseRepresentativeSettingsDialog"
      @close-dialog="closeUseRepresentativeSettingsDialog"
  />
  <PlanDialog
      :open="openPlanDialog"
      @close-dialog="onClosePlanDialog"
      @updatePlan="onUpdatePlan"
  ></PlanDialog>
  <PreviewReservationDialog
      :open="openPreviewReservationDialog"
      @close-dialog="onClosePreviewReservationDialog"
      :listPlans="planItems"
  ></PreviewReservationDialog>
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
  <TicketPageDialog
      :open="openTicketDialog"
      @close-dialog="closeTicketDialog"
      :startDate="selectedDate"
      :numberOfRoom="numberOfRoom"
      :numberOfNight="numberOfNight"
      :numberOfAdult="numberOfAdult"
      :numberOfChildren="numberOfChildren"
      :numberOfSmallChildren="numberOfSmallChildren"
      :numberOfBaby="numberOfBaby"
      :facility="facilitiesSelection"
  ></TicketPageDialog>
  <div class="lay-container lay-container--4panes">
    <the-sidebar/>
    <main id="lay-main" class="lay-main">
      <ContentHeader class="lay-main__container--3-panes">
        <template #headlineLeft>
          <Badge size="small" color="success">{{reservation.reservation_status_id}}</Badge>
          <Text class="util-ml-8" size="xl" bold>{{`予約：${reservation.reservation_number}`}}</Text>
        </template>
        <template #headlineRight>
          <FieldContainer label="予約受付媒体区分" width="120px">
            <ComboBox
              v-model:value="reservationMethodDropdownSelection"
              placeholder="電話"
              size="small"
              width="120px"
              :search-icon="false"
            >
              <ComboBoxItem
                v-for="(option, i) in reservationMethodDropdownOptions"
                :key="i"
                :label="option.label"
                :value="option.value"
              >
              </ComboBoxItem>
            </ComboBox>
          </FieldContainer>
          <Button size="medium" type="outlined" color="neutral">
            予約を複製
          </Button>
          <Button
            v-if="isWithReservation"
            size="medium"
            type="outlined"
            color="neutral"
            @click="onOpenWithReservationDialog"
          >
            WITH予約
          </Button>
          <PulldownMenu
            :menu-list-options="addReservationHistoryOptions"
            :aligned="'right'"
            @select-option="onReservationHistoryOption"
          >
            <Button color="neutral" type="outlined" width="fit-content">
              履歴
            </Button>
          </PulldownMenu>
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
              <Text size="xl" bold line-height="30px">{{reservation.hotel_name}}</Text>
            </div>
            <div class="util-flex util-flex--column util-flex--row-gap8">
              <Text size="2xs" color="light" line-height="10px">到着日</Text>
              <Text size="xl" bold line-height="30px">
                {{
                  formatDateJp(new Date(reservation.stay_patterns.stay_date_range_start)) + "(" + getDayOfWeek(new Date(reservation.stay_patterns.stay_date_range_start)) + ")"
                }}
              </Text>
            </div>
            <div class="util-flex util-flex--column util-flex--row-gap8">
              <Text size="2xs" color="light" line-height="10px">出発日</Text>
              <Text size="xl" bold line-height="30px">
                {{
                  formatDateJp(new Date(reservation.stay_patterns.stay_date_range_end)) + "(" + getDayOfWeek(new Date(reservation.stay_patterns.stay_date_range_end)) + ")"
                }}
              </Text>
            </div>
            <Button
              size="medium"
              type="outlined"
              color="neutral"
              icon="calendar_today"
              @click="onClickChangeSchedule"
            >
              日程変更
            </Button>
            <div class="util-flex util-flex--column util-flex--row-gap8">
              <Text size="2xs" color="light" line-height="10px">泊数</Text>
              <Text size="xl" bold line-height="30px">{{ reservation.stay_patterns.nights_count }} 泊</Text>
            </div>
            <div class="util-flex util-flex--column util-flex--row-gap8">
              <Text size="2xs" color="light" line-height="10px">
                合計部屋数
              </Text>
              <Text size="xl" bold line-height="30px">{{ reservation.stay_patterns.rooms_count }} 部屋</Text>
            </div>
            <div class="util-flex util-flex--column util-flex--row-gap8">
              <Text size="2xs" color="light" line-height="10px">
                利用券枚数
              </Text>
              <Text size="xl" bold line-height="30px">1枚</Text>
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
            支払管理
          </Button>
          <Button
            size="medium"
            type="outlined"
            color="neutral"
            @click="navigateSections('section-4')"
          >
            部屋情報
          </Button>
          <Button
            size="medium"
            type="outlined"
            color="neutral"
            @click="navigateSections('section-5')"
          >
            レストラン
          </Button>
          <Button
            size="medium"
            type="outlined"
            color="neutral"
            @click="navigateSections('section-6')"
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
                <Text bold size="large">{{customerInfo.customer_id }}</Text>
              </span>
              <span class="util-flex util-flex--align-center util-flex--gap8">
                <Text size="large" bold>田中 太郎</Text>
                <Text bold size="xs">{{customerInfo.name_alias}}</Text>
              </span>
              <span class="util-flex util-flex--align-center util-flex--gap16">
                <Text color="light" bold size="2xs">有効利用券</Text>
                <Text bold size="large">{{home_mutual.number_mutual_available + home_mutual.number_home_available}}</Text>
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
                <Badge class="util-mr-16" :counter="home_mutual.home_count" />
                <Text class="util-mr-24" bold size="large">{{home_mutual.number_home_available}}</Text>
                <Text class="util-mr-16" color="light" bold size="2xs">
                  相互
                </Text>
                <Text bold size="large">{{home_mutual.number_mutual_available}}</Text>
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
              <Text bold size="xs">{{customerInfo.phone_no_0}}</Text>
            </span>
            <span class="util-flex util-flex--column">
              <Text class="util-mb-8" color="light" bold size="2xs">
                携帯電話
              </Text>
              <Text bold size="xs">{{customerInfo.phone_no_1}}</Text>
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
              <Text bold size="xs">{{customerInfo.birth_date}}</Text>
            </span>
            <span class="util-flex util-flex--column">
              <Text class="util-mb-8" color="light" bold size="2xs">
                メールアドレス
              </Text>
              <Text bold size="xs">{{customerInfo.email}}</Text>
            </span>
            <span class="util-flex util-flex--column">
              <Text class="util-mb-8" color="light" bold size="2xs">
                住所
              </Text>
              <Text bold size="xs">{{customerInfo.address_lines[0]}}</Text>
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
            <Button @click="onClickUseRepresentativeSettingsDialog" size="medium" type="outlined" color="neutral">
              本人以外から選択
            </Button>
          </span>
        </Panel>
        <Disclosure id="section-2" color="light" :opened="true">
          <template #title><Text bold>宿泊情報</Text></template>
          <div
            class="
              util-flex util-flex--gap8 util-flex--wrap util-flex--align-end
            "
          >
            <FieldContainer label="予約タイプ" width="80px">
              <ComboBox
                v-model:value="reservationTypeDropdownSelection"
                placeholder="個人"
                size="small"
                width="80px"
                :search-icon="false"
              >
                <ComboBoxItem
                  v-for="(option, i) in reservationTypeDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </ComboBoxItem>
              </ComboBox>
            </FieldContainer>
            <FieldContainer label="団体予約名" width="272px">
              <TextField v-model="clientName" />
            </FieldContainer>
            <FieldContainer label="到着予定時間" width="128px">
              <TimePicker size="small" width="128px" :minute-increment="0" />
            </FieldContainer>
            <FieldContainer label="予約経路１" width="80px">
              <ComboBox
                v-model:value="reservationRoute1DropdownSelection"
                placeholder="HKW"
                size="small"
                width="80px"
                :search-icon="false"
              >
                <ComboBoxItem
                  v-for="(option, i) in reservationRouteDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </ComboBoxItem>
              </ComboBox>
            </FieldContainer>
            <ComboBox
              v-model:value="reservationRouteDetail1DropdownSelection"
              placeholder="ホーム個人WEB"
              size="small"
              width="272px"
              :search-icon="false"
            >
              <ComboBoxItem
                v-for="(option, i) in reservationRouteDetailDropdownOptions"
                :key="i"
                :label="option.label"
                :value="option.value"
              >
              </ComboBoxItem>
            </ComboBox>
            <FieldContainer label="予約経路２" width="80px">
              <ComboBox
                v-model:value="reservationRoute2DropdownSelection"
                placeholder="-"
                size="small"
                width="80px"
                :search-icon="false"
              >
                <ComboBoxItem
                  v-for="(option, i) in reservationRouteDropdownOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </ComboBoxItem>
              </ComboBox>
            </FieldContainer>
            <ComboBox
              v-model:value="reservationRouteDetail2DropdownSelection"
              placeholder="-"
              size="small"
              width="272px"
              :search-icon="false"
            >
              <ComboBoxItem
                v-for="(option, i) in reservationRouteDetailDropdownOptions"
                :key="i"
                :label="option.label"
                :value="option.value"
              >
              </ComboBoxItem>
            </ComboBox>
          </div>
          <Divider margin="16px" />
          <div class="util-flex util-flex--column util-flex--row-gap24">
            <Text bold>使用利用券</Text>
            <div class="util-flex util-flex--column util-flex--row-gap8">
              <span
                class="
                  util-flex util-flex--align-center util-flex--justify-between
                "
              >
                <span
                  class="
                    util-flex util-flex--align-center util-flex--column-gap16
                  "
                >
                  <Text color="light" size="2xs">今回利用枚数</Text>
                  <Text v-if="!notUsedCoupon" bold size="large">１</Text>
                  <Text v-else bold size="large">-</Text>
                </span>
                <Button
                  size="medium"
                  type="outlined"
                  color="neutral"
                  :disabled="notUsedCoupon"
                  @click="onClickUseTicket"
                >
                  利用券指定
                </Button>
              </span>
              <Table v-if="!notUsedCoupon" height="" width="100%">
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
                  <TableRow v-for="(item, index) in listMembershipTickets" :id="`row-${index+1}`">
                    <TableCell> {{item.hotel_right_id}}</TableCell>
                    <TableCell>{{item.sequence}}</TableCell>
                    <TableCell>{{item.pass_code}}</TableCell>
                    <TableCell>{{item.hotel_name}}</TableCell>
                    <TableCell>{{getHomeName(item.hotel_right_id)}}</TableCell>
                    <TableCell>{{item.use_date_end?.split('-').join('/')}}</TableCell>
                  </TableRow>
                </template>
              </Table>
              <span
                class="
                  util-flex util-full-width
                  util-flex--justify-end
                  util-mt-8
                "
              >
                <Checkbox
                  v-model:checked="notUsedCoupon"
                  label="利用券を使用しない"
                />
              </span>
            </div>
          </div>
        </Disclosure>
        <Disclosure id="section-3" color="light" :opened="true">
          <template #title><Text bold>支払管理</Text></template>
          <div class="util-flex util-flex--column util-flex--gap16">
            <Text bold>前受金</Text>
            <span>
              <Table :hover-effect="false" :fixed-layout="true">
                <template #head>
                  <TableRow id="row-1">
                    <TableColumn id="col-1" width="144px">計上日</TableColumn>
                    <TableColumn id="col-2" width="64px">曜日</TableColumn>
                    <TableColumn id="col-3" width="144px">
                      支払方法
                    </TableColumn>
                    <TableColumn id="col-4" width="144px">請求先</TableColumn>
                    <TableColumn id="col-5" width="120px">金額</TableColumn>
                    <TableColumn id="col-6" width="100px">
                      精算管理No
                    </TableColumn>
                    <TableColumn id="col-7" width="284px">
                      ビル管理備考
                    </TableColumn>
                    <TableColumn id="col-8" width="100%">
                      管理備考
                    </TableColumn>
                    <TableColumn id="col-9" width="48px">削除</TableColumn>
                  </TableRow>
                </template>
                <template #body>
                  <TableRow id="row-2">
                    <TableCell>
                      <DatePicker size="small" width="100%"></DatePicker>
                    </TableCell>
                    <TableCell> </TableCell>
                    <TableCell>
                      <ComboBox
                        v-model:value="advanceReceived1DropdownSelection"
                        placeholder="-"
                        size="small"
                        width="100%"
                        :search-icon="false"
                      >
                        <ComboBoxItem
                          v-for="(option, i) in advanceReceivedDropdownOptions1"
                          :key="i"
                          :label="option.label"
                          :value="option.value"
                        >
                        </ComboBoxItem>
                      </ComboBox>
                    </TableCell>
                    <TableCell>
                      <ComboBox
                        v-model:value="advanceReceived2DropdownSelection"
                        placeholder="-"
                        size="small"
                        width="100%"
                        :search-icon="false"
                      >
                        <ComboBoxItem
                          v-for="(option, i) in advanceReceivedDropdownOptions2"
                          :key="i"
                          :label="option.label"
                          :value="option.value"
                        >
                        </ComboBoxItem>
                      </ComboBox>
                    </TableCell>
                    <TableCell><TextField width="100%" /></TableCell>
                    <TableCell><TextField width="100%" /></TableCell>
                    <TableCell><TextField width="100%" /></TableCell>
                    <TableCell><TextField width="100%" /></TableCell>
                    <TableCell text-align="center">
                      <Button color="critical" type="text" icon="delete" />
                    </TableCell>
                  </TableRow>
                </template>
              </Table>
            </span>
            <Button size="medium" type="outlined" color="neutral" width="84px">
              行を追加
            </Button>
          </div>
        </Disclosure>
        <Disclosure id="section-4" color="light" :opened="true">
          <template #title><Text bold>部屋情報</Text></template>
          <div class="util-flex util-flex--gap16 util-mt-8 util-mb-16">
            <Button size="medium" type="outlined" color="neutral">
              部屋タイプの変更
            </Button>
            <Button size="medium" type="outlined" color="neutral">
              部屋アサイン
            </Button>
          </div>
          <RoomTypeCard
            class="util-mb-16"
            :room-labels="[reservation.stay_patterns.room_type_name]"
            color="slot01"
          >
            <template #header>
              <Text class="util-flex util-flex--gap16" bold size="large">
                <span>{{
                    formatDateJp(new Date(reservation.stay_patterns.stay_date_range_start)) + "(" + getDayOfWeek(new Date(reservation.stay_patterns.stay_date_range_start)) + ")"
                  }}</span>
                <span>{{ reservation.stay_patterns.nights_count }}泊</span>
                <span>{{ reservation.stay_patterns.rooms_count }}室</span>
              </Text>
            </template>
            <template #header-segment>
              <ToggleButtonSet
                :selected-id="selectedRoomInformationToggleButtonId1"
                width="438px"
                size="small"
                type="outlined"
                @click-item="onClickRoomInformationToggleToggleButton1"
              >
                <ToggleButton id="content-1">人数・お部屋割り</ToggleButton>
                <ToggleButton id="content-2">お支払い方法</ToggleButton>
                <ToggleButton id="content-3">伝票登録</ToggleButton>
              </ToggleButtonSet>
            </template>
            <template
              v-if="selectedRoomInformationToggleButtonId1 === 'content-1'"
            >
              <Disclosure
                v-model:value="isOpenDisclosure1"
                color="light"
                :shadow="false"
                fitted
              >
                <template #title>
                  <span
                    class="
                      util-flex
                      util-flex--align-center
                      util-flex--justify-between
                      util-full-width
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
                        2022年9月20日（火） 2泊
                      </Text>
                      <span class="util-flex">
                        <span
                          v-if="
                            selectedRoomInformationToggleButtonId1 ===
                              'content-1' && !isOpenDisclosure1
                          "
                          class="
                            util-flex
                            util-flex--align-center
                            util-flex--grow-one
                            util-px-24
                          "
                        >
                          <Text class="util-mr-32" size="xs">
                            大人 1 / 中人 1 / 小人 0 / 幼児 0
                          </Text>
                          <span
                            class="util-flex util-flex--gap8 util-flex--wrap"
                          >
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
                    <span class="util-flex">
                      <Text class="util-mr-16" size="2xs"> 部屋番号 </Text>
                      <Text bold> 101 </Text>
                    </span>
                  </span>
                </template>
                <div class="util-flex util-flex--gap16 util-flex--wrap">
                  <div class="util-flex util-flex--gap8">
                    <span class="util-flex util-flex--align-end">
                      <FieldContainer label="大人" width="64px">
                        <TextField
                          v-model="currentNumericDropdownSelection1"
                          input-type="number"
                          width="64px"
                          placeholder="0"
                        />
                      </FieldContainer>
                      <Text class="util-ml-4" color="light" bold size="2xs">
                        人
                      </Text>
                    </span>
                    <span class="util-flex util-flex--align-end">
                      <FieldContainer label="中人" width="64px">
                        <TextField
                          v-model="currentNumericDropdownSelection2"
                          input-type="number"
                          width="64px"
                          placeholder="0"
                        />
                      </FieldContainer>
                      <Text class="util-ml-4" color="light" bold size="2xs">
                        人
                      </Text>
                    </span>
                    <span class="util-flex util-flex--align-end">
                      <FieldContainer label="小人" width="64px">
                        <TextField
                          v-model="currentNumericDropdownSelection3"
                          input-type="number"
                          width="64px"
                          placeholder="0"
                        />
                      </FieldContainer>
                      <Text class="util-ml-4" color="light" bold size="2xs">
                        人
                      </Text>
                    </span>
                    <span class="util-flex util-flex--align-end">
                      <FieldContainer label="幼児" width="64px">
                        <TextField
                          v-model="currentNumericDropdownSelection4"
                          input-type="number"
                          width="64px"
                          placeholder="0"
                        />
                      </FieldContainer>
                      <Text class="util-ml-4" color="light" bold size="2xs">
                        人
                      </Text>
                    </span>
                  </div>
                  <div class="util-flex util-flex--gap8 util-flex--wrap">
                    <FieldContainer label="お部屋条件" width="128px" required>
                      <ComboBox
                        v-model:value="currentTextDropdownSelection1"
                        size="small"
                        width="128px"
                        :search-icon="false"
                      >
                        <ComboBoxItem
                          v-for="(option, i) in textDropdownOptions1"
                          :key="i"
                          :label="option.label"
                          :value="option.value"
                        >
                        </ComboBoxItem>
                      </ComboBox>
                    </FieldContainer>
                    <FieldContainer label="リクエスト" width="128px" required>
                      <ComboBox
                        v-model:value="currentTextDropdownSelection2"
                        size="small"
                        width="128px"
                        :search-icon="false"
                      >
                        <ComboBoxItem
                          v-for="(option, i) in textDropdownOptions2"
                          :key="i"
                          :label="option.label"
                          :value="option.value"
                        >
                        </ComboBoxItem>
                      </ComboBox>
                    </FieldContainer>
                    <FieldContainer label="部屋希望" width="128px">
                      <TextField width="128px"></TextField>
                    </FieldContainer>
                  </div>
                  <Table :hover-effect="false" fixed-layout>
                    <template #head>
                      <TableRow id="row-1">
                        <TableColumn id="col-1" width="100%">
                          お部屋料金
                        </TableColumn>
                        <TableColumn
                          id="col-1"
                          width="56px"
                          text-align="center"
                        >
                          大人
                        </TableColumn>
                        <TableColumn
                          id="col-2"
                          width="56px"
                          text-align="center"
                        >
                          中人
                        </TableColumn>
                        <TableColumn
                          id="col-3"
                          width="56px"
                          text-align="center"
                        >
                          小人
                        </TableColumn>
                        <TableColumn
                          id="col-4"
                          width="56px"
                          text-align="center"
                        >
                          幼児
                        </TableColumn>
                        <TableColumn id="col-5" width="80px">
                          計算人数
                        </TableColumn>
                        <TableColumn id="col-6" width="140px">
                          料金
                        </TableColumn>
                        <TableColumn id="col-7" width="140px">
                          割引金額
                        </TableColumn>
                        <TableColumn id="col-8" width="176px">
                          割引（%）
                        </TableColumn>
                        <TableColumn
                          id="col-9"
                          width="48px"
                          text-align="center"
                        >
                          削除
                        </TableColumn>
                      </TableRow>
                    </template>
                    <template #body>
                      <TableRow id="row-2">
                        <TableCell> 素泊まり </TableCell>
                        <TableCell text-align="center">1</TableCell>
                        <TableCell text-align="center">1</TableCell>
                        <TableCell text-align="center">1</TableCell>
                        <TableCell text-align="center">1</TableCell>
                        <TableCell>
                          <TextField
                            v-model="currentNumericInput1"
                            input-type="number"
                            width="100%"
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            v-model="currentNumericInput2"
                            input-type="number"
                            width="100%"
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            v-model="currentNumericInput3"
                            input-type="number"
                            width="100%"
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            v-model="currentNumericInput4"
                            input-type="number"
                            width="100%"
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell text-align="center">
                          <Button color="critical" type="text" icon="delete" />
                        </TableCell>
                      </TableRow>
                    </template>
                  </Table>
                  <Divider margin="0" />
                  <div
                    class="util-flex util-flex--align-center util-flex--gap40"
                  >
                    <Text bold width="80px"> プラン </Text>
                    <Button color="neutral" type="outlined" @click="onClickPlanDialog"> 追加 </Button>
                  </div>
                  <Table :hover-effect="false" fixed-layout v-if="planItems.length">
                    <template #head>
                      <TableRow id="row-1">
                        <TableColumn id="col-1" min-width="100px" width="100px">
                          プランコード
                        </TableColumn>
                        <TableColumn id="col-2" min-width="321px" width="321px">
                          プラン名
                        </TableColumn>
                        <TableColumn
                          id="col-3"
                          width="56px"
                          text-align="center"
                        >
                          大人
                        </TableColumn>
                        <TableColumn
                          id="col-4"
                          width="56px"
                          text-align="center"
                        >
                          中人
                        </TableColumn>
                        <TableColumn
                          id="col-5"
                          width="56px"
                          text-align="center"
                        >
                          小人
                        </TableColumn>
                        <TableColumn
                          id="col-6"
                          width="56px"
                          text-align="center"
                        >
                          幼児
                        </TableColumn>
                        <TableColumn id="col-7" width="80px">
                          計算人数
                        </TableColumn>
                        <TableColumn id="col-8" min-width="80px" width="80px">
                          料金
                        </TableColumn>
                        <TableColumn id="col-9" min-width="80px" width="80px">
                          割引金額
                        </TableColumn>
                        <TableColumn id="col-10" width="96px">
                          割引（%）
                        </TableColumn>
                        <TableColumn
                          id="col-11"
                          width="81px"
                          text-align="center"
                        >
                          変更
                        </TableColumn>
                        <TableColumn
                          id="col-12"
                          width="48px"
                          text-align="center"
                        >
                          削除
                        </TableColumn>
                      </TableRow>
                    </template>
                    <template #body>
                      <TableRow id="row-2" v-for="(plan, index) in planItems" :key="plan.sales_item_id">
                        <TableCell> {{ plan.code }} </TableCell>
                        <TableCell> {{ plan.name }} </TableCell>
                        <TableCell text-align="center"> {{ plan.adults }} </TableCell>
                        <TableCell text-align="center"> {{ plan.children }} </TableCell>
                        <TableCell text-align="center"> {{ plan.smallChildren }} </TableCell>
                        <TableCell text-align="center"> {{ plan.babies }} </TableCell>
                        <TableCell>
                          <TextField
                            v-model="currentNumericInput5"
                            input-type="number"
                            width="100%"
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            v-model="currentNumericInput6"
                            input-type="number"
                            width="100%"
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            v-model="currentNumericInput7"
                            input-type="number"
                            width="100%"
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            v-model="currentNumericInput8"
                            input-type="number"
                            width="100%"
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell text-align="center">
                          <Button color="neutral" type="outlined" >変更</Button>
                        </TableCell>
                        <TableCell text-align="center">
                          <Button color="critical" type="text" icon="delete" @click="deleteItemsPlan(index)"/>
                        </TableCell>
                      </TableRow>
                    </template>
                  </Table>
                  <Divider margin="0" />
                  <div
                    class="util-flex util-flex--align-center util-flex--gap40"
                  >
                    <Text bold width="80px"> 手配品・備品 </Text>
                    <Button color="neutral" type="outlined" @click="onClickProvisionDialog"> 追加 </Button>
                  </div>
                  <Table :hover-effect="false" fixed-layout  v-if="provisionItems.length">
                    <template #head>
                      <TableRow id="row-1">
                        <TableColumn id="col-1" width="94px">
                          プランコード
                        </TableColumn>
                        <TableColumn id="col-2" width="320px">品名</TableColumn>
                        <TableColumn id="col-3" width="96px">
                          数量
                        </TableColumn>
                        <TableColumn id="col-4" min-width="320px" width="320px">
                          備考
                        </TableColumn>
                        <TableColumn
                          id="col-5"
                          width="48px"
                          text-align="center"
                        >
                          削除
                        </TableColumn>
                      </TableRow>
                    </template>
                    <template #body>
                      <TableRow id="row-2" v-for="(provision, index) in provisionItems" :key="index">
                        <TableCell> {{ provision.provision_item_id }} </TableCell>
                        <TableCell> {{ provision.name }} </TableCell>
                        <TableCell>
                          <TextField
                              v-model="provision.sequence"
                            input-type="number"
                            width="100%"
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell><TextField width="100%" /></TableCell>
                        <TableCell text-align="center">
                          <Button color="critical" type="text" icon="delete" @click="delteteProvisionItems(index)"/>
                        </TableCell>
                      </TableRow>
                    </template>
                  </Table>
                  <Divider margin="0" />
                  <div
                    class="util-flex util-flex--align-center util-flex--gap40"
                  >
                    <Text bold width="80px"> 利用者情報 </Text>
                    <Button color="neutral" type="outlined"> 追加 </Button>
                  </div>
                </div>
              </Disclosure>

              <Disclosure
                v-model:value="isOpenDisclosure2"
                color="light"
                :shadow="false"
                fitted
              >
                <template #title>
                  <span
                    class="
                      util-flex
                      util-flex--align-center
                      util-flex--justify-between
                      util-full-width
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
                        2022年9月20日（火） 2泊
                      </Text>
                      <span class="util-flex">
                        <span
                          v-if="
                            selectedRoomInformationToggleButtonId1 ===
                              'content-1' && !isOpenDisclosure2
                          "
                          class="
                            util-flex
                            util-flex--align-center
                            util-flex--grow-one
                            util-px-24
                          "
                        >
                          <Text class="util-mr-32" size="xs">
                             {{ `大人 ${reservation.person_count[0]} / 中人 ${reservation.person_count[1] | 0} / 小人 ${reservation.person_count[2] | 0} / 幼児 ${reservation.person_count[3] | 0} `}}
                          </Text>
                          <span
                            class="util-flex util-flex--gap8 util-flex--wrap"
                          >
                            <Badge
                              size="small"
                              color="neutral-faded"
                              type="outlined"
                              @click="onClickPlanDialog"
                            >
                              プラン
                            </Badge>
                            <Badge @click="onClickProvisionDialog" size="small" color="neutral" type="outlined">
                              手配品・備品
                            </Badge>
                            <Badge
                              size="small"
                              color="neutral-faded"
                              type="outlined"
                              @click="onClickUseRepresentativeSettingsDialog"
                            >
                              利用者
                            </Badge>
                          </span>
                        </span>
                      </span>
                    </span>
                    <span class="util-flex">
                      <Text class="util-mr-16" size="2xs"> 部屋番号 </Text>
                      <Text bold> 101 </Text>
                    </span>
                  </span>
                </template>
                Disclosure Content
              </Disclosure>
            </template>
            <template
              v-if="selectedRoomInformationToggleButtonId1 === 'content-2'"
            >
              <div
                class="
                  util-flex util-flex--row-gap16 util-flex--wrap
                  util-mt-16 util-mb-16
                "
              >
                <Text bold> 精算管理 </Text>
                <Table :hover-effect="false" fixed-layout>
                  <template #head>
                    <TableRow id="row-1">
                      <TableColumn id="col-1" width="80px"> No </TableColumn>
                      <TableColumn id="col-2" width="100px">
                        宛名区分
                      </TableColumn>
                      <TableColumn id="col-3" width="160px">
                        ビル印字名称
                      </TableColumn>
                      <TableColumn id="col-4" width="144px">
                        支払方法
                      </TableColumn>
                      <TableColumn id="col-5" width="100px">
                        請求先
                      </TableColumn>
                      <TableColumn id="col-6" width="72px">
                        住所印字
                      </TableColumn>
                      <TableColumn id="col-7" width="72px">
                        明細集計
                      </TableColumn>
                      <TableColumn id="col-8" width="144px">
                        科目1
                      </TableColumn>
                      <TableColumn id="col-9" width="144px">
                        科目2
                      </TableColumn>
                      <TableColumn id="col-10" width="144px">
                        科目3
                      </TableColumn>
                      <TableColumn id="col-11" width="144px">
                        科目4
                      </TableColumn>
                      <TableColumn id="col-12" width="144px">
                        科目5
                      </TableColumn>
                      <TableColumn id="col-13" width="48px" text-align="center">
                        削除
                      </TableColumn>
                    </TableRow>
                  </template>
                  <template #body>
                    <TableRow id="row-2">
                      <TableCell text-align="right">1</TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection3"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in addressTextDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell><TextField width="100%" /></TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection4"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in textDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection5"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in textDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell text-align="center">
                        <Switch :checked="currentSwitchInput1" />
                      </TableCell>
                      <TableCell text-align="center">
                        <Switch :checked="currentSwitchInput2" />
                      </TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection6"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in textDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection7"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in textDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection8"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in textDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection9"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in textDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection10"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in textDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell text-align="center">
                        <Button color="critical" type="text" icon="delete" />
                      </TableCell>
                    </TableRow>
                  </template>
                </Table>
                <Button color="neutral" type="outlined"> 行を追加 </Button>
                <Divider margin="0" />
                <Text bold> 精算の振替 </Text>
                <Table :hover-effect="false" :fixed-layout="true">
                  <template #head>
                    <TableRow id="row-1">
                      <TableColumn id="col-1" width="100px">
                        ルーム番号
                      </TableColumn>
                      <TableColumn id="col-2" width="100%">
                        振替科目1
                      </TableColumn>
                      <TableColumn id="col-3" width="100%">
                        振替科目2
                      </TableColumn>
                      <TableColumn id="col-4" width="100%">
                        振替科目3
                      </TableColumn>
                      <TableColumn id="col-5" width="100%">
                        振替科目4
                      </TableColumn>
                      <TableColumn id="col-6" width="100%">
                        振替科目5
                      </TableColumn>
                      <TableColumn id="col-7" width="48px" text-align="center">
                        削除
                      </TableColumn>
                    </TableRow>
                  </template>
                  <template #body>
                    <TableRow id="row-2">
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection11"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in roomNumberTextDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection12"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in textDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection13"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in textDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection14"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in textDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection15"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in textDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection16"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in textDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell text-align="center">
                        <Button color="critical" type="text" icon="delete" />
                      </TableCell>
                    </TableRow>
                  </template>
                </Table>
                <Button color="neutral" type="outlined"> 行を追加 </Button>
              </div>
            </template>
            <template
              v-if="selectedRoomInformationToggleButtonId1 === 'content-3'"
            >
              <div
                class="
                  util-flex util-flex--row-gap16 util-flex--wrap
                  util-mt-16 util-mb-16
                "
              >
                <Text bold> 伝票 </Text>
                <Table :hover-effect="false" fixed-layout>
                  <template #head>
                    <TableRow id="row-1">
                      <TableColumn id="col-1" width="144px">
                        計上日
                      </TableColumn>
                      <TableColumn id="col-2" width="64px"> 曜日 </TableColumn>
                      <TableColumn id="col-3" width="144px"> 科目 </TableColumn>
                      <TableColumn id="col-4" width="120px"> 単価 </TableColumn>
                      <TableColumn id="col-5" width="120px"> 数量 </TableColumn>
                      <TableColumn id="col-6" width="120px"> 金額 </TableColumn>
                      <TableColumn id="col-7" width="100px">
                        精算管理No
                      </TableColumn>
                      <TableColumn id="col-8" width="100%">
                        ビル管理備考
                      </TableColumn>
                      <TableColumn id="col-9" width="100%">
                        管理備考
                      </TableColumn>
                      <TableColumn id="col-10" width="48px" text-align="center">
                        削除
                      </TableColumn>
                    </TableRow>
                  </template>
                  <template #body>
                    <TableRow id="row-2">
                      <TableCell>
                        <DatePicker size="small" width="100%"></DatePicker>
                      </TableCell>
                      <TableCell> 木 </TableCell>
                      <TableCell>
                        <ComboBox
                          v-model:value="currentTextDropdownSelection17"
                          size="small"
                          width="100%"
                          :search-icon="false"
                        >
                          <ComboBoxItem
                            v-for="(option, i) in textDropdownOptions"
                            :key="i"
                            :label="option.label"
                            :value="option.value"
                          >
                          </ComboBoxItem>
                        </ComboBox>
                      </TableCell>
                      <TableCell>
                        <TextField
                          v-model="currentNumericInput11"
                          input-type="number"
                          width="100%"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          v-model="currentNumericInput12"
                          input-type="number"
                          width="100%"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          v-model="currentNumericInput13"
                          input-type="number"
                          width="100%"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          v-model="currentNumericInput14"
                          input-type="number"
                          width="100%"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField width="100%" />
                      </TableCell>
                      <TableCell>
                        <TextField width="100%" />
                      </TableCell>
                      <TableCell text-align="center">
                        <Button color="critical" type="text" icon="delete" />
                      </TableCell>
                    </TableRow>
                  </template>
                </Table>
                <Button color="neutral" type="outlined"> 行を追加 </Button>
              </div>
            </template>
          </RoomTypeCard>
          <RoomTypeCard
            class="util-mb-16"
            :room-labels="['ファミリーツイン']"
            color="slot02"
          >
            <template #header>
              <Text class="util-flex util-flex--gap16" bold size="large">
                <span>部屋2</span>
                <span>2022年9月20日(火)</span>
                <span>1泊</span>
                <span>1室</span>
              </Text>
            </template>
            <template #header-segment>
              <ToggleButtonSet
                :selected-id="selectedRoomInformationToggleButtonId2"
                width="438px"
                size="small"
                type="outlined"
                @click-item="onClickRoomInformationToggleToggleButton2"
              >
                <ToggleButton id="content-1">人数・お部屋割り</ToggleButton>
                <ToggleButton id="content-2">お支払い方法</ToggleButton>
                <ToggleButton id="content-3">伝票登録</ToggleButton>
              </ToggleButtonSet>
            </template>
            <Disclosure
              v-model:value="isOpenDisclosure3"
              color="light"
              :shadow="false"
              fitted
            >
              <template #title>
                <span
                  class="
                    util-flex util-flex--align-center util-flex--justify-between
                    util-full-width
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
                      2022年9月20日（火） 2泊
                    </Text>
                    <span class="util-flex">
                      <span
                        v-if="
                          selectedRoomInformationToggleButtonId1 ===
                            'content-1' && !isOpenDisclosure3
                        "
                        class="
                          util-flex util-flex--align-center util-flex--grow-one
                          util-px-24
                        "
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
                  <span class="util-flex">
                    <Text class="util-mr-16" size="2xs"> 部屋番号 </Text>
                    <Text bold> 102 </Text>
                  </span>
                </span>
              </template>
              Disclosure Content
            </Disclosure>
            <Disclosure
              v-model:value="isOpenDisclosure4"
              color="light"
              :shadow="false"
              fitted
            >
              <template #title>
                <span
                  class="
                    util-flex util-flex--align-center util-flex--justify-between
                    util-full-width
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
                      2022年9月20日（火） 2泊
                    </Text>
                    <span class="util-flex">
                      <span
                        v-if="
                          selectedRoomInformationToggleButtonId1 ===
                            'content-1' && !isOpenDisclosure4
                        "
                        class="
                          util-flex util-flex--align-center util-flex--grow-one
                          util-px-24
                        "
                      >
                        <Text class="util-mr-32" size="xs">
                          大人 1 / 中人 1 / 小人 0 / 幼児 0
                        </Text>
                        <span class="util-flex util-flex--gap8 util-flex--wrap">
                          <Badge
                            size="small"
                            color="neutral-faded"
                            type="outlined"
                            @click="onClickPlanDialog"
                          >
                            プラン
                          </Badge>
                          <Badge  @click="onClickProvisionDialog" size="small" color="neutral" type="outlined">
                            手配品・備品
                          </Badge>
                          <Badge
                            size="small"
                            color="neutral-faded"
                            type="outlined"
                            @click="onClickUseRepresentativeSettingsDialog"
                          >
                            利用者
                          </Badge>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span class="util-flex">
                    <Text class="util-mr-16" size="2xs"> 部屋番号 </Text>
                    <Text bold> 102 </Text>
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
                <span>部屋3</span>
                <span>2022年9月20日(火)</span>
                <span>5泊</span>
                <span>1室</span>
              </Text>
            </template>
            <template #header-segment>
              <ToggleButtonSet
                :selected-id="selectedRoomInformationToggleButtonId3"
                width="438px"
                size="small"
                type="outlined"
                @click-item="onClickRoomInformationToggleToggleButton3"
              >
                <ToggleButton id="content-1">人数・お部屋割り</ToggleButton>
                <ToggleButton id="content-2">お支払い方法</ToggleButton>
                <ToggleButton id="content-3">伝票登録</ToggleButton>
              </ToggleButtonSet>
            </template>
            <Disclosure
              v-model:value="isOpenDisclosure5"
              color="light"
              :shadow="false"
              fitted
            >
              <template #title>
                <span
                  class="
                    util-flex util-flex--align-center util-flex--justify-between
                    util-full-width
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
                    <span class="util-flex">
                      <span
                        v-if="
                          selectedRoomInformationToggleButtonId1 ===
                            'content-1' && !isOpenDisclosure5
                        "
                        class="
                          util-flex util-flex--align-center util-flex--grow-one
                          util-px-24
                        "
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
                  <span class="util-flex">
                    <Text class="util-mr-16" size="2xs"> 部屋番号 </Text>
                    <Text bold> 103 </Text>
                  </span>
                </span>
              </template>
              Disclosure Content
            </Disclosure>
            <Disclosure
              v-model:value="isOpenDisclosure6"
              color="light"
              :shadow="false"
              fitted
            >
              <template #title>
                <span
                  class="
                    util-flex util-flex--align-center util-flex--justify-between
                    util-full-width
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
                    <span class="util-flex">
                      <span
                        v-if="
                          selectedRoomInformationToggleButtonId1 ===
                            'content-1' && !isOpenDisclosure6
                        "
                        class="
                          util-flex util-flex--align-center util-flex--grow-one
                          util-px-24
                        "
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
                  <span class="util-flex">
                    <Text class="util-mr-16" size="2xs"> 部屋番号 </Text>
                    <Text bold> 103 </Text>
                  </span>
                </span>
              </template>
              Disclosure Content
            </Disclosure>
          </RoomTypeCard>
        </Disclosure>
        <Disclosure id="section-5" color="light" :opened="true">
          <template #title><Text bold>レストラン</Text></template>
          <div class="util-flex util-flex--column util-flex--gap16">
            <Panel width="100%">
              <div class="util-mb-16">
                <Text bold size="large"> 2022年9月20日（火） </Text>
              </div>
              <div class="util-flex util-flex--align-start">
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
            <Panel width="100%">
              <div class="util-mb-16">
                <Text bold size="large"> 2022年9月21日（火） </Text>
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
                    <Button color="neutral" type="outlined" width="fit-content">
                      追加
                    </Button>
                  </PulldownMenu>
                </div>
              </div>
              <Divider margin="16px" />
              <div class="util-flex util-flex--align-center">
                <Text bold width="76px"> 夕方 </Text>
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
        <Disclosure id="section-6" color="light" :opened="true">
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
              <ComboBox
                v-model:value="selectedDateText"
                size="small"
                width="240px"
                :search-icon="false"
              >
                <ComboBoxItem
                  v-for="(option, i) in dateSelectionOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </ComboBoxItem>
              </ComboBox>
              <ComboBox
                v-model:value="facilitiesSelectedCategory"
                placeholder="0"
                size="small"
                width="240px"
                :search-icon="false"
              >
                <ComboBoxItem
                  v-for="(option, i) in facilitiesCategoriesOptions"
                  :key="i"
                  :label="option.label"
                  :value="option.value"
                >
                </ComboBoxItem>
              </ComboBox>
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
                  <TableColumn id="col-2" min-width="83px" width="83px">
                    時間
                  </TableColumn>
                  <TableColumn id="col-3" min-width="240px" width="240px">
                    料金
                  </TableColumn>
                  <TableColumn id="col-4" min-width="160px"> 備考 </TableColumn>
                  <TableColumn
                    id="col-5"
                    min-width="96px"
                    width="96px"
                    text-align="center"
                  >
                    変更
                  </TableColumn>
                  <TableColumn
                    id="col-6"
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
          <Button size="medium" type="outlined" color="neutral" width="64px" @click="backToFrontPage">
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
                  @click="onReservationsCancel"
                >
                  予約キャンセル
                </Button>
                <Button
                  size="large"
                  type="outlined"
                  color="primary"
                  width="170px"
                  @click="onClickPreviewReservationDialog"
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
                  @click="updateReservations"
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
import {ref, computed, Ref, onBeforeMount} from 'vue';
import {useRouter} from "vue-router";
import Badge from '../components/Badge/Badge.vue';
import Disclosure from '../components/Disclosure/Disclosure.vue';
import Text from '../components/Text/Text.vue';
import Button from '../components/Button/Button.vue';
import Panel from '../components/Panel/Panel.vue';
import TextField from '../components/TextField/TextField.vue';
import DatePicker from '../components/DatePicker/DatePicker.vue';
import Table from '../components/Table/Table.vue';
import TableCell from '../components/Table/TableCell.vue';
import TableColumn from '../components/Table/TableColumn.vue';
import TableRow from '../components/Table/TableRow.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import ComboBox from '../components/ComboBox/ComboBox.vue';
import ComboBoxItem from '../components/ComboBox/ComboBoxItem.vue';
import Checkbox from '../components/Checkbox/Checkbox.vue';
import ToggleButtonSet from '../components/ToggleButton/ToggleButtonSet.vue';
import ToggleButton from '../components/ToggleButton/ToggleButton.vue';
import Switch from '../components/Switch/Switch.vue';
import Divider from '../components/Divider/Divider.vue';
import TimePicker from '../components/TimePicker/TimePicker.vue';
import ContentFooter from '../components/ContentFooter/ContentFooter.vue';
import ContentHeader from '../components/ContentHeader/ContentHeader.vue';
import RoomTypeCard from '../components/RoomTypeCard/RoomTypeCard.vue';
import PulldownMenu from '../components/PulldownMenu/PulldownMenu.vue';
import { ancillaryFacillitiesSampleData } from '../data/ancillaryFacilitiesTestData';
import EditNewReservationPopup from '../components/InlinePopup/variations/EditNewReservationPopup.vue';
import QuickReservationDialog from "@pages/Dialog/QuickReservationDialog.vue";
import AncillaryFacilities, {
  NewReservation,
} from '../components/AncillaryFacilities/AncillaryFacilities.vue';
import Dialog from '../components/Dialog/Dialog.vue';
import ProvisionDialog from "./Dialog/ProvisionDialog.vue";
import PlanDialog from "./Dialog/PlanDialog.vue";
import PreviewReservationDialog from "./Dialog/PreviewReservationDialog.vue"
import TicketPageDialog from '@pages/Dialog/TicketDialog.vue';
import ChangeScheduleDialog from '@pages/Dialog/ChangeScheduleDialog.vue'
import UseRepresentativeSettingsDialog from "@pages/Dialog/UseRepresentativeSettingsDialog.vue";
import {ReservationsApiCreateReservationCancelRequest} from "@openapi/front";
import {storeToRefs} from "pinia";
import {
  ReservationsApiGetReservationRequest,
  ReservationsApiUpdateReservationRequest,
  UpdateReservationRequest, Reservation,
  ReservationClassId,
  ReservationStatusId,
} from "@openapi/front";
import {formatDateJp, getDayOfWeek} from "@utils/handleDate";
import router from "@/router";
import moment from 'moment'
import {useMembershipTicketStore} from "@stores/membership/membershipTickets";
import {useMembershipTicketSummariesStore} from "@stores/membership/membershipTicketSummaries";
import TheSidebar from "@/containers/TheSidebar.vue";
import {useMembershipCustomersStore} from "@stores/membership/membershipCustomer";
import {useMembershipHotelsStore} from "@stores/membership/membershipHotels";
import {useMembershipReservationsStore} from "@stores/membership/membershipReservation";

const storeReservation = useMembershipReservationsStore()
const membershipTicketStore = useMembershipTicketStore()
const membershipTicketSummaryStore = useMembershipTicketSummariesStore()
const memberShipCustomers = useMembershipCustomersStore();
const membershipHotelsStore =  useMembershipHotelsStore();
let openQuickReservationDialog = ref<boolean>(false)

const {customerInfo} = storeToRefs(memberShipCustomers);
const {home_mutual} = storeToRefs(membershipTicketSummaryStore)
const {selectedHotel} = storeToRefs(membershipHotelsStore);

const closeQuickReservationDialog = () => {
  openQuickReservationDialog.value = false
}
const { data: reservation } = storeToRefs(storeReservation)
const {data: listMembershipTickets } = storeToRefs(membershipTicketStore)
const {get_home_mutual_name} = membershipTicketSummaryStore;
const getHomeName = (hotel_right_id : string) =>{
  let ticket =  get_home_mutual_name(hotel_right_id) ?? [];
  return ticket[0].ticket_type_id === "1" ? 'ホーム' : '相互'
}
const getReservation = async() => {
  const apiParams = new ReservationsApiGetReservationRequest()
  apiParams.hotelId = selectedHotel.value.hotel_id
  apiParams.reservationId = reservation.value.reservation_id;
  await storeReservation.fetch(apiParams)
}
// getReservation()

const updateReservations = async () => {
  const apiParams = new ReservationsApiUpdateReservationRequest()
  const updateReservationRequest = new UpdateReservationRequest()
  const reservationPut = new Reservation();
  // const createInfor = new EditInfo();
  // const changeInfor = new EditInfo();
  // const stayProvision = new StayProvision();
  // const stayPattern = new StayPattern();
  apiParams.hotelId = '18';
  apiParams.reservationId = reservation.value.reservation_id;
  reservationPut.reservation_id = reservation.value.reservation_id;
  reservationPut.reservation_class_id = ReservationClassId.Stay;
  reservationPut.reservation_status_id = toggleButtonValue.value;
  reservationPut.create_info = reservation.value.create_info;
  reservationPut.change_info = reservation.value.change_info;
  reservationPut.reservation_number = reservation.value.reservation_number;
  reservationPut.hotel_name = reservation.value.hotel_name;
  reservationPut.is_cancelled = reservation.value.is_cancelled;
  reservationPut.person_count = [
      1, 0, 0, 0, 0, 0
  ];
  reservationPut.provisions = reservation.value.provisions;
  reservationPut.stay_patterns = reservation.value.stay_patterns;
  updateReservationRequest.reservation = reservationPut
  apiParams.updateReservationRequest = updateReservationRequest;
  await storeReservation.updateReservations(apiParams).then((res)=>{
    openQuickReservationDialog.value = true
  }).catch((err)=>{
    console.log(err)
  });
}

/****  ticket Dialog ****/
let openTicketDialog = ref<boolean>(false)
const onClickUseTicket = async () => {
  openTicketDialog.value = true;
};
const closeTicketDialog = () => {
  openTicketDialog.value = false;
}
const selectedDate = new Date(reservation.value.stay_patterns?.stay_date_range_start);
const numberOfRoom = String(reservation.value.stay_patterns.rooms_count);
const numberOfNight =  String(reservation.value.stay_patterns.nights_count);
const numberOfAdult = String(reservation.value.person_count[0]);
const numberOfChildren = String(reservation.value.person_count[1]);
const numberOfSmallChildren = String(reservation.value.person_count[2]);
const numberOfBaby = String(reservation.value.person_count[3]);
const facilitiesSelection = String(selectedHotel.value.hotel_id);

/****  Change Schedule Dialog ****/

let openChangeScheduleDialog = ref<boolean>(false)
const onClickChangeSchedule = () => {
  openChangeScheduleDialog.value = true;
}
const closeChangeScheduleDialog = () => {
  openChangeScheduleDialog.value = false;
}

/**** Use Representative Setting Dialog ****/

let openUseRepresentativeSettingsDialog = ref<boolean>(false)
const onClickUseRepresentativeSettingsDialog = () => {
  openUseRepresentativeSettingsDialog.value = true;
}
const closeUseRepresentativeSettingsDialog = () => {
  openUseRepresentativeSettingsDialog.value = false;
}
/* router */
const routerPage: any = useRouter()
const previousPage = ref<string>('')
onBeforeMount(() => {
  previousPage.value = routerPage.options.history.state.back.slice(1);
})
const backToFrontPage = () => {
  router.push({name: previousPage.value});
}


const reservationMethodDropdownSelection = ref('');
const reservationTypeDropdownSelection = ref('');
const reservationRoute1DropdownSelection = ref('');
const reservationRoute2DropdownSelection = ref('');
const reservationRouteDetail1DropdownSelection = ref('');
const reservationRouteDetail2DropdownSelection = ref('');
const advanceReceived1DropdownSelection = ref('');
const advanceReceived2DropdownSelection = ref('');

const addReservationHistoryOptions = [
  {
    label: '予約更新履歴を確認',
    value: 'option1',
  },
  {
    label: 'アクション履歴を確認',
    value: 'option2',
  },
];

const onReservationHistoryOption = (value: string) => {
  console.log('selected reservation history option: ', value);
};

const notUsedCoupon = ref(false);

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
    label: '個人WEB',
    value: 'HKW',
  },
  {
    label: 'ホーム個人WEB',
    value: 'HKW2',
  },
];

const advanceReceivedDropdownOptions1 = [
  {
    label: '現金',
    value: 'cash',
  },
  {
    label: 'クレジットカード',
    value: 'credit',
  },
];

const advanceReceivedDropdownOptions2 = [
  {
    label: '請求先1',
    value: 'billing_address1',
  },
  {
    label: '請求先2',
    value: 'billing_address2',
  },
];

const clientName = ref('');
const toggleButtonValue = ref<ReservationStatusId>(ReservationStatusId.Confirmed);

const menuListOptions = [
  {
    label: "確定予約",
    abbreviatedLabel: "確定予約",
    value: ReservationStatusId.Confirmed,
  },
  {
    label: "カレンダーオプション仮予約",
    abbreviatedLabel: "カレンダーOP仮",
    value: ReservationStatusId.Tentative,
  },
  {
    label: "キャンセル待ち",
    abbreviatedLabel: "キャンセル待ち",
    value: ReservationStatusId.Waiting,
  },
];

const toggleButtonLabel = computed(() => {
  return menuListOptions.find(
    (option) => option.value == toggleButtonValue.value
  )?.abbreviatedLabel;
});

const selectedRoomInformationToggleButtonId1 = ref('content-1');
const selectedRoomInformationToggleButtonId2 = ref('content-1');
const selectedRoomInformationToggleButtonId3 = ref('content-1');

const onClickRoomInformationToggleToggleButton1 = (id: string) => {
  console.log('clicked room information toggle button1: ', id);
  selectedRoomInformationToggleButtonId1.value = id;
};

const onClickRoomInformationToggleToggleButton2 = (id: string) => {
  console.log('clicked room information toggle button2: ', id);
  selectedRoomInformationToggleButtonId2.value = id;
};

const onClickRoomInformationToggleToggleButton3 = (id: string) => {
  console.log('clicked room information toggle button3: ', id);
  selectedRoomInformationToggleButtonId3.value = id;
};

const currentNumericDropdownSelection1 = ref('');
const currentNumericDropdownSelection2 = ref('');
const currentNumericDropdownSelection3 = ref('');
const currentNumericDropdownSelection4 = ref('');

const currentTextDropdownSelection1 = ref('');
const currentTextDropdownSelection2 = ref('');
const currentTextDropdownSelection3 = ref('');
const currentTextDropdownSelection4 = ref('');
const currentTextDropdownSelection5 = ref('');
const currentTextDropdownSelection6 = ref('');
const currentTextDropdownSelection7 = ref('');
const currentTextDropdownSelection8 = ref('');
const currentTextDropdownSelection9 = ref('');
const currentTextDropdownSelection10 = ref('');
const currentTextDropdownSelection11 = ref('');
const currentTextDropdownSelection12 = ref('');
const currentTextDropdownSelection13 = ref('');
const currentTextDropdownSelection14 = ref('');
const currentTextDropdownSelection15 = ref('');
const currentTextDropdownSelection16 = ref('');
const currentTextDropdownSelection17 = ref('');

const textDropdownOptions1 = [
  {
    label: '喫煙',
    value: 'option1',
  },
  {
    label: 'ペット',
    value: 'option2',
  },
  {
    label: '南向き',
    value: 'option3',
  },
];

const textDropdownOptions2 = [
  {
    label: 'リクエスト1',
    value: 'option1',
  },
  {
    label: 'リクエスト2',
    value: 'option2',
  },
  {
    label: 'リクエスト3',
    value: 'option3',
  },
];

const addressTextDropdownOptions = [
  {
    label: 'ご本人',
    value: 'option1',
  },
  {
    label: '家族',
    value: 'option2',
  },
  {
    label: 'その他',
    value: 'option3',
  },
];

const roomNumberTextDropdownOptions = [
  {
    label: '101',
    value: 'option1',
  },
  {
    label: '102',
    value: 'option2',
  },
  {
    label: '103',
    value: 'option3',
  },
];

const textDropdownOptions = [
  {
    label: 'option1',
    value: 'option1',
  },
  {
    label: 'option2',
    value: 'option2',
  },
  {
    label: 'option3',
    value: 'option3',
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

const currentNumericInput1 = ref();
const currentNumericInput2 = ref();
const currentNumericInput3 = ref();
const currentNumericInput4 = ref();
const currentNumericInput5 = ref();
const currentNumericInput6 = ref();
const currentNumericInput7 = ref();
const currentNumericInput8 = ref();
const currentNumericInput9 = ref();
const currentNumericInput10 = ref();
const currentNumericInput11 = ref();
const currentNumericInput12 = ref();
const currentNumericInput13 = ref();
const currentNumericInput14 = ref();

const currentSwitchInput1 = ref(true);
const currentSwitchInput2 = ref(true);

const onClickDrawerItem = (id: string) => {
  console.log('clicked drawer item: ', id);
};

const navigateSections = (id: string) => {
  location.href = `#${id}`;
  const rect = document.getElementById(id)?.getBoundingClientRect();
  if (rect?.top) {
    document.getElementById('lay-main')?.scrollBy(0, -(300 - rect?.top));
  }
};

const onSelectReservationOption = (value: ReservationStatusId) => {
  toggleButtonValue.value = value;
};

const onSelectRestaurantOption = (value: string) => {
  console.log('selected restaurant option: ', value);
};

const isWithReservation = ref(true);
const isWithReservationDialogOpen = ref(false);

const onOpenWithReservationDialog = () => {
  isWithReservationDialogOpen.value = true;
  console.log('clickedWithReservation');
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

let openProvisionDialog = ref<boolean>(false)
const onClickProvisionDialog = () => {
  openProvisionDialog.value = true
}
const onCloseProvisionDialog = () => {
  openProvisionDialog.value = false
}

const provisionItems = ref([])
const provisionRegister = (data: []) => {
  provisionItems.value = [...provisionItems.value, ...data]
  openProvisionDialog.value = false
}

const delteteProvisionItems = (index: number) => {
  provisionItems.value.splice(index, 1)
}

let openPlanDialog = ref<boolean>(false)
const onClickPlanDialog = () => {
  openPlanDialog.value = true
}

const onClosePlanDialog = () => {
  openPlanDialog.value = false
}

const planItems = ref<any>([])
const onUpdatePlan = (plans: []) => {
  planItems.value = [...planItems.value, ...plans]
  openPlanDialog.value = false
}

const deleteItemsPlan = (index: number) => {
  planItems.value.splice(index, 1)
}

let openPreviewReservationDialog = ref<boolean>(false)
const onClickPreviewReservationDialog = () => {
  openPreviewReservationDialog.value = true
}
const onClosePreviewReservationDialog = () => {
  openPreviewReservationDialog.value = false
}
const onReservationsCancel = () => {
  const apiParams = new ReservationsApiCreateReservationCancelRequest;
  apiParams.hotelId = '18'
  apiParams.reservationId = reservation.value.reservation_id
  apiParams.reservationIdCancelBody = {
    "reservation_cancel": {
      "cancel_timestamp": moment(new Date()).format('YYYY-MM-DD')
    }
  }
  storeReservation.cancelReservations(apiParams).then(()=>{
    console.log('cancelReservations success')
    router.push({name: "reservationRegistMember"})
  })

}


const isOpenDisclosure1 = ref(false);
const isOpenDisclosure2 = ref(false);
const isOpenDisclosure3 = ref(false);
const isOpenDisclosure4 = ref(false);
const isOpenDisclosure5 = ref(false);
const isOpenDisclosure6 = ref(false);

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
