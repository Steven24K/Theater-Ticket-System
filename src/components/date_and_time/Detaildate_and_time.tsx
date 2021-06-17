
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { date_and_time } from "../../models/date_and_time"
import { loadingAsyncState } from "../../utils"
import { setCurrent_date_and_time } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { getdate_and_timeById } from "./date_and_time.api"

interface date_and_timeDetailProps extends IAppState {

}

export const Detaildate_and_time = (props: date_and_timeDetailProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'date_and_time') return <div></div>

    if (props.appState.page.entityData.currentdate_and_time.data.kind == 'unloaded') {
        props.setState(setCurrent_date_and_time(loadingAsyncState(() => getdate_and_timeById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('date_and_time')
    
    return <div>
        <div>
            {
                current_permission && current_permission.can_edit && props.route.match.params.id &&
                <NavLink className="btn btn-primary" to={"/admin/date_and_time/edit/" + props.route.match.params.id}>Edit date_and_time</NavLink>
            }
        </div>
        <AsyncLoader<date_and_time> async={props.appState.page.entityData.currentdate_and_time.data}
            onLoad={res => props.setState(setCurrent_date_and_time(res))}>
            {props.appState.page.entityData.currentdate_and_time.data.kind == 'loaded' &&
                <div>
                    <h1>Details for date_and_time: {props.appState.page.entityData.currentdate_and_time.data.value.Id}</h1>

                    <ul>
                        <li><b>Id: </b>{props.appState.page.entityData.currentdate_and_time.data.value.Id}</li>
                        <li><b>Date: </b>{props.appState.page.entityData.currentdate_and_time.data.value.Date}</li>
<li><b>Time: </b>{props.appState.page.entityData.currentdate_and_time.data.value.Time}</li>

                    </ul>
                </div>}
        </AsyncLoader>
    </div>


}
        