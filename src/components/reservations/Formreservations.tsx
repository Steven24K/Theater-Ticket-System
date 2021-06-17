
        import * as React from "react"
import { NavLink } from "react-router-dom";
import { AppState, IAppState } from "../../AppState";
import FormMaster from "../../FormBuilder/components/FormMaster";
import { Func } from "../../FormBuilder/utils/Func";
import { omitOne } from "../../FormBuilder/utils/Omit";
import { reservations } from "../../models/reservations";
import { loadedAsyncState, loadingAsyncState, unloadedAsyncState } from "../../utils";
import { setCurrent_reservations } from "../AdminFrontend/AdminData";
import { AsyncLoader } from "../shared/AsyncLoader";
import { Defaultreservations } from "./Defaultreservations";
import { createreservations, getreservationsById, updatereservations } from "./reservations.api";

interface reservationsFormProps extends IAppState {

}

const setFormData = (mode: 'edit' | 'create', key: string, value: any) => (s1: AppState): AppState => {
    if (s1.page.kind != 'admin') return s1
    if (s1.page.entityData.kind != 'reservations') return s1
    if (mode == 'edit') {
        if (s1.page.entityData.currentreservations.data.kind != 'loaded') return s1
        return {
            ...s1, page: {
                ...s1.page, entityData: {
                    ...s1.page.entityData, currentreservations: { kind: 'editing', data: loadedAsyncState({ ...s1.page.entityData.currentreservations.data.value, [key]: value }) }
                }
            }
        }
    }
    return {
        ...s1, page: {
            ...s1.page, entityData: {
                ...s1.page.entityData,
                reservationsForm: { kind: 'editing', data: { ...s1.page.entityData.reservationsForm.data, [key]: value } }
            }
        }
    }
}

const submitForm = async (props: reservationsFormProps) => {
    if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'reservations') {
        if (props.route.match.params.action == 'edit') {
            if (props.appState.page.entityData.currentreservations.data.kind == 'loaded') {
                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'reservations') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                currentreservations: { ...s.page.entityData.currentreservations, kind: 'updating' }
                            }
                        }
                    })
                })

                let res = await updatereservations(props.appState.page.entityData.currentreservations.data.value)

                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'reservations') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                reservationss: unloadedAsyncState(),
                                currentreservations: { ...s.page.entityData.currentreservations, kind: res == 200 ? 'updated' : 'update-failed' }
                            }
                        }
                    })
                })
            }
        } else if (props.route.match.params.action == 'create') {
            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'reservations') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            reservationsForm: { ...s.page.entityData.reservationsForm, kind: 'submitting' }
                        }
                    }
                })
            })

            let res = await createreservations(omitOne(props.appState.page.entityData.reservationsForm.data, 'Id'))

            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'reservations') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            reservationsForm: {
                                data: res > 0 ? Defaultreservations() : s.page.entityData.reservationsForm.data,
                                kind: res > 0 ? 'submitted' : 'submit-error'
                            }
                        },
                        reservationss: unloadedAsyncState()
                    }
                })
            })
        }
    }
}

export const Formreservations = (props: reservationsFormProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'reservations') return <div></div>

    if ((props.appState.page.entityData.currentreservations.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        props.setState(setCurrent_reservations(loadingAsyncState(() => getreservationsById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('reservations')

    return <div>
        {
            props.appState.page.entityData.reservationsForm.kind == 'submitted' && <div className="alert alert-success" role="alert">
                New {props.appState.page.entityData.kind} added succesfully!
            </div>
        }

        {
            props.appState.page.entityData.currentreservations.kind == 'updated' && <div className="alert alert-success" role="alert">
                {props.appState.page.entityData.kind} has updated succesfully!
        </div>
        }

        {
            (props.appState.page.entityData.currentreservations.kind == 'update-failed' || props.appState.page.entityData.reservationsForm.kind == 'submit-error') && <div className="alert alert-warning" role="alert">
                An error occured while submitting form data, nothing is saved!
          </div>
        }

        {(
            (current_permission && current_permission.can_create && props.route.match.params.action == 'create') 
        || (current_permission && current_permission.can_edit && props.route.match.params.action == 'edit')
        )
         && <button className="btn btn-primary"
            onClick={() => submitForm(props)}
            disabled={props.route.match.params.action == 'create' && (props.appState.page.entityData.reservationsForm.kind == 'unsubmitted' ||
                props.appState.page.entityData.reservationsForm.kind == 'submitted' ||
                props.appState.page.entityData.reservationsForm.kind == 'submitting')
            }
        >
            {
                props.route.match.params.action == 'edit' ?
                    "Save edits" : "Create reservations"
            }
        </button>}
        {
            current_permission && current_permission.can_view && props.route.match.params.action == 'edit' && props.route.match.params.id &&
            <NavLink className="btn btn-info" to={"/admin/" + props.appState.page.entityData.kind + "/view/" + props.route.match.params.id}>View</NavLink>
        }

        {props.appState.page.entityData.reservationsForm.kind == 'submitting' && <div>Submitting data...</div>}

        {props.route.match.params.action == 'create' && <h1>Create a new {props.appState.page.entityData.kind}</h1>}

        {props.route.match.params.action == 'edit' && props.appState.page.entityData.currentreservations.data.kind == 'loaded' && <h1>Currently editing {props.appState.page.entityData.kind}: {props.appState.page.entityData.currentreservations.data.value.Id}</h1>}


        {
            current_permission && current_permission.can_create && props.route.match.params.action == 'create' ?
                <FormMaster<reservations>
                    id_prefix="reservations_form"
                    defaultData={[props.appState.page.entityData.reservationsForm.data]}
                    onChange={(key, newValue, index) => props.setState(setFormData('create', key, newValue))}
                    query={Func(q => q.Select( 'amount',  'CheckedIn',  'PayementID', ))}
                />
                :
                current_permission && current_permission.can_edit ?
                <AsyncLoader<reservations> async={props.appState.page.entityData.currentreservations.data}
                    onLoad={res => props.setState(s => {
                        if (s.page.kind != 'admin') return s
                        if (s.page.entityData.kind != 'reservations') return s
                        return ({
                            ...s, page: {
                                ...s.page, entityData: {
                                    ...s.page.entityData,
                                    currentreservations: { ...s.page.entityData.currentreservations, data: res }
                                }
                            }
                        })
                    })}
                >
                    {props.appState.page.entityData.currentreservations.data.kind == 'loaded' &&
                        <FormMaster<reservations>
                            id_prefix="reservations_form"
                            defaultData={[props.appState.page.entityData.currentreservations.data.value]}
                            onChange={(key, newValue, index) => props.setState(setFormData('edit', key, newValue))}
                            query={Func(q => q.Select( 'amount',  'CheckedIn',  'PayementID', ))}
                        />}

                </AsyncLoader>
                :
                <div>Permission denied</div>
        }

    </div>
}
        