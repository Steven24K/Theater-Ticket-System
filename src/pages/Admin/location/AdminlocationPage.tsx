import * as React from "react"
        import { IAppState } from "../../../AppState"
        import { zerolocationEntityData } from "../../../components/AdminFrontend/AdminData"
        import { routeHasChanged } from "../../../utils"
        import { Tablelocation } from "../../../components/location/Tablelocation"
        import { Detaillocation } from "../../../components/location/Detaillocation"
        import { Formlocation } from "../../../components/location/Formlocation"
        
        
        export interface AdminlocationPageProps extends IAppState {
        
        }
        
        export class AdminlocationPage extends React.Component<AdminlocationPageProps, never> {
            constructor(props: AdminlocationPageProps) {
                super(props)
            }
        
            componentDidMount() {
                this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerolocationEntityData() } }))
            }
        
            componentDidUpdate(prevProps: AdminlocationPageProps) {
                if (routeHasChanged(prevProps.route.match.params, this.props.route.match.params)) {
                    this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerolocationEntityData() } }))
                }
            }
        
            render() {
                if (this.props.appState.page.kind != 'admin') return null

                let current_permission = this.props.appState.page.sidePanelState.get('location')

                // Nested routing could also be applied here.
                return <>
                    {current_permission && current_permission.can_view && !this.props.route.match.params.id && !this.props.route.match.params.action && <Tablelocation {...this.props} />}
        
                    {current_permission && current_permission.can_view && this.props.route.match.params.id && this.props.route.match.params.action == 'view' && <Detaillocation {...this.props} />}
        
                    {(this.props.route.match.params.id && this.props.route.match.params.action == 'edit' || this.props.route.match.params.action == 'create') && <Formlocation {...this.props} />}
         
                </>
            }
        }
        