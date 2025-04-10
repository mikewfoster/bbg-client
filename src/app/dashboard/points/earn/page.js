import { cookies } from "next/headers";
import Link from 'next/link'

import { SubNav } from "@/components/template/parts/SubNav";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'; // Specific icon import

library.add(faPlusSquare, faMinusSquare); // Add the icon to the library


export default async function Earn() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access?.id;
    const role_id = access?.role;

    let points = [];
    let user = {};

    if (user_id && token) {
        const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`;    
        const POINTS_URL = `${API_ROOT}/points`;     
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
                                    Earn Princess Points
                                </h1>
                                <p className="lead">Listed below are all the ways you can earn more Princess Points</p>
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

                        <p className="text-center">If you don't find something below that fits, you can always <a href="/dashboard/points/manage" className="fw-bold text-secondary-darker">add your own type of points</a></p>

                        <br />                      

                        <div className="row fs-5 p-1 py-3 bg-secondary-lighter rounded mb-2 d-none d-md-flex">
                            <div className="col-2">
                                <strong>Points</strong>
                            </div>
                            <div className="col-8">
                                <strong>Description</strong>
                            </div>
                            <div className="col-2 text-center">
                                <strong>Claim</strong>
                            </div>
                        </div>

                        {points.map((point) => (
                            <div className="row p-1 py-3 border border-1 border-secondary rounded mt-4">
                                <div className="col-12 col-md-2 fs-5 text-center text-md-start">
                                    <FontAwesomeIcon icon={faPlusSquare} className="text-secondary" /> 
                                    { ' ' + Math.abs(point.value) }
                                </div>
                                <div className="col-12 col-md-8 text-center text-md-start">
                                    <div className="d-inline d-md-none">
                                        <br />
                                    </div>
                                    <strong>{ point.title }</strong>
                                    <br />
                                    { point.description }
                                </div>
                                <div className="col-12 col-md-2 text-center">
                                    <div className="d-inline d-md-none">
                                        <br />
                                    </div>
                                    <Link href={`/dashboard/points/earn/claim/${point.id}`} className="text-dark btn btn-secondary mt-1">Claim</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
