import {defineStore} from 'pinia'
import {getConfigCrsSysadmin} from '../../utils/apiConfig'
import {Hotel, HotelsApi, HotelsApiListHotelsRequest} from '@openapi/sysadmin'
import {setLoading} from "@stores/utils/loading";

const api = new HotelsApi(getConfigCrsSysadmin())

export const useHotelsStore = defineStore('hotels', {
    state: () => {
        return {
            data: [] as Array<Hotel>  | undefined,
            selectedHotel: {} as any,
            error:null,
        }
    },
    getters:{
        filterCustomers: state => ''
    },
    actions: {
        async fetch(apiParam: HotelsApiListHotelsRequest) {
            return new Promise((resolve, reject) => {
                api.listHotels(apiParam)
                    .then(res => {
                        this.data = res.data.hotels
                        resolve(res.data)
                })
                    .catch(err => {
                        this.error = err
                        reject(err)
                    })
                    .finally(() => setLoading(false))
            });
        },
    },
})