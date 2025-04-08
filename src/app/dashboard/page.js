import { cookies } from 'next/headers';

import Link from 'next/link'
import { Card } from "@/components/template/parts/dashboard/Card";

export default async function Dashboard() {   
    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access?.id;
    const role_id = access?.role;

    let user = [];

    if (user_id && token) {
        const API_ROOT = `${process.env.API_URL}`;        
        const USERS_URL = `${API_ROOT}/users/${user_id}`;

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

                        <div className="row g-4 pt-5 text-center">
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