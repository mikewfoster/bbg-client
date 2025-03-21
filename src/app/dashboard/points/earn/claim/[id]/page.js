import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SubNav } from "@/components/template/parts/SubNav";
import InputText from "@/components/form/InputText";
import Button from "@/components/form/Button";

export default async function ClaimPoint( {params} ) {
    const { id } = await params
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access?.id;
    const role_id = access?.role;
    const username = access?.username;

    let point = {};

    if (user_id && token) {
        const POINT_URL = `http://localhost:5000/points/${id}`;

        await fetch(POINT_URL, {
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

    const claimPoint = async (data) => {
        "use server"

        const TASK_URL = `http://localhost:5000/tasks`;

        const body = {
            username: data.get('username'),
            point_id: data.get('id'),
            note: data.get('note'),
            user_id: data.get('user_id'),
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
        
        redirect(`/dashboard/points/earn`);  
    };

    const submitHandler = async (formData) => {
        "use server"
        await claimPoint(formData);
    };

    return (
        <div className="p-5 bg-light shadow w-100 m-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12">
                        <div className="row mb-3 border-1 border-primary border-bottom pb-5 pb-md-3">
                            <div className="col-12 col-md-6 text-center text-md-start">
                                <h1 className="h1 fw-normal font-fancy text-primary-darker">
                                    Claim Princess Points
                                </h1>
                                <p className="lead">{point.title}</p>
                            </div>
                            <div className="col-12 col-md-6 text-center text-md-end">
                                <SubNav role={role_id} />
                            </div>
                        </div>
                        
                        <br />    

                        <div className="row fs-5 ">
                            <div className="col-2">
                            </div>
                            <div className="col-8 p-3 bg-secondary-lighter rounded mb-2 text-center">
                                After you press <strong>Claim points</strong> below, daddy will get a notification.
                            </div>
                            <div className="col-2">
                            </div>
                        </div>  

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
                                readonly={true}
                            />

                            <InputText
                                name="description"
                                placeholder="Description"
                                value={point.description}
                                error=""
                                readonly={true}
                            />

                            <InputText
                                name="points"
                                placeholder="Points"
                                value={point.value}
                                error=""
                                readonly={true}
                            />

                            <InputText
                                name="note"
                                placeholder="Note for Daddy"
                                value=""
                                error=""
                            />

                            <Button
                                type="submit"
                                text="Claim points"
                                theme="primary"
                                classList="mt-3"
                            />
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    );
}
