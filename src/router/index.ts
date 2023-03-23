import { createWebHistory, createRouter } from 'vue-router';
import Menu from '@pages/Menu.vue';
import customerSearch from '@pages/customerSearch.vue';
import reservationRegist from '@pages/reservationRegist.vue';
import customerSearchResult from '@pages/customerSearchResult.vue';
import customerSearchNoResult from '@pages/customerSearchNoResult.vue';
import Dialog01 from '@pages/Dialog01.vue';
import Dialog02 from '@pages/Dialog02.vue';
import Dialog03 from '@pages/Dialog03.vue';
import C021A_Vacancies from '@pages/C021A_Vacancies.vue';
import C021A_Vacancies_2 from '../pages/C021A_Vacancies_2.vue';
import C021B_Vacancies from '@pages/C021B_Vacancies.vue';
import C021C_Vacancies from '@pages/C021C_Vacancies.vue';
import C03A from '@pages/C03A.vue';
import C03B from '@pages/C03B.vue';
import C041A from '@pages/C041A.vue';
import Dialog26_WITH from '../pages/Dialog26_WITH.vue';
import E01 from '@pages/E01.vue'
import customerSearch_2 from '@pages/customerSearch_2.vue';
import C012Cb from '@pages/C012Cb.vue';
import C012Eb from '@pages/C012Eb.vue';
import customerSearchResult_2 from '@pages/customerSearchResult_2.vue';
import reservationRegistMember from '@pages/reservationRegistMember.vue';
import C012Db from '@pages/C012Db.vue';
import G01A from '../pages/G01A.vue';
import G01B from '../pages/G01B.vue';
import G01C from '../pages/G01C.vue';
import Dialog01b from '@pages/Dialog01b.vue';
import Dialog01b_2 from '@pages/Dialog01b_2.vue';
import Dialog02b from '@pages/Dialog02b.vue';
import Dialog03b from '@pages/Dialog03b.vue';
import Dialog08 from '@pages/Dialog08.vue';
import Dialog08_2 from '@pages/Dialog08_2.vue';
import Dialog18 from '@pages/Dialog18.vue';
import Dialog17 from '@pages/Dialog17.vue';
import Dialog21 from '@pages/Dialog21.vue';
import Dialog20 from '@pages/Dialog20.vue';
import Dialog19 from '@pages/Dialog19.vue';
import Dialog11 from '@pages/Dialog11.vue';
import Dialog09 from '@pages/Dialog09.vue';
import Dialog16 from '@pages/Dialog16.vue';
import Dialog22 from '@pages/Dialog22.vue';
import Dialog23 from '@pages/Dialog23.vue';
import Dialog24 from '@pages/Dialog24.vue';
import Dialog25 from '@pages/Dialog25.vue';
import Dialog27 from '@pages/Dialog27.vue';
import Dialog28 from '@pages/Dialog28.vue';
import Dialog29 from '@pages/Dialog29.vue';
import Dialog30 from '@pages/Dialog30.vue';
import Dialog31 from '@pages/Dialog31.vue';
import Popover01 from '@pages/Popover01.vue';

import K01 from '@pages/K01.vue';
import Block2weeks from '@pages/Block2weeks.vue';
import Block30days from '@pages/Block30days.vue';
import D01Dialog01 from '@pages/D01Dialog01.vue';
import D01Dialog02 from '@pages/D01Dialog02.vue';
import D04Dialog01 from '@pages/D04Dialog01.vue';
import D04Dialog02 from '@pages/D04Dialog02.vue';
import D04Dialog03 from '@pages/D04Dialog03.vue';
import D04Dialog04 from '@pages/D04Dialog04.vue';
import D04Dialog05 from '@pages/D04Dialog05.vue';

import AncillaryFacilitiesTestPage from '@pages/AncillaryFacilitiesTestPage.vue';
import L01 from '@pages/L01.vue';

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/customerSearch',
    name: 'customerSearch',
    component: customerSearch,
  },
  {
    path: '/reservationRegist',
    name: 'reservationRegist',
    component: reservationRegist,
  },
  {
    path: '/customerSearchResult',
    name: 'customerSearchResult',
    component: customerSearchResult,
  },
  {
    path: '/customerSearchNoResult',
    name: 'customerSearchNoResult',
    component: customerSearchNoResult,
  },
  {
    path: '/Dialog01',
    name: 'Dialog01',
    component: Dialog01,
  },
  {
    path: '/Dialog02',
    name: 'Dialog02',
    component: Dialog02,
  },
  {
    path: '/Dialog03',
    name: 'Dialog03',
    component: Dialog03,
  },
  {
    path: '/C021A_Vacancies',
    name: 'C021A_Vacancies',
    component: C021A_Vacancies,
  },
  {
    path: '/C021A_Vacancies_2',
    name: 'C021A_Vacancies_2',
    component: C021A_Vacancies_2,
  },
  {
    path: '/C021B_Vacancies',
    nBme: 'C021B_Vacancies',
    component: C021B_Vacancies,
  },
  {
    path: '/C021C_Vacancies',
    name: 'C021C_Vacancies',
    component: C021C_Vacancies,
  },
  {
    path: '/C03A',
    name: 'C03A',
    component: C03A,
  },
  {
    path: '/E01',
    name: 'E01',
    component: E01,
  },
  {
    path: '/C03B',
    name: 'C03B',
    component: C03B,
  },
  {
    path: '/C041A',
    name: 'C041A',
    component: C041A,
  },
  {
    path: '/Dialog26_WITH',
    name: 'Dialog26_WITH',
    component: Dialog26_WITH,
  },
  {
    path: '/customerSearch_2',
    name: 'customerSearch_2',
    component: customerSearch_2,
  },
  {
    path: '/C012Cb',
    name: 'C012Cb',
    component: C012Cb,
  },
  {
    path: '/C012Eb',
    name: 'C012Eb',
    component: C012Eb,
  },
  {
    path: '/customerSearchResult_2',
    name: 'customerSearchResult_2',
    component: customerSearchResult_2,
  },
  {
    path: '/reservationRegistMember',
    name: 'reservationRegistMember',
    component: reservationRegistMember,
  },
  {
    path: '/C012Db',
    name: 'C012Db',
    component: C012Db,
  },
  {
    path: '/G01A',
    name: 'G01A',
    component: G01A,
  },
  {
    path: '/G01B',
    name: 'G01B',
    component: G01B,
  },
  {
    path: '/G01C',
    name: 'G01C',
    component: G01C,
  },
  {
    path: '/Dialog01b',
    name: 'Dialog01b',
    component: Dialog01b,
  },
  {
    path: '/Dialog01b_2',
    name: 'Dialog01b_2',
    component: Dialog01b_2,
  },
  {
    path: '/Dialog02b',
    name: 'Dialog02b',
    component: Dialog02b,
  },
  {
    path: '/Dialog03b',
    name: 'Dialog03b',
    component: Dialog03b,
  },
  {
    path: '/Dialog08',
    name: 'Dialog08',
    component: Dialog08,
  },
  {
    path: '/Dialog08_2',
    name: 'Dialog08_2',
    component: Dialog08_2,
  },
  {
    path: '/Dialog18',
    name: 'Dialog18',
    component: Dialog18,
  },
  {
    path: '/Dialog17',
    name: 'Dialog17',
    component: Dialog17,
  },
  {
    path: '/Dialog21',
    name: 'Dialog21',
    component: Dialog21,
  },
  {
    path: '/Dialog20',
    name: 'Dialog20',
    component: Dialog20,
  },
  {
    path: '/Dialog19',
    name: 'Dialog19',
    component: Dialog19,
  },
  {
    path: '/Dialog11',
    name: 'Dialog11',
    component: Dialog11,
  },
  {
    path: '/Dialog09',
    name: 'Dialog09',
    component: Dialog09,
  },
  {
    path: '/Dialog16',
    name: 'Dialog16',
    component: Dialog16,
  },
  {
    path: '/Dialog22',
    name: 'Dialog22',
    component: Dialog22,
  },
  {
    path: '/Dialog23',
    name: 'Dialog23',
    component: Dialog23,
  },
  {
    path: '/Dialog24',
    name: 'Dialog24',
    component: Dialog24,
  },
  {
    path: '/Dialog25',
    name: 'Dialog25',
    component: Dialog25,
  },
  {
    path: '/Dialog27',
    name: 'Dialog27',
    component: Dialog27,
  },
  {
    path: '/Dialog28',
    name: 'Dialog28',
    component: Dialog28,
  },
  {
    path: '/Dialog29',
    name: 'Dialog29',
    component: Dialog29,
  },
  {
    path: '/Dialog30',
    name: 'Dialog30',
    component: Dialog30,
  },
  {
    path: '/Dialog31',
    name: 'Dialog31',
    component: Dialog31,
  },
  {
    path: '/Popover01',
    name: 'Popover01',
    component: Popover01,
  },
  {
    path: '/AncillaryFacilitiesTestPage',
    name: 'AncillaryFacilitiesTestPage',
    component: AncillaryFacilitiesTestPage,
  },
  {
    path: '/K01',
    name: 'K01',
    component: K01,
  },
  {
    path: '/Block2weeks',
    name: 'Block2weeks',
    component: Block2weeks,
  },
  {
    path: '/Block30days',
    name: 'Block30days',
    component: Block30days,
  },
  {
    path: '/D01Dialog01',
    name: 'D01Dialog01',
    component: D01Dialog01,
  },
  {
    path: '/D01Dialog02',
    name: 'D01Dialog02',
    component: D01Dialog02,
  },
  {
    path: '/L01',
    name: 'L01',
    component: L01,
  },
  {
    path: '/D04Dialog01',
    name: 'D04Dialog01',
    component: D04Dialog01,
  },
  {
    path: '/D04Dialog02',
    name: 'D04Dialog02',
    component: D04Dialog02,
  },
  {
    path: '/D04Dialog03',
    name: 'D04Dialog03',
    component: D04Dialog03,
  },
  {
    path: '/D04Dialog04',
    name: 'D04Dialog04',
    component: D04Dialog04,
  },
  {
    path: '/D04Dialog05',
    name: 'D04Dialog05',
    component: D04Dialog05,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
