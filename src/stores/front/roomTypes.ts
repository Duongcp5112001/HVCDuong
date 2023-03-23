import { defineStore } from 'pinia'
import {getConfigCrsFront} from '@utils/apiConfig'
import { RoomTypesApi, RoomTypesApiListRoomTypesRequest, RoomType } from '@openapi/front/api'
import {setLoading} from "@stores/utils/loading";
const api = new RoomTypesApi(getConfigCrsFront())

export const useRoomsTypesStore = defineStore('roomTypes', {
    state: () => {
        return {
            data: [] as RoomType[] | undefined,
            error:null,
        }
    },
    getters:{
    },
    actions: {
        fetch(apiParams: RoomTypesApiListRoomTypesRequest) {
            return new Promise((resolve, reject) => {
                setLoading(true)
                api.listRoomTypes(apiParams).then((res) => {
                    this.data = res.data.room_types
                    resolve(res.data)
                }).catch(err => {
                    this.error = err
                    reject(err)
                }).finally(() => setLoading(false))
            });
        },
    },
})