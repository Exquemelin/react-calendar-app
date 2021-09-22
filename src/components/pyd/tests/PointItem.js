import React from 'react'

export const PointItem = ( point ) => {

    return (

        <div className="row pyd-serials-list">

            <div className="col-2">

                <span> { point.step } </span>

            </div>
            <div className="col-3">

                <span> { point.category } </span>

            </div>
            <div className="col-3">

                <span> { point.description } </span>

            </div>

        </div>

    );

};
