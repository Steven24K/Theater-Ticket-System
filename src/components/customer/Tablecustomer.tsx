
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { customer } from "../../models/customer"
import { loadingAsyncState, none, some, unloadedAsyncState } from "../../utils"
import { set_customers } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { Loader } from "../shared/Loader"
import { Modal } from "../shared/Modal/Modal"
import { deletecustomer, get_customers } from "./customer.api"

interface customerTableProps extends IAppState {

}

export const Tablecustomer = (props: customerTableProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'customer') return <div></div>

    let current_permission = props.appState.page.sidePanelState.get('customer')

    if (props.appState.page.entityData.customers.kind == 'unloaded') {
        props.setState(set_customers(loadingAsyncState(() => get_customers())))
    }

    return <div className="card mb-4">
        <div className="card-header">
            <i className="fas fa-table mr-1"></i>
            {props.appState.page.entityData.kind}
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <AsyncLoader<customer[]> async={props.appState.page.entityData.customers}
                    onLoad={(res) => props.setState(set_customers(res))}
                >
                    {props.appState.page.entityData.customers.kind == 'loaded' ?
                        props.appState.page.entityData.customers.value.length > 0 ?
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Email</th>
<th>FirstName</th>
<th>LastName</th>
<th>Insertion</th>
<th>reg_date</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.appState.page.entityData.customers.value.map(entity => <tr key={entity.Id}>
                                            <td><NavLink to={"/admin/customer/view/" + entity.Id}>{entity.Id}</NavLink></td>
                                            <td>{entity.Email}</td>
<td>{entity.FirstName}</td>
<td>{entity.LastName}</td>
<td>{entity.Insertion}</td>
<td>{entity.reg_date}</td>

                                            <td className="right">
                                                <ul className='entity-modifiers'>
                                                    <li><NavLink to={"/admin/customer/view/"+ entity.Id}>Detail</NavLink></li>
                                                    {current_permission && current_permission.can_edit && <li><NavLink to={"/admin/customer/edit/" + entity.Id}>Edit</NavLink></li>}
                                                    {current_permission && current_permission.can_delete && <li><a role="button" className='danger' onClick={async () => {
                                                        props.setState(s => {
                                                            if (s.page.kind != 'admin') return s
                                                            if (s.page.entityData.kind != 'customer') return s
                                                            return ({
                                                                ...s, page: {
                                                                    ...s.page, entityData: {
                                                                        ...s.page.entityData,
                                                                        customerToDelete: some(entity)
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
                                <NavLink to={"/admin/customer/create"} role="button" className="btn btn-primary">
                                    Create some customer
                                </NavLink>
                            </div>
                        : <Loader />}

                    <Modal title={"Are you sure you want to delete this entity?"}
                        show={props.appState.page.entityData.customerToDelete.kind == 'some'}
                        onCancel={() => props.setState(s => {
                            if (s.page.kind != 'admin') return s
                            return ({ ...s, page: { ...s.page, entityData: { ...s.page.entityData, customerToDelete: none() } } })
                        })}
                        onOkay={async () => {
                            if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'customer' && props.appState.page.entityData.customerToDelete.kind == 'some') {
                                await deletecustomer(props.appState.page.entityData.customerToDelete.value.Id)
                                props.setState(s => {
                                    if (s.page.kind != 'admin') return s
                                    if (s.page.entityData.kind != 'customer') return s
                                    return ({
                                        ...s, page: {
                                            ...s.page, entityData: {
                                                ...s.page.entityData,
                                                customerToDelete: none(),
                                                customers: unloadedAsyncState()
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

                        {props.appState.page.entityData.customerToDelete.kind == 'some' && <div>
                            <h5>You're about to delete:</h5>
                            <p>
                                <ul>
                                    <li><b>Id: </b>{props.appState.page.entityData.customerToDelete.value.Id}</li>
                                    <li><b>Email: </b>{props.appState.page.entityData.customerToDelete.value.Email}</li>
<li><b>FirstName: </b>{props.appState.page.entityData.customerToDelete.value.FirstName}</li>
<li><b>LastName: </b>{props.appState.page.entityData.customerToDelete.value.LastName}</li>
<li><b>Insertion: </b>{props.appState.page.entityData.customerToDelete.value.Insertion}</li>
<li><b>reg_date: </b>{props.appState.page.entityData.customerToDelete.value.reg_date}</li>

                                </ul>
                            </p>
                        </div>}

                    </Modal>

                </AsyncLoader>
            </div>
        </div>
    </div>
}
        