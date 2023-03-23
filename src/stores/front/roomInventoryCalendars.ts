import { defineStore } from 'pinia'
import {getConfigCrsFront} from '@utils/apiConfig'
import {
    RoomInventoriesApiListRoomInventoryCalendarsRequest,
    RoomInventoriesApi,
    RoomInventoryCalendar, RoomInventoryCalendarItemTypeHotel
} from "@openapi/front/api";
import {setLoading} from "@stores/utils/loading";

const api = new RoomInventoriesApi(getConfigCrsFront())

export const useRoomInventoryCalendarsStore = defineStore('RoomInventoryCalendars', {
    state: () => {
        return {
            data: [] as RoomInventoryCalendar[] | undefined,
            error: null
        }
    },
    getters:{
        newListDateCalendarGetter(state): { date: Date; disabled: boolean | undefined; }[] | undefined {
            const listDateCalendar = state.data?.[0].dates;
            const newListDateCalendar = listDateCalendar?.map((item) => {
                return {
                    date: new Date(item.date || ''),
                    disabled: item.is_holiday
                }
            });
            return newListDateCalendar;
        },
    },
    actions:{
        fetch(params: RoomInventoriesApiListRoomInventoryCalendarsRequest){
            return new Promise((resolve, reject)=>{
                api.listRoomInventoryCalendars(params).then((res) => {
                    this.data = res.data.room_inventories
                    resolve(res.data.room_inventories)
                }).catch(err => {
                    console.log("RoomInventoryCalendars status=NG", err);
                }).finally(() => setLoading(false))
            })
        }
    }
})