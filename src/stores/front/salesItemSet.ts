import { defineStore } from 'pinia'
import { getConfigCrsFront } from '@utils/apiConfig'
import {SalesItemSetListItem, SalesItemSetsApi} from '@openapi/front/api'
import { SalesItemSetsApiListSalesItemSetsRequest } from "@openapi/front/api"
import {setLoading} from "@stores/utils/loading";
const api = new SalesItemSetsApi(getConfigCrsFront())

export const useSalesItemSet = defineStore('salesItemSet', {
    state: () => {
        return {
            data: [] as  SalesItemSetListItem[] | undefined,
            error:null,
        }
    },
    getters: {},
    actions: {
        async fetch(apiParams: SalesItemSetsApiListSalesItemSetsRequest) {
            return new Promise((resolve, reject) => {
                setLoading(true)
                api.listSalesItemSets(apiParams).then((res) => {
                    this.data = res.data.sales_item_sets
                    console.log("Sales Item Sets status = OK")
                    resolve(res.data)
                }).catch(err => {
                    console.log("Sales Item Sets status = NG", err);
                    reject(err)
                }).finally(() => setLoading(false))
            });
        },
    },
})
