import { cookies } from 'next/headers';
import { SubNav } from "@/components/template/parts/SubNav";

export const metadata = {
    title: 'Easter hunt ⑅ Princess Rewards',
    description: 'Easter hunt ⑅ Princess Rewards',
}

export default async function Easter() {   
    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access?.id;
    const role_id = access?.role;

    let user = [];

    let bunnies = {
        total: 20
    }

    if (user_id && token) {
        const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`;        
        const USERS_URL = `${API_ROOT}/users/${user_id}`;
        const POINTS_URL = `${API_ROOT}/users/${user_id}/points`;  

        await fetch(USERS_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
        })
            .then((response) => {                
                if (response.ok) {
                    return response.json();
                }
            })
            .then((result) => {
                user = result.profile.user;
            })
            .catch((error) => {
                setTimeout(() => {
                }, 1000);
            }); 
            
            
        await fetch(POINTS_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((result) => {
                const points = result.points;
                const easterPoints = points.filter(point => (point.title == 'Easter hunt'))
                bunnies.count = easterPoints.length
            })
            .catch((error) => {
                setTimeout(() => {
                }, 1000);
            });
    }

    return (
        <div id="game_landing" className="p-5 bg-light shadow w-100 m-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12 text-center">
                        <img src="/bunny-game-pink.png" />
                        
                        <h1 className="mt-3 font-fancy text-primary">Yay, you found an Easter&nbsp;bunny!</h1>      
                
                        <hr />
                        <br />

                        <p className="lead">You have been rewarded <span className="fw-bold">10&nbsp;Princess&nbsp;Points</span>.</p> 

                        <p className="lead">You have found <span className="fw-bold">{bunnies.count}</span>&nbsp;out&nbsp;of <span className="fw-bold">{bunnies.total}</span>&nbsp;total&nbsp;bunnies.</p>
                        <h2 className="font-fancy text-secondary-darkest">Can you find the rest?</h2>
                        <br />
                    </div>

                    <div className="col-12 text-center">
                        <SubNav role={role_id} />
                    </div>
                </div>
            </div>
        </div>
    );
}