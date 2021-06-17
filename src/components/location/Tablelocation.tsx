
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { location } from "../../models/location"
import { loadingAsyncState, none, some, unloadedAsyncState } from "../../utils"
import { set_locations } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { Loader } from "../shared/Loader"
import { Modal } from "../shared/Modal/Modal"
import { deletelocation, get_locations } from "./location.api"

interface locationTableProps extends IAppState {

}

export const Tablelocation = (props: locationTableProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'location') return <div></div>

    let current_permission = props.appState.page.sidePanelState.get('location')

    if (props.appState.page.entityData.locations.kind == 'unloaded') {
        props.setState(set_locations(loadingAsyncState(() => get_locations())))
    }

    return <div className="card mb-4">
        <div className="card-header">
            <i className="fas fa-table mr-1"></i>
            {props.appState.page.entityData.kind}
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <AsyncLoader<location[]> async={props.appState.page.entityData.locations}
                    onLoad={(res) => props.setState(set_locations(res))}
                >
                    {props.appState.page.entityData.locations.kind == 'loaded' ?
                        props.appState.page.entityData.locations.value.length > 0 ?
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
<th>Capacity</th>
<th>Adress</th>
<th>PostalCode</th>
<th>City</th>
<th>GMapLink</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.appState.page.entityData.locations.value.map(entity => <tr key={entity.Id}>
                                            <td><NavLink to={"/admin/location/view/" + entity.Id}>{entity.Id}</NavLink></td>
                                            <td>{entity.Name}</td>
<td>{entity.Capacity}</td>
<td>{entity.Adress}</td>
<td>{entity.PostalCode}</td>
<td>{entity.City}</td>
<td>{entity.GMapLink}</td>

                                            <td className="right">
                                                <ul className='entity-modifiers'>
                                                    <li><NavLink to={"/admin/location/view/"+ entity.Id}>Detail</NavLink></li>
                                                    {current_permission && current_permission.can_edit && <li><NavLink to={"/admin/location/edit/" + entity.Id}>Edit</NavLink></li>}
                                                    {current_permission && current_permission.can_delete && <li><a role="button" className='danger' onClick={async () => {
                                                        props.setState(s => {
                                                            if (s.page.kind != 'admin') return s
                                                            if (s.page.entityData.kind != 'location') return s
                                                            return ({
                                                                ...s, page: {
                                                                    ...s.page, entityData: {
                                                                        ...s.page.entityData,
                                                                        locationToDelete: some(entity)
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
                                <NavLink to={"/admin/location/create"} role="button" className="btn btn-primary">
                                    Create some location
                                </NavLink>
                            </div>
                        : <Loader />}

                    <Modal title={"Are you sure you want to delete this entity?"}
                        show={props.appState.page.entityData.locationToDelete.kind == 'some'}
                        onCancel={() => props.setState(s => {
                            if (s.page.kind != 'admin') return s
                            return ({ ...s, page: { ...s.page, entityData: { ...s.page.entityData, locationToDelete: none() } } })
                        })}
                        onOkay={async () => {
                            if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'location' && props.appState.page.entityData.locationToDelete.kind == 'some') {
                                await deletelocation(props.appState.page.entityData.locationToDelete.value.Id)
                                props.setState(s => {
                                    if (s.page.kind != 'admin') return s
                                    if (s.page.entityData.kind != 'location') return s
                                    return ({
                                        ...s, page: {
                                            ...s.page, entityData: {
                                                ...s.page.entityData,
                                                locationToDelete: none(),
                                                locations: unloadedAsyncState()
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

                        {props.appState.page.entityData.locationToDelete.kind == 'some' && <div>
                            <h5>You're about to delete:</h5>
                            <p>
                                <ul>
                                    <li><b>Id: </b>{props.appState.page.entityData.locationToDelete.value.Id}</li>
                                    <li><b>Name: </b>{props.appState.page.entityData.locationToDelete.value.Name}</li>
<li><b>Capacity: </b>{props.appState.page.entityData.locationToDelete.value.Capacity}</li>
<li><b>Adress: </b>{props.appState.page.entityData.locationToDelete.value.Adress}</li>
<li><b>PostalCode: </b>{props.appState.page.entityData.locationToDelete.value.PostalCode}</li>
<li><b>City: </b>{props.appState.page.entityData.locationToDelete.value.City}</li>
<li><b>GMapLink: </b>{props.appState.page.entityData.locationToDelete.value.GMapLink}</li>

                                </ul>
                            </p>
                        </div>}

                    </Modal>

                </AsyncLoader>
            </div>
        </div>
    </div>
}
        