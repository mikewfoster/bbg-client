import { cookies } from "next/headers";

import { SubNav } from "@/components/template/parts/SubNav";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'; // Specific icon import

library.add(faPlusSquare, faMinusSquare); // Add the icon to the library


export default async function Points() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access?.id;
    const role_id = access?.role;

    let points = [];
    let user = {};

    if (user_id && token) {
        const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`;    
        const POINTS_URL = `${API_ROOT}/users/${user_id}/points`;     
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
                                    Princess Points
                                </h1>
                                <p className="lead">Points you've earned and spent</p>
                            </div>
                            <div className="col-12 col-md-6 text-center text-md-end">
                                <SubNav role={role_id} />
                            </div>
                        </div>

                        <div className="row fs-5 mt-5">
                            <div className="col-2 d-none d-md-flex">
                            </div>
                            <div className="col-12 col-md-8 p-1 py-3 bg-secondary-lighter rounded mb-2 text-center">
                                You currently have <strong>{ user.points }&nbsp;Princess&nbsp;Points!</strong>
                            </div>
                            <div className="col-2 d-none d-md-flex">
                            </div>
                        </div>
                        
                        <br />

                        <div className="row fs-5 p-1 py-3 bg-primary-lighter rounded mb-2 d-none d-md-flex">
                            <div className="col-2">
                                <strong>Points</strong>
                            </div>
                            <div className="col-8">
                                <strong>Description</strong>
                            </div>
                            <div className="col-2">
                                <strong>Earned/Spent on</strong>
                            </div>
                        </div>

                        {points.map((point) => (
                            <div className={"row p-1 py-3 border border-1 rounded mb-4 border-" + ((point.type === 'point') ? 'secondary' : 'primary') }>
                                <div className="col-12 col-md-2 fs-5 text-center">
                                    <p className={"rounded fs-6 mb-1 p-1 bg-" + ((point.type === 'point') ? 'secondary' : 'primary') }><i>
                                        { point.type === 'point' && 'Points' } 
                                        { point.type === 'reward' && 'Reward' } 
                                    </i></p>
                                    { point.type === 'point' && <FontAwesomeIcon icon={faPlusSquare} className="text-secondary" /> } 
                                    { point.type === 'reward' && <FontAwesomeIcon icon={faMinusSquare} className="text-primary-darker" /> } 
                                    { ' ' + Math.abs(point.points) }
                                </div>
                                <div className="col-12 col-md-8 text-center text-md-start">
                                    <div className="d-inline d-md-none">
                                        <br />
                                    </div>
                                    <strong>{ point.title }</strong>
                                    <br />
                                    { point.description }
                                </div>
                                <div className="col-12 col-md-2 text-center text-md-start">
                                    <div className="d-inline d-md-none">
                                        <br />
                                        { point.type === 'point' && 'Earned ' } 
                                        { point.type === 'reward' && 'Spent ' } 
                                    </div>
                                    { point.created }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
