"use client"

import Button from "@/components/form/Button";
import { logout } from "@/hooks/useAuth";

export const NavBarOptions = ({display}) => {

    function logoutHandler () {
        logout();
    };

    if (display) {
        return (
            <>
                <Button
                    id="logout" 
                    type="button"
                    text="Logout"
                    onClick={logoutHandler}
                    classList="ms-4 p-0 border-0 bg-secondary-lighter"
                    theme="none"
                />
            </>
        )
    } else {
        return null;
    }
}