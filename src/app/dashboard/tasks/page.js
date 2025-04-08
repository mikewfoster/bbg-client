import { cookies } from "next/headers";
import Link from 'next/link'

import { SubNav } from "@/components/template/parts/SubNav";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'; // Specific icon import

library.add(faPlusSquare, faMinusSquare); // Add the icon to the library

export default async function Users( {} ) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access?.id;
    const role_id = access?.role;

    let tasks = [];

    if (user_id && token) {
        const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`;
        const TASKS_URL = `${API_ROOT}/tasks/`;

        await fetch(TASKS_URL, {
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
                tasks = result.tasks;
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
                                    Tasks
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
                                <h2 className="mb-2">Pending tasks</h2>
                                
                                {tasks.map((task) => (
                                    (!task.completed) && 
                                    <>
                                        <div className={"row p-1 py-3 border border-1 rounded mt-4 border-" + ((task.point_id) ? 'secondary' : 'primary') }>
                                            <div className="col-12 col-md-1 text-center">
                                                <p className={"rounded fs-6 mb-1 p-1 bg-" + ((task.point_id) ? 'secondary' : 'primary') }><i>
                                                    { task.point_id && 'Points' } 
                                                    { task.reward_id && 'Reward' } 
                                                </i></p>
                                                { task.point_id && <FontAwesomeIcon icon={faPlusSquare} className="text-secondary" /> } 
                                                { task.reward_id && <FontAwesomeIcon icon={faMinusSquare} className="text-primary-darker" /> } 
                                                { ' ' + Math.abs(task.item.value) }
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <div className="d-inline d-md-none">
                                                    <br />
                                                </div>
                                                <strong>{ task.item.title }</strong>
                                                <br />{ task.item.description }
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <div className="d-inline d-md-none">
                                                    <br />
                                                </div>
                                                <strong>Note for Daddy</strong>
                                                <br />{ task.note }
                                            </div>
                                            <div className="col-12 col-md-2">
                                                <div className="d-inline d-md-none">
                                                    <br />
                                                </div>
                                                <strong>Requested</strong>
                                                <br />{ task.updatedAt }
                                            </div>
                                            <div className="col-12 col-md-1 text-center text-md-start">
                                                <div className="d-inline d-md-none">
                                                    <br />
                                                </div>
                                                <Link href={`/dashboard/tasks/${task.id}`} className="text-dark btn btn-secondary mt-1">View</Link>
                                            </div>
                                        </div>
                                    </>
                                ))}

                                <h2 className="mt-5 mb-2">Completed tasks</h2>
                                {tasks.map((task) => (
                                    (task.completed) && 
                                    <>
                                        <div className={"row p-1 py-3 border border-1 rounded mt-4 border-success-light" }>
                                            <div className="col-12 col-md-1 text-center">
                                                <p className={"rounded fs-6 mb-1 p-1 bg-" + ((task.point_id) ? 'secondary' : 'primary') }><i>
                                                    { task.point_id && 'Points' } 
                                                    { task.reward_id && 'Reward' } 
                                                </i></p>
                                                { task.point_id && <FontAwesomeIcon icon={faPlusSquare} className="text-secondary" /> } 
                                                { task.reward_id && <FontAwesomeIcon icon={faMinusSquare} className="text-primary-darker" /> } 
                                                { ' ' + Math.abs(task.item.value) }
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <div className="d-inline d-md-none">
                                                    <br />
                                                </div>
                                                <strong>{ task.item.title }</strong>
                                                <br />{ task.item.description }
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <div className="d-inline d-md-none">
                                                    <br />
                                                </div>
                                                <strong>Note for Daddy</strong>
                                                <br />{ task.note }
                                            </div>
                                            <div className="col-12 col-md-2">
                                                <div className="d-inline d-md-none">
                                                    <br />
                                                </div>
                                                <strong>Completed</strong>
                                                <br />{ task.completed }
                                            </div>
                                            <div className="col-12 col-md-1">
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
