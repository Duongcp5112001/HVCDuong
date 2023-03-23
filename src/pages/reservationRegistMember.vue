<template>
  <TicketPageDialog
      :open="openTicketDialog"
      @close-dialog="closeTicketDialog"
      @open-dialog="onClickUseTicket"
      :startDate="selectedDate"
      :numberOfRoom="numberOfRoom"
      :numberOfNight="numberOfNight"
      :numberOfAdult="numberOfAdult"
      :numberOfChildren="numberOfChildren"
      :numberOfSmallChildren="numberOfSmallChildren"
      :numberOfBaby="numberOfBaby"
      :facility="facilitiesSelection"
  ></TicketPageDialog>
  <RemainingRoomDialog
      :open="openRemainingRoomDialog"
      :hotelName="hotelName"
      @close-dialog="closeRemainingRoomDialog"
  ></RemainingRoomDialog>
  <QuickReservationDialog
      :open="openQuickReservationDialog"
      @close-dialog="closeQuickReservationDialog"
  ></QuickReservationDialog>
  <QuickReservationErrorDialog
      :open="openQuickReservationErrorDialog"
      @close-dialog="closeQuickReservationErrorDialog"
      :startDate="selectedDate"
      :numberOfRoom="numberOfRoom"
      :numberOfNight="numberOfNight"
      :numberOfAdult="numberOfAdult"
      :numberOfChildren="numberOfChildren"
      :numberOfSmallChildren="numberOfSmallChildren"
      :numberOfBaby="numberOfBaby"
      :facilityName="hotelName"
      @openRemainningRoomConfirm="openRemainningRoomConfirm"
  ></QuickReservationErrorDialog>
  <div class="lay-container lay-container--4panes">
    <the-sidebar/>
    <main class="lay-main">
      <div class="lay-main__container lay-main__container--3-panes">
        <Disclosure>
          <template #title>
            <Text class="util-mr-24" bold>顧客照会</Text>
          </template>
          <div
            class="
              util-flex util-flex--gap8 util-flex--wrap util-flex--align-end
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
<!--            <FieldContainer class="util-mr-8" label="利用券番号" width="200px">-->
<!--              <TextField v-model="ticket" />-->
<!--            </FieldContainer>-->
            <Button color="neutral" icon="search" @click="onClickSearch">
              検索
            </Button>
            <Button color="neutral" type="outlined" @click="onClickClear">
              クリア
            </Button>
          </div>
          <Table height="" width="100%" class="util-mt-16" v-if="listCustomers?.length > 1">
            <template #head>
              <TableRow id="row-1">
                <TableColumn id="col-1" width="72px"> 選択</TableColumn>
                <TableColumn id="col-2" width="135px"> 顧客番号</TableColumn>
                <TableColumn id="col-3" width="120px"> 会員番号</TableColumn>
                <TableColumn id="col-4"> 顧客名（カナ）</TableColumn>
                <TableColumn id="col-5" width="160px"> 電話番号</TableColumn>
                <TableColumn id="col-6" width="160px">
                  携帯電話番号
                </TableColumn>
                <TableColumn id="col-7"> 住所</TableColumn>
                <TableColumn id="col-8" width="120px"> 生年月日</TableColumn>
              </TableRow>
            </template>
            <template #body  >
              <TableRow v-for="(row, index) in listCustomers" :id="'row' + index" :key="index">
                <TableCell>
                  <Button @click="onClickTableSelect(row)">選択</Button>
                </TableCell>
                <TableCell>{{row.customer_id}}</TableCell>
                <TableCell>{{row.membership_hotel_right_ids[0]}}</TableCell>
                <TableCell>{{row.name_alias}}</TableCell>
                <TableCell>{{row.phone_no_0 }}</TableCell>
                <TableCell>{{row.phone_no_1}}</TableCell>
                <TableCell>{{row.address_lines[0]}}</TableCell>
                <TableCell>{{row.birth_date}}</TableCell>
              </TableRow>
            </template>
          </Table>
        </Disclosure>
        <Panel>
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
                <Text bold size="xs">{{`(${customerInfo.name_alias})`}}</Text>
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
                <Balloon class="util-mr-16" direction="bottom" :disabled="home_mutual.home_count > 0 ? false : true">
                  <Badge :counter="home_mutual.home_count">{{home_mutual.home_count > 0 ? home_mutual.home_count : 0}}</Badge>
                  <template #balloonContent>
                    <span v-for="(item,index) in home_mutual.hotel_name" :key="index" class="util-py-4 util-px-8 util-mb-8">
                      {{ item.name }}
                    </span>
                  </template>
                </Balloon>
                <Text class="util-mr-24" bold size="large">{{home_mutual.number_home_available}}</Text>
                <Text class="util-mr-16" color="light" bold size="2xs">
                  相互
                </Text>
                <Text bold size="large">{{home_mutual.number_mutual_available}}</Text>
              </Panel>
            </span>
            <span class="util-flex util-flex--align-start">
              <div class="util-flex util-flex--align-center util-flex--gap4">
                <Text color="light" size="2xs" no-wrap>TRSポイント残高</Text>
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
            <span class="util-flex util-flex--column">
              <Text class="util-mb-8" color="light" bold size="2xs">
                セキュリティコード
              </Text>
              <Text bold size="xs">987</Text>
            </span>
          </span>
          <span class="util-flex util-flex--justify-between util-mb-24">
            <span class="util-flex util-flex--align-center util-flex--gap8">
              <Badge size="small" color="error" icon="error">年会費未納</Badge>
              <Badge size="small" color="warning" icon="confirmation_number">
                チケットレス
              </Badge>
              <Badge
                size="small"
                color="success"
                icon="sentiment_very_satisfied"
              >
                優良
              </Badge>
            </span>
            <span
              v-if="isRequestRooms"
              class="util-flex util-flex--align-center util-flex--gap8"
            >
              <Button
                type="outlined"
                color="neutral"
                size="small"
                @click="onClickRequestRooms"
              >
                部屋リクエストあり
              </Button>
            </span>
          </span>
          <Panel color="dark">
            <span class="util-flex util-flex--align-start">
              <span class="util-flex util-mr-32">
                <Text bold size="ll" no-wrap>新規予約</Text>
              </span>
              <span class="util-flex util-flex--column util-full-width">
                <Text
                  v-if="insufficientTicketError"
                  class="util-mb-16"
                  color="critical"
                  size="xs"
                  no-wrap
                >
                  利用券が不足しています。
                </Text>
                <span
                  class="
                    util-flex util-flex--align-center util-flex--gap16
                    util-mb-16
                    util-flex--wrap
                  "
                >
                  <FieldContainer label="宿泊施設" width="416px" required>
                    <ComboBox
                      v-model:value="facilitiesSelection"
                      width="416px"
                      size="small"
                      :error="v$.facilitiesSelection.$errors.length > 0"
                    >
                      <ComboBoxItem
                        v-for="(option, i) in listHotels"
                        :key="i"
                        :label="option.name"
                        :value="option.hotel_id"
                      >
                      </ComboBoxItem>
                    </ComboBox>
<!--                     <span v-for="error in v$.facilitiesSelection.$errors" class="error-validation">-->
<!--                      {{ error.$message }}-->
<!--                    </span>-->
                  </FieldContainer>
                  <FieldContainer label="部屋タイプ" width="272px">
                    <ComboBox
                      v-model:value="roomTypeSelection"
                      placeholder=""
                      size="small"
                      width="272px"
                      :disabled="facilitiesSelection === '' || isRoomTypeSelectable"
                      :search-icon="false"
                    >
                      <ComboBoxItem
                        v-for="(option) in listRoomtypes"
                        :key="option.room_type_id"
                        :label="option.name"
                        :value="`${option.room_type_id}_${facilitiesSelection}`"
                        width="272px"
                      >
                      </ComboBoxItem>
                    </ComboBox>
                  </FieldContainer>
                  <FieldContainer label="宿泊日" required width="128px">
                    <DatePicker
                      size="small"
                      width="128px"
                      :date="selectedDate"
                      @change-date="onChangeDate"
                      :error="v$.selectedDate.$errors.length > 0"
                    />
                  </FieldContainer>
                  <span class="util-flex util-flex--align-end">
                    <FieldContainer label="泊数" width="64px" required>
                      <TextField
                        v-model="numberOfNight"
                        input-type="number"
                        placeholder="0"
                        width="64px"
                        @input="
                          if ($event !== undefined)
                            numberOfNight = $event;
                        "
                      />
                    </FieldContainer>
                    <Text class="util-ml-4" color="light" bold size="2xs">
                      泊
                    </Text>
                  </span>
                  <span class="util-flex util-flex--align-end">
                    <FieldContainer label="部屋数" width="64px" required>
                      <TextField
                        v-model="numberOfRoom"
                        input-type="number"
                        placeholder="0"
                        width="64px"
                        @input="
                          if ($event !== undefined)
                            numberOfRoom = $event;
                        "
                      />
                    </FieldContainer>
                    <Text class="util-ml-4" color="light" bold size="2xs">
                      泊
                    </Text>
                  </span>
                </span>
                <span
                  class="
                    util-flex
                    util-flex--align-center
                    util-flex--wrap
                    util-flex--gap16
                    util-mb-16
                  "
                >
                  <span
                    class="
                      util-flex
                      util-flex--align-center
                      util-flex--wrap
                      util-flex--gap16
                      util-mr-8
                    "
                  >
                    <Text color="light" size="2xs">
                      <span
                        class="
                          util-flex util-flex--column util-flex--align-center
                        "
                      >
                        <span>一部屋</span>
                        <span>あたり</span>
                      </span>
                    </Text>
                    <span class="util-flex util-flex--align-end">
                      <FieldContainer label="大人" width="64px" required>
                        <TextField
                          v-model="numberOfAdult"
                          input-type="number"
                          placeholder="0"
                          width="64px"
                          @input="
                            if ($event !== undefined)
                              numberOfAdult = $event;
                          "
                        />
                      </FieldContainer>
                      <Text class="util-ml-4" color="light" bold size="2xs">
                        人
                      </Text>
                    </span>
                    <span class="util-flex util-flex--align-end">
                      <FieldContainer label="中人" width="64px">
                        <TextField
                          v-model="numberOfChildren"
                          input-type="number"
                          placeholder="0"
                          width="64px"
                          @input="
                            if ($event !== undefined)
                              numberOfChildren = $event;
                          "
                        />
                      </FieldContainer>
                      <Text class="util-ml-4" color="light" bold size="2xs">
                        人
                      </Text>
                    </span>
                    <span class="util-flex util-flex--align-end">
                      <FieldContainer label="小人" width="64px">
                        <TextField
                          v-model="numberOfSmallChildren"
                          input-type="number"
                          placeholder="0"
                          width="64px"
                          @input="
                            if ($event !== undefined)
                              numberOfSmallChildren = $event;
                          "
                        />
                      </FieldContainer>
                      <Text class="util-ml-4" color="light" bold size="2xs">
                        人
                      </Text>
                    </span>
                    <span class="util-flex util-flex--align-end">
                      <FieldContainer label="幼児" width="64px">
                        <TextField
                          v-model="numberOfBaby"
                          input-type="number"
                          placeholder="0"
                          width="64px"
                          @input="
                            if ($event !== undefined)
                              numberOfBaby = $event;
                          "
                        />
                      </FieldContainer>
                      <Text class="util-ml-4" color="light" bold size="2xs">
                        人
                      </Text>
                    </span>
                  </span>
                  <span
                    class="
                      util-flex
                      util-flex--align-center
                      util-flex--wrap
                      util-flex--gap16
                    "
                  >
                    <FieldContainer label="お部屋条件" width="128px">
                      <ComboBox
                        v-model:value="currentTextDropdownSelection1"
                        placeholder="VV0000"
                        size="small"
                        width="128px"
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
                    </FieldContainer>
                    <FieldContainer label="リクエスト" width="128px">
                      <ComboBox
                        v-model:value="currentTextDropdownSelection1"
                        placeholder="VV0000"
                        size="small"
                        width="128px"
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
                    </FieldContainer>
                  </span>
                  <FieldContainer label="部屋番号希望" width="128px">
                    <TextField
                      v-model="currentNumericInput7"
                      input-type="number"
                      width="128px"
                      @input="
                        if ($event !== undefined) currentNumericInput7 = $event;
                      "
                    />
                  </FieldContainer>
                </span>
                <span
                  class="
                    util-flex
                    util-flex--justify-between
                    util-flex--wrap
                    util-flex--gap16
                  "
                >
                  <Button
                    type="outlined"
                    color="neutral"
                    size="large"
                    icon="meeting_room"
                    @click="onClickAssignmentsInquiry"
                  >
                    部屋アサイン照会
                  </Button>
                  <span class="util-flex util-flex--wrap util-flex--gap16">
                    <Button
                      size="large"
                      color="neutral"
                      width="240px"
                      @click="onClickUseTicket"
                    >
                      利用券指定予約
                    </Button>
                    <Button
                      size="large"
                      color="neutral"
                      width="240px"
                      @click="onClickCheckReservation"
                    >
                      残室確認／詳細設定予約
                    </Button>
                    <Button
                      size="large"
                      width="240px"
                      @click="onClickQuickReservation"
                    >
                      クイック予約
                    </Button>
                  </span>
                </span>
              </span>
            </span>
          </Panel>
        </Panel>
        <Tabs :selected-index="selectedTab" @change="onChangeTab">
          <Tab>予約／利用実績</Tab>
          <Tab>会員権／利用券</Tab>
          <Tab>抽選</Tab>
          <Tab>顧客情報</Tab>
        </Tabs>
        <TabPanels :selected-index="selectedTab">
          <TabPanel class="util-flex util-flex--column">
            <ToggleButtonSet
              class="util-mb-16"
              :selected-id="selectedToggleButtonId"
              width="240px"
              type="outlined"
              @click-item="onClickToggleButton"
            >
              <ToggleButton id="content-1" icon="bed">本人利用</ToggleButton>
              <ToggleButton id="content-2" icon="people">
                ゲスト利用
              </ToggleButton>
            </ToggleButtonSet>
            <ComboBox
              v-model:value="currentTextDropdownSelection3"
              class="util-mb-8"
              placeholder="すべて"
              size="small"
              width="160px"
              icon="filter_list"
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
            <Table height="" width="100%">
              <template #head>
                <TableRow id="row-1">
                  <TableColumn id="col-1" width="160px">ステータス</TableColumn>
                  <TableColumn id="col-2" min-width="160px" width="160px">
                    予約番号
                  </TableColumn>
                  <TableColumn
                    id="col-3"
                    can-sort
                    :sorted-direction="hotelSort"
                    @click-sort="onSortHotel"
                  >
                    宿泊施設
                  </TableColumn>
                  <TableColumn
                    id="col-4"
                    width="120px"
                    can-sort
                    :sorted-direction="dateUsageSort"
                    @click-sort="onSortDateUsage"
                  >
                    利用日
                  </TableColumn>
                  <TableColumn
                    id="col-5"
                    min-width="64px"
                    width="64px"
                    text-align="center"
                  >
                    部屋数
                  </TableColumn>
                  <TableColumn
                    id="col-6"
                    min-width="64px"
                    width="64px"
                    text-align="center"
                  >
                    泊数
                  </TableColumn>
                  <TableColumn
                    id="col-7"
                    min-width="64px"
                    width="64px"
                    text-align="center"
                  >
                    人数
                  </TableColumn>
                  <TableColumn
                    id="col-8"
                    min-width="77px"
                    width="77px"
                    text-align="center"
                  >
                    プラン
                  </TableColumn>
                  <TableColumn
                    id="col-9"
                    min-width="77px"
                    width="77px"
                    text-align="center"
                  >
                    レストラン
                  </TableColumn>
                  <TableColumn
                    id="col-10"
                    min-width="77px"
                    width="77px"
                    text-align="center"
                  >
                    付帯施設
                  </TableColumn>
                  <TableColumn
                    id="col-11"
                    min-width="77px"
                    width="77px"
                    text-align="center"
                  >
                    備品
                  </TableColumn>
                  <TableColumn
                    id="col-12"
                    min-width="77px"
                    width="77px"
                    text-align="center"
                  >
                    手配品
                  </TableColumn>
                  <TableColumn
                    id="col-13"
                    min-width="77px"
                    width="77px"
                    text-align="center"
                  >
                    詳細
                  </TableColumn>
                </TableRow>
              </template>
              <template #body>
                <TableRow id="row-2">
                  <TableCell>カレンダーOP（仮）</TableCell>
                  <TableCell>932425</TableCell>
                  <TableCell>裏磐梯グランデコ</TableCell>
                  <TableCell>2022/10/18</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">5</TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Button
                      type="outlined"
                      color="neutral"
                      @click="onClickTableDetails"
                    >
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow id="row-3">
                  <TableCell>カレンダーOP（仮）</TableCell>
                  <TableCell>932425</TableCell>
                  <TableCell>裏磐梯グランデコ</TableCell>
                  <TableCell>2022/10/18</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">5</TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Button
                      type="outlined"
                      color="neutral"
                      @click="onClickTableDetails"
                    >
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow id="row-4">
                  <TableCell>カレンダーOP（仮）</TableCell>
                  <TableCell>932425</TableCell>
                  <TableCell>裏磐梯グランデコ</TableCell>
                  <TableCell>2022/10/18</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">5</TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Button
                      type="outlined"
                      color="neutral"
                      @click="onClickTableDetails"
                    >
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow id="row-5">
                  <TableCell>カレンダーOP（仮）</TableCell>
                  <TableCell>932425</TableCell>
                  <TableCell>裏磐梯グランデコ</TableCell>
                  <TableCell>2022/10/18</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">2</TableCell>
                  <TableCell text-align="right">5</TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="check" color="#4CAF50" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Icon icon="horizontal_rule" color="#C5C5C5" />
                  </TableCell>
                  <TableCell text-align="center">
                    <Button
                      type="outlined"
                      color="neutral"
                      @click="onClickTableDetails"
                    >
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
              </template>
            </Table>
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel>Content C</TabPanel>
          <TabPanel>Content D</TabPanel>
        </TabPanels>
      </div>
    </main>
    <aside class="lay-aside">
      <div class="sidebar-dummy"></div>
    </aside>
  </div>
</template>

<script setup lang="ts">

import Badge from '@components/Badge/Badge.vue';
import Disclosure from '@components/Disclosure/Disclosure.vue';
import ToggleButtonSet from '@components/ToggleButton/ToggleButtonSet.vue';
import ToggleButton from '@components/ToggleButton/ToggleButton.vue';
import Text from '@components/Text/Text.vue';
import Button from '@components/Button/Button.vue';
import Panel from '@components/Panel/Panel.vue';
import Checkbox from '@components/Checkbox/Checkbox.vue';
import TextField from '@components/TextField/TextField.vue';
import Table from '@components/Table/Table.vue';
import TableCell from '@components/Table/TableCell.vue';
import TableColumn from '@components/Table/TableColumn.vue';
import TableRow from '@components/Table/TableRow.vue';
import Icon from '@components/Icon/Icon.vue';
import Tabs from '@components/Tabs/Tabs.vue';
import Tab from '@components/Tabs/Tab.vue';
import TabPanels from '@components/Tabs/TabPanels.vue';
import TabPanel from '@components/Tabs/TabPanel.vue';
import DatePicker from '@components/DatePicker/DatePicker.vue';
import FieldContainer from '@components/FieldContainer/FieldContainer.vue';
import Dropdown from '@components/Dropdown/Dropdown.vue';
import DropdownItem from '@components/Dropdown/DropdownItem.vue';
import ComboBox from '@components/ComboBox/ComboBox.vue';
import ComboBoxItem from '@components/ComboBox/ComboBoxItem.vue';
import Balloon from '@components/Balloon/Balloon.vue';
import TicketPageDialog from '@pages/Dialog/TicketDialog.vue';
import RemainingRoomDialog from '@pages/Dialog/RemainingRoomDialog.vue';
import QuickReservationDialog from '@pages/Dialog/QuickReservationDialog.vue';
import QuickReservationErrorDialog from "@pages/Dialog/QuickReservationErrorDialog.vue";
import {computed, ref, watch} from 'vue';
import { useVuelidate } from '@vuelidate/core'
import {helpers, required} from '@vuelidate/validators'
import {storeToRefs} from "pinia";
import {useMembershipHotelsStore} from "@stores/membership/membershipHotels";
import {useRoomsTypesStore} from "@stores/front/roomTypes";
import {useMembershipTicketStore} from "@stores/membership/membershipTickets"
import {useMembershipTicketSummariesStore} from "@stores/membership/membershipTicketSummaries";
import {useMembershipContractGroupsStore} from "@stores/membership/membershipContractGroups";
import {useMembershipCustomersStore} from "@stores/membership/membershipCustomer";
import {RoomTypesApiListRoomTypesRequest} from '@openapi/front/api'
import {
  MembershipTicketSummariesApiListMembershipCustomerTicketSummariesRequest,
  MemberShipTicketsApiListMembershipCustomerTicketsRequest,
  MembershipContractGroupsApiListMembershipCustomerContractGroupsRequest,
  MembershipCustomersApiListMembershipCustomersRequest, StayGuest
} from '@openapi/membership/api'
import {formatDateSymbol} from "@utils/handleDate";
import TheSidebar from "@/containers/TheSidebar.vue";
import {useMembershipReservationsStore} from "@stores/membership/membershipReservation";
import {
  CreateMembershipHotelReservationRequest,
  MembershipHotelReservation,
  MembershipHotelsApiListMembershipHotelsRequest,
  MembershipHotelReservationsApiCreateMembershipHotelReservationRequest,
  StayPattern,
  ReservationClassId,
  ReservationStatusId,
} from '@openapi/membership'

const memberShipCustomers = useMembershipCustomersStore();
const {customerInfo} = storeToRefs(memberShipCustomers);

const param = computed(() => {
  return {
    businessId:  import.meta.env.VITE_HVC_BUSINESS_ID,
    customerId: customerInfo.value.customer_id
  }
});

/** List Customer **/
const membershipCustomerStore = useMembershipCustomersStore();
const {data: listCustomers} = storeToRefs(membershipCustomerStore);
const getMembershipCustomerList = async () => {
  const apiParams = new MembershipCustomersApiListMembershipCustomersRequest()
  apiParams.businessId = import.meta.env.VITE_HVC_BUSINESS_ID;
  apiParams.hotelRightId = memberCode.value
  apiParams.name = clientName.value
  apiParams.phoneNo = telephone.value
  await membershipCustomerStore.fetch(apiParams);
}
const onClickTableSelect = async (customerInfo: Record<string, unknown>) => {
  await membershipCustomerStore.selectedCustomer(customerInfo);
  await getMembershipTicketSummary();
}

/*** ListRoomTypesDropdown ***/
const roomTypeStore = useRoomsTypesStore();
let roomTypeSelection = ref<string | undefined>('');
const { data: listRoomtypes } = storeToRefs(roomTypeStore)
const getListRoomtype = async(hotel_id: string) => {
  const apiParams = new RoomTypesApiListRoomTypesRequest()
  apiParams.hotelId = hotel_id
  await roomTypeStore.fetch(apiParams)
}


/***ListHotelsDropdown***/
const membershipHotelsStore = useMembershipHotelsStore()
const { data: listHotels, selectedHotel } = storeToRefs(membershipHotelsStore)
const isRoomTypeSelectable = ref(false);
const facilitiesSelection = ref<string>('');
const hotelName = ref<string | undefined>('')
const getListHotel = async () => {
  const apiParams = new MembershipHotelsApiListMembershipHotelsRequest()
  apiParams.businessId = import.meta.env.VITE_HVC_BUSINESS_ID
  await membershipHotelsStore.fetch(apiParams)
}
getListHotel()

watch(facilitiesSelection, async (facilitiesSelection: string) => {
  membershipHotelsStore.selectHotel(facilitiesSelection);
  hotelName.value = selectedHotel.value.name;
  if(selectedHotel.value.membership_hotel_type.is_room_type_selectable) {
    isRoomTypeSelectable.value = false
    roomTypeSelection.value = ''
    await getListRoomtype(facilitiesSelection)
  } else {
    isRoomTypeSelectable.value = true
    roomTypeSelection.value = ''
  }
})

/*** MembershipTicket ***/
const membershipTicketStore = useMembershipTicketStore()
const getMembershipTicket = async () => {
  const apiParams = new MemberShipTicketsApiListMembershipCustomerTicketsRequest()
  apiParams.businessId = param.value.businessId;
  apiParams.customerId = param.value.customerId;
  await membershipTicketStore.fetch(apiParams)
}
getMembershipTicket()

/*** MembershipTicketSummary ***/
const membershipTicketSummaryStore = useMembershipTicketSummariesStore()
const {home_mutual} = storeToRefs(membershipTicketSummaryStore)
const getMembershipTicketSummary = async () => {
  const apiParams = new MembershipTicketSummariesApiListMembershipCustomerTicketSummariesRequest()
  apiParams.businessId = param.value.businessId;
  apiParams.customerId = param.value.customerId;
  await membershipTicketSummaryStore.fetch(apiParams);
}
getMembershipTicketSummary()

/*** MembershipContractGroup ***/
const membershipContractGroupStore = useMembershipContractGroupsStore()
const getMembershipContractGroup = async () => {
  const apiParams = new MembershipContractGroupsApiListMembershipCustomerContractGroupsRequest()
  apiParams.businessId = param.value.businessId;
  apiParams.customerId = param.value.customerId;
  await membershipContractGroupStore.fetch(apiParams);
}
getMembershipContractGroup()


const insufficientTicketError = ref(false);
const selectedTab = ref(0);
const selectedDate = ref(new Date());

const numberOfNight = ref('1');
const numberOfRoom = ref('1');
const numberOfAdult = ref('1');
const numberOfChildren = ref('');
const numberOfSmallChildren = ref('');
const numberOfBaby = ref('');

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
const numericDropdownOptionsBaby = [
  {
    label: '0',
    value: '0',
  },
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

const currentTextDropdownSelection1 = ref('');
const currentTextDropdownSelection2 = ref('');
const currentTextDropdownSelection3 = ref('');

const textDropdownOptions = [
  {
    label: 'First Option',
    value: 'First Option',
  },
  {
    label: 'Second Option',
    value: 'Second Option',
  },
  {
    label: 'Third Option',
    value: 'Third Option',
  },
];

const currentNumericInput1 = ref(1);
const currentNumericInput2 = ref(1);
const currentNumericInput3 = ref(2);
const currentNumericInput4 = ref(2);
const currentNumericInput5 = ref(2);
const currentNumericInput6 = ref(2);
const currentNumericInput7 = ref(2);


const facilitiesOptions = [
  {
    label: 'GD 裏磐梯グランデコ',
    value: 'option-1',
  },
  {
    label: 'NU 那須',
    value: 'option-2',
  },
  {
    label: 'NG 那須リトリート',
    value: 'option-3',
  },
  {
    label: 'KN 鬼怒川',
    value: 'option-4',
  },
  {
    label: 'KA 勝浦',
    value: 'option-5',
  },
];

const memberCode = ref<string>('');
const clientName = ref<string>('');
const telephone = ref<string>('');
const ticket = ref<string>('');
const isRequestRooms = ref(true);
const isSmoking = ref<boolean>(false);
const isPets = ref<boolean>(true);
const selectedToggleButtonId = ref<string>('content-1');

const hotelSort = ref<'asc' | 'desc' | ''>('');
const dateUsageSort = ref<'asc' | 'desc' | ''>('');

const onSortHotel = (sortStatus: 'asc' | 'desc') => {
  console.log('sorted hotels as:', sortStatus);
  hotelSort.value = sortStatus;
};

const onSortDateUsage = (sortStatus: 'asc' | 'desc') => {
  console.log('sorted date usage as:', sortStatus);
  dateUsageSort.value = sortStatus;
};

const onClickToggleButton = (id: string) => {
  console.log('clicked toggle button: ', id);
  selectedToggleButtonId.value = id;
};

const onChangeDate = (date: Date) => {
  console.log('onChangeDate', date);
  selectedDate.value = date;
};

const onChangeTab = (tab: number) => {
  console.log('onChangeTab', tab);
  selectedTab.value = tab;
};

const onClickDrawerItem = (id: string) => {
  console.log('clicked drawer item: ', id);
};


const onClickSearch = async () => {
  await getMembershipCustomerList();
  if(listCustomers.value?.length){
    await onClickTableSelect(listCustomers.value[0]);
  }
};

const onClickClear = () => {
  memberCode.value = '';
  ticket.value = '';
  clientName.value = '';
  telephone.value = '';
};

const onClickTableDetails = () => {
  console.log('clickedTableDetails');
};

/****  ticket Dialog ****/
let openTicketDialog = ref<boolean>(false)
const onClickUseTicket = async () => {
  const result = await v$.value.$validate();
  if(!result) return;
  openTicketDialog.value = true
};
const closeTicketDialog = () => {
  openTicketDialog.value = false
}

/*** remainingRoom / detailReservation Dialog ***/
let openRemainingRoomDialog = ref<boolean>(false)
const onClickCheckReservation = () => {
  openRemainingRoomDialog.value = true
};
const closeRemainingRoomDialog = () => {
  openRemainingRoomDialog.value = false
}

/**** quickReservation Dialog ****/
const membershipReservations = useMembershipReservationsStore();
let openQuickReservationDialog = ref<boolean>(false)
let openQuickReservationErrorDialog = ref<boolean>(false)
const onClickQuickReservation = async () => {
  const result = await v$.value.$validate();
  if(!result) return;
  const apiParams = new MembershipHotelReservationsApiCreateMembershipHotelReservationRequest();
  const createMembershipHotelReservationRequest = new CreateMembershipHotelReservationRequest();
  const membershipHotelReservation = new MembershipHotelReservation();
  const stayPattern = new StayPattern();
  const guestMain  = new StayGuest();
  const guestReservedBy = new StayGuest();
  const guests = new StayGuest();


  guestMain.customer_id = param.value.customerId;
  guestMain.stay_guest_type_id = "MainGuest";
  guestMain.sequence = 0;

  guestReservedBy.customer_id = param.value.customerId;
  guestReservedBy.stay_guest_type_id = "MainGuest";
  guestReservedBy.sequence = 0;

  guests.customer_id = param.value.customerId;
  guests.stay_guest_type_id = "RoomGuest";


  stayPattern.nights_count = Number(numberOfNight.value);
  stayPattern.room_type_id = roomTypeSelection.value?.slice(0,-3);
  stayPattern.rooms_count = Number(numberOfRoom.value);
  stayPattern.sequence = 0;
  stayPattern.stay_date_range_start = formatDateSymbol(selectedDate.value, '-') ?? '';
  stayPattern.stays = [{
    "guests": [guests]
  }]

  membershipHotelReservation.person_count = [
      Number(numberOfAdult.value),
      Number(numberOfChildren.value),
      Number(numberOfSmallChildren.value),
      Number(numberOfBaby.value)
  ]
  membershipHotelReservation.reservation_status_id = ReservationStatusId.KeepInventory;
  membershipHotelReservation.reservation_class_id = ReservationClassId.Stay;
  membershipHotelReservation.stay_patterns = stayPattern;
  membershipHotelReservation.guest_main = guestMain;
  membershipHotelReservation.guest_reserved_by = guestReservedBy;

  createMembershipHotelReservationRequest.reservation = membershipHotelReservation
  apiParams.hotelId = facilitiesSelection.value;
  apiParams.createMembershipHotelReservationRequest = createMembershipHotelReservationRequest;

  await membershipReservations.postMembershipReservations(apiParams)
      .then(()=>{
        openQuickReservationDialog.value = true
      })
      .catch(()=>{
        openQuickReservationErrorDialog.value = true
      });
};
const closeQuickReservationDialog = () => {
  openQuickReservationDialog.value = false
}
const closeQuickReservationErrorDialog = () => {
  openQuickReservationErrorDialog.value = false
}

const openRemainningRoomConfirm = () => {
  openQuickReservationErrorDialog.value = false
  openRemainingRoomDialog.value = true
}

  /***** vuelidate *****/
const rules = {

  numberOfNight: {
    required: helpers.withMessage('This field cannot be empty', required)
  },
  numberOfRoom: {
    required: helpers.withMessage('This field cannot be empty', required)
  },
  numberOfAdult: {
    required: helpers.withMessage('This field cannot be empty', required)
  },
  facilitiesSelection: {
    required: helpers.withMessage('This field cannot be empty', required)
  },
  selectedDate: {
    required: helpers.withMessage('This field cannot be empty', required)
  }
}

const v$ = useVuelidate(rules, {
  facilitiesSelection,
  numberOfNight,
  numberOfRoom,
  numberOfAdult,
  selectedDate
})

</script>

<style scoped lang="scss">
@import '../scss/variables';

.error-validation {
  color: $color-border-error--main
}

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
