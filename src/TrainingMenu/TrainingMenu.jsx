import React from 'react'

const TrainingMenu = ({labels, trainFn}) => (
    <div>
        {
            labels.map(label => <button key={label} onClick={trainFn}>Train {label}</button>)
        }
    </div>
)

export default TrainingMenu