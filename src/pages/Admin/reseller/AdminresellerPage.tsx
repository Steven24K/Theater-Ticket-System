import * as React from "react"
        import { IAppState } from "../../../AppState"
        import { zeroresellerEntityData } from "../../../components/AdminFrontend/AdminData"
        import { routeHasChanged } from "../../../utils"
        import { Tablereseller } from "../../../components/reseller/Tablereseller"
        import { Detailreseller } from "../../../components/reseller/Detailreseller"
        import { Formreseller } from "../../../components/reseller/Formreseller"
        
        
        export interface AdminresellerPageProps extends IAppState {
        
        }
        
        export class AdminresellerPage extends React.Component<AdminresellerPageProps, never> {
            constructor(props: AdminresellerPageProps) {
                super(props)
            }
        
            componentDidMount() {
                this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zeroresellerEntityData() } }))
            }
        
            componentDidUpdate(prevProps: AdminresellerPageProps) {
                if (routeHasChanged(prevProps.route.match.params, this.props.route.match.params)) {
                    this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zeroresellerEntityData() } }))
                }
            }
        
            render() {
                if (this.props.appState.page.kind != 'admin') return null

                let current_permission = this.props.appState.page.sidePanelState.get('reseller')

                // Nested routing could also be applied here.
                return <>
                    {current_permission && current_permission.can_view && !this.props.route.match.params.id && !this.props.route.match.params.action && <Tablereseller {...this.props} />}
        
                    {current_permission && current_permission.can_view && this.props.route.match.params.id && this.props.route.match.params.action == 'view' && <Detailreseller {...this.props} />}
        
                    {(this.props.route.match.params.id && this.props.route.match.params.action == 'edit' || this.props.route.match.params.action == 'create') && <Formreseller {...this.props} />}
         
                </>
            }
        }
        