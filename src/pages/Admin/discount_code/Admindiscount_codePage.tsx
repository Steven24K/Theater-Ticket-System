import * as React from "react"
        import { IAppState } from "../../../AppState"
        import { zerodiscount_codeEntityData } from "../../../components/AdminFrontend/AdminData"
        import { routeHasChanged } from "../../../utils"
        import { Tablediscount_code } from "../../../components/discount_code/Tablediscount_code"
        import { Detaildiscount_code } from "../../../components/discount_code/Detaildiscount_code"
        import { Formdiscount_code } from "../../../components/discount_code/Formdiscount_code"
        
        
        export interface Admindiscount_codePageProps extends IAppState {
        
        }
        
        export class Admindiscount_codePage extends React.Component<Admindiscount_codePageProps, never> {
            constructor(props: Admindiscount_codePageProps) {
                super(props)
            }
        
            componentDidMount() {
                this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerodiscount_codeEntityData() } }))
            }
        
            componentDidUpdate(prevProps: Admindiscount_codePageProps) {
                if (routeHasChanged(prevProps.route.match.params, this.props.route.match.params)) {
                    this.props.setState(s => ({ ...s, page: { ...s.page, entityData: zerodiscount_codeEntityData() } }))
                }
            }
        
            render() {
                if (this.props.appState.page.kind != 'admin') return null

                let current_permission = this.props.appState.page.sidePanelState.get('discount_code')

                // Nested routing could also be applied here.
                return <>
                    {current_permission && current_permission.can_view && !this.props.route.match.params.id && !this.props.route.match.params.action && <Tablediscount_code {...this.props} />}
        
                    {current_permission && current_permission.can_view && this.props.route.match.params.id && this.props.route.match.params.action == 'view' && <Detaildiscount_code {...this.props} />}
        
                    {(this.props.route.match.params.id && this.props.route.match.params.action == 'edit' || this.props.route.match.params.action == 'create') && <Formdiscount_code {...this.props} />}
         
                </>
            }
        }
        