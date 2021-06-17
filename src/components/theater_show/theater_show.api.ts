
        import { API_VERSION, ORIGIN } from "../../constants";
import { theater_show } from "../../models/theater_show";
import { HttpResult } from "../../utils";

export const get_theater_shows = (): Promise<HttpResult<theater_show[]>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/theater_show/Get.php")
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<theater_show[]>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const gettheater_showById = (id: number): Promise<HttpResult<theater_show>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/theater_show/Get.php?Id=" + id)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<theater_show>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const createtheater_show = (body: Omit<theater_show, 'Id'>): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/theater_show/Create.php", {
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

export const updatetheater_show = (body: theater_show): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/theater_show/Update.php", {
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

export const deletetheater_show = (id: number): Promise<any> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/theater_show/Delete.php?Id=" + id, {
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
        