import { cookies } from 'next/headers';

import Link from 'next/link'
import { Card } from "@/components/template/parts/dashboard/Card";

export const metadata = {
    title: 'Dashboard ⑅ Princess Rewards',
    description: 'Dashboard ⑅ Princess Rewards',
}

export default async function Dashboard() {   
    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access?.id;
    const role_id = access?.role;

    let user = [];
    let points = [];
    const currentDate = new Date();
    const localDate = currentDate.toLocaleString("en-US", {timeZone: "America/New_York"}).split(',')[0];

    let show_easter_game = (localDate <= '4/19/2025');
    let show_easter_hunt = (localDate >= '4/19/2025' && localDate <= '4/30/2025');
    let game_active = true;

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
                points = result.points;
                const easterPoints = points.filter(point => (point.title == 'Easter hunt'))
                
                if (easterPoints.length >= 20) {
                    game_active = false;
                }
            })
            .catch((error) => {
                setTimeout(() => {
                }, 1000);
            });
    }

    return (
        <div className="p-5 bg-light shadow w-100 m-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12">
                        <div className="row mb-3 border-1 border-primary border-bottom pb-5 pb-md-">
                            <div className="col-12 text-center text-md-start">
                                <h1 className="h1 fw-normal text-primary-darker">
                                    Welcome, {user.username}!
                                </h1>
                                <p className="mb-0 lead">You currently have <Link href="/dashboard/points" className="text-dark">{user.points}</Link>&nbsp;Princess&nbsp;Points!</p>
                            </div>
                        </div>

                        { show_easter_hunt && 
                            <div className="row g-4 pt-4 text-center">
                                <div className="col"></div>
                                <div className="col-12 col-md-8">
                                    <div className="alert alert-secondary bg-secondary-darker p-4">
                                        <h2 className="fs-1 font-fancy mb-3 text-light">A new game is here!</h2>
                                        <p className="fs-5 text-light">Are you ready to search for&nbsp;Easter&nbsp;eggs? Don't wait, this game will be gone after Easter!</p>
                                        <p className="mb-0">
                                        <Link href={`/dashboard/games/easter/egg-hunt`} className="btn btn-secondary-lighter">Start hunting!</Link>
                                        </p>
                                    </div>  
                                </div>
                                <div className="col"></div>
                            </div>
                        }

                        { show_easter_game && 
                            <div className="row g-4 text-center">
                                <div className="col"></div>
                                <div className="col-12 col-md-8">
                                    { game_active && 
                                        <div className="alert alert-secondary bg-secondary-lightest p-4">
                                            <h2 className="fs-1 font-fancy mb-3">A new game is here!</h2>
                                            <p className="fs-5">A blue bunny could be hiding at the bottom of every page, can you find him?</p>
                                            <p className="mb-0"><em>The bunny will only be here until Easter, and can only be clicked a certain number of times (20).</em></p>
                                        
                                        </div>  
                                    }
                                    { !game_active && 
                                        <div className="alert alert-secondary bg-secondary-lightest p-4">
                                            <h2 className="fs-1 font-fancy mb-3">Congratulations!</h2>
                                            <p className="fs-5 mb-0">You earned a total of <b>200 Princess Points</b> for finding all of the bunnies.</p>                                    
                                        </div>  
                                    }
                                </div>
                                <div className="col"></div>
                        </div>
                        }

                        <div className="row g-4 pt-4 text-center">
                            { role_id === 1 &&
                                <>
                                    <div className="col-12 col-md-4">
                                        <Card 
                                            role={role_id}
                                            title="Manage users"
                                            description="View and change user information"
                                            linkHref="/dashboard/users"
                                            linkText="Manage users"                               
                                        />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <Card 
                                            role={role_id}
                                            title="Manage points"
                                            description="Add, view, and remove Princess Points"
                                            linkHref="/dashboard/points/manage"
                                            linkText="Manage points"                               
                                        />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <Card 
                                            role={role_id}
                                            title="Manage rewards"
                                            description="Add, view, and remove Princess Points"
                                            linkHref="/dashboard/rewards/manage"
                                            linkText="Manage rewards"                               
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Card 
                                            role={role_id}
                                            title="Grant points"
                                            description="Grant Princess Points to the princess"
                                            linkHref="/dashboard/points/manage/grant"
                                            linkText="Grant points"                               
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Card 
                                            role={role_id}
                                            title="View tasks"
                                            description="View tasks for Daddy"
                                            linkHref="/dashboard/tasks"
                                            linkText="View tasks"                               
                                        />
                                    </div>
                                </>
                            
                            }   

                            { role_id === 2 &&
                                <>
                                    <div className="col-12 col-md-4">
                                        <Card 
                                            role={role_id}
                                            title="View points"
                                            description="See all of the Princess Points you have earned and spent over time."
                                            linkHref="/dashboard/points"
                                            linkText="View points"                               
                                        />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <Card 
                                            role={role_id}
                                            title="Earn points"
                                            description="Find ways that you can earn more Princess Points."
                                            linkHref="/dashboard/points/earn"
                                            linkText="Earn points"                               
                                        />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <Card 
                                            role={role_id}
                                            title="Spend points"
                                            description="Ready to spend your Princess Points on a reward?"
                                            linkHref="/dashboard/rewards/spend"
                                            linkText="Spend points"                               
                                        />
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}