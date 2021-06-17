
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { admin } from "../../models/admin"
import { loadingAsyncState } from "../../utils"
import { setCurrent_admin } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { getadminById } from "./admin.api"

interface adminDetailProps extends IAppState {

}

export const Detailadmin = (props: adminDetailProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'admin') return <div></div>

    if (props.appState.page.entityData.currentadmin.data.kind == 'unloaded') {
        props.setState(setCurrent_admin(loadingAsyncState(() => getadminById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('admin')
    
    return <div>
        <div>
            {
                current_permission && current_permission.can_edit && props.route.match.params.id &&
                <NavLink className="btn btn-primary" to={"/admin/admin/edit/" + props.route.match.params.id}>Edit admin</NavLink>
            }
        </div>
        <AsyncLoader<admin> async={props.appState.page.entityData.currentadmin.data}
            onLoad={res => props.setState(setCurrent_admin(res))}>
            {props.appState.page.entityData.currentadmin.data.kind == 'loaded' &&
                <div>
                    <h1>Details for admin: {props.appState.page.entityData.currentadmin.data.value.Id}</h1>

                    <ul>
                        <li><b>Id: </b>{props.appState.page.entityData.currentadmin.data.value.Id}</li>
                        <li><b>Name: </b>{props.appState.page.entityData.currentadmin.data.value.Name}</li>
<li><b>Password: </b>{props.appState.page.entityData.currentadmin.data.value.Password}</li>

                    </ul>
                </div>}
        </AsyncLoader>
    </div>


}
        