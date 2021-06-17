import * as React from "react"
        import { IAppState } from "../../../AppState"
        import { zerolinkEntityData } from "../../../components/AdminFrontend/AdminData"
        import { routeHasChanged } from "../../../utils"
        import { Tablelink } from "../../../components/link/Tablelink"
        import { Detaillink } from "../../../components/link/Detaillink"
        import { Formlink } from "../../../components/link/Formlink"
        
        
        export interface AdminlinkPageProps extends IAppState {
        
        }
        
        export class AdminlinkPage extends React.Component<AdminlinkPageProps, never> {
            constructor(props: AdminlinkPageProps) {
                super(props)
            }
        
            componentDidMount() {
                this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerolinkEntityData() } }))
            }
        
            componentDidUpdate(prevProps: AdminlinkPageProps) {
                if (routeHasChanged(prevProps.route.match.params, this.props.route.match.params)) {
                    this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerolinkEntityData() } }))
                }
            }
        
            render() {
                if (this.props.appState.page.kind != 'admin') return null

                let current_permission = this.props.appState.page.sidePanelState.get('link')

                // Nested routing could also be applied here.
                return <>
                    {current_permission && current_permission.can_view && !this.props.route.match.params.id && !this.props.route.match.params.action && <Tablelink {...this.props} />}
        
                    {current_permission && current_permission.can_view && this.props.route.match.params.id && this.props.route.match.params.action == 'view' && <Detaillink {...this.props} />}
        
                    {(this.props.route.match.params.id && this.props.route.match.params.action == 'edit' || this.props.route.match.params.action == 'create') && <Formlink {...this.props} />}
         
                </>
            }
        }
        