
        import * as React from "react"
import { NavLink } from "react-router-dom";
import { AppState, IAppState } from "../../AppState";
import FormMaster from "../../FormBuilder/components/FormMaster";
import { Func } from "../../FormBuilder/utils/Func";
import { omitOne } from "../../FormBuilder/utils/Omit";
import { theater_show } from "../../models/theater_show";
import { loadedAsyncState, loadingAsyncState, unloadedAsyncState } from "../../utils";
import { setCurrent_theater_show } from "../AdminFrontend/AdminData";
import { AsyncLoader } from "../shared/AsyncLoader";
import { Defaulttheater_show } from "./Defaulttheater_show";
import { createtheater_show, gettheater_showById, updatetheater_show } from "./theater_show.api";

interface theater_showFormProps extends IAppState {

}

const setFormData = (mode: 'edit' | 'create', key: string, value: any) => (s1: AppState): AppState => {
    if (s1.page.kind != 'admin') return s1
    if (s1.page.entityData.kind != 'theater_show') return s1
    if (mode == 'edit') {
        if (s1.page.entityData.currenttheater_show.data.kind != 'loaded') return s1
        return {
            ...s1, page: {
                ...s1.page, entityData: {
                    ...s1.page.entityData, currenttheater_show: { kind: 'editing', data: loadedAsyncState({ ...s1.page.entityData.currenttheater_show.data.value, [key]: value }) }
                }
            }
        }
    }
    return {
        ...s1, page: {
            ...s1.page, entityData: {
                ...s1.page.entityData,
                theater_showForm: { kind: 'editing', data: { ...s1.page.entityData.theater_showForm.data, [key]: value } }
            }
        }
    }
}

const submitForm = async (props: theater_showFormProps) => {
    if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'theater_show') {
        if (props.route.match.params.action == 'edit') {
            if (props.appState.page.entityData.currenttheater_show.data.kind == 'loaded') {
                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'theater_show') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                currenttheater_show: { ...s.page.entityData.currenttheater_show, kind: 'updating' }
                            }
                        }
                    })
                })

                let res = await updatetheater_show(props.appState.page.entityData.currenttheater_show.data.value)

                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'theater_show') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                theater_shows: unloadedAsyncState(),
                                currenttheater_show: { ...s.page.entityData.currenttheater_show, kind: res == 200 ? 'updated' : 'update-failed' }
                            }
                        }
                    })
                })
            }
        } else if (props.route.match.params.action == 'create') {
            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'theater_show') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            theater_showForm: { ...s.page.entityData.theater_showForm, kind: 'submitting' }
                        }
                    }
                })
            })

            let res = await createtheater_show(omitOne(props.appState.page.entityData.theater_showForm.data, 'Id'))

            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'theater_show') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            theater_showForm: {
                                data: res > 0 ? Defaulttheater_show() : s.page.entityData.theater_showForm.data,
                                kind: res > 0 ? 'submitted' : 'submit-error'
                            }
                        },
                        theater_shows: unloadedAsyncState()
                    }
                })
            })
        }
    }
}

export const Formtheater_show = (props: theater_showFormProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'theater_show') return <div></div>

    if ((props.appState.page.entityData.currenttheater_show.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        props.setState(setCurrent_theater_show(loadingAsyncState(() => gettheater_showById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('theater_show')

    return <div>
        {
            props.appState.page.entityData.theater_showForm.kind == 'submitted' && <div className="alert alert-success" role="alert">
                New {props.appState.page.entityData.kind} added succesfully!
            </div>
        }

        {
            props.appState.page.entityData.currenttheater_show.kind == 'updated' && <div className="alert alert-success" role="alert">
                {props.appState.page.entityData.kind} has updated succesfully!
        </div>
        }

        {
            (props.appState.page.entityData.currenttheater_show.kind == 'update-failed' || props.appState.page.entityData.theater_showForm.kind == 'submit-error') && <div className="alert alert-warning" role="alert">
                An error occured while submitting form data, nothing is saved!
          </div>
        }

        {(
            (current_permission && current_permission.can_create && props.route.match.params.action == 'create') 
        || (current_permission && current_permission.can_edit && props.route.match.params.action == 'edit')
        )
         && <button className="btn btn-primary"
            onClick={() => submitForm(props)}
            disabled={props.route.match.params.action == 'create' && (props.appState.page.entityData.theater_showForm.kind == 'unsubmitted' ||
                props.appState.page.entityData.theater_showForm.kind == 'submitted' ||
                props.appState.page.entityData.theater_showForm.kind == 'submitting')
            }
        >
            {
                props.route.match.params.action == 'edit' ?
                    "Save edits" : "Create theater_show"
            }
        </button>}
        {
            current_permission && current_permission.can_view && props.route.match.params.action == 'edit' && props.route.match.params.id &&
            <NavLink className="btn btn-info" to={"/admin/" + props.appState.page.entityData.kind + "/view/" + props.route.match.params.id}>View</NavLink>
        }

        {props.appState.page.entityData.theater_showForm.kind == 'submitting' && <div>Submitting data...</div>}

        {props.route.match.params.action == 'create' && <h1>Create a new {props.appState.page.entityData.kind}</h1>}

        {props.route.match.params.action == 'edit' && props.appState.page.entityData.currenttheater_show.data.kind == 'loaded' && <h1>Currently editing {props.appState.page.entityData.kind}: {props.appState.page.entityData.currenttheater_show.data.value.Id}</h1>}


        {
            current_permission && current_permission.can_create && props.route.match.params.action == 'create' ?
                <FormMaster<theater_show>
                    id_prefix="theater_show_form"
                    defaultData={[props.appState.page.entityData.theater_showForm.data]}
                    onChange={(key, newValue, index) => props.setState(setFormData('create', key, newValue))}
                    query={Func(q => q.Select( 'Title',  'Description',  'Price',  'image_url', ))}
                />
                :
                current_permission && current_permission.can_edit ?
                <AsyncLoader<theater_show> async={props.appState.page.entityData.currenttheater_show.data}
                    onLoad={res => props.setState(s => {
                        if (s.page.kind != 'admin') return s
                        if (s.page.entityData.kind != 'theater_show') return s
                        return ({
                            ...s, page: {
                                ...s.page, entityData: {
                                    ...s.page.entityData,
                                    currenttheater_show: { ...s.page.entityData.currenttheater_show, data: res }
                                }
                            }
                        })
                    })}
                >
                    {props.appState.page.entityData.currenttheater_show.data.kind == 'loaded' &&
                        <FormMaster<theater_show>
                            id_prefix="theater_show_form"
                            defaultData={[props.appState.page.entityData.currenttheater_show.data.value]}
                            onChange={(key, newValue, index) => props.setState(setFormData('edit', key, newValue))}
                            query={Func(q => q.Select( 'Title',  'Description',  'Price',  'image_url', ))}
                        />}

                </AsyncLoader>
                :
                <div>Permission denied</div>
        }

    </div>
}
        