import * as React from "react"
        import { IAppState } from "../../../AppState"
        import { zerodate_and_timeEntityData } from "../../../components/AdminFrontend/AdminData"
        import { routeHasChanged } from "../../../utils"
        import { Tabledate_and_time } from "../../../components/date_and_time/Tabledate_and_time"
        import { Detaildate_and_time } from "../../../components/date_and_time/Detaildate_and_time"
        import { Formdate_and_time } from "../../../components/date_and_time/Formdate_and_time"
        
        
        export interface Admindate_and_timePageProps extends IAppState {
        
        }
        
        export class Admindate_and_timePage extends React.Component<Admindate_and_timePageProps, never> {
            constructor(props: Admindate_and_timePageProps) {
                super(props)
            }
        
            componentDidMount() {
                this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerodate_and_timeEntityData() } }))
            }
        
            componentDidUpdate(prevProps: Admindate_and_timePageProps) {
                if (routeHasChanged(prevProps.route.match.params, this.props.route.match.params)) {
                    this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerodate_and_timeEntityData() } }))
                }
            }
        
            render() {
                if (this.props.appState.page.kind != 'admin') return null

                let current_permission = this.props.appState.page.sidePanelState.get('date_and_time')

                // Nested routing could also be applied here.
                return <>
                    {current_permission && current_permission.can_view && !this.props.route.match.params.id && !this.props.route.match.params.action && <Tabledate_and_time {...this.props} />}
        
                    {current_permission && current_permission.can_view && this.props.route.match.params.id && this.props.route.match.params.action == 'view' && <Detaildate_and_time {...this.props} />}
        
                    {(this.props.route.match.params.id && this.props.route.match.params.action == 'edit' || this.props.route.match.params.action == 'create') && <Formdate_and_time {...this.props} />}
         
                </>
            }
        }
        