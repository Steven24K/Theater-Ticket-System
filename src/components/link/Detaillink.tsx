
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { link } from "../../models/link"
import { loadingAsyncState } from "../../utils"
import { setCurrent_link } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { getlinkById } from "./link.api"

interface linkDetailProps extends IAppState {

}

export const Detaillink = (props: linkDetailProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'link') return <div></div>

    if (props.appState.page.entityData.currentlink.data.kind == 'unloaded') {
        props.setState(setCurrent_link(loadingAsyncState(() => getlinkById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('link')
    
    return <div>
        <div>
            {
                current_permission && current_permission.can_edit && props.route.match.params.id &&
                <NavLink className="btn btn-primary" to={"/admin/link/edit/" + props.route.match.params.id}>Edit link</NavLink>
            }
        </div>
        <AsyncLoader<link> async={props.appState.page.entityData.currentlink.data}
            onLoad={res => props.setState(setCurrent_link(res))}>
            {props.appState.page.entityData.currentlink.data.kind == 'loaded' &&
                <div>
                    <h1>Details for link: {props.appState.page.entityData.currentlink.data.value.Id}</h1>

                    <ul>
                        <li><b>Id: </b>{props.appState.page.entityData.currentlink.data.value.Id}</li>
                        <li><b>Text: </b>{props.appState.page.entityData.currentlink.data.value.Text}</li>
<li><b>Url: </b>{props.appState.page.entityData.currentlink.data.value.Url}</li>

                    </ul>
                </div>}
        </AsyncLoader>
    </div>


}
        