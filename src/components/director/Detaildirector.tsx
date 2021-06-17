
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { director } from "../../models/director"
import { loadingAsyncState } from "../../utils"
import { setCurrent_director } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { getdirectorById } from "./director.api"

interface directorDetailProps extends IAppState {

}

export const Detaildirector = (props: directorDetailProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'director') return <div></div>

    if (props.appState.page.entityData.currentdirector.data.kind == 'unloaded') {
        props.setState(setCurrent_director(loadingAsyncState(() => getdirectorById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('director')
    
    return <div>
        <div>
            {
                current_permission && current_permission.can_edit && props.route.match.params.id &&
                <NavLink className="btn btn-primary" to={"/admin/director/edit/" + props.route.match.params.id}>Edit director</NavLink>
            }
        </div>
        <AsyncLoader<director> async={props.appState.page.entityData.currentdirector.data}
            onLoad={res => props.setState(setCurrent_director(res))}>
            {props.appState.page.entityData.currentdirector.data.kind == 'loaded' &&
                <div>
                    <h1>Details for director: {props.appState.page.entityData.currentdirector.data.value.Id}</h1>

                    <ul>
                        <li><b>Id: </b>{props.appState.page.entityData.currentdirector.data.value.Id}</li>
                        <li><b>Name: </b>{props.appState.page.entityData.currentdirector.data.value.Name}</li>
<li><b>Password: </b>{props.appState.page.entityData.currentdirector.data.value.Password}</li>
<li><b>DateOfBirth: </b>{props.appState.page.entityData.currentdirector.data.value.DateOfBirth}</li>
<li><b>Bio: </b>{props.appState.page.entityData.currentdirector.data.value.Bio}</li>

                    </ul>
                </div>}
        </AsyncLoader>
    </div>


}
        