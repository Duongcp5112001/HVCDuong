import { defineStore } from 'pinia'
import {getConfigCrsFront} from '@utils/apiConfig'
import {
    ReservationsApi,
    Reservation,
    ReservationsApiCreateReservationRequest,
    ReservationsApiGetReservationRequest,
    ReservationsApiCreateReservationCancelRequest,
    ReservationsApiUpdateReservationRequest
} from '@openapi/front/api'
import {setLoading} from "@stores/utils/loading";
const api = new ReservationsApi(getConfigCrsFront())


export const useReservationsStore = defineStore('reservations', {
    state: ()=>{
        return{
            data: null as any,
            error: null
        }
    },
    getters: {},
    actions: {
        async fetch(params: ReservationsApiGetReservationRequest) {
            return new Promise((resolve, reject) => {
                setLoading(true)
                api.getReservation(params).then((res) => {
                    this.data = res.data.reservation
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                }).finally(() => setLoading(false))
            });
        },
        postReservations(apiParams: ReservationsApiCreateReservationRequest){
            return new Promise((resolve, reject)=>{
                setLoading(true)
                api.createReservation(apiParams).then((res) => {
                    this.data = res.data.reservation
                    resolve(res.data)
                }).catch(err => {
                    this.error = err
                    reject(err)
                }).finally(() => setLoading(false))
            })
        },
        cancelReservations(apiParams: ReservationsApiCreateReservationCancelRequest){
            return new Promise((resolve, reject) => {
                setLoading(true)
                api.createReservationCancel(apiParams).then(res => {
                    resolve(res.data)
                }).catch(err => {
                    this.error = err
                    reject(err)
                }).finally(()=> setLoading(false))
            })
        },
        updateReservations(apiParams: ReservationsApiUpdateReservationRequest){
            return new Promise((resolve, reject)=>{
                setLoading(true)
                api.updateReservation(apiParams).then((res) => {
                    this.data = res.data.reservation
                    resolve(res.data)
                }).catch(err => {
                    this.error = err
                    reject(err)
                }).finally(() => setLoading(false))
            })
        }

    },
})