import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SubNav } from "@/components/template/parts/SubNav";
import InputText from "@/components/form/InputText";
import Button from "@/components/form/Button";

export default async function RedeemReward( {params} ) {
    const { id } = await params

    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access?.id;
    const role_id = access?.role;
    const username = access?.username;

    let task = {};

    if (user_id && token) {
        const API_ROOT = `${process.env.API_URL}`;    
        const TASK_URL = `${API_ROOT}/tasks/${id}`;

        await fetch(TASK_URL, {
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
                task = result.task;
            })
            .catch((error) => {
                setTimeout(() => {
                }, 1000);
            });
    }

    const updateTask = async (data) => {
        "use server"

        const API_ROOT = `${process.env.API_URL}`;    
        const TASK_URL = `${API_ROOT}/tasks/${data.get('id')}/accept`;

        const body = {
            username: data.get('username'),
            user_id: data.get('user_id')
        };

        fetch(TASK_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${data.get('token')}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((result) => {
            })
            .catch((error) => {
                setTimeout(() => {
                }, 1000);
            });
        
        redirect(`/dashboard/tasks/${data.get('id')}`); 
    };

    const submitHandler = async (formData) => {
        "use server"
        await updateTask(formData);
    };

    return (
        <div className="p-5 bg-light shadow w-100 m-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12">
                        <div className="row mb-3 border-1 border-primary border-bottom pb-5 pb-md-3">
                            <div className="col-12 col-md-6 text-center text-md-start">
                                <h1 className="h1 fw-normal font-fancy text-primary-darker">
                                    Manage Tasks
                                </h1>
                                <p className="lead">
                                    {task.reward_id && 'Request to redeem reward: '}
                                    {task.point_id && 'Request to claim points: '}
                                    {task.item.title }
                                </p>
                            </div>
                            <div className="col-12 col-md-6 text-center text-md-end">
                                <SubNav role={role_id} />
                            </div>
                        </div>
                        
                        <br />   

                        <form className="" action={submitHandler}>
                            <input type="hidden" name="username" id="username" value={username} />
                            <input type="hidden" name="token" id="token" value={token} />
                            <input type="hidden" name="user_id" id="user_id" value={user_id} />
                            <input type="hidden" name="id" id="id" value={task.id} />
                            
                            { task.completed &&
                                <>
                                    <div className="row fs-5 ">
                                        <div className="col-2 d-none d-md-flex">
                                        </div>
                                        <div className="col-12 col-md-8 p-1 py-3 bg-secondary-lighter rounded mb-2 text-center">
                                            This task was completed <strong>{ task.completed }</strong> by {task.mod_id}
                                        </div> 
                                        <div className="col-2 d-none d-md-flex">
                                        </div>
                                    </div>

                                    <br /> 
                                </> 
                            }

                            <h2 className="fs-4">
                                Note for Daddy
                            </h2>
                            <p className="lead">{task.note}</p>

                            <h2 className="mt-5 fs-4">
                                {task.reward_id && 'Reward '}
                                {task.point_id && 'Point '}
                                Details
                            </h2>

                            <div className="row mt-1">
                                <div className="col-12 col-md-2 fw-500">Title</div>
                                <div className="col-12 col-md-10">{task.item.title}</div>
                            </div>
                            <div className="row mt-1">
                                <div className="col-12 col-md-2 fw-500">Description</div>
                                <div className="col-12 col-md-10">{task.item.description}</div>
                            </div>
                            <div className="row mt-1">
                                <div className="col-12 col-md-2 fw-500">Value</div>
                                <div className="col-12 col-md-10">{task.item.value}</div>
                            </div>
                            

                            <h2 className="mt-5 fs-4">Request details</h2>

                            <div className="row mt-1">
                                <div className="col-12 col-md-2 fw-500">Requested on</div>
                                <div className="col-12 col-md-10">{task.createdAt}</div>
                            </div>
                            <div className="row mt-1">
                                <div className="col-12 col-md-2 fw-500">Requested by</div>
                                <div className="col-12 col-md-10">{task.create_id}</div>
                            </div>

                            { !task.completed && <Button
                                type="submit"
                                text="Accept"
                                theme="secondary"
                                classList="mt-5"
                            /> }
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    );
}
