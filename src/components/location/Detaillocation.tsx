
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { location } from "../../models/location"
import { loadingAsyncState } from "../../utils"
import { setCurrent_location } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { getlocationById } from "./location.api"

interface locationDetailProps extends IAppState {

}

export const Detaillocation = (props: locationDetailProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'location') return <div></div>

    if (props.appState.page.entityData.currentlocation.data.kind == 'unloaded') {
        props.setState(setCurrent_location(loadingAsyncState(() => getlocationById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('location')
    
    return <div>
        <div>
            {
                current_permission && current_permission.can_edit && props.route.match.params.id &&
                <NavLink className="btn btn-primary" to={"/admin/location/edit/" + props.route.match.params.id}>Edit location</NavLink>
            }
        </div>
        <AsyncLoader<location> async={props.appState.page.entityData.currentlocation.data}
            onLoad={res => props.setState(setCurrent_location(res))}>
            {props.appState.page.entityData.currentlocation.data.kind == 'loaded' &&
                <div>
                    <h1>Details for location: {props.appState.page.entityData.currentlocation.data.value.Id}</h1>

                    <ul>
                        <li><b>Id: </b>{props.appState.page.entityData.currentlocation.data.value.Id}</li>
                        <li><b>Name: </b>{props.appState.page.entityData.currentlocation.data.value.Name}</li>
<li><b>Capacity: </b>{props.appState.page.entityData.currentlocation.data.value.Capacity}</li>
<li><b>Adress: </b>{props.appState.page.entityData.currentlocation.data.value.Adress}</li>
<li><b>PostalCode: </b>{props.appState.page.entityData.currentlocation.data.value.PostalCode}</li>
<li><b>City: </b>{props.appState.page.entityData.currentlocation.data.value.City}</li>
<li><b>GMapLink: </b>{props.appState.page.entityData.currentlocation.data.value.GMapLink}</li>

                    </ul>
                </div>}
        </AsyncLoader>
    </div>


}
        