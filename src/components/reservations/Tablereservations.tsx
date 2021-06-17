
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { reservations } from "../../models/reservations"
import { loadingAsyncState, none, some, unloadedAsyncState } from "../../utils"
import { set_reservationss } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { Loader } from "../shared/Loader"
import { Modal } from "../shared/Modal/Modal"
import { deletereservations, get_reservationss } from "./reservations.api"

interface reservationsTableProps extends IAppState {

}

export const Tablereservations = (props: reservationsTableProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'reservations') return <div></div>

    let current_permission = props.appState.page.sidePanelState.get('reservations')

    if (props.appState.page.entityData.reservationss.kind == 'unloaded') {
        props.setState(set_reservationss(loadingAsyncState(() => get_reservationss())))
    }

    return <div className="card mb-4">
        <div className="card-header">
            <i className="fas fa-table mr-1"></i>
            {props.appState.page.entityData.kind}
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <AsyncLoader<reservations[]> async={props.appState.page.entityData.reservationss}
                    onLoad={(res) => props.setState(set_reservationss(res))}
                >
                    {props.appState.page.entityData.reservationss.kind == 'loaded' ?
                        props.appState.page.entityData.reservationss.value.length > 0 ?
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>amount</th>
<th>CheckedIn</th>
<th>PayementID</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.appState.page.entityData.reservationss.value.map(entity => <tr key={entity.Id}>
                                            <td><NavLink to={"/admin/reservations/view/" + entity.Id}>{entity.Id}</NavLink></td>
                                            <td>{entity.amount}</td>
<td>{entity.CheckedIn}</td>
<td>{entity.PayementID}</td>

                                            <td className="right">
                                                <ul className='entity-modifiers'>
                                                    <li><NavLink to={"/admin/reservations/view/"+ entity.Id}>Detail</NavLink></li>
                                                    {current_permission && current_permission.can_edit && <li><NavLink to={"/admin/reservations/edit/" + entity.Id}>Edit</NavLink></li>}
                                                    {current_permission && current_permission.can_delete && <li><a role="button" className='danger' onClick={async () => {
                                                        props.setState(s => {
                                                            if (s.page.kind != 'admin') return s
                                                            if (s.page.entityData.kind != 'reservations') return s
                                                            return ({
                                                                ...s, page: {
                                                                    ...s.page, entityData: {
                                                                        ...s.page.entityData,
                                                                        reservationsToDelete: some(entity)
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
                                <NavLink to={"/admin/reservations/create"} role="button" className="btn btn-primary">
                                    Create some reservations
                                </NavLink>
                            </div>
                        : <Loader />}

                    <Modal title={"Are you sure you want to delete this entity?"}
                        show={props.appState.page.entityData.reservationsToDelete.kind == 'some'}
                        onCancel={() => props.setState(s => {
                            if (s.page.kind != 'admin') return s
                            return ({ ...s, page: { ...s.page, entityData: { ...s.page.entityData, reservationsToDelete: none() } } })
                        })}
                        onOkay={async () => {
                            if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'reservations' && props.appState.page.entityData.reservationsToDelete.kind == 'some') {
                                await deletereservations(props.appState.page.entityData.reservationsToDelete.value.Id)
                                props.setState(s => {
                                    if (s.page.kind != 'admin') return s
                                    if (s.page.entityData.kind != 'reservations') return s
                                    return ({
                                        ...s, page: {
                                            ...s.page, entityData: {
                                                ...s.page.entityData,
                                                reservationsToDelete: none(),
                                                reservationss: unloadedAsyncState()
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

                        {props.appState.page.entityData.reservationsToDelete.kind == 'some' && <div>
                            <h5>You're about to delete:</h5>
                            <p>
                                <ul>
                                    <li><b>Id: </b>{props.appState.page.entityData.reservationsToDelete.value.Id}</li>
                                    <li><b>amount: </b>{props.appState.page.entityData.reservationsToDelete.value.amount}</li>
<li><b>CheckedIn: </b>{props.appState.page.entityData.reservationsToDelete.value.CheckedIn}</li>
<li><b>PayementID: </b>{props.appState.page.entityData.reservationsToDelete.value.PayementID}</li>

                                </ul>
                            </p>
                        </div>}

                    </Modal>

                </AsyncLoader>
            </div>
        </div>
    </div>
}
        