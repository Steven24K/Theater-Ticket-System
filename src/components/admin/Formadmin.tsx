
        import * as React from "react"
import { NavLink } from "react-router-dom";
import { AppState, IAppState } from "../../AppState";
import FormMaster from "../../FormBuilder/components/FormMaster";
import { Func } from "../../FormBuilder/utils/Func";
import { omitOne } from "../../FormBuilder/utils/Omit";
import { admin } from "../../models/admin";
import { loadedAsyncState, loadingAsyncState, unloadedAsyncState } from "../../utils";
import { setCurrent_admin } from "../AdminFrontend/AdminData";
import { AsyncLoader } from "../shared/AsyncLoader";
import { Defaultadmin } from "./Defaultadmin";
import { createadmin, getadminById, updateadmin } from "./admin.api";

interface adminFormProps extends IAppState {

}

const setFormData = (mode: 'edit' | 'create', key: string, value: any) => (s1: AppState): AppState => {
    if (s1.page.kind != 'admin') return s1
    if (s1.page.entityData.kind != 'admin') return s1
    if (mode == 'edit') {
        if (s1.page.entityData.currentadmin.data.kind != 'loaded') return s1
        return {
            ...s1, page: {
                ...s1.page, entityData: {
                    ...s1.page.entityData, currentadmin: { kind: 'editing', data: loadedAsyncState({ ...s1.page.entityData.currentadmin.data.value, [key]: value }) }
                }
            }
        }
    }
    return {
        ...s1, page: {
            ...s1.page, entityData: {
                ...s1.page.entityData,
                adminForm: { kind: 'editing', data: { ...s1.page.entityData.adminForm.data, [key]: value } }
            }
        }
    }
}

const submitForm = async (props: adminFormProps) => {
    if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'admin') {
        if (props.route.match.params.action == 'edit') {
            if (props.appState.page.entityData.currentadmin.data.kind == 'loaded') {
                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'admin') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                currentadmin: { ...s.page.entityData.currentadmin, kind: 'updating' }
                            }
                        }
                    })
                })

                let res = await updateadmin(props.appState.page.entityData.currentadmin.data.value)

                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'admin') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                admins: unloadedAsyncState(),
                                currentadmin: { ...s.page.entityData.currentadmin, kind: res == 200 ? 'updated' : 'update-failed' }
                            }
                        }
                    })
                })
            }
        } else if (props.route.match.params.action == 'create') {
            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'admin') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            adminForm: { ...s.page.entityData.adminForm, kind: 'submitting' }
                        }
                    }
                })
            })

            let res = await createadmin(omitOne(props.appState.page.entityData.adminForm.data, 'Id'))

            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'admin') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            adminForm: {
                                data: res > 0 ? Defaultadmin() : s.page.entityData.adminForm.data,
                                kind: res > 0 ? 'submitted' : 'submit-error'
                            }
                        },
                        admins: unloadedAsyncState()
                    }
                })
            })
        }
    }
}

export const Formadmin = (props: adminFormProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'admin') return <div></div>

    if ((props.appState.page.entityData.currentadmin.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        props.setState(setCurrent_admin(loadingAsyncState(() => getadminById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('admin')

    return <div>
        {
            props.appState.page.entityData.adminForm.kind == 'submitted' && <div className="alert alert-success" role="alert">
                New {props.appState.page.entityData.kind} added succesfully!
            </div>
        }

        {
            props.appState.page.entityData.currentadmin.kind == 'updated' && <div className="alert alert-success" role="alert">
                {props.appState.page.entityData.kind} has updated succesfully!
        </div>
        }

        {
            (props.appState.page.entityData.currentadmin.kind == 'update-failed' || props.appState.page.entityData.adminForm.kind == 'submit-error') && <div className="alert alert-warning" role="alert">
                An error occured while submitting form data, nothing is saved!
          </div>
        }

        {(
            (current_permission && current_permission.can_create && props.route.match.params.action == 'create') 
        || (current_permission && current_permission.can_edit && props.route.match.params.action == 'edit')
        )
         && <button className="btn btn-primary"
            onClick={() => submitForm(props)}
            disabled={props.route.match.params.action == 'create' && (props.appState.page.entityData.adminForm.kind == 'unsubmitted' ||
                props.appState.page.entityData.adminForm.kind == 'submitted' ||
                props.appState.page.entityData.adminForm.kind == 'submitting')
            }
        >
            {
                props.route.match.params.action == 'edit' ?
                    "Save edits" : "Create admin"
            }
        </button>}
        {
            current_permission && current_permission.can_view && props.route.match.params.action == 'edit' && props.route.match.params.id &&
            <NavLink className="btn btn-info" to={"/admin/" + props.appState.page.entityData.kind + "/view/" + props.route.match.params.id}>View</NavLink>
        }

        {props.appState.page.entityData.adminForm.kind == 'submitting' && <div>Submitting data...</div>}

        {props.route.match.params.action == 'create' && <h1>Create a new {props.appState.page.entityData.kind}</h1>}

        {props.route.match.params.action == 'edit' && props.appState.page.entityData.currentadmin.data.kind == 'loaded' && <h1>Currently editing {props.appState.page.entityData.kind}: {props.appState.page.entityData.currentadmin.data.value.Id}</h1>}


        {
            current_permission && current_permission.can_create && props.route.match.params.action == 'create' ?
                <FormMaster<admin>
                    id_prefix="admin_form"
                    defaultData={[props.appState.page.entityData.adminForm.data]}
                    onChange={(key, newValue, index) => props.setState(setFormData('create', key, newValue))}
                    query={Func(q => q.Select( 'Name',  'Password', ))}
                />
                :
                current_permission && current_permission.can_edit ?
                <AsyncLoader<admin> async={props.appState.page.entityData.currentadmin.data}
                    onLoad={res => props.setState(s => {
                        if (s.page.kind != 'admin') return s
                        if (s.page.entityData.kind != 'admin') return s
                        return ({
                            ...s, page: {
                                ...s.page, entityData: {
                                    ...s.page.entityData,
                                    currentadmin: { ...s.page.entityData.currentadmin, data: res }
                                }
                            }
                        })
                    })}
                >
                    {props.appState.page.entityData.currentadmin.data.kind == 'loaded' &&
                        <FormMaster<admin>
                            id_prefix="admin_form"
                            defaultData={[props.appState.page.entityData.currentadmin.data.value]}
                            onChange={(key, newValue, index) => props.setState(setFormData('edit', key, newValue))}
                            query={Func(q => q.Select( 'Name',  'Password', ))}
                        />}

                </AsyncLoader>
                :
                <div>Permission denied</div>
        }

    </div>
}
        