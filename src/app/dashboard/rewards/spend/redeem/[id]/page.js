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

    let reward = {};
    const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`; 

    if (user_id && token) {   
        const REWARD_URL = `${API_ROOT}/rewards/${id}`;

        await fetch(REWARD_URL, {
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
                reward = result.reward;
            })
            .catch((error) => {
                setTimeout(() => {
                }, 1000);
            });
    }

    const redeemReward = async (data) => {
        "use server"

        const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`;   
        const TASK_URL = `${API_ROOT}/tasks/`;

        const body = {
            username: data.get('username'),
            reward_id: data.get('id'),
            note: data.get('note'),
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
        
        redirect(`/dashboard/rewards/spend`);  
    };

    const submitHandler = async (formData) => {
        "use server"
        await redeemReward(formData);
    };

    return (
        <div className="p-5 bg-light shadow w-100 m-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12">
                        <div className="row mb-3 border-1 border-primary border-bottom pb-5 pb-md-3">
                            <div className="col-12 col-md-6 text-center text-md-start">
                                <h1 className="h1 fw-normal font-fancy text-primary-darker">
                                    Redeem Princess Rewards
                                </h1>
                                <p className="lead">{reward.title}</p>
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
                                After you press <strong>Redeem reward</strong> below, daddy will get a notification.
                                <br /><span className="fs-6"><em>You can also add special notes in the <strong>Note for Daddy</strong> field</em>.</span>
                            </div>
                            <div className="col-2">
                            </div>
                        </div>
                        
                        <br />   

                        <form className="" action={submitHandler}>
                            <input type="hidden" name="username" id="username" value={username} />
                            <input type="hidden" name="token" id="token" value={token} />
                            <input type="hidden" name="user_id" id="user_id" value={user_id} />
                            <input type="hidden" name="id" id="id" value={reward.id} />

                            <InputText
                                name="title"
                                placeholder="Title"
                                value={reward.title}
                                error=""
                                readonly={true}
                            />

                            <InputText
                                name="description"
                                placeholder="Description"
                                value={reward.description}
                                error=""
                                readonly={true}
                            />

                            <InputText
                                name="points"
                                placeholder="Points"
                                value={reward.value}
                                readonly={true}
                                error=""
                            />

                            <InputText
                                name="note"
                                placeholder="Note for Daddy"
                                value=""
                                error=""
                            />

                            <Button
                                type="submit"
                                text="Redeem reward"
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
