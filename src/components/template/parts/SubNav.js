"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';

export const SubNav = ({role}) => {
    const pathname = usePathname().split('/').pop();
    const theme = (role === 1) ? 'secondary' : 'primary'
    const classes = `text-${theme}-darkest btn btn-${theme} border border-2 mt-1 border-${theme} bg-${theme}-lighter `

    if (role === 1) {
        return (
            <>
                { pathname != 'manage' && <Link href="/dashboard/points/manage" className={ classes + "me-2" }>Points</Link> }
                { pathname != 'manage' && <Link href="/dashboard/rewards/manage" className={ classes + "me-2" }>Rewards</Link> }
                { pathname != 'users' && <Link href="/dashboard/users" className={ classes + "me-2" }>Users</Link> }
                { pathname != 'tasks' && <Link href="/dashboard/tasks" className={ classes }>Tasks</Link> }
            </>
        )
    } else {
        return (
            <>
                { pathname != 'points' && <Link href="/dashboard/points/" className={ classes + "me-2" }>View points</Link> }
                { pathname != 'spend' && <Link href="/dashboard/rewards/spend" className={ classes }>Spend points</Link> }
                { pathname != 'earn' && <Link href="/dashboard/points/earn" className={ classes + " ms-2" }>Earn points</Link> }
            </>
        )
    }
}
