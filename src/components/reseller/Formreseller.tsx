
        import * as React from "react"
import { NavLink } from "react-router-dom";
import { AppState, IAppState } from "../../AppState";
import FormMaster from "../../FormBuilder/components/FormMaster";
import { Func } from "../../FormBuilder/utils/Func";
import { omitOne } from "../../FormBuilder/utils/Omit";
import { reseller } from "../../models/reseller";
import { loadedAsyncState, loadingAsyncState, unloadedAsyncState } from "../../utils";
import { setCurrent_reseller } from "../AdminFrontend/AdminData";
import { AsyncLoader } from "../shared/AsyncLoader";
import { Defaultreseller } from "./Defaultreseller";
import { createreseller, getresellerById, updatereseller } from "./reseller.api";

interface resellerFormProps extends IAppState {

}

const setFormData = (mode: 'edit' | 'create', key: string, value: any) => (s1: AppState): AppState => {
    if (s1.page.kind != 'admin') return s1
    if (s1.page.entityData.kind != 'reseller') return s1
    if (mode == 'edit') {
        if (s1.page.entityData.currentreseller.data.kind != 'loaded') return s1
        return {
            ...s1, page: {
                ...s1.page, entityData: {
                    ...s1.page.entityData, currentreseller: { kind: 'editing', data: loadedAsyncState({ ...s1.page.entityData.currentreseller.data.value, [key]: value }) }
                }
            }
        }
    }
    return {
        ...s1, page: {
            ...s1.page, entityData: {
                ...s1.page.entityData,
                resellerForm: { kind: 'editing', data: { ...s1.page.entityData.resellerForm.data, [key]: value } }
            }
        }
    }
}

const submitForm = async (props: resellerFormProps) => {
    if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'reseller') {
        if (props.route.match.params.action == 'edit') {
            if (props.appState.page.entityData.currentreseller.data.kind == 'loaded') {
                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'reseller') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                currentreseller: { ...s.page.entityData.currentreseller, kind: 'updating' }
                            }
                        }
                    })
                })

                let res = await updatereseller(props.appState.page.entityData.currentreseller.data.value)

                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'reseller') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                resellers: unloadedAsyncState(),
                                currentreseller: { ...s.page.entityData.currentreseller, kind: res == 200 ? 'updated' : 'update-failed' }
                            }
                        }
                    })
                })
            }
        } else if (props.route.match.params.action == 'create') {
            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'reseller') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            resellerForm: { ...s.page.entityData.resellerForm, kind: 'submitting' }
                        }
                    }
                })
            })

            let res = await createreseller(omitOne(props.appState.page.entityData.resellerForm.data, 'Id'))

            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'reseller') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            resellerForm: {
                                data: res > 0 ? Defaultreseller() : s.page.entityData.resellerForm.data,
                                kind: res > 0 ? 'submitted' : 'submit-error'
                            }
                        },
                        resellers: unloadedAsyncState()
                    }
                })
            })
        }
    }
}

export const Formreseller = (props: resellerFormProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'reseller') return <div></div>

    if ((props.appState.page.entityData.currentreseller.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        props.setState(setCurrent_reseller(loadingAsyncState(() => getresellerById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('reseller')

    return <div>
        {
            props.appState.page.entityData.resellerForm.kind == 'submitted' && <div className="alert alert-success" role="alert">
                New {props.appState.page.entityData.kind} added succesfully!
            </div>
        }

        {
            props.appState.page.entityData.currentreseller.kind == 'updated' && <div className="alert alert-success" role="alert">
                {props.appState.page.entityData.kind} has updated succesfully!
        </div>
        }

        {
            (props.appState.page.entityData.currentreseller.kind == 'update-failed' || props.appState.page.entityData.resellerForm.kind == 'submit-error') && <div className="alert alert-warning" role="alert">
                An error occured while submitting form data, nothing is saved!
          </div>
        }

        {(
            (current_permission && current_permission.can_create && props.route.match.params.action == 'create') 
        || (current_permission && current_permission.can_edit && props.route.match.params.action == 'edit')
        )
         && <button className="btn btn-primary"
            onClick={() => submitForm(props)}
            disabled={props.route.match.params.action == 'create' && (props.appState.page.entityData.resellerForm.kind == 'unsubmitted' ||
                props.appState.page.entityData.resellerForm.kind == 'submitted' ||
                props.appState.page.entityData.resellerForm.kind == 'submitting')
            }
        >
            {
                props.route.match.params.action == 'edit' ?
                    "Save edits" : "Create reseller"
            }
        </button>}
        {
            current_permission && current_permission.can_view && props.route.match.params.action == 'edit' && props.route.match.params.id &&
            <NavLink className="btn btn-info" to={"/admin/" + props.appState.page.entityData.kind + "/view/" + props.route.match.params.id}>View</NavLink>
        }

        {props.appState.page.entityData.resellerForm.kind == 'submitting' && <div>Submitting data...</div>}

        {props.route.match.params.action == 'create' && <h1>Create a new {props.appState.page.entityData.kind}</h1>}

        {props.route.match.params.action == 'edit' && props.appState.page.entityData.currentreseller.data.kind == 'loaded' && <h1>Currently editing {props.appState.page.entityData.kind}: {props.appState.page.entityData.currentreseller.data.value.Id}</h1>}


        {
            current_permission && current_permission.can_create && props.route.match.params.action == 'create' ?
                <FormMaster<reseller>
                    id_prefix="reseller_form"
                    defaultData={[props.appState.page.entityData.resellerForm.data]}
                    onChange={(key, newValue, index) => props.setState(setFormData('create', key, newValue))}
                    query={Func(q => q.Select( 'Name',  'Password', ))}
                />
                :
                current_permission && current_permission.can_edit ?
                <AsyncLoader<reseller> async={props.appState.page.entityData.currentreseller.data}
                    onLoad={res => props.setState(s => {
                        if (s.page.kind != 'admin') return s
                        if (s.page.entityData.kind != 'reseller') return s
                        return ({
                            ...s, page: {
                                ...s.page, entityData: {
                                    ...s.page.entityData,
                                    currentreseller: { ...s.page.entityData.currentreseller, data: res }
                                }
                            }
                        })
                    })}
                >
                    {props.appState.page.entityData.currentreseller.data.kind == 'loaded' &&
                        <FormMaster<reseller>
                            id_prefix="reseller_form"
                            defaultData={[props.appState.page.entityData.currentreseller.data.value]}
                            onChange={(key, newValue, index) => props.setState(setFormData('edit', key, newValue))}
                            query={Func(q => q.Select( 'Name',  'Password', ))}
                        />}

                </AsyncLoader>
                :
                <div>Permission denied</div>
        }

    </div>
}
        