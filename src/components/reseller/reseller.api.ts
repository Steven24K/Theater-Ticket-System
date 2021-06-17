
        import { API_VERSION, ORIGIN } from "../../constants";
import { reseller } from "../../models/reseller";
import { HttpResult } from "../../utils";

export const get_resellers = (): Promise<HttpResult<reseller[]>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/reseller/Get.php")
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<reseller[]>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const getresellerById = (id: number): Promise<HttpResult<reseller>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/reseller/Get.php?Id=" + id)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<reseller>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const createreseller = (body: Omit<reseller, 'Id'>): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/reseller/Create.php", {
        body: JSON.stringify(body),
        method: 'post',
        mode: 'cors'
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => data._status)
        .catch(reason => {
            console.log(reason)
            return -1
        })

export const updatereseller = (body: reseller): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/reseller/Update.php", {
        body: JSON.stringify(body),
        method: 'put',
        mode: 'cors'
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => data._status)
        .catch(reason => {
            console.log(reason)
            return -1
        })

export const deletereseller = (id: number): Promise<any> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/reseller/Delete.php?Id=" + id, {
        method: 'delete',
        mode: 'cors'
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => data._value)
        .catch(reason => {
            console.log(reason)
            return -1
        })
        