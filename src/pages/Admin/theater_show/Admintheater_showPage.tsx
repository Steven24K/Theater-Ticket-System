import * as React from "react"
        import { IAppState } from "../../../AppState"
        import { zerotheater_showEntityData } from "../../../components/AdminFrontend/AdminData"
        import { routeHasChanged } from "../../../utils"
        import { Tabletheater_show } from "../../../components/theater_show/Tabletheater_show"
        import { Detailtheater_show } from "../../../components/theater_show/Detailtheater_show"
        import { Formtheater_show } from "../../../components/theater_show/Formtheater_show"
        
        
        export interface Admintheater_showPageProps extends IAppState {
        
        }
        
        export class Admintheater_showPage extends React.Component<Admintheater_showPageProps, never> {
            constructor(props: Admintheater_showPageProps) {
                super(props)
            }
        
            componentDidMount() {
                this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerotheater_showEntityData() } }))
            }
        
            componentDidUpdate(prevProps: Admintheater_showPageProps) {
                if (routeHasChanged(prevProps.route.match.params, this.props.route.match.params)) {
                    this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerotheater_showEntityData() } }))
                }
            }
        
            render() {
                if (this.props.appState.page.kind != 'admin') return null

                let current_permission = this.props.appState.page.sidePanelState.get('theater_show')

                // Nested routing could also be applied here.
                return <>
                    {current_permission && current_permission.can_view && !this.props.route.match.params.id && !this.props.route.match.params.action && <Tabletheater_show {...this.props} />}
        
                    {current_permission && current_permission.can_view && this.props.route.match.params.id && this.props.route.match.params.action == 'view' && <Detailtheater_show {...this.props} />}
        
                    {(this.props.route.match.params.id && this.props.route.match.params.action == 'edit' || this.props.route.match.params.action == 'create') && <Formtheater_show {...this.props} />}
         
                </>
            }
        }
        