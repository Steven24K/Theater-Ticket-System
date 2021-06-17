import * as React from "react"
        import { IAppState } from "../../../AppState"
        import { zeroactorEntityData } from "../../../components/AdminFrontend/AdminData"
        import { routeHasChanged } from "../../../utils"
        import { Tableactor } from "../../../components/actor/Tableactor"
        import { Detailactor } from "../../../components/actor/Detailactor"
        import { Formactor } from "../../../components/actor/Formactor"
        
        
        export interface AdminactorPageProps extends IAppState {
        
        }
        
        export class AdminactorPage extends React.Component<AdminactorPageProps, never> {
            constructor(props: AdminactorPageProps) {
                super(props)
            }
        
            componentDidMount() {
                this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zeroactorEntityData() } }))
            }
        
            componentDidUpdate(prevProps: AdminactorPageProps) {
                if (routeHasChanged(prevProps.route.match.params, this.props.route.match.params)) {
                    this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zeroactorEntityData() } }))
                }
            }
        
            render() {
                if (this.props.appState.page.kind != 'admin') return null

                let current_permission = this.props.appState.page.sidePanelState.get('actor')

                // Nested routing could also be applied here.
                return <>
                    {current_permission && current_permission.can_view && !this.props.route.match.params.id && !this.props.route.match.params.action && <Tableactor {...this.props} />}
        
                    {current_permission && current_permission.can_view && this.props.route.match.params.id && this.props.route.match.params.action == 'view' && <Detailactor {...this.props} />}
        
                    {(this.props.route.match.params.id && this.props.route.match.params.action == 'edit' || this.props.route.match.params.action == 'create') && <Formactor {...this.props} />}
         
                </>
            }
        }
        