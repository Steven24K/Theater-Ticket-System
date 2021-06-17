
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { actor } from "../../models/actor"
import { loadingAsyncState } from "../../utils"
import { setCurrent_actor } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { getactorById } from "./actor.api"

interface actorDetailProps extends IAppState {

}

export const Detailactor = (props: actorDetailProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'actor') return <div></div>

    if (props.appState.page.entityData.currentactor.data.kind == 'unloaded') {
        props.setState(setCurrent_actor(loadingAsyncState(() => getactorById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('actor')
    
    return <div>
        <div>
            {
                current_permission && current_permission.can_edit && props.route.match.params.id &&
                <NavLink className="btn btn-primary" to={"/admin/actor/edit/" + props.route.match.params.id}>Edit actor</NavLink>
            }
        </div>
        <AsyncLoader<actor> async={props.appState.page.entityData.currentactor.data}
            onLoad={res => props.setState(setCurrent_actor(res))}>
            {props.appState.page.entityData.currentactor.data.kind == 'loaded' &&
                <div>
                    <h1>Details for actor: {props.appState.page.entityData.currentactor.data.value.Id}</h1>

                    <ul>
                        <li><b>Id: </b>{props.appState.page.entityData.currentactor.data.value.Id}</li>
                        <li><b>Name: </b>{props.appState.page.entityData.currentactor.data.value.Name}</li>
<li><b>Password: </b>{props.appState.page.entityData.currentactor.data.value.Password}</li>
<li><b>DateOfBirth: </b>{props.appState.page.entityData.currentactor.data.value.DateOfBirth}</li>
<li><b>Bio: </b>{props.appState.page.entityData.currentactor.data.value.Bio}</li>

                    </ul>
                </div>}
        </AsyncLoader>
    </div>


}
        