import { cookies } from "next/headers";
import Link from 'next/link'

import { SubNav } from "@/components/template/parts/SubNav";

export default async function Users( {} ) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access?.id;
    const role_id = access?.role;

    let users = [];

    if (user_id && token) {
        const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`;
        const USERS_URL = `${API_ROOT}/users/`;

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
                users = result.users;
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
                        <div className="row mb-3 border-1 border-primary border-bottom pb-5 pb-md-3">
                            <div className="col-12 col-md-6 text-center text-md-start">
                                <h1 className="h1 fw-normal font-fancy text-primary-darker">
                                    Users
                                </h1>
                                <p className="lead"></p>
                            </div>
                            <div className="col-12 col-md-6 text-center text-md-end">
                                <SubNav role={role_id} />
                            </div>
                        </div>
                        
                        <br />     

                        <div className="row">
                            <div className="col-12">
                                <h2>Select user</h2>

                                
                                {users.map((user) => (
                                    <div className={"row p-1 pt-3  pb-2 border border-1 rounded mb-2 border-secondary"}>
                                        <div className="col-12 fs-4">
                                            <Link href={`/dashboard/users/${user.id}`} className="text-dark btn btn-secondary me-3">View <span className="visually-hidden">{ user.username }'s</span> profile</Link>
                                        
                                            { role_id == '1' && <Link href={`/dashboard/points/manage/grant?user_id=${user.id}`} className="text-dark btn btn-secondary me-3">Grant Points</Link> }
                                
                                            <b>{ user.username }</b>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
