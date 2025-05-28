import { cookies } from "next/headers";
import Link from 'next/link'

import InputText from "@/components/form/InputText";
import Button from "@/components/form/Button";
import { SubNav } from "@/components/template/parts/SubNav";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'; // Specific icon import

export const metadata = {
    title: 'Profile ⑅ Users ⑅ Princess Rewards',
    description: 'Profile ⑅ Users ⑅ Princess Rewards',
}

export default async function User( {params} ) {
    const { id } = await params
    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access?.id;
    const role_id = access?.role;

    let user = {};
    let points = [];

    if (user_id && token) {
        const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`;        
        const USERS_URL = `${API_ROOT}/users/${id}`;
        const POINTS_URL = `${API_ROOT}/users/${id}/points`;

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
                console.log(result);
                
                points = result.points;
                
            })
            .catch((error) => {
                setTimeout(() => {
                }, 1000);
            });
    }

    const submitHandler = async (formData) => {
        "use server"
    };

    return (
        <div className="p-5 bg-light shadow w-100 m-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12">
                        <div className="row mb-3 border-1 border-primary border-bottom pb-5 pb-md-3">
                            <div className="col-12 col-md-6 text-center text-md-start">
                                <h1 className="h1 fw-normal font-fancy text-primary-darker">
                                    {user?.username}'s Profile 
                                </h1>
                                <p className="lead">Change profile information here</p>
                            </div>
                            <div className="col-12 col-md-6 text-center text-md-end">
                                <SubNav role={role_id} />
                            </div>
                        </div>

                        <div className="row g-4 pt-5">
                            <div className="col-12 col-xl-6 col-md-8">   
                                <form className="" action={submitHandler}>
                                    <InputText
                                        name="username"
                                        placeholder="Username"
                                        value={user.username}
                                        error=""
                                    />

                                    <InputText
                                        name="email"
                                        placeholder="Email"
                                        value={user.email}
                                        error=""
                                    />

                                    <Button
                                        type="submit"
                                        text="Save changes"
                                        theme="primary"
                                        classList="mt-3"
                                    />
                                    { role_id == '1' && <Link href={`/dashboard/points/manage/grant?user_id=${user.id}`} className="ms-2 btn btn-light bg-secondary-lighter border border-2 border-secondary mt-3 py-2">Grant Points</Link> }
                                </form>
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

                        <h2 className="mt-4">Points/Rewards history</h2>

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
                            <div className={"row p-1 py-3 border border-1 rounded mt-4 border-" + ((point.type === 'point') ? 'secondary' : 'primary') }>
                                <div className="col-12 col-md-2 fs-5 text-center">
                                    <p className={"rounded fs-6 mb-1 p-1 bg-" + ((point.type === 'point') ? 'secondary' : 'primary') }>
                                        { point.type === 'point' && 'Points' } 
                                        { point.type === 'reward' && 'Reward' } 
                                    </p>
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
                                    { point.notes && 
                                        <p className="mt-2 mb-0"><em><strong>Reason: </strong> { point.notes }</em></p>
                                    }
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
