
        import * as React from "react"
import { NavLink } from "react-router-dom";
import { AppState, IAppState } from "../../AppState";
import FormMaster from "../../FormBuilder/components/FormMaster";
import { Func } from "../../FormBuilder/utils/Func";
import { omitOne } from "../../FormBuilder/utils/Omit";
import { customer } from "../../models/customer";
import { loadedAsyncState, loadingAsyncState, unloadedAsyncState } from "../../utils";
import { setCurrent_customer } from "../AdminFrontend/AdminData";
import { AsyncLoader } from "../shared/AsyncLoader";
import { Defaultcustomer } from "./Defaultcustomer";
import { createcustomer, getcustomerById, updatecustomer } from "./customer.api";

interface customerFormProps extends IAppState {

}

const setFormData = (mode: 'edit' | 'create', key: string, value: any) => (s1: AppState): AppState => {
    if (s1.page.kind != 'admin') return s1
    if (s1.page.entityData.kind != 'customer') return s1
    if (mode == 'edit') {
        if (s1.page.entityData.currentcustomer.data.kind != 'loaded') return s1
        return {
            ...s1, page: {
                ...s1.page, entityData: {
                    ...s1.page.entityData, currentcustomer: { kind: 'editing', data: loadedAsyncState({ ...s1.page.entityData.currentcustomer.data.value, [key]: value }) }
                }
            }
        }
    }
    return {
        ...s1, page: {
            ...s1.page, entityData: {
                ...s1.page.entityData,
                customerForm: { kind: 'editing', data: { ...s1.page.entityData.customerForm.data, [key]: value } }
            }
        }
    }
}

const submitForm = async (props: customerFormProps) => {
    if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'customer') {
        if (props.route.match.params.action == 'edit') {
            if (props.appState.page.entityData.currentcustomer.data.kind == 'loaded') {
                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'customer') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                currentcustomer: { ...s.page.entityData.currentcustomer, kind: 'updating' }
                            }
                        }
                    })
                })

                let res = await updatecustomer(props.appState.page.entityData.currentcustomer.data.value)

                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'customer') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                customers: unloadedAsyncState(),
                                currentcustomer: { ...s.page.entityData.currentcustomer, kind: res == 200 ? 'updated' : 'update-failed' }
                            }
                        }
                    })
                })
            }
        } else if (props.route.match.params.action == 'create') {
            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'customer') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            customerForm: { ...s.page.entityData.customerForm, kind: 'submitting' }
                        }
                    }
                })
            })

            let res = await createcustomer(omitOne(props.appState.page.entityData.customerForm.data, 'Id'))

            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'customer') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            customerForm: {
                                data: res > 0 ? Defaultcustomer() : s.page.entityData.customerForm.data,
                                kind: res > 0 ? 'submitted' : 'submit-error'
                            }
                        },
                        customers: unloadedAsyncState()
                    }
                })
            })
        }
    }
}

export const Formcustomer = (props: customerFormProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'customer') return <div></div>

    if ((props.appState.page.entityData.currentcustomer.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        props.setState(setCurrent_customer(loadingAsyncState(() => getcustomerById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('customer')

    return <div>
        {
            props.appState.page.entityData.customerForm.kind == 'submitted' && <div className="alert alert-success" role="alert">
                New {props.appState.page.entityData.kind} added succesfully!
            </div>
        }

        {
            props.appState.page.entityData.currentcustomer.kind == 'updated' && <div className="alert alert-success" role="alert">
                {props.appState.page.entityData.kind} has updated succesfully!
        </div>
        }

        {
            (props.appState.page.entityData.currentcustomer.kind == 'update-failed' || props.appState.page.entityData.customerForm.kind == 'submit-error') && <div className="alert alert-warning" role="alert">
                An error occured while submitting form data, nothing is saved!
          </div>
        }

        {(
            (current_permission && current_permission.can_create && props.route.match.params.action == 'create') 
        || (current_permission && current_permission.can_edit && props.route.match.params.action == 'edit')
        )
         && <button className="btn btn-primary"
            onClick={() => submitForm(props)}
            disabled={props.route.match.params.action == 'create' && (props.appState.page.entityData.customerForm.kind == 'unsubmitted' ||
                props.appState.page.entityData.customerForm.kind == 'submitted' ||
                props.appState.page.entityData.customerForm.kind == 'submitting')
            }
        >
            {
                props.route.match.params.action == 'edit' ?
                    "Save edits" : "Create customer"
            }
        </button>}
        {
            current_permission && current_permission.can_view && props.route.match.params.action == 'edit' && props.route.match.params.id &&
            <NavLink className="btn btn-info" to={"/admin/" + props.appState.page.entityData.kind + "/view/" + props.route.match.params.id}>View</NavLink>
        }

        {props.appState.page.entityData.customerForm.kind == 'submitting' && <div>Submitting data...</div>}

        {props.route.match.params.action == 'create' && <h1>Create a new {props.appState.page.entityData.kind}</h1>}

        {props.route.match.params.action == 'edit' && props.appState.page.entityData.currentcustomer.data.kind == 'loaded' && <h1>Currently editing {props.appState.page.entityData.kind}: {props.appState.page.entityData.currentcustomer.data.value.Id}</h1>}


        {
            current_permission && current_permission.can_create && props.route.match.params.action == 'create' ?
                <FormMaster<customer>
                    id_prefix="customer_form"
                    defaultData={[props.appState.page.entityData.customerForm.data]}
                    onChange={(key, newValue, index) => props.setState(setFormData('create', key, newValue))}
                    query={Func(q => q.Select( 'Email',  'FirstName',  'LastName',  'Insertion',  'reg_date', ))}
                />
                :
                current_permission && current_permission.can_edit ?
                <AsyncLoader<customer> async={props.appState.page.entityData.currentcustomer.data}
                    onLoad={res => props.setState(s => {
                        if (s.page.kind != 'admin') return s
                        if (s.page.entityData.kind != 'customer') return s
                        return ({
                            ...s, page: {
                                ...s.page, entityData: {
                                    ...s.page.entityData,
                                    currentcustomer: { ...s.page.entityData.currentcustomer, data: res }
                                }
                            }
                        })
                    })}
                >
                    {props.appState.page.entityData.currentcustomer.data.kind == 'loaded' &&
                        <FormMaster<customer>
                            id_prefix="customer_form"
                            defaultData={[props.appState.page.entityData.currentcustomer.data.value]}
                            onChange={(key, newValue, index) => props.setState(setFormData('edit', key, newValue))}
                            query={Func(q => q.Select( 'Email',  'FirstName',  'LastName',  'Insertion',  'reg_date', ))}
                        />}

                </AsyncLoader>
                :
                <div>Permission denied</div>
        }

    </div>
}
        