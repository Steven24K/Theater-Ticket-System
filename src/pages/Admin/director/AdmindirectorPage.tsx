import * as React from "react"
        import { IAppState } from "../../../AppState"
        import { zerodirectorEntityData } from "../../../components/AdminFrontend/AdminData"
        import { routeHasChanged } from "../../../utils"
        import { Tabledirector } from "../../../components/director/Tabledirector"
        import { Detaildirector } from "../../../components/director/Detaildirector"
        import { Formdirector } from "../../../components/director/Formdirector"
        
        
        export interface AdmindirectorPageProps extends IAppState {
        
        }
        
        export class AdmindirectorPage extends React.Component<AdmindirectorPageProps, never> {
            constructor(props: AdmindirectorPageProps) {
                super(props)
            }
        
            componentDidMount() {
                this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerodirectorEntityData() } }))
            }
        
            componentDidUpdate(prevProps: AdmindirectorPageProps) {
                if (routeHasChanged(prevProps.route.match.params, this.props.route.match.params)) {
                    this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerodirectorEntityData() } }))
                }
            }
        
            render() {
                if (this.props.appState.page.kind != 'admin') return null

                let current_permission = this.props.appState.page.sidePanelState.get('director')

                // Nested routing could also be applied here.
                return <>
                    {current_permission && current_permission.can_view && !this.props.route.match.params.id && !this.props.route.match.params.action && <Tabledirector {...this.props} />}
        
                    {current_permission && current_permission.can_view && this.props.route.match.params.id && this.props.route.match.params.action == 'view' && <Detaildirector {...this.props} />}
        
                    {(this.props.route.match.params.id && this.props.route.match.params.action == 'edit' || this.props.route.match.params.action == 'create') && <Formdirector {...this.props} />}
         
                </>
            }
        }
        