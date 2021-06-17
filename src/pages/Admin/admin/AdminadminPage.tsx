import * as React from "react"
        import { IAppState } from "../../../AppState"
        import { zeroadminEntityData } from "../../../components/AdminFrontend/AdminData"
        import { routeHasChanged } from "../../../utils"
        import { Tableadmin } from "../../../components/admin/Tableadmin"
        import { Detailadmin } from "../../../components/admin/Detailadmin"
        import { Formadmin } from "../../../components/admin/Formadmin"
        
        
        export interface AdminadminPageProps extends IAppState {
        
        }
        
        export class AdminadminPage extends React.Component<AdminadminPageProps, never> {
            constructor(props: AdminadminPageProps) {
                super(props)
            }
        
            componentDidMount() {
                this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zeroadminEntityData() } }))
            }
        
            componentDidUpdate(prevProps: AdminadminPageProps) {
                if (routeHasChanged(prevProps.route.match.params, this.props.route.match.params)) {
                    this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zeroadminEntityData() } }))
                }
            }
        
            render() {
                if (this.props.appState.page.kind != 'admin') return null

                let current_permission = this.props.appState.page.sidePanelState.get('admin')

                // Nested routing could also be applied here.
                return <>
                    {current_permission && current_permission.can_view && !this.props.route.match.params.id && !this.props.route.match.params.action && <Tableadmin {...this.props} />}
        
                    {current_permission && current_permission.can_view && this.props.route.match.params.id && this.props.route.match.params.action == 'view' && <Detailadmin {...this.props} />}
        
                    {(this.props.route.match.params.id && this.props.route.match.params.action == 'edit' || this.props.route.match.params.action == 'create') && <Formadmin {...this.props} />}
         
                </>
            }
        }
        