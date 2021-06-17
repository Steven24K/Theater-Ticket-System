
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { reservations } from "../../models/reservations"
import { loadingAsyncState } from "../../utils"
import { setCurrent_reservations } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { getreservationsById } from "./reservations.api"

interface reservationsDetailProps extends IAppState {

}

export const Detailreservations = (props: reservationsDetailProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'reservations') return <div></div>

    if (props.appState.page.entityData.currentreservations.data.kind == 'unloaded') {
        props.setState(setCurrent_reservations(loadingAsyncState(() => getreservationsById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('reservations')
    
    return <div>
        <div>
            {
                current_permission && current_permission.can_edit && props.route.match.params.id &&
                <NavLink className="btn btn-primary" to={"/admin/reservations/edit/" + props.route.match.params.id}>Edit reservations</NavLink>
            }
        </div>
        <AsyncLoader<reservations> async={props.appState.page.entityData.currentreservations.data}
            onLoad={res => props.setState(setCurrent_reservations(res))}>
            {props.appState.page.entityData.currentreservations.data.kind == 'loaded' &&
                <div>
                    <h1>Details for reservations: {props.appState.page.entityData.currentreservations.data.value.Id}</h1>

                    <ul>
                        <li><b>Id: </b>{props.appState.page.entityData.currentreservations.data.value.Id}</li>
                        <li><b>amount: </b>{props.appState.page.entityData.currentreservations.data.value.amount}</li>
<li><b>CheckedIn: </b>{props.appState.page.entityData.currentreservations.data.value.CheckedIn}</li>
<li><b>PayementID: </b>{props.appState.page.entityData.currentreservations.data.value.PayementID}</li>

                    </ul>
                </div>}
        </AsyncLoader>
    </div>


}
        