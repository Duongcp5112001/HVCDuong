import { defineStore } from 'pinia'
import { getConfigCrsFront } from '@utils/apiConfig'
import { ProvisionItemsApi, ProvisionItem } from '@openapi/front/api'
import { ProvisionItemsApiListProvisionItemsRequest } from "@openapi/front/api"
import {setLoading} from "@stores/utils/loading";
const api = new ProvisionItemsApi(getConfigCrsFront())

export const useProvisionItems = defineStore('provisionItems', {
    state: () => {
        return {
            data: [] as  ProvisionItem[] | undefined,
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
                    console.log("Provision Items status = OK")
                    resolve(res.data)
                }).catch(err => {
                    console.log("Provision Items status = NG", err);
                    reject(err)
                }).finally(() => setLoading(false))
            });
        },
    },
})