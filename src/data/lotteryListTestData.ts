export type LotteryList = {
  columns: {
    id: string;
    canSort?: boolean;
    textAlign?: 'left' | 'right' | 'center' | 'justify';
    width?: string;
    label: string;
    rowSpan?: number;
  }[][];
  rows: {
    id: string;
    isError?: boolean;
    cells: {
      columnId: string;
      text?: string;
      referenceButton?: boolean;
      entryButton?: boolean;
      checkbox?: boolean;
      checked?: boolean;
      disabled?: boolean;
    }[];
  }[];
};

export const lotteryList: LotteryList = {
  columns: [
    [
      {
        id: 'col-1',
        width: '72px',
        label: '抽選対象',
        rowSpan: 2,
        textAlign: 'center',
      },
      {
        id: 'col-2',
        width: '144.33px',
        label: '対象外理由',
        rowSpan: 2,
      },
      {
        id: 'col-3',
        width: '120px',
        label: '会員権番号',
        rowSpan: 2,
        canSort: true,
      },
      {
        id: 'col-4',
        width: '144.33px',
        label: '会員名（カナ）',
        rowSpan: 2,
        canSort: true,
      },
      {
        id: 'col-5',
        width: '144.33px',
        label: '会員名（漢字）',
        rowSpan: 2,
      },
      {
        id: 'col-6',
        label: '第1希望',
        width: '116px',
      },
      {
        id: 'col-7',
        width: '94px',
        label: '',
      },
      {
        id: 'col-8',
        label: '第2希望',
        width: '116px',
      },
      {
        id: 'col-9',
        width: '94px',
        label: '',
      },
      {
        id: 'col-10',
        label: '第3希望',
        width: '116px',
      },
      {
        id: 'col-11',
        width: '94px',
        label: '',
      },
      {
        id: 'col-12',
        width: '66px',
        label: '予約受付\n媒体区分',
        rowSpan: 2,
      },
      {
        id: 'col-13',
        width: '116px',
        label: '入会日',
        rowSpan: 2,
      },
      {
        id: 'col-14',
        width: '88px',
        label: '詳細',
        textAlign: 'center',
        rowSpan: 2,
      },
      {
        id: 'col-15',
        width: '129px',
        label: '抽選申込み',
        textAlign: 'center',
        rowSpan: 2,
      },
    ],
    [
      {
        id: 'col-6-1',
        label: '宿泊開始日',
        width: '116px',
      },
      {
        id: 'col-6-2',
        label: '泊数•部屋数',
        width: '116px',
      },
      {
        id: 'col-8-1',
        label: '宿泊開始日',
        width: '116px',
      },
      {
        id: 'col-8-2',
        label: '泊数•部屋数',
        width: '116px',
      },
      {
        id: 'col-10-1',
        label: '宿泊開始日',
        width: '116px',
      },
      {
        id: 'col-10-2',
        label: '泊数•部屋数',
        width: '116px',
      },
    ],
  ],
  rows: [
    {
      id: 'row-1',
      cells: [
        {
          columnId: 'col-1',
          checkbox: true,
          checked: true,
        },
        {
          columnId: 'col-2',
          text: '',
        },
        {
          columnId: 'col-3',
          text: 'HN1234',
        },
        {
          columnId: 'col-4',
          text: 'タナカタロウ',
        },
        {
          columnId: 'col-5',
          text: '田中太郎',
        },
        {
          columnId: 'col-6-1',
          text: '2022/10/19',
        },
        {
          columnId: 'col-6-2',
          text: '2泊1室',
        },
        {
          columnId: 'col-8-1',
          text: '2022/10/19',
        },
        {
          columnId: 'col-8-2',
          text: '2泊1室',
        },
        {
          columnId: 'col-10-1',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10-2',
          text: '2泊1室',
        },
        {
          columnId: 'col-12',
          text: '電話',
        },
        {
          columnId: 'col-13',
          text: '2021/04/10',
        },
        {
          columnId: 'col-14',
          referenceButton: true,
          disabled: false,
        },
        {
          columnId: 'col-15',
          entryButton: true,
          disabled: true,
        },
      ],
    },
    {
      id: 'row-2',
      cells: [
        {
          columnId: 'col-1',
          checkbox: true,
          checked: true,
        },
        {
          columnId: 'col-2',
          text: '',
        },
        {
          columnId: 'col-3',
          text: 'HN7876',
        },
        {
          columnId: 'col-4',
          text: 'オオハラユウコ',
        },
        {
          columnId: 'col-5',
          text: '大原優子',
        },
        {
          columnId: 'col-6-1',
          text: '2022/10/19',
        },
        {
          columnId: 'col-6-2',
          text: '2泊1室',
        },
        {
          columnId: 'col-8-1',
          text: '2022/10/19',
        },
        {
          columnId: 'col-8-2',
          text: '2泊1室',
        },
        {
          columnId: 'col-10-1',
          text: '2022/10/19',
        },
        {
          columnId: 'col-10-2',
          text: '2泊1室',
        },
        {
          columnId: 'col-12',
          text: 'WEB',
        },
        {
          columnId: 'col-13',
          text: '2021/04/10',
        },
        {
          columnId: 'col-14',
          referenceButton: true,
          disabled: false,
        },
        {
          columnId: 'col-15',
          entryButton: true,
          disabled: true,
        },
      ],
    },
    {
      id: 'row-3',
      cells: [
        {
          columnId: 'col-1',
          checkbox: true,
          checked: true,
        },
        {
          columnId: 'col-2',
          text: '',
        },
        {
          columnId: 'col-3',
          text: 'HN6567',
        },
        {
          columnId: 'col-4',
          text: 'キタザワナナ',
        },
        {
          columnId: 'col-5',
          text: '北沢菜々',
        },
        {
          columnId: 'col-6-1',
          text: '',
        },
        {
          columnId: 'col-6-2',
          text: '',
        },
        {
          columnId: 'col-8-1',
          text: '',
        },
        {
          columnId: 'col-8-2',
          text: '',
        },
        {
          columnId: 'col-10-1',
          text: '',
        },
        {
          columnId: 'col-10-2',
          text: '',
        },
        {
          columnId: 'col-12',
          text: '',
        },
        {
          columnId: 'col-13',
          text: '2021/04/10',
        },
        {
          columnId: 'col-14',
          referenceButton: true,
          disabled: true,
        },
        {
          columnId: 'col-15',
          entryButton: true,
          disabled: false,
        },
      ],
    },
    {
      id: 'row-4',
      cells: [
        {
          columnId: 'col-1',
          checkbox: true,
          checked: false,
        },
        {
          columnId: 'col-2',
          text: 'テキストテキスト',
        },
        {
          columnId: 'col-3',
          text: 'HN8655',
        },
        {
          columnId: 'col-4',
          text: 'オオヤマダユウイチロウ',
        },
        {
          columnId: 'col-5',
          text: '大山田雄一郎',
        },
        {
          columnId: 'col-6-1',
          text: '',
        },
        {
          columnId: 'col-6-2',
          text: '',
        },
        {
          columnId: 'col-8-1',
          text: '',
        },
        {
          columnId: 'col-8-2',
          text: '',
        },
        {
          columnId: 'col-10-1',
          text: '',
        },
        {
          columnId: 'col-10-2',
          text: '',
        },
        {
          columnId: 'col-12',
          text: '',
        },
        {
          columnId: 'col-13',
          text: '2021/04/10',
        },
        {
          columnId: 'col-14',
          referenceButton: true,
          disabled: true,
        },
        {
          columnId: 'col-15',
          entryButton: true,
          disabled: true,
        },
      ],
    },
  ],
};
