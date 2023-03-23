import {defineStore} from "pinia";

export const useLoadingStore = defineStore('loading',{
    state:()=>{
        return {
            loading: false
        }
    }
})

export const setLoading = (params: boolean ) =>{
    const useLoading = useLoadingStore()
    useLoading.loading = params
}