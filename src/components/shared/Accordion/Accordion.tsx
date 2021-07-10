import { Map } from 'immutable'
import * as React from 'react'
import { Pair } from '../../../FormBuilder/utils/Pair'

type AccordionContent = Pair<string, JSX.Element>

interface AccordionProps {
    items: AccordionContent[]
}

interface AccordionState {
    itemMap: Map<number, AccordionContent & { isOpen: boolean }>
}

export class Accordion extends React.Component<AccordionProps, AccordionState> {
    constructor(props: AccordionProps) {
        super(props)
        this.state = {
            itemMap: props.items.reduce((xs, x, i) => xs.set(i, ({ ...x, isOpen: false })), Map<number, AccordionContent & { isOpen: boolean }>())
        }
    }

    /**
     * Close all accordions, except for the selected index.
     * @param index 
     * @returns 
     */
    setAccordions = (index: number) => (s: AccordionState): AccordionState => {
        let current = s.itemMap.get(index)!
        current.isOpen = true
        return ({...s, itemMap: s.itemMap.map(v => ({...v, isOpen: false})).set(index, current)})
    }

   render() {
    return <div className="accordion">
    {this.state.itemMap.toIndexedSeq().map((v, i) => <div key={i} className="accordion-item">
        <h2 className="accordion-header">
            <button className={`accordion-button ${!v.isOpen ? 'collapsed' : ''}`} type="button" onClick={() => this.setState(this.setAccordions(i))}>
                {v.First}
            </button>
        </h2>
        <div id="collapseOne" className={`accordion-collapse collapse ${v.isOpen ? 'show' : ''}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
               {v.Second}
            </div>
        </div>
    </div>)}
</div>
   }
}