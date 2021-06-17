
        import { API_VERSION, ORIGIN } from "../../constants";
import { link } from "../../models/link";
import { HttpResult } from "../../utils";

export const get_links = (): Promise<HttpResult<link[]>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/link/Get.php")
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<link[]>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const getlinkById = (id: number): Promise<HttpResult<link>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/link/Get.php?Id=" + id)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<link>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const createlink = (body: Omit<link, 'Id'>): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/link/Create.php", {
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

export const updatelink = (body: link): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/link/Update.php", {
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

export const deletelink = (id: number): Promise<any> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/link/Delete.php?Id=" + id, {
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
        