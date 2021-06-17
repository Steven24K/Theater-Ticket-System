
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { theater_show } from "../../models/theater_show"
import { loadingAsyncState } from "../../utils"
import { setCurrent_theater_show } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { gettheater_showById } from "./theater_show.api"

interface theater_showDetailProps extends IAppState {

}

export const Detailtheater_show = (props: theater_showDetailProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'theater_show') return <div></div>

    if (props.appState.page.entityData.currenttheater_show.data.kind == 'unloaded') {
        props.setState(setCurrent_theater_show(loadingAsyncState(() => gettheater_showById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('theater_show')
    
    return <div>
        <div>
            {
                current_permission && current_permission.can_edit && props.route.match.params.id &&
                <NavLink className="btn btn-primary" to={"/admin/theater_show/edit/" + props.route.match.params.id}>Edit theater_show</NavLink>
            }
        </div>
        <AsyncLoader<theater_show> async={props.appState.page.entityData.currenttheater_show.data}
            onLoad={res => props.setState(setCurrent_theater_show(res))}>
            {props.appState.page.entityData.currenttheater_show.data.kind == 'loaded' &&
                <div>
                    <h1>Details for theater_show: {props.appState.page.entityData.currenttheater_show.data.value.Id}</h1>

                    <ul>
                        <li><b>Id: </b>{props.appState.page.entityData.currenttheater_show.data.value.Id}</li>
                        <li><b>Title: </b>{props.appState.page.entityData.currenttheater_show.data.value.Title}</li>
<li><b>Description: </b>{props.appState.page.entityData.currenttheater_show.data.value.Description}</li>
<li><b>Price: </b>{props.appState.page.entityData.currenttheater_show.data.value.Price}</li>
<li><b>image_url: </b>{props.appState.page.entityData.currenttheater_show.data.value.image_url}</li>

                    </ul>
                </div>}
        </AsyncLoader>
    </div>


}
        