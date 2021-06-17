
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { customer } from "../../models/customer"
import { loadingAsyncState } from "../../utils"
import { setCurrent_customer } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { getcustomerById } from "./customer.api"

interface customerDetailProps extends IAppState {

}

export const Detailcustomer = (props: customerDetailProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'customer') return <div></div>

    if (props.appState.page.entityData.currentcustomer.data.kind == 'unloaded') {
        props.setState(setCurrent_customer(loadingAsyncState(() => getcustomerById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('customer')
    
    return <div>
        <div>
            {
                current_permission && current_permission.can_edit && props.route.match.params.id &&
                <NavLink className="btn btn-primary" to={"/admin/customer/edit/" + props.route.match.params.id}>Edit customer</NavLink>
            }
        </div>
        <AsyncLoader<customer> async={props.appState.page.entityData.currentcustomer.data}
            onLoad={res => props.setState(setCurrent_customer(res))}>
            {props.appState.page.entityData.currentcustomer.data.kind == 'loaded' &&
                <div>
                    <h1>Details for customer: {props.appState.page.entityData.currentcustomer.data.value.Id}</h1>

                    <ul>
                        <li><b>Id: </b>{props.appState.page.entityData.currentcustomer.data.value.Id}</li>
                        <li><b>Email: </b>{props.appState.page.entityData.currentcustomer.data.value.Email}</li>
<li><b>FirstName: </b>{props.appState.page.entityData.currentcustomer.data.value.FirstName}</li>
<li><b>LastName: </b>{props.appState.page.entityData.currentcustomer.data.value.LastName}</li>
<li><b>Insertion: </b>{props.appState.page.entityData.currentcustomer.data.value.Insertion}</li>
<li><b>reg_date: </b>{props.appState.page.entityData.currentcustomer.data.value.reg_date}</li>

                    </ul>
                </div>}
        </AsyncLoader>
    </div>


}
        