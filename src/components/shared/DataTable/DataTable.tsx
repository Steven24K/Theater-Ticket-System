
        import * as React from "react"
        import { loadingAsyncState } from "../../../utils"
import { IAppState } from "../../../AppState"
import { Loader } from "../Loader"
import { AsyncLoader } from "../AsyncLoader"


import { date_and_time } from "../../../models/date_and_time"
import { get_date_and_times } from "../../date_and_time/date_and_time.api"
import { Tabledate_and_time } from "../../date_and_time/Tabledate_and_time"

import { reservations } from "../../../models/reservations"
import { get_reservationss } from "../../reservations/reservations.api"
import { Tablereservations } from "../../reservations/Tablereservations"

import { discount_code } from "../../../models/discount_code"
import { get_discount_codes } from "../../discount_code/discount_code.api"
import { Tablediscount_code } from "../../discount_code/Tablediscount_code"

import { theater_show } from "../../../models/theater_show"
import { get_theater_shows } from "../../theater_show/theater_show.api"
import { Tabletheater_show } from "../../theater_show/Tabletheater_show"

import { director } from "../../../models/director"
import { get_directors } from "../../director/director.api"
import { Tabledirector } from "../../director/Tabledirector"

import { admin } from "../../../models/admin"
import { get_admins } from "../../admin/admin.api"
import { Tableadmin } from "../../admin/Tableadmin"

import { reseller } from "../../../models/reseller"
import { get_resellers } from "../../reseller/reseller.api"
import { Tablereseller } from "../../reseller/Tablereseller"

import { actor } from "../../../models/actor"
import { get_actors } from "../../actor/actor.api"
import { Tableactor } from "../../actor/Tableactor"

import { location } from "../../../models/location"
import { get_locations } from "../../location/location.api"
import { Tablelocation } from "../../location/Tablelocation"

import { link } from "../../../models/link"
import { get_links } from "../../link/link.api"
import { Tablelink } from "../../link/Tablelink"

import { customer } from "../../../models/customer"
import { get_customers } from "../../customer/customer.api"
import { Tablecustomer } from "../../customer/Tablecustomer"


import { set_date_and_times, set_reservationss, set_discount_codes, set_theater_shows, set_directors, set_admins, set_resellers, set_actors, set_locations, set_links, set_customers,  } from "../../AdminFrontend/AdminData"
import './DataTable.css'

interface DataTableProps extends IAppState {
}


export const DataTable = (props: DataTableProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>

    return <div className="card mb-4">
        <div className="card-header">
            <i className="fas fa-table mr-1"></i>
            {props.appState.page.entityData.kind}
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <TableRenderer {...props} />
            </div>
        </div>
    </div>
}


const TableRenderer = (props: DataTableProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>


    
    if (props.appState.page.entityData.kind == 'date_and_time') {
        if (props.appState.page.entityData.date_and_times.kind == 'unloaded') {
            props.setState(set_date_and_times(loadingAsyncState(() => get_date_and_times())))
        }
        return <AsyncLoader<date_and_time[]> async={props.appState.page.entityData.date_and_times}
            onLoad={(res) => props.setState(set_date_and_times(res))}
        >
            <Tabledate_and_time {...props} />
        </AsyncLoader>
    }

    
    if (props.appState.page.entityData.kind == 'reservations') {
        if (props.appState.page.entityData.reservationss.kind == 'unloaded') {
            props.setState(set_reservationss(loadingAsyncState(() => get_reservationss())))
        }
        return <AsyncLoader<reservations[]> async={props.appState.page.entityData.reservationss}
            onLoad={(res) => props.setState(set_reservationss(res))}
        >
            <Tablereservations {...props} />
        </AsyncLoader>
    }

    
    if (props.appState.page.entityData.kind == 'discount_code') {
        if (props.appState.page.entityData.discount_codes.kind == 'unloaded') {
            props.setState(set_discount_codes(loadingAsyncState(() => get_discount_codes())))
        }
        return <AsyncLoader<discount_code[]> async={props.appState.page.entityData.discount_codes}
            onLoad={(res) => props.setState(set_discount_codes(res))}
        >
            <Tablediscount_code {...props} />
        </AsyncLoader>
    }

    
    if (props.appState.page.entityData.kind == 'theater_show') {
        if (props.appState.page.entityData.theater_shows.kind == 'unloaded') {
            props.setState(set_theater_shows(loadingAsyncState(() => get_theater_shows())))
        }
        return <AsyncLoader<theater_show[]> async={props.appState.page.entityData.theater_shows}
            onLoad={(res) => props.setState(set_theater_shows(res))}
        >
            <Tabletheater_show {...props} />
        </AsyncLoader>
    }

    
    if (props.appState.page.entityData.kind == 'director') {
        if (props.appState.page.entityData.directors.kind == 'unloaded') {
            props.setState(set_directors(loadingAsyncState(() => get_directors())))
        }
        return <AsyncLoader<director[]> async={props.appState.page.entityData.directors}
            onLoad={(res) => props.setState(set_directors(res))}
        >
            <Tabledirector {...props} />
        </AsyncLoader>
    }

    
    if (props.appState.page.entityData.kind == 'admin') {
        if (props.appState.page.entityData.admins.kind == 'unloaded') {
            props.setState(set_admins(loadingAsyncState(() => get_admins())))
        }
        return <AsyncLoader<admin[]> async={props.appState.page.entityData.admins}
            onLoad={(res) => props.setState(set_admins(res))}
        >
            <Tableadmin {...props} />
        </AsyncLoader>
    }

    
    if (props.appState.page.entityData.kind == 'reseller') {
        if (props.appState.page.entityData.resellers.kind == 'unloaded') {
            props.setState(set_resellers(loadingAsyncState(() => get_resellers())))
        }
        return <AsyncLoader<reseller[]> async={props.appState.page.entityData.resellers}
            onLoad={(res) => props.setState(set_resellers(res))}
        >
            <Tablereseller {...props} />
        </AsyncLoader>
    }

    
    if (props.appState.page.entityData.kind == 'actor') {
        if (props.appState.page.entityData.actors.kind == 'unloaded') {
            props.setState(set_actors(loadingAsyncState(() => get_actors())))
        }
        return <AsyncLoader<actor[]> async={props.appState.page.entityData.actors}
            onLoad={(res) => props.setState(set_actors(res))}
        >
            <Tableactor {...props} />
        </AsyncLoader>
    }

    
    if (props.appState.page.entityData.kind == 'location') {
        if (props.appState.page.entityData.locations.kind == 'unloaded') {
            props.setState(set_locations(loadingAsyncState(() => get_locations())))
        }
        return <AsyncLoader<location[]> async={props.appState.page.entityData.locations}
            onLoad={(res) => props.setState(set_locations(res))}
        >
            <Tablelocation {...props} />
        </AsyncLoader>
    }

    
    if (props.appState.page.entityData.kind == 'link') {
        if (props.appState.page.entityData.links.kind == 'unloaded') {
            props.setState(set_links(loadingAsyncState(() => get_links())))
        }
        return <AsyncLoader<link[]> async={props.appState.page.entityData.links}
            onLoad={(res) => props.setState(set_links(res))}
        >
            <Tablelink {...props} />
        </AsyncLoader>
    }

    
    if (props.appState.page.entityData.kind == 'customer') {
        if (props.appState.page.entityData.customers.kind == 'unloaded') {
            props.setState(set_customers(loadingAsyncState(() => get_customers())))
        }
        return <AsyncLoader<customer[]> async={props.appState.page.entityData.customers}
            onLoad={(res) => props.setState(set_customers(res))}
        >
            <Tablecustomer {...props} />
        </AsyncLoader>
    }

    


    return <div>
        <h3>Table not found</h3>

        <p>
            This table does not exist in your database, or the admin panel does not contain a definition for it.
        </p>
    </div>
}
        