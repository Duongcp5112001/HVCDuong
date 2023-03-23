import { defineStore } from 'pinia'
import { getConfigCrsMembership } from "@utils/apiConfig";
import {MembershipHotelReservationsApiCreateMembershipHotelReservationRequest, MembershipHotelReservationsApi} from '@openapi/membership'
const api = new MembershipHotelReservationsApi(getConfigCrsMembership())
import {setLoading} from "@stores/utils/loading";

export const useMembershipReservationsStore = defineStore('membership-reservations', {
    state: () => {
        return {
            data: null as any,
            error:null,
        }
    },
    getters:{},
    actions: {
        postMembershipReservations(apiParams: MembershipHotelReservationsApiCreateMembershipHotelReservationRequest){
            return new Promise((resolve, reject)=>{
                setLoading(true)
                api.createMembershipHotelReservation(apiParams).then((res) => {
                    this.data = res.data.reservation
                    resolve(res.data)
                }).catch(err => {
                    this.error = err
                    reject(err)
                }).finally(()=> setLoading(false))
            })
        },
    },
})