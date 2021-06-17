
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { director } from "../../models/director"
import { loadingAsyncState, none, some, unloadedAsyncState } from "../../utils"
import { set_directors } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { Loader } from "../shared/Loader"
import { Modal } from "../shared/Modal/Modal"
import { deletedirector, get_directors } from "./director.api"

interface directorTableProps extends IAppState {

}

export const Tabledirector = (props: directorTableProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'director') return <div></div>

    let current_permission = props.appState.page.sidePanelState.get('director')

    if (props.appState.page.entityData.directors.kind == 'unloaded') {
        props.setState(set_directors(loadingAsyncState(() => get_directors())))
    }

    return <div className="card mb-4">
        <div className="card-header">
            <i className="fas fa-table mr-1"></i>
            {props.appState.page.entityData.kind}
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <AsyncLoader<director[]> async={props.appState.page.entityData.directors}
                    onLoad={(res) => props.setState(set_directors(res))}
                >
                    {props.appState.page.entityData.directors.kind == 'loaded' ?
                        props.appState.page.entityData.directors.value.length > 0 ?
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
<th>Password</th>
<th>DateOfBirth</th>
<th>Bio</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.appState.page.entityData.directors.value.map(entity => <tr key={entity.Id}>
                                            <td><NavLink to={"/admin/director/view/" + entity.Id}>{entity.Id}</NavLink></td>
                                            <td>{entity.Name}</td>
<td>{entity.Password}</td>
<td>{entity.DateOfBirth}</td>
<td>{entity.Bio}</td>

                                            <td className="right">
                                                <ul className='entity-modifiers'>
                                                    <li><NavLink to={"/admin/director/view/"+ entity.Id}>Detail</NavLink></li>
                                                    {current_permission && current_permission.can_edit && <li><NavLink to={"/admin/director/edit/" + entity.Id}>Edit</NavLink></li>}
                                                    {current_permission && current_permission.can_delete && <li><a role="button" className='danger' onClick={async () => {
                                                        props.setState(s => {
                                                            if (s.page.kind != 'admin') return s
                                                            if (s.page.entityData.kind != 'director') return s
                                                            return ({
                                                                ...s, page: {
                                                                    ...s.page, entityData: {
                                                                        ...s.page.entityData,
                                                                        directorToDelete: some(entity)
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
                                <NavLink to={"/admin/director/create"} role="button" className="btn btn-primary">
                                    Create some director
                                </NavLink>
                            </div>
                        : <Loader />}

                    <Modal title={"Are you sure you want to delete this entity?"}
                        show={props.appState.page.entityData.directorToDelete.kind == 'some'}
                        onCancel={() => props.setState(s => {
                            if (s.page.kind != 'admin') return s
                            return ({ ...s, page: { ...s.page, entityData: { ...s.page.entityData, directorToDelete: none() } } })
                        })}
                        onOkay={async () => {
                            if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'director' && props.appState.page.entityData.directorToDelete.kind == 'some') {
                                await deletedirector(props.appState.page.entityData.directorToDelete.value.Id)
                                props.setState(s => {
                                    if (s.page.kind != 'admin') return s
                                    if (s.page.entityData.kind != 'director') return s
                                    return ({
                                        ...s, page: {
                                            ...s.page, entityData: {
                                                ...s.page.entityData,
                                                directorToDelete: none(),
                                                directors: unloadedAsyncState()
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

                        {props.appState.page.entityData.directorToDelete.kind == 'some' && <div>
                            <h5>You're about to delete:</h5>
                            <p>
                                <ul>
                                    <li><b>Id: </b>{props.appState.page.entityData.directorToDelete.value.Id}</li>
                                    <li><b>Name: </b>{props.appState.page.entityData.directorToDelete.value.Name}</li>
<li><b>Password: </b>{props.appState.page.entityData.directorToDelete.value.Password}</li>
<li><b>DateOfBirth: </b>{props.appState.page.entityData.directorToDelete.value.DateOfBirth}</li>
<li><b>Bio: </b>{props.appState.page.entityData.directorToDelete.value.Bio}</li>

                                </ul>
                            </p>
                        </div>}

                    </Modal>

                </AsyncLoader>
            </div>
        </div>
    </div>
}
        