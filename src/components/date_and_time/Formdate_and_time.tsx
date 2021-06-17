
        import * as React from "react"
import { NavLink } from "react-router-dom";
import { AppState, IAppState } from "../../AppState";
import FormMaster from "../../FormBuilder/components/FormMaster";
import { Func } from "../../FormBuilder/utils/Func";
import { omitOne } from "../../FormBuilder/utils/Omit";
import { date_and_time } from "../../models/date_and_time";
import { loadedAsyncState, loadingAsyncState, unloadedAsyncState } from "../../utils";
import { setCurrent_date_and_time } from "../AdminFrontend/AdminData";
import { AsyncLoader } from "../shared/AsyncLoader";
import { Defaultdate_and_time } from "./Defaultdate_and_time";
import { createdate_and_time, getdate_and_timeById, updatedate_and_time } from "./date_and_time.api";

interface date_and_timeFormProps extends IAppState {

}

const setFormData = (mode: 'edit' | 'create', key: string, value: any) => (s1: AppState): AppState => {
    if (s1.page.kind != 'admin') return s1
    if (s1.page.entityData.kind != 'date_and_time') return s1
    if (mode == 'edit') {
        if (s1.page.entityData.currentdate_and_time.data.kind != 'loaded') return s1
        return {
            ...s1, page: {
                ...s1.page, entityData: {
                    ...s1.page.entityData, currentdate_and_time: { kind: 'editing', data: loadedAsyncState({ ...s1.page.entityData.currentdate_and_time.data.value, [key]: value }) }
                }
            }
        }
    }
    return {
        ...s1, page: {
            ...s1.page, entityData: {
                ...s1.page.entityData,
                date_and_timeForm: { kind: 'editing', data: { ...s1.page.entityData.date_and_timeForm.data, [key]: value } }
            }
        }
    }
}

const submitForm = async (props: date_and_timeFormProps) => {
    if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'date_and_time') {
        if (props.route.match.params.action == 'edit') {
            if (props.appState.page.entityData.currentdate_and_time.data.kind == 'loaded') {
                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'date_and_time') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                currentdate_and_time: { ...s.page.entityData.currentdate_and_time, kind: 'updating' }
                            }
                        }
                    })
                })

                let res = await updatedate_and_time(props.appState.page.entityData.currentdate_and_time.data.value)

                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'date_and_time') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                date_and_times: unloadedAsyncState(),
                                currentdate_and_time: { ...s.page.entityData.currentdate_and_time, kind: res == 200 ? 'updated' : 'update-failed' }
                            }
                        }
                    })
                })
            }
        } else if (props.route.match.params.action == 'create') {
            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'date_and_time') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            date_and_timeForm: { ...s.page.entityData.date_and_timeForm, kind: 'submitting' }
                        }
                    }
                })
            })

            let res = await createdate_and_time(omitOne(props.appState.page.entityData.date_and_timeForm.data, 'Id'))

            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'date_and_time') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            date_and_timeForm: {
                                data: res > 0 ? Defaultdate_and_time() : s.page.entityData.date_and_timeForm.data,
                                kind: res > 0 ? 'submitted' : 'submit-error'
                            }
                        },
                        date_and_times: unloadedAsyncState()
                    }
                })
            })
        }
    }
}

export const Formdate_and_time = (props: date_and_timeFormProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'date_and_time') return <div></div>

    if ((props.appState.page.entityData.currentdate_and_time.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        props.setState(setCurrent_date_and_time(loadingAsyncState(() => getdate_and_timeById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('date_and_time')

    return <div>
        {
            props.appState.page.entityData.date_and_timeForm.kind == 'submitted' && <div className="alert alert-success" role="alert">
                New {props.appState.page.entityData.kind} added succesfully!
            </div>
        }

        {
            props.appState.page.entityData.currentdate_and_time.kind == 'updated' && <div className="alert alert-success" role="alert">
                {props.appState.page.entityData.kind} has updated succesfully!
        </div>
        }

        {
            (props.appState.page.entityData.currentdate_and_time.kind == 'update-failed' || props.appState.page.entityData.date_and_timeForm.kind == 'submit-error') && <div className="alert alert-warning" role="alert">
                An error occured while submitting form data, nothing is saved!
          </div>
        }

        {(
            (current_permission && current_permission.can_create && props.route.match.params.action == 'create') 
        || (current_permission && current_permission.can_edit && props.route.match.params.action == 'edit')
        )
         && <button className="btn btn-primary"
            onClick={() => submitForm(props)}
            disabled={props.route.match.params.action == 'create' && (props.appState.page.entityData.date_and_timeForm.kind == 'unsubmitted' ||
                props.appState.page.entityData.date_and_timeForm.kind == 'submitted' ||
                props.appState.page.entityData.date_and_timeForm.kind == 'submitting')
            }
        >
            {
                props.route.match.params.action == 'edit' ?
                    "Save edits" : "Create date_and_time"
            }
        </button>}
        {
            current_permission && current_permission.can_view && props.route.match.params.action == 'edit' && props.route.match.params.id &&
            <NavLink className="btn btn-info" to={"/admin/" + props.appState.page.entityData.kind + "/view/" + props.route.match.params.id}>View</NavLink>
        }

        {props.appState.page.entityData.date_and_timeForm.kind == 'submitting' && <div>Submitting data...</div>}

        {props.route.match.params.action == 'create' && <h1>Create a new {props.appState.page.entityData.kind}</h1>}

        {props.route.match.params.action == 'edit' && props.appState.page.entityData.currentdate_and_time.data.kind == 'loaded' && <h1>Currently editing {props.appState.page.entityData.kind}: {props.appState.page.entityData.currentdate_and_time.data.value.Id}</h1>}


        {
            current_permission && current_permission.can_create && props.route.match.params.action == 'create' ?
                <FormMaster<date_and_time>
                    id_prefix="date_and_time_form"
                    defaultData={[props.appState.page.entityData.date_and_timeForm.data]}
                    onChange={(key, newValue, index) => props.setState(setFormData('create', key, newValue))}
                    query={Func(q => q.Select( 'Date',  'Time', ))}
                />
                :
                current_permission && current_permission.can_edit ?
                <AsyncLoader<date_and_time> async={props.appState.page.entityData.currentdate_and_time.data}
                    onLoad={res => props.setState(s => {
                        if (s.page.kind != 'admin') return s
                        if (s.page.entityData.kind != 'date_and_time') return s
                        return ({
                            ...s, page: {
                                ...s.page, entityData: {
                                    ...s.page.entityData,
                                    currentdate_and_time: { ...s.page.entityData.currentdate_and_time, data: res }
                                }
                            }
                        })
                    })}
                >
                    {props.appState.page.entityData.currentdate_and_time.data.kind == 'loaded' &&
                        <FormMaster<date_and_time>
                            id_prefix="date_and_time_form"
                            defaultData={[props.appState.page.entityData.currentdate_and_time.data.value]}
                            onChange={(key, newValue, index) => props.setState(setFormData('edit', key, newValue))}
                            query={Func(q => q.Select( 'Date',  'Time', ))}
                        />}

                </AsyncLoader>
                :
                <div>Permission denied</div>
        }

    </div>
}
        