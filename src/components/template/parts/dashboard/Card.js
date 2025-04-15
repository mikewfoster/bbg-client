"use client"

import Link from 'next/link'


export const Card = ({role, title, description , linkHref, linkText}) => {

    const colorScheme = (role === 2) ? 'primary' : 'secondary'

    return (
        <div className={ `card text-center border-2 border-${colorScheme}-darker` }>
            <div className={ `card-header bg-light p-3 text-${colorScheme}-darker border-2 border-${colorScheme}-darker` }>
                <span className="feather-icon" data-feather="layout"></span>
                <h2 className="heading-fancy mb-0"><strong>{ title }</strong></h2>
            </div>
            <div className={ `bg-${colorScheme}-lighter card-body pt-4` }>
                <p className="card-text">
                    { description }
                </p>
                <p className=""><Link href={ linkHref } className={ `btn btn-light shadow shadow-sm border-1 border-${colorScheme}-darker` }>{ linkText }</Link></p>
            </div>
        </div>
    )
}
