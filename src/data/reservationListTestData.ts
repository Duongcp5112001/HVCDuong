export type ReservationList = {
  columns: {
    id: string;
    canSort?: boolean;
    textAlign?: 'left' | 'right' | 'center' | 'justify';
    width?: string;
    isSticky?: boolean;
    useTooltip?: boolean;
    label: string;
  }[];
  rows: {
    id: string;
    isError?: boolean;
    cells: {
      columnId: string;
      badge?: {
        color?: 'primary' | 'error' | 'success' | 'neutral' | 'warning';
        type?: 'contained' | 'outlined';
        label: string;
        width?: 'fit-content';
        tooltip?: string[];
      };
      text?: string;
      icon?: 'checked' | 'horizontal_rule';
      subIcon?: 'chair';
      counter?: number;
      referenceButton?: boolean;
    }[];
  }[];
};

export const reservationList: ReservationList = {
  columns: [
    {
      id: 'col-1',
      width: '128px',
      label: 'ステータス',
    },
    {
      id: 'col-2',
      width: '54px',
      label: 'クラブコード',
    },
    {
      id: 'col-3',
      width: '120px',
      label: '会員番号',
    },
    {
      id: 'col-4',
      width: '73px',
      label: '予約経路',
    },
    {
      id: 'col-5',
      width: '73px',
      label: '予約種別',
    },
    {
      id: 'col-6',
      width: '160px',
      label: '利用代表名（カナ）',
    },
    {
      id: 'col-7',
      width: '111px',
      label: '利用代表名',
    },
    {
      id: 'col-8',
      width: '108px',
      label: '顧客種別',
    },
    {
      id: 'col-9',
      canSort: true,
      width: '120px',
      label: '到着日',
    },
    {
      id: 'col-10',
      width: '56px',
      label: '泊数',
    },
    {
      id: 'col-11',
      width: '56px',
      label: '人数',
    },
    {
      id: 'col-12',
      width: '72px',
      label: 'プラン',
      textAlign: 'center',
    },
    {
      id: 'col-13',
      width: '72px',
      label: 'レストラン',
      textAlign: 'center',
    },
    {
      id: 'col-14',
      width: '408px',
      label: '備考',
      useTooltip: true,
    },
    {
      id: 'col-15',
      width: '88px',
      label: '部屋希望・\nリクエスト',
      textAlign: 'center',
    },
    {
      id: 'col-16',
      width: '80px',
      label: '部屋\nアサイン',
      textAlign: 'center',
    },
    {
      id: 'col-17',
      width: '72px',
      label: '付帯施設',
      textAlign: 'center',
    },
    {
      id: 'col-18',
      width: '72px',
      label: '備品',
      textAlign: 'center',
    },
    {
      id: 'col-19',
      width: '72px',
      label: '手配品',
      textAlign: 'center',
    },
    {
      id: 'col-20',
      width: '80px',
      label: 'WITH予約',
      textAlign: 'center',
    },
    {
      id: 'col-21',
      width: '120px',
      label: '予約番号',
    },
    {
      id: 'col-22',
      width: '120px',
      label: '外部受付番号',
    },
    {
      id: 'col-23',
      canSort: true,
      width: '120px',
      label: '出発日',
    },
    {
      id: 'col-24',
      width: '144px',
      label: '予約受付',
    },
    {
      id: 'col-25',
      width: '144px',
      label: '予約受付者（カナ）',
    },
    {
      id: 'col-26',
      width: '142px',
      label: '詳細',
      textAlign: 'center',
      isSticky: true,
    },
  ],
  rows: [
    {
      id: 'row-1',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'success',
            type: 'outlined',
            label: '予約確定',
          },
        },
        {
          columnId: 'col-2',
          text: 'GD',
        },
        {
          columnId: 'col-3',
          text: '',
        },
        {
          columnId: 'col-4',
          text: 'TEL',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-7',
          text: '浜本洋一',
        },
        {
          columnId: 'col-8',
          text: '会員',
          subIcon: 'chair',
        },
        {
          columnId: 'col-9',
          text: '2022/10/30',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 5,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-14',
          text: '[顧客情報]親子３代でご利用　畳の部屋をご希望あああ 畳の部屋をご希望あああ',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/20',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-2',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'success',
            type: 'outlined',
            label: '予約確定',
          },
        },
        {
          columnId: 'col-2',
          text: 'YM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: '法人代行',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-7',
          text: '結城香穂',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/29',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[予約]アレルギー項目アーモンド、いくら、キウイフルーツ、くるみ、大豆、バナナ、やまいも',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'success',
            type: 'contained',
            label: '済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-3',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'warning',
            type: 'outlined',
            label: 'カレンダーOP仮',
          },
        },
        {
          columnId: 'col-2',
          text: 'GD',
        },
        {
          columnId: 'col-3',
          text: '',
        },
        {
          columnId: 'col-4',
          text: 'TEL',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-7',
          text: '浜本洋一',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/28',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 5,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '畳の部屋をご希望',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/20',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-4',
      isError: true,
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'error',
            label: 'キャンセル',
          },
        },
        {
          columnId: 'col-2',
          text: 'KA',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'WEB',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ニッタイクト',
        },
        {
          columnId: 'col-7',
          text: '新田伊久士',
        },
        {
          columnId: 'col-8',
          text: 'ビジター',
          subIcon: 'chair',
        },
        {
          columnId: 'col-9',
          text: '2022/10/18',
        },
        {
          columnId: 'col-10',
          counter: 1,
        },
        {
          columnId: 'col-11',
          counter: 2,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[顧客情報]チェックインは20時頃',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'success',
            type: 'contained',
            label: '済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/20',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-5',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'success',
            type: 'outlined',
            label: '予約確定',
          },
        },
        {
          columnId: 'col-2',
          text: 'AM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'OTA',
        },
        {
          columnId: 'col-5',
          text: '日帰り',
        },
        {
          columnId: 'col-6',
          text: 'テラオカユキ',
        },
        {
          columnId: 'col-7',
          text: '寺岡由貴',
        },
        {
          columnId: 'col-8',
          text: 'ビジター',
        },
        {
          columnId: 'col-9',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-14',
          text: '[予約]朝食未確認',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'テラオカユキ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-6',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'success',
            type: 'outlined',
            label: '予約確定',
          },
        },
        {
          columnId: 'col-2',
          text: 'YM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: '法人代行',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-7',
          text: '結城香穂',
        },
        {
          columnId: 'col-8',
          text: '会員',
          subIcon: 'chair',
        },
        {
          columnId: 'col-9',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-13',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-14',
          text: '[予約]アレルギー項目アーモンド、いくら、キウイフルーツ、くるみ、大豆、バナナ、やまいも',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'warning',
            type: 'contained',
            label: '一部済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101, 102, 204', '[未アサイン]あり'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-7',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'warning',
            type: 'outlined',
            label: 'カレンダーOP仮',
          },
        },
        {
          columnId: 'col-2',
          text: 'GD',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'TEL',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-7',
          text: '浜本洋一',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/18',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 5,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[顧客情報]親子３代でご利用　畳の部屋をご希望あああ',
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'primary',
            type: 'contained',
            label: '部屋指定',
            width: 'fit-content',
            tooltip: ['[部屋指定]101'],
          },
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'success',
            type: 'contained',
            label: '済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'checked',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/20',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-8',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'error',
            type: 'outlined',
            label: 'キャンセル待ち',
          },
        },
        {
          columnId: 'col-2',
          text: 'KA',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'WEB',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ニッタイクト',
        },
        {
          columnId: 'col-7',
          text: '新田伊久士',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/18',
        },
        {
          columnId: 'col-10',
          counter: 1,
        },
        {
          columnId: 'col-11',
          counter: 2,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[顧客情報]チェックインは20時頃あああ',
        },
        {
          columnId: 'col-15',
          badge: {
            color: 'primary',
            type: 'contained',
            label: 'リクエスト',
            width: 'fit-content',
            tooltip: ['[リクエスト]海側'],
          },
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'checked',
        },
        {
          columnId: 'col-20',
          icon: 'checked',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ニッタイクト',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-9',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'success',
            type: 'outlined',
            label: '予約確定',
          },
        },
        {
          columnId: 'col-2',
          text: 'AM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'OTA',
        },
        {
          columnId: 'col-5',
          text: '日帰り',
        },
        {
          columnId: 'col-6',
          text: 'テラオカユキ',
        },
        {
          columnId: 'col-7',
          text: '寺岡由貴',
        },
        {
          columnId: 'col-8',
          text: 'ゲスト',
        },
        {
          columnId: 'col-9',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[予約]朝食未確認',
        },
        {
          columnId: 'col-15',
          badge: {
            color: 'primary',
            type: 'contained',
            label: 'リクエスト',
            width: 'fit-content',
            tooltip: ['[リクエスト]海側'],
          },
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'success',
            type: 'contained',
            label: '済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'checked',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'テラオカユキ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-10',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'success',
            type: 'outlined',
            label: '予約確定',
          },
        },
        {
          columnId: 'col-2',
          text: 'YM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: '法人代行',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-7',
          text: '結城香穂',
        },
        {
          columnId: 'col-8',
          text: 'ゲスト',
        },
        {
          columnId: 'col-9',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-14',
          text: '[予約]アレルギー項目アーモンド、いくら、キウイフルーツ、くるみ、大豆、バナナ、やまいも',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-11',
      isError: true,
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'error',
            label: 'キャンセル',
          },
        },
        {
          columnId: 'col-2',
          text: 'GD',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'TEL',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-7',
          text: '浜本洋一',
        },
        {
          columnId: 'col-8',
          text: 'ゲスト',
          subIcon: 'chair',
        },
        {
          columnId: 'col-9',
          text: '2022/10/18',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 5,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-14',
          text: '[顧客情報]親子３代でご利用　畳の部屋をご希望あああ',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'success',
            type: 'contained',
            label: '済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/20',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-12',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'primary',
            type: 'outlined',
            label: '宿泊済み',
          },
        },
        {
          columnId: 'col-2',
          text: 'AM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'WEB',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ニッタイクト',
        },
        {
          columnId: 'col-7',
          text: '新田伊久士',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/18',
        },
        {
          columnId: 'col-10',
          counter: 1,
        },
        {
          columnId: 'col-11',
          counter: 2,
        },
        {
          columnId: 'col-12',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[顧客情報]チェックインは20時頃あああ',
        },
        {
          columnId: 'col-15',
          badge: {
            color: 'primary',
            type: 'contained',
            label: 'リクエスト',
            width: 'fit-content',
            tooltip: ['[リクエスト]海側'],
          },
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'checked',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-23',
          text: '2022/10/19',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ニッタイクト',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-13',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'primary',
            type: 'outlined',
            label: '宿泊済み',
          },
        },
        {
          columnId: 'col-2',
          text: 'AM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'OTA',
        },
        {
          columnId: 'col-5',
          text: '日帰り',
        },
        {
          columnId: 'col-6',
          text: 'テラオカユキ',
        },
        {
          columnId: 'col-7',
          text: '寺岡由貴',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[予約]朝食未確認',
        },
        {
          columnId: 'col-15',
          badge: {
            color: 'primary',
            type: 'contained',
            label: 'リクエスト',
            width: 'fit-content',
            tooltip: ['[リクエスト]海側'],
          },
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'success',
            type: 'contained',
            label: '済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'checked',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'テラオカユキ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-14',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'primary',
            type: 'outlined',
            label: '宿泊済み',
          },
        },
        {
          columnId: 'col-2',
          text: 'YM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: '法人代行',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-7',
          text: '結城香穂',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[予約]アレルギー項目アーモンド、いくら、キウイフルーツ、くるみ、大豆、バナナ、やまいも',
        },
        {
          columnId: 'col-15',
          badge: {
            color: 'primary',
            type: 'contained',
            label: 'リクエスト',
            width: 'fit-content',
            tooltip: ['[リクエスト]海側'],
          },
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'checked',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-15',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'success',
            type: 'outlined',
            label: '予約確定',
          },
        },
        {
          columnId: 'col-2',
          text: 'GD',
        },
        {
          columnId: 'col-3',
          text: '',
        },
        {
          columnId: 'col-4',
          text: 'TEL',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-7',
          text: '浜本洋一',
        },
        {
          columnId: 'col-8',
          text: '会員',
          subIcon: 'chair',
        },
        {
          columnId: 'col-9',
          text: '2022/10/30',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 5,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-14',
          text: '[顧客情報]親子３代でご利用　畳の部屋をご希望あああ 畳の部屋をご希望あああ',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/20',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-16',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'success',
            type: 'outlined',
            label: '予約確定',
          },
        },
        {
          columnId: 'col-2',
          text: 'YM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: '法人代行',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-7',
          text: '結城香穂',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/29',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[予約]アレルギー項目アーモンド、いくら、キウイフルーツ、くるみ、大豆、バナナ、やまいも',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'success',
            type: 'contained',
            label: '済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-17',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'warning',
            type: 'outlined',
            label: 'カレンダーOP仮',
          },
        },
        {
          columnId: 'col-2',
          text: 'GD',
        },
        {
          columnId: 'col-3',
          text: '',
        },
        {
          columnId: 'col-4',
          text: 'TEL',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-7',
          text: '浜本洋一',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/28',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 5,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '畳の部屋をご希望',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/20',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-18',
      isError: true,
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'error',
            label: 'キャンセル',
          },
        },
        {
          columnId: 'col-2',
          text: 'KA',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'WEB',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ニッタイクト',
        },
        {
          columnId: 'col-7',
          text: '新田伊久士',
        },
        {
          columnId: 'col-8',
          text: 'ビジター',
          subIcon: 'chair',
        },
        {
          columnId: 'col-9',
          text: '2022/10/18',
        },
        {
          columnId: 'col-10',
          counter: 1,
        },
        {
          columnId: 'col-11',
          counter: 2,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[顧客情報]チェックインは20時頃',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'success',
            type: 'contained',
            label: '済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/20',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-19',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'success',
            type: 'outlined',
            label: '予約確定',
          },
        },
        {
          columnId: 'col-2',
          text: 'AM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'OTA',
        },
        {
          columnId: 'col-5',
          text: '日帰り',
        },
        {
          columnId: 'col-6',
          text: 'テラオカユキ',
        },
        {
          columnId: 'col-7',
          text: '寺岡由貴',
        },
        {
          columnId: 'col-8',
          text: 'ビジター',
        },
        {
          columnId: 'col-9',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-14',
          text: '[予約]朝食未確認',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'テラオカユキ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-20',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'success',
            type: 'outlined',
            label: '予約確定',
          },
        },
        {
          columnId: 'col-2',
          text: 'YM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: '法人代行',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-7',
          text: '結城香穂',
        },
        {
          columnId: 'col-8',
          text: '会員',
          subIcon: 'chair',
        },
        {
          columnId: 'col-9',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-13',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-14',
          text: '[予約]アレルギー項目アーモンド、いくら、キウイフルーツ、くるみ、大豆、バナナ、やまいも',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'warning',
            type: 'contained',
            label: '一部済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101, 102, 204', '[未アサイン]あり'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-21',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'warning',
            type: 'outlined',
            label: 'カレンダーOP仮',
          },
        },
        {
          columnId: 'col-2',
          text: 'GD',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'TEL',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-7',
          text: '浜本洋一',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/18',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 5,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[顧客情報]親子３代でご利用　畳の部屋をご希望あああ',
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'primary',
            type: 'contained',
            label: '部屋指定',
            width: 'fit-content',
            tooltip: ['[部屋指定]101'],
          },
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'success',
            type: 'contained',
            label: '済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'checked',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/20',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-22',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'error',
            type: 'outlined',
            label: 'キャンセル待ち',
          },
        },
        {
          columnId: 'col-2',
          text: 'KA',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'WEB',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ニッタイクト',
        },
        {
          columnId: 'col-7',
          text: '新田伊久士',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/18',
        },
        {
          columnId: 'col-10',
          counter: 1,
        },
        {
          columnId: 'col-11',
          counter: 2,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[顧客情報]チェックインは20時頃あああ',
        },
        {
          columnId: 'col-15',
          badge: {
            color: 'primary',
            type: 'contained',
            label: 'リクエスト',
            width: 'fit-content',
            tooltip: ['[リクエスト]海側'],
          },
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'checked',
        },
        {
          columnId: 'col-20',
          icon: 'checked',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ニッタイクト',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-23',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'success',
            type: 'outlined',
            label: '予約確定',
          },
        },
        {
          columnId: 'col-2',
          text: 'AM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'OTA',
        },
        {
          columnId: 'col-5',
          text: '日帰り',
        },
        {
          columnId: 'col-6',
          text: 'テラオカユキ',
        },
        {
          columnId: 'col-7',
          text: '寺岡由貴',
        },
        {
          columnId: 'col-8',
          text: 'ゲスト',
        },
        {
          columnId: 'col-9',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[予約]朝食未確認',
        },
        {
          columnId: 'col-15',
          badge: {
            color: 'primary',
            type: 'contained',
            label: 'リクエスト',
            width: 'fit-content',
            tooltip: ['[リクエスト]海側'],
          },
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'success',
            type: 'contained',
            label: '済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'checked',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'テラオカユキ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-24',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'success',
            type: 'outlined',
            label: '予約確定',
          },
        },
        {
          columnId: 'col-2',
          text: 'YM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: '法人代行',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-7',
          text: '結城香穂',
        },
        {
          columnId: 'col-8',
          text: 'ゲスト',
        },
        {
          columnId: 'col-9',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-14',
          text: '[予約]アレルギー項目アーモンド、いくら、キウイフルーツ、くるみ、大豆、バナナ、やまいも',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-25',
      isError: true,
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'error',
            label: 'キャンセル',
          },
        },
        {
          columnId: 'col-2',
          text: 'GD',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'TEL',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-7',
          text: '浜本洋一',
        },
        {
          columnId: 'col-8',
          text: 'ゲスト',
          subIcon: 'chair',
        },
        {
          columnId: 'col-9',
          text: '2022/10/18',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 5,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-14',
          text: '[顧客情報]親子３代でご利用　畳の部屋をご希望あああ',
        },
        {
          columnId: 'col-15',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'success',
            type: 'contained',
            label: '済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-18',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-19',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/20',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ハマモトヨウイチ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-26',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'primary',
            type: 'outlined',
            label: '宿泊済み',
          },
        },
        {
          columnId: 'col-2',
          text: 'AM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'WEB',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ニッタイクト',
        },
        {
          columnId: 'col-7',
          text: '新田伊久士',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/18',
        },
        {
          columnId: 'col-10',
          counter: 1,
        },
        {
          columnId: 'col-11',
          counter: 2,
        },
        {
          columnId: 'col-12',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[顧客情報]チェックインは20時頃あああ',
        },
        {
          columnId: 'col-15',
          badge: {
            color: 'primary',
            type: 'contained',
            label: 'リクエスト',
            width: 'fit-content',
            tooltip: ['[リクエスト]海側'],
          },
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'checked',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-23',
          text: '2022/10/19',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ニッタイクト',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-27',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'primary',
            type: 'outlined',
            label: '宿泊済み',
          },
        },
        {
          columnId: 'col-2',
          text: 'AM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: 'OTA',
        },
        {
          columnId: 'col-5',
          text: '日帰り',
        },
        {
          columnId: 'col-6',
          text: 'テラオカユキ',
        },
        {
          columnId: 'col-7',
          text: '寺岡由貴',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[予約]朝食未確認',
        },
        {
          columnId: 'col-15',
          badge: {
            color: 'primary',
            type: 'contained',
            label: 'リクエスト',
            width: 'fit-content',
            tooltip: ['[リクエスト]海側'],
          },
        },
        {
          columnId: 'col-16',
          badge: {
            color: 'success',
            type: 'contained',
            label: '済',
            width: 'fit-content',
            tooltip: ['[アサイン済み]101'],
          },
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'checked',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'テラオカユキ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
    {
      id: 'row-28',
      cells: [
        {
          columnId: 'col-1',
          badge: {
            color: 'primary',
            type: 'outlined',
            label: '宿泊済み',
          },
        },
        {
          columnId: 'col-2',
          text: 'YM',
        },
        {
          columnId: 'col-3',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-4',
          text: '法人代行',
        },
        {
          columnId: 'col-5',
          text: '宿泊',
        },
        {
          columnId: 'col-6',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-7',
          text: '結城香穂',
        },
        {
          columnId: 'col-8',
          text: '会員',
        },
        {
          columnId: 'col-9',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10',
          counter: 2,
        },
        {
          columnId: 'col-11',
          counter: 4,
        },
        {
          columnId: 'col-12',
          icon: 'checked',
        },
        {
          columnId: 'col-13',
          icon: 'checked',
        },
        {
          columnId: 'col-14',
          text: '[予約]アレルギー項目アーモンド、いくら、キウイフルーツ、くるみ、大豆、バナナ、やまいも',
        },
        {
          columnId: 'col-15',
          badge: {
            color: 'primary',
            type: 'contained',
            label: 'リクエスト',
            width: 'fit-content',
            tooltip: ['[リクエスト]海側'],
          },
        },
        {
          columnId: 'col-16',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-17',
          icon: 'checked',
        },
        {
          columnId: 'col-18',
          icon: 'checked',
        },
        {
          columnId: 'col-19',
          icon: 'checked',
        },
        {
          columnId: 'col-20',
          icon: 'horizontal_rule',
        },
        {
          columnId: 'col-21',
          text: 'XXXXXXXX',
        },
        {
          columnId: 'col-22',
          text: 'ー',
        },
        {
          columnId: 'col-23',
          text: '2022/10/21',
        },
        {
          columnId: 'col-24',
          text: '予約センター',
        },
        {
          columnId: 'col-25',
          text: 'ユウキカホ',
        },
        {
          columnId: 'col-26',
          referenceButton: true,
        },
      ],
    },
  ],
};
