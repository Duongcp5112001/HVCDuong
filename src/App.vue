<template>
  <Loading :show="loading"/>
  <router-view />
</template>
<script setup lang="ts">
import Loading from "@components/Loading/Loading.vue";
import {useLoadingStore} from "@stores/utils/loading";
import {storeToRefs} from "pinia";
const loadingStore = useLoadingStore()
const {loading: loading} = storeToRefs(loadingStore)
</script>