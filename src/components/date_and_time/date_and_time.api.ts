
        import { API_VERSION, ORIGIN } from "../../constants";
import { date_and_time } from "../../models/date_and_time";
import { HttpResult } from "../../utils";

export const get_date_and_times = (): Promise<HttpResult<date_and_time[]>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/date_and_time/Get.php")
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<date_and_time[]>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const getdate_and_timeById = (id: number): Promise<HttpResult<date_and_time>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/date_and_time/Get.php?Id=" + id)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<date_and_time>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const createdate_and_time = (body: Omit<date_and_time, 'Id'>): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/date_and_time/Create.php", {
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

export const updatedate_and_time = (body: date_and_time): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/date_and_time/Update.php", {
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

export const deletedate_and_time = (id: number): Promise<any> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/date_and_time/Delete.php?Id=" + id, {
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
        