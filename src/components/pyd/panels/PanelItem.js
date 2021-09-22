import React from 'react'

export const PanelItem = ( panel ) => {

    return (

        <div className="row pyd-serials-list">

            <div className="col-2">

                <span> { panel.serial } </span>

            </div>
            <div className="col-3">

                <span> { panel.name } </span>

            </div>
            <div className="col-3">

                <span> { panel.type } </span>

            </div>
            <div className="col-2">

                <span> { panel.project } </span>

            </div>
            <div className="col-2">

                <span> { panel.client } </span>

            </div>

            

        </div>

    )

}
