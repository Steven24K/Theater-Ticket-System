
        import { API_VERSION, ORIGIN } from "../../constants";
import { location } from "../../models/location";
import { HttpResult } from "../../utils";

export const get_locations = (): Promise<HttpResult<location[]>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/location/Get.php")
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<location[]>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const getlocationById = (id: number): Promise<HttpResult<location>> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/location/Get.php?Id=" + id)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
        .then(data => (<HttpResult<location>>{ kind: 'result', status: data._status, value: data._value }))
        .catch(reason => {
            console.log(reason)
            return ({ kind: 'failed', status: 500 })
        })

export const createlocation = (body: Omit<location, 'Id'>): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/location/Create.php", {
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

export const updatelocation = (body: location): Promise<number> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/location/Update.php", {
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

export const deletelocation = (id: number): Promise<any> =>
    fetch(ORIGIN + "/api/" + API_VERSION + "/location/Delete.php?Id=" + id, {
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
        