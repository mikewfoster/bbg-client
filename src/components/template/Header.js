import NavBarLinks from "@/components/template/parts/NavBarLinks";
import { NavBarOptions } from "@/components/template/parts/NavBarOptions";
import { cookies } from 'next/headers';

async function Header () {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    
    const isLoggedIn = token?.value ? true : false;

    return (
        <header>   
            <nav className=" px-5 my-3">
                <div className="row">
                    <div className="col-12 col-md-5 text-center text-md-start">
                        {<span className="h1 mt-2 font-fancy text-center text-secondary-darker">
                            <span className="d-block d-md-none">
                                <span className="fs-4">♥&nbsp;</span> 
                                <span className="fs-3">˚</span> 
                                <span className="fs-2">｡</span> 
                                <span className="fs-2">⋆&nbsp;</span> 
                                <span className="fs-3">୨୧&nbsp;</span>  
                                <span className="fs-2">⋆&nbsp;</span> 
                                <span className="fs-2">｡</span> 
                                <span className="fs-3">˚</span> 
                                <span className="fs-4">&nbsp;♥</span> 
                            </span>
                            <span className="d-inline">
                                Princess Rewards
                            </span>
                            <span className="d-none d-md-inline mb-2">
                                <span className="fs-4">&nbsp;୨୧</span> 
                                <span className="fs-3">&nbsp;⋆</span> 
                                <span className="fs-3">｡</span> 
                                <span className="fs-4">˚</span> 
                                <span className="fs-5">&nbsp;♥</span> 
                            </span>
                        </span>}
                    </div>
                    <div className="col-12 col-md-7 mt-3 text-center text-md-end" id="navbarNav">
                        <NavBarLinks display={isLoggedIn} />
                        <NavBarOptions display={isLoggedIn} />
                    </div>
                </div>
            </nav>  
        </header>   
    )
}

export default Header