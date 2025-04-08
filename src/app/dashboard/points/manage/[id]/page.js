import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SubNav } from "@/components/template/parts/SubNav";
import InputText from "@/components/form/InputText";
import Button from "@/components/form/Button";

export default async function ManagePoint( {params} ) {
    const { id } = await params

    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access?.id;
    const role_id = access?.role;
    const username = access?.username;
    
    let point = {};
    const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`;        
    const USERS_URL = `${API_ROOT}/users/${user_id}`;

    if (user_id && token) {
        const POINTS_URL = `${API_ROOT}/points/${id}`;

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
                point = result.point;
            })
            .catch((error) => {
                setTimeout(() => {
                }, 1000);
            });
    }

    const editPoint = async (data) => {
        "use server"

        const EDIT_URL = `${API_ROOT}/points/${data.get('id')}`;

        const body = {
            username: data.get('username'),
            title: data.get('title'),
            description: data.get('description'),
            value: data.get('value'),
            id: data.get('user_id'),
        };

        fetch(EDIT_URL, {
            method: "PATCH",
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
        
        redirect(`/dashboard/points/manage/${data.get('id')}`);  
    };

    const submitHandler = async (formData) => {
        "use server"
        await editPoint(formData);
    };

    return (
        <div className="p-5 bg-light shadow w-100 m-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12">
                        <div className="row mb-3 border-1 border-primary border-bottom pb-5 pb-md-3">
                            <div className="col-12 col-md-6 text-center text-md-start">
                                <h1 className="h1 fw-normal font-fancy text-primary-darker">
                                    Edit Princess Point
                                </h1>
                                <p className="lead">{point.title}</p>
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
                            <input type="hidden" name="id" id="id" value={point.id} />

                            <InputText
                                name="title"
                                placeholder="Title"
                                value={point.title}
                                error=""
                            />

                            <InputText
                                name="description"
                                placeholder="Description"
                                value={point.description}
                                error=""
                            />

                            <InputText
                                name="value"
                                placeholder="Value"
                                value={point.value}
                                error=""
                            />

                            <Button
                                type="submit"
                                text="Save point"
                                theme="secondary"
                                classList="mt-3"
                            />
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    );
}
