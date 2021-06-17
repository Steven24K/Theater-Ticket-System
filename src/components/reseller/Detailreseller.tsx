
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { reseller } from "../../models/reseller"
import { loadingAsyncState } from "../../utils"
import { setCurrent_reseller } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { getresellerById } from "./reseller.api"

interface resellerDetailProps extends IAppState {

}

export const Detailreseller = (props: resellerDetailProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'reseller') return <div></div>

    if (props.appState.page.entityData.currentreseller.data.kind == 'unloaded') {
        props.setState(setCurrent_reseller(loadingAsyncState(() => getresellerById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('reseller')
    
    return <div>
        <div>
            {
                current_permission && current_permission.can_edit && props.route.match.params.id &&
                <NavLink className="btn btn-primary" to={"/admin/reseller/edit/" + props.route.match.params.id}>Edit reseller</NavLink>
            }
        </div>
        <AsyncLoader<reseller> async={props.appState.page.entityData.currentreseller.data}
            onLoad={res => props.setState(setCurrent_reseller(res))}>
            {props.appState.page.entityData.currentreseller.data.kind == 'loaded' &&
                <div>
                    <h1>Details for reseller: {props.appState.page.entityData.currentreseller.data.value.Id}</h1>

                    <ul>
                        <li><b>Id: </b>{props.appState.page.entityData.currentreseller.data.value.Id}</li>
                        <li><b>Name: </b>{props.appState.page.entityData.currentreseller.data.value.Name}</li>
<li><b>Password: </b>{props.appState.page.entityData.currentreseller.data.value.Password}</li>

                    </ul>
                </div>}
        </AsyncLoader>
    </div>


}
        