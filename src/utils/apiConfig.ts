import {Configuration as ConfigurationCrsCrm} from '../openapi/crm/configuration'
import {Configuration as ConfigurationCrsFront} from '../openapi/crm/configuration'
import {Configuration as ConfigurationCrsIam} from '../openapi/iam/configuration'
import {Configuration as ConfigurationCrsMembership} from '../openapi/membership/configuration'
import {Configuration as ConfigurationCrsSysadmin} from '../openapi/sysadmin/configuration'

export function getConfigCrsCrm (token = undefined) {
    return new ConfigurationCrsCrm({
        basePath: `${import.meta.env.VITE_API_BASE_PATH_CRS_CRM}`,
        apiKey: import.meta.env.VITE_API_KEY_CRS_CRM,
        authorizationToken: token
    })
}
export function getConfigCrsFront (token = undefined) {
    return new ConfigurationCrsFront({
        basePath: `${import.meta.env.VITE_API_BASE_PATH_CRS_FRONT}`,
        apiKey: import.meta.env.VITE_API_KEY_CRS_FRONT,
        authorizationToken: token
    })
}
export function getConfigCrsIam (token = undefined) {
    return new ConfigurationCrsIam({
        basePath: `${import.meta.env.VITE_API_BASE_PATH_CRS_IAM}`,
        apiKey: import.meta.env.VITE_API_KEY_CRS_IAM,
        authorizationToken: token
    })
}export function getConfigCrsMembership (token = undefined) {
    return new ConfigurationCrsMembership({
        basePath: `${import.meta.env.VITE_API_BASE_PATH_CRS_MEMBERSHIP}`,
        apiKey: import.meta.env.VITE_API_KEY_CRS_MEMBERSHIP,
        authorizationToken: token
    })
}
export function getConfigCrsSysadmin (token = undefined) {
    return new ConfigurationCrsSysadmin({
        basePath: `${import.meta.env.VITE_API_BASE_PATH_CRS_SYSADMIN}`,
        apiKey: import.meta.env.VITE_API_KEY_CRS_SYSADMIN,
        authorizationToken: token
    })
}
