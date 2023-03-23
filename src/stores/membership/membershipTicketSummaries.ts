import { defineStore } from 'pinia'
import { getConfigCrsMembership } from "@utils/apiConfig";
import {
    MembershipTicketSummary,
    MembershipTicketSummariesApi,
    MembershipTicketSummariesApiListMembershipCustomerTicketSummariesRequest
} from '@openapi/membership'
import {setLoading} from "@stores/utils/loading";
const api = new MembershipTicketSummariesApi(getConfigCrsMembership())

export const useMembershipTicketSummariesStore = defineStore('membership-ticket-summaries', {
    state: () => {
        return {
            data: [] as Array<MembershipTicketSummary>  | undefined,
            error:null,
        }
    },
    getters:{
        home_mutual: (state) => {
            let home_count = 0;
            let number_home_available = 0;
            let number_mutual_available =0;
            let hotel_name : any  = [];
            state.data?.forEach((item: any) => {
                if(item.ticket_types[0].ticket_type_id === "1"){
                    home_count++;
                    number_home_available += item.ticket_types[0].number_available;
                    hotel_name.push({
                        name: item.hotel_name + `(${item.ticket_types[0].number_available})`,
                    });
                }else number_mutual_available += item.ticket_types[0].number_available;
            })
            return {
                home_count,
                number_home_available,
                number_mutual_available,
                hotel_name: hotel_name
            }
        },
        get_home_mutual_name: (state) => {
            return (hotel_right_id: string) =>  state.data?.filter(item => item.hotel_right_id === hotel_right_id)[0].ticket_types;
        },
    },
    actions: {
        fetch(apiParam: MembershipTicketSummariesApiListMembershipCustomerTicketSummariesRequest) {
            return new Promise((resolve, reject) => {
                api.listMembershipCustomerTicketSummaries(apiParam)
                    .then(res => {
                        this.data = res.data.membership_ticket_summaries
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