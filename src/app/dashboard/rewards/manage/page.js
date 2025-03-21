import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SubNav } from "@/components/template/parts/SubNav";
import InputText from "@/components/form/InputText";
import Button from "@/components/form/Button";
import Link from 'next/link'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'; // Specific icon import

library.add(faPlusSquare, faMinusSquare, faTrash, faPencil); // Add the icon to the library


export default async function ManageDashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access?.id;
    const role_id = access?.role;
    const username = access?.username;

    let rewards = [];

    if (user_id && token) {
        const REWARDS_URL = `http://localhost:5000/rewards`;

        await fetch(REWARDS_URL, {
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
                rewards = result.rewards;
            })
            .catch((error) => {
                setTimeout(() => {
                }, 1000);
            });
    }

    const addReward = async (data) => {
        "use server"

        const POINT_URL = "http://localhost:5000/rewards/";

        const body = {
            username: data.get('username'),
            title: data.get('title'),
            description: data.get('description'),
            link: data.get('link'),
            value: data.get('value')
        };

        fetch(POINT_URL, {
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
        
        redirect("/dashboard/rewards/manage");  
    };

    const submitHandler = async (formData) => {
        "use server"
        await addReward(formData);
    };

    return (
        <div className="p-5 bg-light shadow w-100 m-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12">
                        <div className="row mb-3 border-1 border-primary border-bottom pb-5 pb-md-3">
                            <div className="col-12 col-md-6 text-center text-md-start">
                                <h1 className="h1 fw-normal font-fancy text-primary-darker">
                                    Manage Princess Rewards
                                </h1>
                                <p className="lead">Manage rewards here</p>
                            </div>
                            <div className="col-12 col-md-6 text-center text-md-end">
                                <SubNav role={role_id} />
                            </div>
                        </div>
                        
                        <br />     

                        <form className="" action={submitHandler}>
                            <input type="hidden" name="username" id="username" value={username} />
                            <input type="hidden" name="token" id="token" value={token} />

                            <InputText
                                name="title"
                                placeholder="Title"
                                value=""
                                error=""
                            />

                            <InputText
                                name="description"
                                placeholder="Description"
                                value=""
                                error=""
                            />

                            <InputText
                                name="link"
                                placeholder="Link"
                                value=""
                                error=""
                            />

                            <InputText
                                name="value"
                                placeholder="Value"
                                value=""
                                error=""
                            />

                            <Button
                                type="submit"
                                text="Save new reward"
                                theme="primary"
                                classList="mt-3"
                            />
                        </form>      

                        <br />  <br />                

                        <div className="row fs-5 p-1 py-3 bg-primary-lighter rounded mb-2 d-none d-md-flex">
                            <div className="col-2 text-center">
                                <strong>Rewards</strong>
                            </div>
                            <div className="col-8">
                                <strong>Description</strong>
                            </div>
                            <div className="col-2 text-center">
                                <strong>Edit</strong>
                            </div>
                        </div>

                        {rewards.map((reward) => (
                            <div className="row p-1 py-3 border border-1 border-primary rounded mt-4">
                                <div className="col-12 col-md-2 fs-5 text-center text-md-start">
                                    <FontAwesomeIcon icon={faPlusSquare} className="text-primary" /> { Math.abs(reward.value) }
                                </div>
                                <div className="col-12 col-md-8 text-center text-md-start">
                                    <div className="d-inline d-md-none">
                                        <br />
                                    </div>
                                    <strong>{ reward.title }</strong>
                                    <br />
                                    { reward.description }
                                </div>
                                <div className="col-12 col-md-2 text-center">
                                    <div className="d-inline d-md-none">
                                        <br />
                                    </div>
                                    <Link href={`/dashboard/rewards/manage/${reward.id}`} className="btn btn-primary mt-1 bg-light">{ <FontAwesomeIcon icon={faPencil} className="text-primary-darker" /> } <span className="text-primary-darkest d-inline d-md-none">Edit</span> </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
