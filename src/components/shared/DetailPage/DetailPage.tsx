
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../../AppState"
import { loadingAsyncState } from "../../../utils"
import { AsyncLoader } from "../AsyncLoader"


import { date_and_time } from "../../../models/date_and_time"
import { setCurrent_date_and_time } from "../../AdminFrontend/AdminData"
import { getdate_and_timeById } from "../../date_and_time/date_and_time.api"
import { Detaildate_and_time } from "../../date_and_time/Detaildate_and_time"

import { reservations } from "../../../models/reservations"
import { setCurrent_reservations } from "../../AdminFrontend/AdminData"
import { getreservationsById } from "../../reservations/reservations.api"
import { Detailreservations } from "../../reservations/Detailreservations"

import { discount_code } from "../../../models/discount_code"
import { setCurrent_discount_code } from "../../AdminFrontend/AdminData"
import { getdiscount_codeById } from "../../discount_code/discount_code.api"
import { Detaildiscount_code } from "../../discount_code/Detaildiscount_code"

import { theater_show } from "../../../models/theater_show"
import { setCurrent_theater_show } from "../../AdminFrontend/AdminData"
import { gettheater_showById } from "../../theater_show/theater_show.api"
import { Detailtheater_show } from "../../theater_show/Detailtheater_show"

import { director } from "../../../models/director"
import { setCurrent_director } from "../../AdminFrontend/AdminData"
import { getdirectorById } from "../../director/director.api"
import { Detaildirector } from "../../director/Detaildirector"

import { admin } from "../../../models/admin"
import { setCurrent_admin } from "../../AdminFrontend/AdminData"
import { getadminById } from "../../admin/admin.api"
import { Detailadmin } from "../../admin/Detailadmin"

import { reseller } from "../../../models/reseller"
import { setCurrent_reseller } from "../../AdminFrontend/AdminData"
import { getresellerById } from "../../reseller/reseller.api"
import { Detailreseller } from "../../reseller/Detailreseller"

import { actor } from "../../../models/actor"
import { setCurrent_actor } from "../../AdminFrontend/AdminData"
import { getactorById } from "../../actor/actor.api"
import { Detailactor } from "../../actor/Detailactor"

import { location } from "../../../models/location"
import { setCurrent_location } from "../../AdminFrontend/AdminData"
import { getlocationById } from "../../location/location.api"
import { Detaillocation } from "../../location/Detaillocation"

import { link } from "../../../models/link"
import { setCurrent_link } from "../../AdminFrontend/AdminData"
import { getlinkById } from "../../link/link.api"
import { Detaillink } from "../../link/Detaillink"

import { customer } from "../../../models/customer"
import { setCurrent_customer } from "../../AdminFrontend/AdminData"
import { getcustomerById } from "../../customer/customer.api"
import { Detailcustomer } from "../../customer/Detailcustomer"



interface DetailPageProps extends IAppState {

}

export const DetailPage = (props: DetailPageProps) => {
    if (props.appState.page.kind != 'admin') return null 

    return <div>
        <div>
            {
                props.route.match.params.id &&
                <NavLink className="btn btn-primary" to={"/admin/" + props.appState.page.entityData.kind + "/edit/" + props.route.match.params.id}>Edit {props.appState.page.entityData.kind}</NavLink>
            }
        </div>
        <PageSwitcher {...props} />
    </div>
}



const PageSwitcher = (props: DetailPageProps) => {
    if (props.appState.page.kind != 'admin') return null

    
    if (props.appState.page.entityData.kind == 'date_and_time' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        if (props.appState.page.entityData.currentdate_and_time.data.kind == 'unloaded') {
            props.setState(setCurrent_date_and_time(loadingAsyncState(() => getdate_and_timeById(Number(props.route.match.params.id)))))
        }
        return <AsyncLoader<date_and_time> async={props.appState.page.entityData.currentdate_and_time.data}
            onLoad={res => props.setState(setCurrent_date_and_time(res))}>
            <Detaildate_and_time {...props} />
        </AsyncLoader>
    }
    
    if (props.appState.page.entityData.kind == 'reservations' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        if (props.appState.page.entityData.currentreservations.data.kind == 'unloaded') {
            props.setState(setCurrent_reservations(loadingAsyncState(() => getreservationsById(Number(props.route.match.params.id)))))
        }
        return <AsyncLoader<reservations> async={props.appState.page.entityData.currentreservations.data}
            onLoad={res => props.setState(setCurrent_reservations(res))}>
            <Detailreservations {...props} />
        </AsyncLoader>
    }
    
    if (props.appState.page.entityData.kind == 'discount_code' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        if (props.appState.page.entityData.currentdiscount_code.data.kind == 'unloaded') {
            props.setState(setCurrent_discount_code(loadingAsyncState(() => getdiscount_codeById(Number(props.route.match.params.id)))))
        }
        return <AsyncLoader<discount_code> async={props.appState.page.entityData.currentdiscount_code.data}
            onLoad={res => props.setState(setCurrent_discount_code(res))}>
            <Detaildiscount_code {...props} />
        </AsyncLoader>
    }
    
    if (props.appState.page.entityData.kind == 'theater_show' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        if (props.appState.page.entityData.currenttheater_show.data.kind == 'unloaded') {
            props.setState(setCurrent_theater_show(loadingAsyncState(() => gettheater_showById(Number(props.route.match.params.id)))))
        }
        return <AsyncLoader<theater_show> async={props.appState.page.entityData.currenttheater_show.data}
            onLoad={res => props.setState(setCurrent_theater_show(res))}>
            <Detailtheater_show {...props} />
        </AsyncLoader>
    }
    
    if (props.appState.page.entityData.kind == 'director' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        if (props.appState.page.entityData.currentdirector.data.kind == 'unloaded') {
            props.setState(setCurrent_director(loadingAsyncState(() => getdirectorById(Number(props.route.match.params.id)))))
        }
        return <AsyncLoader<director> async={props.appState.page.entityData.currentdirector.data}
            onLoad={res => props.setState(setCurrent_director(res))}>
            <Detaildirector {...props} />
        </AsyncLoader>
    }
    
    if (props.appState.page.entityData.kind == 'admin' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        if (props.appState.page.entityData.currentadmin.data.kind == 'unloaded') {
            props.setState(setCurrent_admin(loadingAsyncState(() => getadminById(Number(props.route.match.params.id)))))
        }
        return <AsyncLoader<admin> async={props.appState.page.entityData.currentadmin.data}
            onLoad={res => props.setState(setCurrent_admin(res))}>
            <Detailadmin {...props} />
        </AsyncLoader>
    }
    
    if (props.appState.page.entityData.kind == 'reseller' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        if (props.appState.page.entityData.currentreseller.data.kind == 'unloaded') {
            props.setState(setCurrent_reseller(loadingAsyncState(() => getresellerById(Number(props.route.match.params.id)))))
        }
        return <AsyncLoader<reseller> async={props.appState.page.entityData.currentreseller.data}
            onLoad={res => props.setState(setCurrent_reseller(res))}>
            <Detailreseller {...props} />
        </AsyncLoader>
    }
    
    if (props.appState.page.entityData.kind == 'actor' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        if (props.appState.page.entityData.currentactor.data.kind == 'unloaded') {
            props.setState(setCurrent_actor(loadingAsyncState(() => getactorById(Number(props.route.match.params.id)))))
        }
        return <AsyncLoader<actor> async={props.appState.page.entityData.currentactor.data}
            onLoad={res => props.setState(setCurrent_actor(res))}>
            <Detailactor {...props} />
        </AsyncLoader>
    }
    
    if (props.appState.page.entityData.kind == 'location' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        if (props.appState.page.entityData.currentlocation.data.kind == 'unloaded') {
            props.setState(setCurrent_location(loadingAsyncState(() => getlocationById(Number(props.route.match.params.id)))))
        }
        return <AsyncLoader<location> async={props.appState.page.entityData.currentlocation.data}
            onLoad={res => props.setState(setCurrent_location(res))}>
            <Detaillocation {...props} />
        </AsyncLoader>
    }
    
    if (props.appState.page.entityData.kind == 'link' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        if (props.appState.page.entityData.currentlink.data.kind == 'unloaded') {
            props.setState(setCurrent_link(loadingAsyncState(() => getlinkById(Number(props.route.match.params.id)))))
        }
        return <AsyncLoader<link> async={props.appState.page.entityData.currentlink.data}
            onLoad={res => props.setState(setCurrent_link(res))}>
            <Detaillink {...props} />
        </AsyncLoader>
    }
    
    if (props.appState.page.entityData.kind == 'customer' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        if (props.appState.page.entityData.currentcustomer.data.kind == 'unloaded') {
            props.setState(setCurrent_customer(loadingAsyncState(() => getcustomerById(Number(props.route.match.params.id)))))
        }
        return <AsyncLoader<customer> async={props.appState.page.entityData.currentcustomer.data}
            onLoad={res => props.setState(setCurrent_customer(res))}>
            <Detailcustomer {...props} />
        </AsyncLoader>
    }
    


    return <div>
        <h1>Detail page does not exist</h1>
    </div>
}
        