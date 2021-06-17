import * as React from "react"
        import { Route, Switch } from "react-router-dom"
        import { IAppState } from "../../AppState"
        import { AdminHomePage } from "./AdminHome"
        import { AdminNotFoundPage } from "./AdminNotFound"
        import { Admindate_and_timePage } from "./date_and_time/Admindate_and_timePage"
import { AdminreservationsPage } from "./reservations/AdminreservationsPage"
import { Admindiscount_codePage } from "./discount_code/Admindiscount_codePage"
import { Admintheater_showPage } from "./theater_show/Admintheater_showPage"
import { AdmindirectorPage } from "./director/AdmindirectorPage"
import { AdminadminPage } from "./admin/AdminadminPage"
import { AdminresellerPage } from "./reseller/AdminresellerPage"
import { AdminactorPage } from "./actor/AdminactorPage"
import { AdminlocationPage } from "./location/AdminlocationPage"
import { AdminlinkPage } from "./link/AdminlinkPage"
import { AdmincustomerPage } from "./customer/AdmincustomerPage"

        
        interface AdminRouteProps extends IAppState { }
        
        export const AdminRoutes = (props: AdminRouteProps) => <Switch>
            <Route path='/admin' exact render={() => <AdminHomePage {...props} />} />
            <Route path='/admin/date_and_time/:action?/:id?' render={route => <Admindate_and_timePage {...props} route={route} />} />
<Route path='/admin/reservations/:action?/:id?' render={route => <AdminreservationsPage {...props} route={route} />} />
<Route path='/admin/discount_code/:action?/:id?' render={route => <Admindiscount_codePage {...props} route={route} />} />
<Route path='/admin/theater_show/:action?/:id?' render={route => <Admintheater_showPage {...props} route={route} />} />
<Route path='/admin/director/:action?/:id?' render={route => <AdmindirectorPage {...props} route={route} />} />
<Route path='/admin/admin/:action?/:id?' render={route => <AdminadminPage {...props} route={route} />} />
<Route path='/admin/reseller/:action?/:id?' render={route => <AdminresellerPage {...props} route={route} />} />
<Route path='/admin/actor/:action?/:id?' render={route => <AdminactorPage {...props} route={route} />} />
<Route path='/admin/location/:action?/:id?' render={route => <AdminlocationPage {...props} route={route} />} />
<Route path='/admin/link/:action?/:id?' render={route => <AdminlinkPage {...props} route={route} />} />
<Route path='/admin/customer/:action?/:id?' render={route => <AdmincustomerPage {...props} route={route} />} />

            <Route path='/admin/*' render={() => <AdminNotFoundPage />} />
        </Switch>