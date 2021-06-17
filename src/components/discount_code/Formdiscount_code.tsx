
        import * as React from "react"
import { NavLink } from "react-router-dom";
import { AppState, IAppState } from "../../AppState";
import FormMaster from "../../FormBuilder/components/FormMaster";
import { Func } from "../../FormBuilder/utils/Func";
import { omitOne } from "../../FormBuilder/utils/Omit";
import { discount_code } from "../../models/discount_code";
import { loadedAsyncState, loadingAsyncState, unloadedAsyncState } from "../../utils";
import { setCurrent_discount_code } from "../AdminFrontend/AdminData";
import { AsyncLoader } from "../shared/AsyncLoader";
import { Defaultdiscount_code } from "./Defaultdiscount_code";
import { creatediscount_code, getdiscount_codeById, updatediscount_code } from "./discount_code.api";

interface discount_codeFormProps extends IAppState {

}

const setFormData = (mode: 'edit' | 'create', key: string, value: any) => (s1: AppState): AppState => {
    if (s1.page.kind != 'admin') return s1
    if (s1.page.entityData.kind != 'discount_code') return s1
    if (mode == 'edit') {
        if (s1.page.entityData.currentdiscount_code.data.kind != 'loaded') return s1
        return {
            ...s1, page: {
                ...s1.page, entityData: {
                    ...s1.page.entityData, currentdiscount_code: { kind: 'editing', data: loadedAsyncState({ ...s1.page.entityData.currentdiscount_code.data.value, [key]: value }) }
                }
            }
        }
    }
    return {
        ...s1, page: {
            ...s1.page, entityData: {
                ...s1.page.entityData,
                discount_codeForm: { kind: 'editing', data: { ...s1.page.entityData.discount_codeForm.data, [key]: value } }
            }
        }
    }
}

const submitForm = async (props: discount_codeFormProps) => {
    if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'discount_code') {
        if (props.route.match.params.action == 'edit') {
            if (props.appState.page.entityData.currentdiscount_code.data.kind == 'loaded') {
                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'discount_code') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                currentdiscount_code: { ...s.page.entityData.currentdiscount_code, kind: 'updating' }
                            }
                        }
                    })
                })

                let res = await updatediscount_code(props.appState.page.entityData.currentdiscount_code.data.value)

                props.setState(s => {
                    if (s.page.kind != 'admin') return s
                    if (s.page.entityData.kind != 'discount_code') return s
                    return ({
                        ...s, page: {
                            ...s.page, entityData: {
                                ...s.page.entityData,
                                discount_codes: unloadedAsyncState(),
                                currentdiscount_code: { ...s.page.entityData.currentdiscount_code, kind: res == 200 ? 'updated' : 'update-failed' }
                            }
                        }
                    })
                })
            }
        } else if (props.route.match.params.action == 'create') {
            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'discount_code') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            discount_codeForm: { ...s.page.entityData.discount_codeForm, kind: 'submitting' }
                        }
                    }
                })
            })

            let res = await creatediscount_code(omitOne(props.appState.page.entityData.discount_codeForm.data, 'Id'))

            props.setState(s => {
                if (s.page.kind != 'admin') return s
                if (s.page.entityData.kind != 'discount_code') return s
                return ({
                    ...s, page: {
                        ...s.page, entityData: {
                            ...s.page.entityData,
                            discount_codeForm: {
                                data: res > 0 ? Defaultdiscount_code() : s.page.entityData.discount_codeForm.data,
                                kind: res > 0 ? 'submitted' : 'submit-error'
                            }
                        },
                        discount_codes: unloadedAsyncState()
                    }
                })
            })
        }
    }
}

export const Formdiscount_code = (props: discount_codeFormProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'discount_code') return <div></div>

    if ((props.appState.page.entityData.currentdiscount_code.data.kind == 'unloaded') && props.route.match.params.action == 'edit' && props.route.match.params.id && !isNaN(Number(props.route.match.params.id))) {
        props.setState(setCurrent_discount_code(loadingAsyncState(() => getdiscount_codeById(Number(props.route.match.params.id)))))
    }

    let current_permission = props.appState.page.sidePanelState.get('discount_code')

    return <div>
        {
            props.appState.page.entityData.discount_codeForm.kind == 'submitted' && <div className="alert alert-success" role="alert">
                New {props.appState.page.entityData.kind} added succesfully!
            </div>
        }

        {
            props.appState.page.entityData.currentdiscount_code.kind == 'updated' && <div className="alert alert-success" role="alert">
                {props.appState.page.entityData.kind} has updated succesfully!
        </div>
        }

        {
            (props.appState.page.entityData.currentdiscount_code.kind == 'update-failed' || props.appState.page.entityData.discount_codeForm.kind == 'submit-error') && <div className="alert alert-warning" role="alert">
                An error occured while submitting form data, nothing is saved!
          </div>
        }

        {(
            (current_permission && current_permission.can_create && props.route.match.params.action == 'create') 
        || (current_permission && current_permission.can_edit && props.route.match.params.action == 'edit')
        )
         && <button className="btn btn-primary"
            onClick={() => submitForm(props)}
            disabled={props.route.match.params.action == 'create' && (props.appState.page.entityData.discount_codeForm.kind == 'unsubmitted' ||
                props.appState.page.entityData.discount_codeForm.kind == 'submitted' ||
                props.appState.page.entityData.discount_codeForm.kind == 'submitting')
            }
        >
            {
                props.route.match.params.action == 'edit' ?
                    "Save edits" : "Create discount_code"
            }
        </button>}
        {
            current_permission && current_permission.can_view && props.route.match.params.action == 'edit' && props.route.match.params.id &&
            <NavLink className="btn btn-info" to={"/admin/" + props.appState.page.entityData.kind + "/view/" + props.route.match.params.id}>View</NavLink>
        }

        {props.appState.page.entityData.discount_codeForm.kind == 'submitting' && <div>Submitting data...</div>}

        {props.route.match.params.action == 'create' && <h1>Create a new {props.appState.page.entityData.kind}</h1>}

        {props.route.match.params.action == 'edit' && props.appState.page.entityData.currentdiscount_code.data.kind == 'loaded' && <h1>Currently editing {props.appState.page.entityData.kind}: {props.appState.page.entityData.currentdiscount_code.data.value.Id}</h1>}


        {
            current_permission && current_permission.can_create && props.route.match.params.action == 'create' ?
                <FormMaster<discount_code>
                    id_prefix="discount_code_form"
                    defaultData={[props.appState.page.entityData.discount_codeForm.data]}
                    onChange={(key, newValue, index) => props.setState(setFormData('create', key, newValue))}
                    query={Func(q => q.Select( 'Code',  'Expiration_Date',  'Discount', ))}
                />
                :
                current_permission && current_permission.can_edit ?
                <AsyncLoader<discount_code> async={props.appState.page.entityData.currentdiscount_code.data}
                    onLoad={res => props.setState(s => {
                        if (s.page.kind != 'admin') return s
                        if (s.page.entityData.kind != 'discount_code') return s
                        return ({
                            ...s, page: {
                                ...s.page, entityData: {
                                    ...s.page.entityData,
                                    currentdiscount_code: { ...s.page.entityData.currentdiscount_code, data: res }
                                }
                            }
                        })
                    })}
                >
                    {props.appState.page.entityData.currentdiscount_code.data.kind == 'loaded' &&
                        <FormMaster<discount_code>
                            id_prefix="discount_code_form"
                            defaultData={[props.appState.page.entityData.currentdiscount_code.data.value]}
                            onChange={(key, newValue, index) => props.setState(setFormData('edit', key, newValue))}
                            query={Func(q => q.Select( 'Code',  'Expiration_Date',  'Discount', ))}
                        />}

                </AsyncLoader>
                :
                <div>Permission denied</div>
        }

    </div>
}
        