
        import { AppState } from "../../AppState";
        import { AsyncState, FormState, EditStateMachine, none, Option, unloadedAsyncState, FormKinds } from "../../utils";




import { date_and_time } from "../../models/date_and_time";
import { Defaultdate_and_time } from "../date_and_time/Defaultdate_and_time";

// date_and_time 

export interface date_and_timeEntityData {
    kind: 'date_and_time'
    date_and_times: AsyncState<date_and_time[]>
    currentdate_and_time: {
        data: AsyncState<date_and_time>
        kind: EditStateMachine
    }
    date_and_timeForm: FormState<date_and_time>
    date_and_timeToDelete: Option<date_and_time>
}
export const zerodate_and_timeEntityData = (): date_and_timeEntityData => ({
    kind: 'date_and_time',
    date_and_times: unloadedAsyncState(),
    currentdate_and_time: {
        data: unloadedAsyncState(),
        kind: 'idle'
    },
    date_and_timeForm: { kind: 'unsubmitted', data: Defaultdate_and_time() },
    date_and_timeToDelete: none()
})

export const set_date_and_times = (new_date_and_time: AsyncState<date_and_time[]>) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'date_and_time') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                date_and_times: new_date_and_time,
            }
        }
    })
}

export const setCurrent_date_and_time = (new_date_and_time: AsyncState<date_and_time>, editState?: EditStateMachine) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'date_and_time') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                currentdate_and_time: {
                    data: new_date_and_time,
                    kind: editState ? editState : s.page.entityData.currentdate_and_time.kind
                }
            }
        }
    })
}





import { reservations } from "../../models/reservations";
import { Defaultreservations } from "../reservations/Defaultreservations";

// reservations 

export interface reservationsEntityData {
    kind: 'reservations'
    reservationss: AsyncState<reservations[]>
    currentreservations: {
        data: AsyncState<reservations>
        kind: EditStateMachine
    }
    reservationsForm: FormState<reservations>
    reservationsToDelete: Option<reservations>
}
export const zeroreservationsEntityData = (): reservationsEntityData => ({
    kind: 'reservations',
    reservationss: unloadedAsyncState(),
    currentreservations: {
        data: unloadedAsyncState(),
        kind: 'idle'
    },
    reservationsForm: { kind: 'unsubmitted', data: Defaultreservations() },
    reservationsToDelete: none()
})

export const set_reservationss = (new_reservations: AsyncState<reservations[]>) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'reservations') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                reservationss: new_reservations,
            }
        }
    })
}

export const setCurrent_reservations = (new_reservations: AsyncState<reservations>, editState?: EditStateMachine) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'reservations') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                currentreservations: {
                    data: new_reservations,
                    kind: editState ? editState : s.page.entityData.currentreservations.kind
                }
            }
        }
    })
}





import { discount_code } from "../../models/discount_code";
import { Defaultdiscount_code } from "../discount_code/Defaultdiscount_code";

// discount_code 

export interface discount_codeEntityData {
    kind: 'discount_code'
    discount_codes: AsyncState<discount_code[]>
    currentdiscount_code: {
        data: AsyncState<discount_code>
        kind: EditStateMachine
    }
    discount_codeForm: FormState<discount_code>
    discount_codeToDelete: Option<discount_code>
}
export const zerodiscount_codeEntityData = (): discount_codeEntityData => ({
    kind: 'discount_code',
    discount_codes: unloadedAsyncState(),
    currentdiscount_code: {
        data: unloadedAsyncState(),
        kind: 'idle'
    },
    discount_codeForm: { kind: 'unsubmitted', data: Defaultdiscount_code() },
    discount_codeToDelete: none()
})

export const set_discount_codes = (new_discount_code: AsyncState<discount_code[]>) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'discount_code') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                discount_codes: new_discount_code,
            }
        }
    })
}

export const setCurrent_discount_code = (new_discount_code: AsyncState<discount_code>, editState?: EditStateMachine) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'discount_code') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                currentdiscount_code: {
                    data: new_discount_code,
                    kind: editState ? editState : s.page.entityData.currentdiscount_code.kind
                }
            }
        }
    })
}





import { theater_show } from "../../models/theater_show";
import { Defaulttheater_show } from "../theater_show/Defaulttheater_show";

// theater_show 

export interface theater_showEntityData {
    kind: 'theater_show'
    theater_shows: AsyncState<theater_show[]>
    currenttheater_show: {
        data: AsyncState<theater_show>
        kind: EditStateMachine
    }
    theater_showForm: FormState<theater_show>
    theater_showToDelete: Option<theater_show>
}
export const zerotheater_showEntityData = (): theater_showEntityData => ({
    kind: 'theater_show',
    theater_shows: unloadedAsyncState(),
    currenttheater_show: {
        data: unloadedAsyncState(),
        kind: 'idle'
    },
    theater_showForm: { kind: 'unsubmitted', data: Defaulttheater_show() },
    theater_showToDelete: none()
})

export const set_theater_shows = (new_theater_show: AsyncState<theater_show[]>) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'theater_show') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                theater_shows: new_theater_show,
            }
        }
    })
}

export const setCurrent_theater_show = (new_theater_show: AsyncState<theater_show>, editState?: EditStateMachine) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'theater_show') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                currenttheater_show: {
                    data: new_theater_show,
                    kind: editState ? editState : s.page.entityData.currenttheater_show.kind
                }
            }
        }
    })
}





import { director } from "../../models/director";
import { Defaultdirector } from "../director/Defaultdirector";

// director 

export interface directorEntityData {
    kind: 'director'
    directors: AsyncState<director[]>
    currentdirector: {
        data: AsyncState<director>
        kind: EditStateMachine
    }
    directorForm: FormState<director>
    directorToDelete: Option<director>
}
export const zerodirectorEntityData = (): directorEntityData => ({
    kind: 'director',
    directors: unloadedAsyncState(),
    currentdirector: {
        data: unloadedAsyncState(),
        kind: 'idle'
    },
    directorForm: { kind: 'unsubmitted', data: Defaultdirector() },
    directorToDelete: none()
})

export const set_directors = (new_director: AsyncState<director[]>) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'director') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                directors: new_director,
            }
        }
    })
}

export const setCurrent_director = (new_director: AsyncState<director>, editState?: EditStateMachine) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'director') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                currentdirector: {
                    data: new_director,
                    kind: editState ? editState : s.page.entityData.currentdirector.kind
                }
            }
        }
    })
}





import { admin } from "../../models/admin";
import { Defaultadmin } from "../admin/Defaultadmin";

// admin 

export interface adminEntityData {
    kind: 'admin'
    admins: AsyncState<admin[]>
    currentadmin: {
        data: AsyncState<admin>
        kind: EditStateMachine
    }
    adminForm: FormState<admin>
    adminToDelete: Option<admin>
}
export const zeroadminEntityData = (): adminEntityData => ({
    kind: 'admin',
    admins: unloadedAsyncState(),
    currentadmin: {
        data: unloadedAsyncState(),
        kind: 'idle'
    },
    adminForm: { kind: 'unsubmitted', data: Defaultadmin() },
    adminToDelete: none()
})

export const set_admins = (new_admin: AsyncState<admin[]>) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'admin') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                admins: new_admin,
            }
        }
    })
}

export const setCurrent_admin = (new_admin: AsyncState<admin>, editState?: EditStateMachine) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'admin') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                currentadmin: {
                    data: new_admin,
                    kind: editState ? editState : s.page.entityData.currentadmin.kind
                }
            }
        }
    })
}





import { reseller } from "../../models/reseller";
import { Defaultreseller } from "../reseller/Defaultreseller";

// reseller 

export interface resellerEntityData {
    kind: 'reseller'
    resellers: AsyncState<reseller[]>
    currentreseller: {
        data: AsyncState<reseller>
        kind: EditStateMachine
    }
    resellerForm: FormState<reseller>
    resellerToDelete: Option<reseller>
}
export const zeroresellerEntityData = (): resellerEntityData => ({
    kind: 'reseller',
    resellers: unloadedAsyncState(),
    currentreseller: {
        data: unloadedAsyncState(),
        kind: 'idle'
    },
    resellerForm: { kind: 'unsubmitted', data: Defaultreseller() },
    resellerToDelete: none()
})

export const set_resellers = (new_reseller: AsyncState<reseller[]>) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'reseller') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                resellers: new_reseller,
            }
        }
    })
}

export const setCurrent_reseller = (new_reseller: AsyncState<reseller>, editState?: EditStateMachine) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'reseller') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                currentreseller: {
                    data: new_reseller,
                    kind: editState ? editState : s.page.entityData.currentreseller.kind
                }
            }
        }
    })
}





import { actor } from "../../models/actor";
import { Defaultactor } from "../actor/Defaultactor";

// actor 

export interface actorEntityData {
    kind: 'actor'
    actors: AsyncState<actor[]>
    currentactor: {
        data: AsyncState<actor>
        kind: EditStateMachine
    }
    actorForm: FormState<actor>
    actorToDelete: Option<actor>
}
export const zeroactorEntityData = (): actorEntityData => ({
    kind: 'actor',
    actors: unloadedAsyncState(),
    currentactor: {
        data: unloadedAsyncState(),
        kind: 'idle'
    },
    actorForm: { kind: 'unsubmitted', data: Defaultactor() },
    actorToDelete: none()
})

export const set_actors = (new_actor: AsyncState<actor[]>) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'actor') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                actors: new_actor,
            }
        }
    })
}

export const setCurrent_actor = (new_actor: AsyncState<actor>, editState?: EditStateMachine) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'actor') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                currentactor: {
                    data: new_actor,
                    kind: editState ? editState : s.page.entityData.currentactor.kind
                }
            }
        }
    })
}





import { location } from "../../models/location";
import { Defaultlocation } from "../location/Defaultlocation";

// location 

export interface locationEntityData {
    kind: 'location'
    locations: AsyncState<location[]>
    currentlocation: {
        data: AsyncState<location>
        kind: EditStateMachine
    }
    locationForm: FormState<location>
    locationToDelete: Option<location>
}
export const zerolocationEntityData = (): locationEntityData => ({
    kind: 'location',
    locations: unloadedAsyncState(),
    currentlocation: {
        data: unloadedAsyncState(),
        kind: 'idle'
    },
    locationForm: { kind: 'unsubmitted', data: Defaultlocation() },
    locationToDelete: none()
})

export const set_locations = (new_location: AsyncState<location[]>) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'location') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                locations: new_location,
            }
        }
    })
}

export const setCurrent_location = (new_location: AsyncState<location>, editState?: EditStateMachine) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'location') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                currentlocation: {
                    data: new_location,
                    kind: editState ? editState : s.page.entityData.currentlocation.kind
                }
            }
        }
    })
}





import { link } from "../../models/link";
import { Defaultlink } from "../link/Defaultlink";

// link 

export interface linkEntityData {
    kind: 'link'
    links: AsyncState<link[]>
    currentlink: {
        data: AsyncState<link>
        kind: EditStateMachine
    }
    linkForm: FormState<link>
    linkToDelete: Option<link>
}
export const zerolinkEntityData = (): linkEntityData => ({
    kind: 'link',
    links: unloadedAsyncState(),
    currentlink: {
        data: unloadedAsyncState(),
        kind: 'idle'
    },
    linkForm: { kind: 'unsubmitted', data: Defaultlink() },
    linkToDelete: none()
})

export const set_links = (new_link: AsyncState<link[]>) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'link') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                links: new_link,
            }
        }
    })
}

export const setCurrent_link = (new_link: AsyncState<link>, editState?: EditStateMachine) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'link') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                currentlink: {
                    data: new_link,
                    kind: editState ? editState : s.page.entityData.currentlink.kind
                }
            }
        }
    })
}





import { customer } from "../../models/customer";
import { Defaultcustomer } from "../customer/Defaultcustomer";

// customer 

export interface customerEntityData {
    kind: 'customer'
    customers: AsyncState<customer[]>
    currentcustomer: {
        data: AsyncState<customer>
        kind: EditStateMachine
    }
    customerForm: FormState<customer>
    customerToDelete: Option<customer>
}
export const zerocustomerEntityData = (): customerEntityData => ({
    kind: 'customer',
    customers: unloadedAsyncState(),
    currentcustomer: {
        data: unloadedAsyncState(),
        kind: 'idle'
    },
    customerForm: { kind: 'unsubmitted', data: Defaultcustomer() },
    customerToDelete: none()
})

export const set_customers = (new_customer: AsyncState<customer[]>) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'customer') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                customers: new_customer,
            }
        }
    })
}

export const setCurrent_customer = (new_customer: AsyncState<customer>, editState?: EditStateMachine) => (s: AppState): AppState => {
    if (s.page.kind != 'admin') return s
    if (s.page.entityData.kind != 'customer') return s
    return ({
        ...s, page: {
            ...s.page, entityData: {
                ...s.page.entityData,
                currentcustomer: {
                    data: new_customer,
                    kind: editState ? editState : s.page.entityData.currentcustomer.kind
                }
            }
        }
    })
}






//All entities in one discriminated union
export type EntityData = date_and_timeEntityData
 |reservationsEntityData
 |discount_codeEntityData
 |theater_showEntityData
 |directorEntityData
 |adminEntityData
 |resellerEntityData
 |actorEntityData
 |locationEntityData
 |linkEntityData
 |customerEntityData
 |
     { kind: 'no-entity' }

export const zeroEntityData = (): EntityData => ({
    kind: 'no-entity'
})
        