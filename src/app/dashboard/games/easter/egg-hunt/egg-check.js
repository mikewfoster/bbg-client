'use client'
 
export default function EggCheck({value}) {
    return (
        <input className="egg__check" type="checkbox" data-score={value} />
    )
}