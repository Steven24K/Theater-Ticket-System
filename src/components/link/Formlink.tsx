
        import * as React from "react"
import { NavLink } from "react-router-dom";
import { AppState, IAppState } from "../../AppState";
import FormMaster from "../../FormBuilder/components/FormMaster";
import { Func } from "../../FormBuilder/utils/Func";
import { omitOne } from "../../FormBuilder/utils/Omit";
import { link } from "../../models/link";
import { loadedAsyncState, loadingAsyncState, unloadedAsyncState } from "../../utils";
import { setCurrent_link } from "../AdminFrontend/AdminData";
import { AsyncLoader } from "../shared/AsyncLoader";
import { Defaultlink } from "./Defaultlink";
import { createlink, getlinkById, updatelink } from "./link.api";

interface linkFormProps extends IAppState {

}

const setFormData = (mode: 'edit' | 'create', key: string, value: any) => (s1: AppState): AppState => {
    if (s1.page.kind != 'admin') return s1
    if (s1.page.entityData.kind != 'link') return s1
    if (mode == 'edit') {
        if (s1.page.entityData.currentlink.data.kind != 'loaded') return s1
        return {
            ...s1, page: {
                ...s1.page, entityData: {
                    ...s1.page.entityData, currentlink: { kind: 'editing', data: loadedAsyncState({ ...s1.page.entityData.currentlink.data.value, [key]: value }) }
                }
            }
        }
    }
    return {
        ...s1, page: {
            ...s1.page, entityData: {
                ...s1.page.entityData,
                linkForm: { kind: 'editing', data: { ...s1.page.entityData.linkForm.data, [key]: value } }
            }
        }
    }
}

const submitForm = async (props: linkFormProps) => {
    if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'link') {
        if (props.route.match.params.action == 'edit') {
            if (props.appState.page.entityData.currentlink.data.kind == 'loaded') {
                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'link') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                currentlink: { ...s.page.entityData.currentlink, kind: 'updating' }
                            }
                        }
                    })
                })

                let res = await updatelink(props.appState.page.entityData.currentlink.data.value)

                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'link') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                links: unloadedAsyncState(),
                                currentlink: { ...s.page.entityData.currentlink, kind: res == 200 ? 'updated' : 'update-failed' }
                            }
                        }
                    })
                })
            }
        } else if (props.route.match.params.action == 'create') {
            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'link') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            linkForm: { ...s.page.entityData.linkForm, kind: 'submitting' }
                        }
                    }
                })
            })

            let res = await createlink(omitOne(props.appState.page.entityData.linkForm.data, 'Id'))

            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'link') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            linkForm: {
                                data: res > 0 ? Defaultlink() : s.page.entityData.linkForm.data,
                                kind: res > 0 ? 'submitted' : 'submit-error'
                            }
                        },
                        links: unloadedAsyncState()
                    }
                })
            })
        }
    }
}

export const Formlink = (props: linkFormProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'link') return <div></div>

    if ((props.appState.page.entityData.currentlink.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        props.setState(setCurrent_link(loadingAsyncState(() => getlinkById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('link')

    return <div>
        {
            props.appState.page.entityData.linkForm.kind == 'submitted' && <div className="alert alert-success" role="alert">
                New {props.appState.page.entityData.kind} added succesfully!
            </div>
        }

        {
            props.appState.page.entityData.currentlink.kind == 'updated' && <div className="alert alert-success" role="alert">
                {props.appState.page.entityData.kind} has updated succesfully!
        </div>
        }

        {
            (props.appState.page.entityData.currentlink.kind == 'update-failed' || props.appState.page.entityData.linkForm.kind == 'submit-error') && <div className="alert alert-warning" role="alert">
                An error occured while submitting form data, nothing is saved!
          </div>
        }

        {(
            (current_permission && current_permission.can_create && props.route.match.params.action == 'create') 
        || (current_permission && current_permission.can_edit && props.route.match.params.action == 'edit')
        )
         && <button className="btn btn-primary"
            onClick={() => submitForm(props)}
            disabled={props.route.match.params.action == 'create' && (props.appState.page.entityData.linkForm.kind == 'unsubmitted' ||
                props.appState.page.entityData.linkForm.kind == 'submitted' ||
                props.appState.page.entityData.linkForm.kind == 'submitting')
            }
        >
            {
                props.route.match.params.action == 'edit' ?
                    "Save edits" : "Create link"
            }
        </button>}
        {
            current_permission && current_permission.can_view && props.route.match.params.action == 'edit' && props.route.match.params.id &&
            <NavLink className="btn btn-info" to={"/admin/" + props.appState.page.entityData.kind + "/view/" + props.route.match.params.id}>View</NavLink>
        }

        {props.appState.page.entityData.linkForm.kind == 'submitting' && <div>Submitting data...</div>}

        {props.route.match.params.action == 'create' && <h1>Create a new {props.appState.page.entityData.kind}</h1>}

        {props.route.match.params.action == 'edit' && props.appState.page.entityData.currentlink.data.kind == 'loaded' && <h1>Currently editing {props.appState.page.entityData.kind}: {props.appState.page.entityData.currentlink.data.value.Id}</h1>}


        {
            current_permission && current_permission.can_create && props.route.match.params.action == 'create' ?
                <FormMaster<link>
                    id_prefix="link_form"
                    defaultData={[props.appState.page.entityData.linkForm.data]}
                    onChange={(key, newValue, index) => props.setState(setFormData('create', key, newValue))}
                    query={Func(q => q.Select( 'Text',  'Url', ))}
                />
                :
                current_permission && current_permission.can_edit ?
                <AsyncLoader<link> async={props.appState.page.entityData.currentlink.data}
                    onLoad={res => props.setState(s => {
                        if (s.page.kind != 'admin') return s
                        if (s.page.entityData.kind != 'link') return s
                        return ({
                            ...s, page: {
                                ...s.page, entityData: {
                                    ...s.page.entityData,
                                    currentlink: { ...s.page.entityData.currentlink, data: res }
                                }
                            }
                        })
                    })}
                >
                    {props.appState.page.entityData.currentlink.data.kind == 'loaded' &&
                        <FormMaster<link>
                            id_prefix="link_form"
                            defaultData={[props.appState.page.entityData.currentlink.data.value]}
                            onChange={(key, newValue, index) => props.setState(setFormData('edit', key, newValue))}
                            query={Func(q => q.Select( 'Text',  'Url', ))}
                        />}

                </AsyncLoader>
                :
                <div>Permission denied</div>
        }

    </div>
}
        