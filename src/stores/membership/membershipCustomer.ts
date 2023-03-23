import { defineStore } from 'pinia'
import { getConfigCrsMembership } from "@utils/apiConfig";
import {
    MembershipCustomersApi,
    MembershipCustomersApiListMembershipCustomersRequest,MembershipCustomerListItem
} from '@openapi/membership'
import {setLoading} from "@stores/utils/loading";
const api = new MembershipCustomersApi(getConfigCrsMembership())

export const useMembershipCustomersStore = defineStore('membership-customers', {
    state: () => {
        return {
            data: [] as MembershipCustomerListItem[] | undefined,
            customerInfo: {} as any,
            error:null,
        }
    },
    getters:{
    },
    actions: {
        fetch(apiParam: MembershipCustomersApiListMembershipCustomersRequest) {
            return new Promise((resolve, reject) => {
                setLoading(true)
                api.listMembershipCustomers(apiParam)
                    .then(res => {
                        this.data = res.data.membership_customer_list_items
                        resolve(res.data)
                    })
                    .catch(err => {
                        this.error = err
                        reject(err)
                    })
                    .finally(() => setLoading(false))
            });
        },
        selectedCustomer(param: {}){
            this.customerInfo = JSON.parse(JSON.stringify(param));
        }
    },
})