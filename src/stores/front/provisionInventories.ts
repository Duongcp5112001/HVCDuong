import { defineStore } from 'pinia'
import { getConfigCrsFront } from '@utils/apiConfig'
import { ProvisionItemsApi,  ExtraServiceItemGroup } from '@openapi/front/api'
import { ProvisionItemsApiListProvisionItemsRequest } from "@openapi/front/api"
import {setLoading} from "@stores/utils/loading";
const api = new ProvisionItemsApi(getConfigCrsFront())

export const useProvisionInventories = defineStore('provisionInventories', {
    state: () => {
        return {
            data: [] as  ExtraServiceItemGroup[] | undefined,
            error:null,
        }
    },
    getters: {},
    actions: {
        async fetch(apiParams: ProvisionItemsApiListProvisionItemsRequest) {
            return new Promise((resolve, reject) => {
                setLoading(true)
                api.listProvisionItems(apiParams).then((res) => {
                    this.data = res.data.provision_items
                    console.log("Provision Inventories status = OK")
                    resolve(res.data)
                }).catch(err => {
                    console.log("Provision Inventories status = NG", err);
                    reject(err)
                }).finally(() => setLoading(false))
            });
        },
    },
})