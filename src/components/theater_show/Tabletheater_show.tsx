
        import * as React from "react"
import { NavLink } from "react-router-dom"
import { IAppState } from "../../AppState"
import { theater_show } from "../../models/theater_show"
import { loadingAsyncState, none, some, unloadedAsyncState } from "../../utils"
import { set_theater_shows } from "../AdminFrontend/AdminData"
import { AsyncLoader } from "../shared/AsyncLoader"
import { Loader } from "../shared/Loader"
import { Modal } from "../shared/Modal/Modal"
import { deletetheater_show, get_theater_shows } from "./theater_show.api"

interface theater_showTableProps extends IAppState {

}

export const Tabletheater_show = (props: theater_showTableProps) => {
    if (props.appState.page.kind != 'admin') return <div></div>
    if (props.appState.page.entityData.kind != 'theater_show') return <div></div>

    let current_permission = props.appState.page.sidePanelState.get('theater_show')

    if (props.appState.page.entityData.theater_shows.kind == 'unloaded') {
        props.setState(set_theater_shows(loadingAsyncState(() => get_theater_shows())))
    }

    return <div className="card mb-4">
        <div className="card-header">
            <i className="fas fa-table mr-1"></i>
            {props.appState.page.entityData.kind}
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <AsyncLoader<theater_show[]> async={props.appState.page.entityData.theater_shows}
                    onLoad={(res) => props.setState(set_theater_shows(res))}
                >
                    {props.appState.page.entityData.theater_shows.kind == 'loaded' ?
                        props.appState.page.entityData.theater_shows.value.length > 0 ?
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Title</th>
<th>Description</th>
<th>Price</th>
<th>image_url</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.appState.page.entityData.theater_shows.value.map(entity => <tr key={entity.Id}>
                                            <td><NavLink to={"/admin/theater_show/view/" + entity.Id}>{entity.Id}</NavLink></td>
                                            <td>{entity.Title}</td>
<td>{entity.Description}</td>
<td>{entity.Price}</td>
<td>{entity.image_url}</td>

                                            <td className="right">
                                                <ul className='entity-modifiers'>
                                                    <li><NavLink to={"/admin/theater_show/view/"+ entity.Id}>Detail</NavLink></li>
                                                    {current_permission && current_permission.can_edit && <li><NavLink to={"/admin/theater_show/edit/" + entity.Id}>Edit</NavLink></li>}
                                                    {current_permission && current_permission.can_delete && <li><a role="button" className='danger' onClick={async () => {
                                                        props.setState(s => {
                                                            if (s.page.kind != 'admin') return s
                                                            if (s.page.entityData.kind != 'theater_show') return s
                                                            return ({
                                                                ...s, page: {
                                                                    ...s.page, entityData: {
                                                                        ...s.page.entityData,
                                                                        theater_showToDelete: some(entity)
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
                                <NavLink to={"/admin/theater_show/create"} role="button" className="btn btn-primary">
                                    Create some theater_show
                                </NavLink>
                            </div>
                        : <Loader />}

                    <Modal title={"Are you sure you want to delete this entity?"}
                        show={props.appState.page.entityData.theater_showToDelete.kind == 'some'}
                        onCancel={() => props.setState(s => {
                            if (s.page.kind != 'admin') return s
                            return ({ ...s, page: { ...s.page, entityData: { ...s.page.entityData, theater_showToDelete: none() } } })
                        })}
                        onOkay={async () => {
                            if (props.appState.page.kind == 'admin' && props.appState.page.entityData.kind == 'theater_show' && props.appState.page.entityData.theater_showToDelete.kind == 'some') {
                                await deletetheater_show(props.appState.page.entityData.theater_showToDelete.value.Id)
                                props.setState(s => {
                                    if (s.page.kind != 'admin') return s
                                    if (s.page.entityData.kind != 'theater_show') return s
                                    return ({
                                        ...s, page: {
                                            ...s.page, entityData: {
                                                ...s.page.entityData,
                                                theater_showToDelete: none(),
                                                theater_shows: unloadedAsyncState()
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

                        {props.appState.page.entityData.theater_showToDelete.kind == 'some' && <div>
                            <h5>You're about to delete:</h5>
                            <p>
                                <ul>
                                    <li><b>Id: </b>{props.appState.page.entityData.theater_showToDelete.value.Id}</li>
                                    <li><b>Title: </b>{props.appState.page.entityData.theater_showToDelete.value.Title}</li>
<li><b>Description: </b>{props.appState.page.entityData.theater_showToDelete.value.Description}</li>
<li><b>Price: </b>{props.appState.page.entityData.theater_showToDelete.value.Price}</li>
<li><b>image_url: </b>{props.appState.page.entityData.theater_showToDelete.value.image_url}</li>

                                </ul>
                            </p>
                        </div>}

                    </Modal>

                </AsyncLoader>
            </div>
        </div>
    </div>
}
        