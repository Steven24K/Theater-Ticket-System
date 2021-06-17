
        import * as React from "react"
import { IAppState } from "../../../AppState";
import { loadingAsyncState } from "../../../utils";

import { setCurrent_date_and_time, setCurrent_reservations, setCurrent_discount_code, setCurrent_theater_show, setCurrent_director, setCurrent_admin, setCurrent_reseller, setCurrent_actor, setCurrent_location, setCurrent_link, setCurrent_customer,  } from "../../AdminFrontend/AdminData"


import { getdate_and_timeById } from "../../date_and_time/date_and_time.api";
import { Formdate_and_time } from "../../date_and_time/Formdate_and_time";

import { getreservationsById } from "../../reservations/reservations.api";
import { Formreservations } from "../../reservations/Formreservations";

import { getdiscount_codeById } from "../../discount_code/discount_code.api";
import { Formdiscount_code } from "../../discount_code/Formdiscount_code";

import { gettheater_showById } from "../../theater_show/theater_show.api";
import { Formtheater_show } from "../../theater_show/Formtheater_show";

import { getdirectorById } from "../../director/director.api";
import { Formdirector } from "../../director/Formdirector";

import { getadminById } from "../../admin/admin.api";
import { Formadmin } from "../../admin/Formadmin";

import { getresellerById } from "../../reseller/reseller.api";
import { Formreseller } from "../../reseller/Formreseller";

import { getactorById } from "../../actor/actor.api";
import { Formactor } from "../../actor/Formactor";

import { getlocationById } from "../../location/location.api";
import { Formlocation } from "../../location/Formlocation";

import { getlinkById } from "../../link/link.api";
import { Formlink } from "../../link/Formlink";

import { getcustomerById } from "../../customer/customer.api";
import { Formcustomer } from "../../customer/Formcustomer";


interface DataFormProps extends IAppState {

}


export const DataForm = (props: DataFormProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>


    
    if (props.appState.page.entityData.kind == 'date_and_time') {
        if ((props.appState.page.entityData.currentdate_and_time.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
            props.setState(setCurrent_date_and_time(loadingAsyncState(() => getdate_and_timeById(Number(props.route.match.params.id)))))
        }
        return <Formdate_and_time {...props} />
    }

    
    if (props.appState.page.entityData.kind == 'reservations') {
        if ((props.appState.page.entityData.currentreservations.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
            props.setState(setCurrent_reservations(loadingAsyncState(() => getreservationsById(Number(props.route.match.params.id)))))
        }
        return <Formreservations {...props} />
    }

    
    if (props.appState.page.entityData.kind == 'discount_code') {
        if ((props.appState.page.entityData.currentdiscount_code.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
            props.setState(setCurrent_discount_code(loadingAsyncState(() => getdiscount_codeById(Number(props.route.match.params.id)))))
        }
        return <Formdiscount_code {...props} />
    }

    
    if (props.appState.page.entityData.kind == 'theater_show') {
        if ((props.appState.page.entityData.currenttheater_show.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
            props.setState(setCurrent_theater_show(loadingAsyncState(() => gettheater_showById(Number(props.route.match.params.id)))))
        }
        return <Formtheater_show {...props} />
    }

    
    if (props.appState.page.entityData.kind == 'director') {
        if ((props.appState.page.entityData.currentdirector.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
            props.setState(setCurrent_director(loadingAsyncState(() => getdirectorById(Number(props.route.match.params.id)))))
        }
        return <Formdirector {...props} />
    }

    
    if (props.appState.page.entityData.kind == 'admin') {
        if ((props.appState.page.entityData.currentadmin.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
            props.setState(setCurrent_admin(loadingAsyncState(() => getadminById(Number(props.route.match.params.id)))))
        }
        return <Formadmin {...props} />
    }

    
    if (props.appState.page.entityData.kind == 'reseller') {
        if ((props.appState.page.entityData.currentreseller.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
            props.setState(setCurrent_reseller(loadingAsyncState(() => getresellerById(Number(props.route.match.params.id)))))
        }
        return <Formreseller {...props} />
    }

    
    if (props.appState.page.entityData.kind == 'actor') {
        if ((props.appState.page.entityData.currentactor.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
            props.setState(setCurrent_actor(loadingAsyncState(() => getactorById(Number(props.route.match.params.id)))))
        }
        return <Formactor {...props} />
    }

    
    if (props.appState.page.entityData.kind == 'location') {
        if ((props.appState.page.entityData.currentlocation.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
            props.setState(setCurrent_location(loadingAsyncState(() => getlocationById(Number(props.route.match.params.id)))))
        }
        return <Formlocation {...props} />
    }

    
    if (props.appState.page.entityData.kind == 'link') {
        if ((props.appState.page.entityData.currentlink.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
            props.setState(setCurrent_link(loadingAsyncState(() => getlinkById(Number(props.route.match.params.id)))))
        }
        return <Formlink {...props} />
    }

    
    if (props.appState.page.entityData.kind == 'customer') {
        if ((props.appState.page.entityData.currentcustomer.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
            props.setState(setCurrent_customer(loadingAsyncState(() => getcustomerById(Number(props.route.match.params.id)))))
        }
        return <Formcustomer {...props} />
    }

    

    return <div>
        <h1>No form found</h1>
    </div>
}

        