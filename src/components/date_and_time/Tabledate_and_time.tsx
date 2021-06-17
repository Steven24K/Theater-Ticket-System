
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { date_and_time } from "../../models/date_and_time"
import { loadingAsyncState, none, some, unloadedAsyncState } from "../../utils"
import { set_date_and_times } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { Loader } from "../shared/Loader"
import { Modal } from "../shared/Modal/Modal"
import { deletedate_and_time, get_date_and_times } from "./date_and_time.api"

interface date_and_timeTableProps extends IAppState {

}

export const Tabledate_and_time = (props: date_and_timeTableProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'date_and_time') return <div></div>

    let current_permission = props.appState.page.sidePanelState.get('date_and_time')

    if (props.appState.page.entityData.date_and_times.kind == 'unloaded') {
        props.setState(set_date_and_times(loadingAsyncState(() => get_date_and_times())))
    }

    return <div className="card mb-4">
        <div className="card-header">
            <i className="fas fa-table mr-1"></i>
            {props.appState.page.entityData.kind}
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <AsyncLoader<date_and_time[]> async={props.appState.page.entityData.date_and_times}
                    onLoad={(res) => props.setState(set_date_and_times(res))}
                >
                    {props.appState.page.entityData.date_and_times.kind == 'loaded' ?
                        props.appState.page.entityData.date_and_times.value.length > 0 ?
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Date</th>
<th>Time</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.appState.page.entityData.date_and_times.value.map(entity => <tr key={entity.Id}>
                                            <td><NavLink to={"/admin/date_and_time/view/" + entity.Id}>{entity.Id}</NavLink></td>
                                            <td>{entity.Date}</td>
<td>{entity.Time}</td>

                                            <td className="right">
                                                <ul className='entity-modifiers'>
                                                    <li><NavLink to={"/admin/date_and_time/view/"+ entity.Id}>Detail</NavLink></li>
                                                    {current_permission && current_permission.can_edit && <li><NavLink to={"/admin/date_and_time/edit/" + entity.Id}>Edit</NavLink></li>}
                                                    {current_permission && current_permission.can_delete && <li><a role="button" className='danger' onClick={async () => {
                                                        props.setState(s => {
                                                            if (s.page.kind != 'admin') return s
                                                            if (s.page.entityData.kind != 'date_and_time') return s
                                                            return ({
                                                                ...s, page: {
                                                                    ...s.page, entityData: {
                                                                        ...s.page.entityData,
                                                                        date_and_timeToDelete: some(entity)
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
                                <NavLink to={"/admin/date_and_time/create"} role="button" className="btn btn-primary">
                                    Create some date_and_time
                                </NavLink>
                            </div>
                        : <Loader />}

                    <Modal title={"Are you sure you want to delete this entity?"}
                        show={props.appState.page.entityData.date_and_timeToDelete.kind == 'some'}
                        onCancel={() => props.setState(s => {
                            if (s.page.kind != 'admin') return s
                            return ({ ...s, page: { ...s.page, entityData: { ...s.page.entityData, date_and_timeToDelete: none() } } })
                        })}
                        onOkay={async () => {
                            if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'date_and_time' && props.appState.page.entityData.date_and_timeToDelete.kind == 'some') {
                                await deletedate_and_time(props.appState.page.entityData.date_and_timeToDelete.value.Id)
                                props.setState(s => {
                                    if (s.page.kind != 'admin') return s
                                    if (s.page.entityData.kind != 'date_and_time') return s
                                    return ({
                                        ...s, page: {
                                            ...s.page, entityData: {
                                                ...s.page.entityData,
                                                date_and_timeToDelete: none(),
                                                date_and_times: unloadedAsyncState()
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

                        {props.appState.page.entityData.date_and_timeToDelete.kind == 'some' && <div>
                            <h5>You're about to delete:</h5>
                            <p>
                                <ul>
                                    <li><b>Id: </b>{props.appState.page.entityData.date_and_timeToDelete.value.Id}</li>
                                    <li><b>Date: </b>{props.appState.page.entityData.date_and_timeToDelete.value.Date}</li>
<li><b>Time: </b>{props.appState.page.entityData.date_and_timeToDelete.value.Time}</li>

                                </ul>
                            </p>
                        </div>}

                    </Modal>

                </AsyncLoader>
            </div>
        </div>
    </div>
}
        