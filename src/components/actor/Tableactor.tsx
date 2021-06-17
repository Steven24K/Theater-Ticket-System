
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { actor } from "../../models/actor"
import { loadingAsyncState, none, some, unloadedAsyncState } from "../../utils"
import { set_actors } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { Loader } from "../shared/Loader"
import { Modal } from "../shared/Modal/Modal"
import { deleteactor, get_actors } from "./actor.api"

interface actorTableProps extends IAppState {

}

export const Tableactor = (props: actorTableProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'actor') return <div></div>

    let current_permission = props.appState.page.sidePanelState.get('actor')

    if (props.appState.page.entityData.actors.kind == 'unloaded') {
        props.setState(set_actors(loadingAsyncState(() => get_actors())))
    }

    return <div className="card mb-4">
        <div className="card-header">
            <i className="fas fa-table mr-1"></i>
            {props.appState.page.entityData.kind}
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <AsyncLoader<actor[]> async={props.appState.page.entityData.actors}
                    onLoad={(res) => props.setState(set_actors(res))}
                >
                    {props.appState.page.entityData.actors.kind == 'loaded' ?
                        props.appState.page.entityData.actors.value.length > 0 ?
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
                                        props.appState.page.entityData.actors.value.map(entity => <tr key={entity.Id}>
                                            <td><NavLink to={"/admin/actor/view/" + entity.Id}>{entity.Id}</NavLink></td>
                                            <td>{entity.Name}</td>
<td>{entity.Password}</td>
<td>{entity.DateOfBirth}</td>
<td>{entity.Bio}</td>

                                            <td className="right">
                                                <ul className='entity-modifiers'>
                                                    <li><NavLink to={"/admin/actor/view/"+ entity.Id}>Detail</NavLink></li>
                                                    {current_permission && current_permission.can_edit && <li><NavLink to={"/admin/actor/edit/" + entity.Id}>Edit</NavLink></li>}
                                                    {current_permission && current_permission.can_delete && <li><a role="button" className='danger' onClick={async () => {
                                                        props.setState(s => {
                                                            if (s.page.kind != 'admin') return s
                                                            if (s.page.entityData.kind != 'actor') return s
                                                            return ({
                                                                ...s, page: {
                                                                    ...s.page, entityData: {
                                                                        ...s.page.entityData,
                                                                        actorToDelete: some(entity)
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
                                <NavLink to={"/admin/actor/create"} role="button" className="btn btn-primary">
                                    Create some actor
                                </NavLink>
                            </div>
                        : <Loader />}

                    <Modal title={"Are you sure you want to delete this entity?"}
                        show={props.appState.page.entityData.actorToDelete.kind == 'some'}
                        onCancel={() => props.setState(s => {
                            if (s.page.kind != 'admin') return s
                            return ({ ...s, page: { ...s.page, entityData: { ...s.page.entityData, actorToDelete: none() } } })
                        })}
                        onOkay={async () => {
                            if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'actor' && props.appState.page.entityData.actorToDelete.kind == 'some') {
                                await deleteactor(props.appState.page.entityData.actorToDelete.value.Id)
                                props.setState(s => {
                                    if (s.page.kind != 'admin') return s
                                    if (s.page.entityData.kind != 'actor') return s
                                    return ({
                                        ...s, page: {
                                            ...s.page, entityData: {
                                                ...s.page.entityData,
                                                actorToDelete: none(),
                                                actors: unloadedAsyncState()
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

                        {props.appState.page.entityData.actorToDelete.kind == 'some' && <div>
                            <h5>You're about to delete:</h5>
                            <p>
                                <ul>
                                    <li><b>Id: </b>{props.appState.page.entityData.actorToDelete.value.Id}</li>
                                    <li><b>Name: </b>{props.appState.page.entityData.actorToDelete.value.Name}</li>
<li><b>Password: </b>{props.appState.page.entityData.actorToDelete.value.Password}</li>
<li><b>DateOfBirth: </b>{props.appState.page.entityData.actorToDelete.value.DateOfBirth}</li>
<li><b>Bio: </b>{props.appState.page.entityData.actorToDelete.value.Bio}</li>

                                </ul>
                            </p>
                        </div>}

                    </Modal>

                </AsyncLoader>
            </div>
        </div>
    </div>
}
        