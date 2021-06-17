
        import { API_VERSION, ORIGIN } from "../../constants";
import { customer } from "../../models/customer";
import { HttpResult } from "../../utils";

export const get_customers = (): Promise<HttpResult<customer[]>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/customer/Get.php")
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<customer[]>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const getcustomerById = (id: number): Promise<HttpResult<customer>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/customer/Get.php?Id=" + id)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<customer>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const createcustomer = (body: Omit<customer, 'Id'>): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/customer/Create.php", {
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

export const updatecustomer = (body: customer): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/customer/Update.php", {
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

export const deletecustomer = (id: number): Promise<any> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/customer/Delete.php?Id=" + id, {
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
        