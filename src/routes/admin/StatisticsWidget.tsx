import React, {useState} from 'react';

const StatisticsWidget = ({ cardTitle, variant, stats }) => {
    return <div className="card">
        <div className={`card-body border-bottom border-3 border-${variant} rounded-bottom-3`}>
            <div className="d-flex justify-content-between">
                <div className="flex-grow-1 overflow-hidden">
                    <h4 className={`text-muted fw-normal mt-0`} title={cardTitle}>{cardTitle}</h4>
                    <h2 className={`mt-3 mb-0 text-${variant}`}>{stats}</h2>
                </div>
            </div>
        </div>
    </div>
}

export default StatisticsWidget
