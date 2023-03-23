import { defineStore } from 'pinia'
import { getConfigCrsMembership } from "@utils/apiConfig";
import {
    MembershipHotel, MembershipHotelsApi, MembershipHotelsApiListMembershipHotelsRequest
} from '@openapi/membership'
import {setLoading} from "@stores/utils/loading";
const api = new MembershipHotelsApi(getConfigCrsMembership())

export const useMembershipHotelsStore = defineStore('membership-hotels', {
    state: () => {
        return {
            data: [] as Array<MembershipHotel>  | undefined,
            selectedHotel: {} as any,
            error:null,
        }
    },
    getters:{

    },
    actions: {
        fetch(apiParam: MembershipHotelsApiListMembershipHotelsRequest) {
            return new Promise((resolve, reject) => {
                api.listMembershipHotels(apiParam)
                    .then(res => {
                        this.data = res.data.membership_hotels
                        resolve(res.data)
                    })
                    .catch(err => {
                        this.error = err
                        reject(err)
                    })
                    .finally(() => setLoading(false))
            });
        },
        selectHotel(hotelId: string){
            this.selectedHotel = this.data?.find(hotel => hotel.hotel_id === hotelId)
        }
    },
})