import ContentHeader from '../components/ContentHeader/ContentHeader.vue';
import Button from '../components/Button/Button.vue';
import Badge from '../components/Badge/Badge.vue';
import Text from '../components/Text/Text.vue';
import FieldContainer from '../components/FieldContainer/FieldContainer.vue';
import Dropdown from '../components/Dropdown/Dropdown.vue';
import DropdownItem from '../components/Dropdown/DropdownItem.vue';

export default {
  title: 'Components/ContentHeader',
  component: ContentHeader,
  argTypes: {},
};

const Template = (args) => ({
  components: {
    ContentHeader,
    Button,
    Badge,
    Text,
    FieldContainer,
    Dropdown,
    DropdownItem,
  },
  setup() {
    const dropdownOptions = [
      {
        label: '電話',
        value: 'phone',
      },
      {
        label: 'メール',
        value: 'mail',
      },
    ];
    return { args, dropdownOptions };
  },
  template: `
  <div class="util-overflow-y" style="height: 400px; background: grey">
    <ContentHeader v-bind="args">
      <template #headlineLeft >
        <Badge size="small" color="success">予約確定</Badge>
        <Text class="util-ml-8" size="xl" bold>予約：９３２４２５</Text>
      </template>
      <template #headlineRight >
        <FieldContainer label="予約受付媒体区分" width="120px">
          <Dropdown
            v-model:value="reservationMethodDropdownSelection"
            placeholder="電話"
            size="small"
            width="120px"
          >
            <DropdownItem
              v-for="(option, i) in dropdownOptions"
              :key="i"
              :label="option.label"
              :value="option.value"
            >
            </DropdownItem>
          </Dropdown>
        </FieldContainer>
      </template>
      <template #content >
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
        >
          顧客基本／利用者代表情報
        </Button>
        <Button
          size="medium"
          type="outlined"
          color="neutral"
        >
          宿泊情報
        </Button>
        <Button
          size="medium"
          type="outlined"
          color="neutral"        >
          部屋情報
        </Button>
        <Button
          size="medium"
          type="outlined"
          color="neutral"
        >
          レストラン
        </Button>
        <Button
          size="medium"
          type="outlined"
          color="neutral"
        >
          付帯施設
        </Button>
      </template>
    </ContentHeader>
    <div style="height: 600px; margin: 0 32px">
      <h2>Body</h2>
    </div>
  </div>
  `,
});

export const ContentHeaderSample = Template.bind({});
ContentHeaderSample.args = {};
