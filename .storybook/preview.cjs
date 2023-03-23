import '../src/scss/index.scss';
import { app } from '@storybook/vue3';
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

app.use(VCalendar);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
