
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { admin } from "../../models/admin"
import { loadingAsyncState, none, some, unloadedAsyncState } from "../../utils"
import { set_admins } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { Loader } from "../shared/Loader"
import { Modal } from "../shared/Modal/Modal"
import { deleteadmin, get_admins } from "./admin.api"

interface adminTableProps extends IAppState {

}

export const Tableadmin = (props: adminTableProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'admin') return <div></div>

    let current_permission = props.appState.page.sidePanelState.get('admin')

    if (props.appState.page.entityData.admins.kind == 'unloaded') {
        props.setState(set_admins(loadingAsyncState(() => get_admins())))
    }

    return <div className="card mb-4">
        <div className="card-header">
            <i className="fas fa-table mr-1"></i>
            {props.appState.page.entityData.kind}
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <AsyncLoader<admin[]> async={props.appState.page.entityData.admins}
                    onLoad={(res) => props.setState(set_admins(res))}
                >
                    {props.appState.page.entityData.admins.kind == 'loaded' ?
                        props.appState.page.entityData.admins.value.length > 0 ?
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
<th>Password</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.appState.page.entityData.admins.value.map(entity => <tr key={entity.Id}>
                                            <td><NavLink to={"/admin/admin/view/" + entity.Id}>{entity.Id}</NavLink></td>
                                            <td>{entity.Name}</td>
<td>{entity.Password}</td>

                                            <td className="right">
                                                <ul className='entity-modifiers'>
                                                    <li><NavLink to={"/admin/admin/view/"+ entity.Id}>Detail</NavLink></li>
                                                    {current_permission && current_permission.can_edit && <li><NavLink to={"/admin/admin/edit/" + entity.Id}>Edit</NavLink></li>}
                                                    {current_permission && current_permission.can_delete && <li><a role="button" className='danger' onClick={async () => {
                                                        props.setState(s => {
                                                            if (s.page.kind != 'admin') return s
                                                            if (s.page.entityData.kind != 'admin') return s
                                                            return ({
                                                                ...s, page: {
                                                                    ...s.page, entityData: {
                                                                        ...s.page.entityData,
                                                                        adminToDelete: some(entity)
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
                                <NavLink to={"/admin/admin/create"} role="button" className="btn btn-primary">
                                    Create some admin
                                </NavLink>
                            </div>
                        : <Loader />}

                    <Modal title={"Are you sure you want to delete this entity?"}
                        show={props.appState.page.entityData.adminToDelete.kind == 'some'}
                        onCancel={() => props.setState(s => {
                            if (s.page.kind != 'admin') return s
                            return ({ ...s, page: { ...s.page, entityData: { ...s.page.entityData, adminToDelete: none() } } })
                        })}
                        onOkay={async () => {
                            if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'admin' && props.appState.page.entityData.adminToDelete.kind == 'some') {
                                await deleteadmin(props.appState.page.entityData.adminToDelete.value.Id)
                                props.setState(s => {
                                    if (s.page.kind != 'admin') return s
                                    if (s.page.entityData.kind != 'admin') return s
                                    return ({
                                        ...s, page: {
                                            ...s.page, entityData: {
                                                ...s.page.entityData,
                                                adminToDelete: none(),
                                                admins: unloadedAsyncState()
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

                        {props.appState.page.entityData.adminToDelete.kind == 'some' && <div>
                            <h5>You're about to delete:</h5>
                            <p>
                                <ul>
                                    <li><b>Id: </b>{props.appState.page.entityData.adminToDelete.value.Id}</li>
                                    <li><b>Name: </b>{props.appState.page.entityData.adminToDelete.value.Name}</li>
<li><b>Password: </b>{props.appState.page.entityData.adminToDelete.value.Password}</li>

                                </ul>
                            </p>
                        </div>}

                    </Modal>

                </AsyncLoader>
            </div>
        </div>
    </div>
}
        