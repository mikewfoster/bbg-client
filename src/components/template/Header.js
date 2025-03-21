import NavBarLinks from "@/components/template/parts/NavBarLinks";
import { NavBarOptions } from "@/components/template/parts/NavBarOptions";
import { cookies } from 'next/headers';

async function Header () {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    
    const isLoggedIn = token?.value ? true : false;

    return (
        <header>   
            <nav className="row px-5 my-3">
                <div className="col-12 col-md-3 text-center text-md-start">
                    {<span className="h1 font-fancy text-center text-secondary-darker">Princess Rewards</span>}
                </div>
                <div className="col-12 col-md-6 mt-3 text-center" id="navbarNav">
                    <NavBarLinks display={isLoggedIn} />
                    <NavBarOptions display={isLoggedIn} />
                </div>
            </nav>  
        </header>   
    )
}

export default Header