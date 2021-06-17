import * as React from "react"
        import { IAppState } from "../../../AppState"
        import { zerocustomerEntityData } from "../../../components/AdminFrontend/AdminData"
        import { routeHasChanged } from "../../../utils"
        import { Tablecustomer } from "../../../components/customer/Tablecustomer"
        import { Detailcustomer } from "../../../components/customer/Detailcustomer"
        import { Formcustomer } from "../../../components/customer/Formcustomer"
        
        
        export interface AdmincustomerPageProps extends IAppState {
        
        }
        
        export class AdmincustomerPage extends React.Component<AdmincustomerPageProps, never> {
            constructor(props: AdmincustomerPageProps) {
                super(props)
            }
        
            componentDidMount() {
                this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerocustomerEntityData() } }))
            }
        
            componentDidUpdate(prevProps: AdmincustomerPageProps) {
                if (routeHasChanged(prevProps.route.match.params, this.props.route.match.params)) {
                    this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerocustomerEntityData() } }))
                }
            }
        
            render() {
                if (this.props.appState.page.kind != 'admin') return null

                let current_permission = this.props.appState.page.sidePanelState.get('customer')

                // Nested routing could also be applied here.
                return <>
                    {current_permission && current_permission.can_view && !this.props.route.match.params.id && !this.props.route.match.params.action && <Tablecustomer {...this.props} />}
        
                    {current_permission && current_permission.can_view && this.props.route.match.params.id && this.props.route.match.params.action == 'view' && <Detailcustomer {...this.props} />}
        
                    {(this.props.route.match.params.id && this.props.route.match.params.action == 'edit' || this.props.route.match.params.action == 'create') && <Formcustomer {...this.props} />}
         
                </>
            }
        }
        