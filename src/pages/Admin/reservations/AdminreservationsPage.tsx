import * as React from "react"
        import { IAppState } from "../../../AppState"
        import { zeroreservationsEntityData } from "../../../components/AdminFrontend/AdminData"
        import { routeHasChanged } from "../../../utils"
        import { Tablereservations } from "../../../components/reservations/Tablereservations"
        import { Detailreservations } from "../../../components/reservations/Detailreservations"
        import { Formreservations } from "../../../components/reservations/Formreservations"
        
        
        export interface AdminreservationsPageProps extends IAppState {
        
        }
        
        export class AdminreservationsPage extends React.Component<AdminreservationsPageProps, never> {
            constructor(props: AdminreservationsPageProps) {
                super(props)
            }
        
            componentDidMount() {
                this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zeroreservationsEntityData() } }))
            }
        
            componentDidUpdate(prevProps: AdminreservationsPageProps) {
                if (routeHasChanged(prevProps.route.match.params, this.props.route.match.params)) {
                    this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zeroreservationsEntityData() } }))
                }
            }
        
            render() {
                if (this.props.appState.page.kind != 'admin') return null

                let current_permission = this.props.appState.page.sidePanelState.get('reservations')

                // Nested routing could also be applied here.
                return <>
                    {current_permission && current_permission.can_view && !this.props.route.match.params.id && !this.props.route.match.params.action && <Tablereservations {...this.props} />}
        
                    {current_permission && current_permission.can_view && this.props.route.match.params.id && this.props.route.match.params.action == 'view' && <Detailreservations {...this.props} />}
        
                    {(this.props.route.match.params.id && this.props.route.match.params.action == 'edit' || this.props.route.match.params.action == 'create') && <Formreservations {...this.props} />}
         
                </>
            }
        }
        