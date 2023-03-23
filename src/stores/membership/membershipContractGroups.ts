import { defineStore } from 'pinia'
import { getConfigCrsMembership } from "@utils/apiConfig";
import {
    MembershipContractGroups,
    MembershipContractGroupsApi,
    MembershipContractGroupsApiListMembershipCustomerContractGroupsRequest
} from '@openapi/membership'
import {setLoading} from "@stores/utils/loading";
const api = new MembershipContractGroupsApi(getConfigCrsMembership())

export const useMembershipContractGroupsStore = defineStore('membership-contract-group', {
    state: () => {
        return {
            data: [] as Array<MembershipContractGroups>  | undefined,
            error:null,
        }
    },
    getters:{

    },
    actions: {
        fetch(apiParam: MembershipContractGroupsApiListMembershipCustomerContractGroupsRequest) {
            return new Promise((resolve, reject) => {
                api.listMembershipCustomerContractGroups(apiParam)
                    .then(res => {
                        this.data = res.data.groups
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