
        import * as React from "react"
import { NavLink } from "react-router-dom";
import { AppState, IAppState } from "../../AppState";
import FormMaster from "../../FormBuilder/components/FormMaster";
import { Func } from "../../FormBuilder/utils/Func";
import { omitOne } from "../../FormBuilder/utils/Omit";
import { location } from "../../models/location";
import { loadedAsyncState, loadingAsyncState, unloadedAsyncState } from "../../utils";
import { setCurrent_location } from "../AdminFrontend/AdminData";
import { AsyncLoader } from "../shared/AsyncLoader";
import { Defaultlocation } from "./Defaultlocation";
import { createlocation, getlocationById, updatelocation } from "./location.api";

interface locationFormProps extends IAppState {

}

const setFormData = (mode: 'edit' | 'create', key: string, value: any) => (s1: AppState): AppState => {
    if (s1.page.kind != 'admin') return s1
    if (s1.page.entityData.kind != 'location') return s1
    if (mode == 'edit') {
        if (s1.page.entityData.currentlocation.data.kind != 'loaded') return s1
        return {
            ...s1, page: {
                ...s1.page, entityData: {
                    ...s1.page.entityData, currentlocation: { kind: 'editing', data: loadedAsyncState({ ...s1.page.entityData.currentlocation.data.value, [key]: value }) }
                }
            }
        }
    }
    return {
        ...s1, page: {
            ...s1.page, entityData: {
                ...s1.page.entityData,
                locationForm: { kind: 'editing', data: { ...s1.page.entityData.locationForm.data, [key]: value } }
            }
        }
    }
}

const submitForm = async (props: locationFormProps) => {
    if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'location') {
        if (props.route.match.params.action == 'edit') {
            if (props.appState.page.entityData.currentlocation.data.kind == 'loaded') {
                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'location') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                currentlocation: { ...s.page.entityData.currentlocation, kind: 'updating' }
                            }
                        }
                    })
                })

                let res = await updatelocation(props.appState.page.entityData.currentlocation.data.value)

                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'location') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                locations: unloadedAsyncState(),
                                currentlocation: { ...s.page.entityData.currentlocation, kind: res == 200 ? 'updated' : 'update-failed' }
                            }
                        }
                    })
                })
            }
        } else if (props.route.match.params.action == 'create') {
            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'location') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            locationForm: { ...s.page.entityData.locationForm, kind: 'submitting' }
                        }
                    }
                })
            })

            let res = await createlocation(omitOne(props.appState.page.entityData.locationForm.data, 'Id'))

            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'location') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            locationForm: {
                                data: res > 0 ? Defaultlocation() : s.page.entityData.locationForm.data,
                                kind: res > 0 ? 'submitted' : 'submit-error'
                            }
                        },
                        locations: unloadedAsyncState()
                    }
                })
            })
        }
    }
}

export const Formlocation = (props: locationFormProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'location') return <div></div>

    if ((props.appState.page.entityData.currentlocation.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        props.setState(setCurrent_location(loadingAsyncState(() => getlocationById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('location')

    return <div>
        {
            props.appState.page.entityData.locationForm.kind == 'submitted' && <div className="alert alert-success" role="alert">
                New {props.appState.page.entityData.kind} added succesfully!
            </div>
        }

        {
            props.appState.page.entityData.currentlocation.kind == 'updated' && <div className="alert alert-success" role="alert">
                {props.appState.page.entityData.kind} has updated succesfully!
        </div>
        }

        {
            (props.appState.page.entityData.currentlocation.kind == 'update-failed' || props.appState.page.entityData.locationForm.kind == 'submit-error') && <div className="alert alert-warning" role="alert">
                An error occured while submitting form data, nothing is saved!
          </div>
        }

        {(
            (current_permission && current_permission.can_create && props.route.match.params.action == 'create') 
        || (current_permission && current_permission.can_edit && props.route.match.params.action == 'edit')
        )
         && <button className="btn btn-primary"
            onClick={() => submitForm(props)}
            disabled={props.route.match.params.action == 'create' && (props.appState.page.entityData.locationForm.kind == 'unsubmitted' ||
                props.appState.page.entityData.locationForm.kind == 'submitted' ||
                props.appState.page.entityData.locationForm.kind == 'submitting')
            }
        >
            {
                props.route.match.params.action == 'edit' ?
                    "Save edits" : "Create location"
            }
        </button>}
        {
            current_permission && current_permission.can_view && props.route.match.params.action == 'edit' && props.route.match.params.id &&
            <NavLink className="btn btn-info" to={"/admin/" + props.appState.page.entityData.kind + "/view/" + props.route.match.params.id}>View</NavLink>
        }

        {props.appState.page.entityData.locationForm.kind == 'submitting' && <div>Submitting data...</div>}

        {props.route.match.params.action == 'create' && <h1>Create a new {props.appState.page.entityData.kind}</h1>}

        {props.route.match.params.action == 'edit' && props.appState.page.entityData.currentlocation.data.kind == 'loaded' && <h1>Currently editing {props.appState.page.entityData.kind}: {props.appState.page.entityData.currentlocation.data.value.Id}</h1>}


        {
            current_permission && current_permission.can_create && props.route.match.params.action == 'create' ?
                <FormMaster<location>
                    id_prefix="location_form"
                    defaultData={[props.appState.page.entityData.locationForm.data]}
                    onChange={(key, newValue, index) => props.setState(setFormData('create', key, newValue))}
                    query={Func(q => q.Select( 'Name',  'Capacity',  'Adress',  'PostalCode',  'City',  'GMapLink', ))}
                />
                :
                current_permission && current_permission.can_edit ?
                <AsyncLoader<location> async={props.appState.page.entityData.currentlocation.data}
                    onLoad={res => props.setState(s => {
                        if (s.page.kind != 'admin') return s
                        if (s.page.entityData.kind != 'location') return s
                        return ({
                            ...s, page: {
                                ...s.page, entityData: {
                                    ...s.page.entityData,
                                    currentlocation: { ...s.page.entityData.currentlocation, data: res }
                                }
                            }
                        })
                    })}
                >
                    {props.appState.page.entityData.currentlocation.data.kind == 'loaded' &&
                        <FormMaster<location>
                            id_prefix="location_form"
                            defaultData={[props.appState.page.entityData.currentlocation.data.value]}
                            onChange={(key, newValue, index) => props.setState(setFormData('edit', key, newValue))}
                            query={Func(q => q.Select( 'Name',  'Capacity',  'Adress',  'PostalCode',  'City',  'GMapLink', ))}
                        />}

                </AsyncLoader>
                :
                <div>Permission denied</div>
        }

    </div>
}
        