import { cookies } from 'next/headers';
import { logout } from "@/hooks/useAuth";

export default async function NavBarLinks({display}) {
    const cookieStore = await cookies();
    const hasAccess = cookieStore.get('access')
    
    if (!hasAccess) return null;

    const access = JSON.parse(hasAccess?.value);
    const user_id = access?.id;
    
    function logoutHandler () {
        logout();
    };

    if (display && hasAccess) {
        return (
            <>
                <a className="fs-5 text-dark text-decoration-none me-4" href="/dashboard">Home</a>
                <a className="fs-5 text-dark text-decoration-none me-4" href={`/dashboard/users/${user_id}`}>Profile</a>
                <a className="fs-5 text-dark text-decoration-none" href="/dashboard/points">Points</a>
            </>
        )
    } else {
        return null;
    }
}