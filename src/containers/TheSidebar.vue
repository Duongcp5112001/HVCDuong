<template>
  <header class="lay-header">
    <Header>
      <img :src="logo"/>
      <Badge color="neutral" size="small">予約システム</Badge>
      <template #rightControl>
        <HeaderNotification :counter="99"/>
      </template>
    </Header>
  </header>
  <nav class="lay-nav">
    <Drawer selected-id="drawer-item-body-5" @click-item="onClickDrawerItem">
      <template #body>
        <DrawerItemSidebar v-for="(item, index) in nav.body" :key="index"
                           :class="item.listPath.includes(route.name) ? 'drawer-item--selected' : 'drawer-item--narrow'"
                           :id="'drawer-item-body-' + index" :icon="item.icon" :is-subtitle="item.subtitle"
                           @click="clickDrawerItem(item.to)"
        >{{ item.name }}
        </DrawerItemSidebar>
      </template>
      <template #footer>
        <DrawerItemSidebar v-for="(item, index) in nav.footer" :key="index"
                           :class="route.name !== item.to ? 'drawer-item--narrow' : 'drawer-item--selected'"
                           :id="'drawer-item-footer-' + index" :icon="item.icon" :is-subtitle="item.subtitle"
        >
          {{ item.name }}
        </DrawerItemSidebar>
      </template>
    </Drawer>
  </nav>
</template>

<script setup lang="ts">
import Header from '@components/Header/Header.vue';
import Drawer from '@/components/Drawer/Drawer.vue';
import nav from "@/containers/_nav";
import router from "@/router";
import {ref} from "vue";
import DrawerItemSidebar from "@pages/Drawer/DrawerItemSidebar.vue";
import HeaderNotification from "@components/HeaderNotification/HeaderNotification.vue";
import Badge from "@components/Badge/Badge.vue";
import logo from "@/assets/logo.svg"
import {useRoute} from 'vue-router';

const drawerItemSelected = ref('');

const onClickDrawerItem = (id: string) => {
  drawerItemSelected.value = id
  console.log('clicked drawer item: ', id);
};
const clickDrawerItem = (name: string) => {
  if (name)
    router.push({name: name})
};
const route = useRoute()

</script>

<style scoped lang="scss">
@media only screen and (max-width: 1680px) {
  .stretch-on-small-screen {
    width: 100%;
  }
}
</style>