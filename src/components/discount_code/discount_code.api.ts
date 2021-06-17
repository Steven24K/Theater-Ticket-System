
        import { API_VERSION, ORIGIN } from "../../constants";
import { discount_code } from "../../models/discount_code";
import { HttpResult } from "../../utils";

export const get_discount_codes = (): Promise<HttpResult<discount_code[]>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/discount_code/Get.php")
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<discount_code[]>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const getdiscount_codeById = (id: number): Promise<HttpResult<discount_code>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/discount_code/Get.php?Id=" + id)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<discount_code>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const creatediscount_code = (body: Omit<discount_code, 'Id'>): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/discount_code/Create.php", {
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

export const updatediscount_code = (body: discount_code): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/discount_code/Update.php", {
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

export const deletediscount_code = (id: number): Promise<any> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/discount_code/Delete.php?Id=" + id, {
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
        