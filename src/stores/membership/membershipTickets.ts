import { defineStore } from 'pinia'
import { getConfigCrsMembership } from "@utils/apiConfig";
import {
    MembershipTicketSummary,
    MemberShipTicketsApi,
    MemberShipTicketsApiListMembershipCustomerTicketsRequest
} from '@openapi/membership'
import {setLoading} from "@stores/utils/loading";
const api = new MemberShipTicketsApi(getConfigCrsMembership())

export const useMembershipTicketStore = defineStore('membership-tickets', {
    state: () => {
        return {
            data: [] as Array<MembershipTicketSummary>  | undefined,
            error:null,
        }
    },
    getters:{

    },
    actions: {
        fetch(apiParam: MemberShipTicketsApiListMembershipCustomerTicketsRequest) {
            return new Promise((resolve, reject) => {
                api.listMembershipCustomerTickets(apiParam)
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