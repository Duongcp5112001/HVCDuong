export const ancillaryFacillitiesSampleData = () => {
  const categories = [
    {
      id: 'cat-1',
      label: 'テニスコート',
      information: 'テニスコート、テニスコート、テニスコート',
      daysSchedule: [
        {
          startHour: 0,
          endHour: 24,
          scheduled: [],
        },
        {
          startHour: 0,
          endHour: 24,
          scheduled: [],
        },
      ],
      subCategories: [
        {
          id: 'sub-cat-1-1',
          label: 'テニスコートA',
          information: '',
          daysSchedule: [
            {
              startHour: 9,
              endHour: 19,
              scheduled: [
                {
                  id: 'reservation-1',
                  label: '奥谷 智啓',
                  startHour: 17,
                  endHour: 19,
                },
              ],
            },
            {
              startHour: 9,
              endHour: 19,
              scheduled: [
                {
                  id: 'reservation-1-2',
                  label: '奥谷 智啓',
                  startHour: 17,
                  endHour: 19,
                },
              ],
            },
          ],
        },
        {
          id: 'sub-cat-1-2',
          label: 'テニスコートB',
          information: '',
          daysSchedule: [
            {
              startHour: 9,
              endHour: 19,
              scheduled: [
                {
                  id: 'reservation-2',
                  label: '小野 美知子',
                  startHour: 10.5,
                  endHour: 15,
                },
              ],
            },
            {
              startHour: 9,
              endHour: 19,
              scheduled: [
                {
                  id: 'reservation-2-2',
                  label: '小野 美知子',
                  startHour: 10.5,
                  endHour: 15,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'cat-2',
      label: 'カラオケルーム',
      information: 'カラオケルーム、カラオケルーム、カラオケルーム',
      daysSchedule: [
        {
          startHour: 0,
          endHour: 24,
          scheduled: [],
        },
        {
          startHour: 0,
          endHour: 24,
          scheduled: [],
        },
      ],
      subCategories: [
        {
          id: 'sub-cat-2-1',
          label: 'カラオケルーム1',
          information: 'カラオケルーム1、カラオケルーム1、カラオケルーム1',
          daysSchedule: [
            {
              startHour: 11,
              endHour: 24,
              scheduled: [
                {
                  id: 'reservation-3',
                  label: '福田 治美',
                  startHour: 19,
                  endHour: 23.5,
                },
              ],
            },
            {
              startHour: 11,
              endHour: 24,
              scheduled: [
                {
                  id: 'reservation-3-2',
                  label: '福田 治美',
                  startHour: 19,
                  endHour: 23.5,
                },
              ],
            },
          ],
        },
        {
          id: 'sub-cat-2-2',
          label: 'カラオケルーム2',
          information: 'カラオケルーム2、カラオケルーム2、カラオケルーム2',
          daysSchedule: [
            {
              startHour: 11,
              endHour: 24,
              scheduled: [],
            },
            {
              startHour: 11,
              endHour: 24,
              scheduled: [],
            },
          ],
        },
        {
          id: 'sub-cat-2-3',
          label: 'カラオケルーム3',
          information: 'カラオケルーム3、カラオケルーム3、カラオケルーム3',
          daysSchedule: [
            {
              startHour: 11,
              endHour: 24,
              scheduled: [],
            },
            {
              startHour: 11,
              endHour: 24,
              scheduled: [],
            },
          ],
        },
      ],
    },
    {
      id: 'cat-3',
      label: 'ペットケージ（大型1）',
      information:
        'ペットケージ（大型1）,ペットケージ（大型1）,ペットケージ（大型1）',
      daysSchedule: [
        {
          startHour: 0,
          endHour: 24,
          scheduled: [],
        },
        {
          startHour: 0,
          endHour: 24,
          scheduled: [],
        },
      ],
      subCategories: [],
    },
    {
      id: 'cat-4',
      label: 'ペットケージ（大型2）',
      information:
        'ペットケージ（大型2）,ペットケージ（大型2）,ペットケージ（大型2）',
      daysSchedule: [
        {
          startHour: 0,
          endHour: 24,
          scheduled: [
            {
              id: 'reservation-4',
              label: '杉原 俊彦',
              startHour: 0,
              endHour: 24,
            },
          ],
        },
        {
          startHour: 0,
          endHour: 24,
          scheduled: [
            {
              id: 'reservation-5',
              label: '杉原 俊彦',
              startHour: 0,
              endHour: 24,
            },
          ],
        },
      ],
      subCategories: [],
    },
    {
      id: 'cat-5',
      label: 'ペットケージ（大型3）',
      information:
        'ペットケージ（大型3）,ペットケージ（大型3）,ペットケージ（大型3）',
      daysSchedule: [
        {
          startHour: 0,
          endHour: 24,
          scheduled: [],
        },
        {
          startHour: 0,
          endHour: 24,
          scheduled: [],
        },
      ],
      subCategories: [],
    },
  ];

  return categories;
};
