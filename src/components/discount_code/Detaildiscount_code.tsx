
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { discount_code } from "../../models/discount_code"
import { loadingAsyncState } from "../../utils"
import { setCurrent_discount_code } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { getdiscount_codeById } from "./discount_code.api"

interface discount_codeDetailProps extends IAppState {

}

export const Detaildiscount_code = (props: discount_codeDetailProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'discount_code') return <div></div>

    if (props.appState.page.entityData.currentdiscount_code.data.kind == 'unloaded') {
        props.setState(setCurrent_discount_code(loadingAsyncState(() => getdiscount_codeById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('discount_code')
    
    return <div>
        <div>
            {
                current_permission && current_permission.can_edit && props.route.match.params.id &&
                <NavLink className="btn btn-primary" to={"/admin/discount_code/edit/" + props.route.match.params.id}>Edit discount_code</NavLink>
            }
        </div>
        <AsyncLoader<discount_code> async={props.appState.page.entityData.currentdiscount_code.data}
            onLoad={res => props.setState(setCurrent_discount_code(res))}>
            {props.appState.page.entityData.currentdiscount_code.data.kind == 'loaded' &&
                <div>
                    <h1>Details for discount_code: {props.appState.page.entityData.currentdiscount_code.data.value.Id}</h1>

                    <ul>
                        <li><b>Id: </b>{props.appState.page.entityData.currentdiscount_code.data.value.Id}</li>
                        <li><b>Code: </b>{props.appState.page.entityData.currentdiscount_code.data.value.Code}</li>
<li><b>Expiration_Date: </b>{props.appState.page.entityData.currentdiscount_code.data.value.Expiration_Date}</li>
<li><b>Discount: </b>{props.appState.page.entityData.currentdiscount_code.data.value.Discount}</li>

                    </ul>
                </div>}
        </AsyncLoader>
    </div>


}
        