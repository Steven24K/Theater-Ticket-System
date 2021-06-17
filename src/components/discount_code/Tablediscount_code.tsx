
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { discount_code } from "../../models/discount_code"
import { loadingAsyncState, none, some, unloadedAsyncState } from "../../utils"
import { set_discount_codes } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { Loader } from "../shared/Loader"
import { Modal } from "../shared/Modal/Modal"
import { deletediscount_code, get_discount_codes } from "./discount_code.api"

interface discount_codeTableProps extends IAppState {

}

export const Tablediscount_code = (props: discount_codeTableProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'discount_code') return <div></div>

    let current_permission = props.appState.page.sidePanelState.get('discount_code')

    if (props.appState.page.entityData.discount_codes.kind == 'unloaded') {
        props.setState(set_discount_codes(loadingAsyncState(() => get_discount_codes())))
    }

    return <div className="card mb-4">
        <div className="card-header">
            <i className="fas fa-table mr-1"></i>
            {props.appState.page.entityData.kind}
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <AsyncLoader<discount_code[]> async={props.appState.page.entityData.discount_codes}
                    onLoad={(res) => props.setState(set_discount_codes(res))}
                >
                    {props.appState.page.entityData.discount_codes.kind == 'loaded' ?
                        props.appState.page.entityData.discount_codes.value.length > 0 ?
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Code</th>
<th>Expiration_Date</th>
<th>Discount</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.appState.page.entityData.discount_codes.value.map(entity => <tr key={entity.Id}>
                                            <td><NavLink to={"/admin/discount_code/view/" + entity.Id}>{entity.Id}</NavLink></td>
                                            <td>{entity.Code}</td>
<td>{entity.Expiration_Date}</td>
<td>{entity.Discount}</td>

                                            <td className="right">
                                                <ul className='entity-modifiers'>
                                                    <li><NavLink to={"/admin/discount_code/view/"+ entity.Id}>Detail</NavLink></li>
                                                    {current_permission && current_permission.can_edit && <li><NavLink to={"/admin/discount_code/edit/" + entity.Id}>Edit</NavLink></li>}
                                                    {current_permission && current_permission.can_delete && <li><a role="button" className='danger' onClick={async () => {
                                                        props.setState(s => {
                                                            if (s.page.kind != 'admin') return s
                                                            if (s.page.entityData.kind != 'discount_code') return s
                                                            return ({
                                                                ...s, page: {
                                                                    ...s.page, entityData: {
                                                                        ...s.page.entityData,
                                                                        discount_codeToDelete: some(entity)
                                                                    }
                                                                }
                                                            })
                                                        })
                                                    }}>Delete</a></li>}
                                                </ul>
                                            </td>
                                        </tr>)

                                    }
                                </tbody>
                            </table>
                            :
                            <div>
                                <h2>No data</h2>
                                <NavLink to={"/admin/discount_code/create"} role="button" className="btn btn-primary">
                                    Create some discount_code
                                </NavLink>
                            </div>
                        : <Loader />}

                    <Modal title={"Are you sure you want to delete this entity?"}
                        show={props.appState.page.entityData.discount_codeToDelete.kind == 'some'}
                        onCancel={() => props.setState(s => {
                            if (s.page.kind != 'admin') return s
                            return ({ ...s, page: { ...s.page, entityData: { ...s.page.entityData, discount_codeToDelete: none() } } })
                        })}
                        onOkay={async () => {
                            if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'discount_code' && props.appState.page.entityData.discount_codeToDelete.kind == 'some') {
                                await deletediscount_code(props.appState.page.entityData.discount_codeToDelete.value.Id)
                                props.setState(s => {
                                    if (s.page.kind != 'admin') return s
                                    if (s.page.entityData.kind != 'discount_code') return s
                                    return ({
                                        ...s, page: {
                                            ...s.page, entityData: {
                                                ...s.page.entityData,
                                                discount_codeToDelete: none(),
                                                discount_codes: unloadedAsyncState()
                                            }
                                        }
                                    })
                                })
                            }
                        }}
                        okayText="Delete"
                        cancelText='Cancel'
                        cancelRole='success'
                        okayRole='danger'
                    >

                        {props.appState.page.entityData.discount_codeToDelete.kind == 'some' && <div>
                            <h5>You're about to delete:</h5>
                            <p>
                                <ul>
                                    <li><b>Id: </b>{props.appState.page.entityData.discount_codeToDelete.value.Id}</li>
                                    <li><b>Code: </b>{props.appState.page.entityData.discount_codeToDelete.value.Code}</li>
<li><b>Expiration_Date: </b>{props.appState.page.entityData.discount_codeToDelete.value.Expiration_Date}</li>
<li><b>Discount: </b>{props.appState.page.entityData.discount_codeToDelete.value.Discount}</li>

                                </ul>
                            </p>
                        </div>}

                    </Modal>

                </AsyncLoader>
            </div>
        </div>
    </div>
}
        