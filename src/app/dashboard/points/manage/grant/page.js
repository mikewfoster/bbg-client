import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SubNav } from "@/components/template/parts/SubNav";
import InputText from "@/components/form/InputText";
import Button from "@/components/form/Button";

export default async function Grant( { searchParams } ) {
    const load_id = searchParams?.user_id || null;

    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access.id;
    const role_id = access.role;
    const username = access.username;

    let users = [];
    let points = [];
    let rewards = [];

    const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`;

    if (user_id && token) {        
        const USERS_URL = `${API_ROOT}/users/`;
        const POINTS_URL = `${API_ROOT}/points/`;
        const REWARDS_URL = `${API_ROOT}/rewards/`;

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
                // points = result.points;
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

    const adjustPoints = async (data) => {
        "use server"

        const POINT_URL = `${API_ROOT}/users/${data.get('user_id')}/points`;
        const pointId = data.get('point_id') || null;
        const rewardId = data.get('reward_id') || null;

        const body = { };

        body.username = data.get('username');
        if (pointId) body.PointId = pointId;
        if (rewardId) body.RewardId = rewardId;

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
        
        redirect(`/dashboard/points/manage/grant/?user_id=${data.get('user_id')}`);  
    };

    const submitHandler = async (formData) => {
        "use server"
        await adjustPoints(formData);
    };

    return (
        <div className="p-5 bg-light shadow w-100 m-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12">
                        <div className="row mb-3 border-1 border-primary border-bottom pb-5 pb-md-3">
                            <div className="col-12 col-md-6 text-center text-md-start">
                                <h1 className="h1 fw-normal font-fancy text-primary-darker">
                                    Adjust Princess Points
                                </h1>
                                <p className="lead"></p>
                            </div>
                            <div className="col-12 col-md-6 text-center text-md-end">
                                <SubNav role={role_id} />
                            </div>
                        </div>
                        
                        <br />     

                        <form className="" action={submitHandler}>
                            <input type="hidden" name="username" id="username" value={username} />
                            <input type="hidden" name="token" id="token" value={token} />

                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <label for="user_id" className="form-label fw-500 text-primary-darker">Select user</label>

                                    <select className="form-select mb-4 bg-light" name="user_id" id="user_id">
                                        <option value="">Select a user</option>
                                        {users.map((user) => (
                                            <option value={user.id} selected={ user.id == load_id }>{ user.username }</option>
                                        ))}
                                    </select>

                                    <label for="point_id" className="form-label fw-500 text-primary-darker">Grant points</label>

                                    <select className="form-select mb-4 bg-light" name="point_id" id="point_id">
                                        <option value="">Select points</option>   
                                        {points.map((point) => (
                                            <option value={point.id}>({point.value}) { point.title }</option>
                                        ))}                                 
                                    </select>

                                    { (role_id == '1') && <>
                                        <label for="reward_id" className="form-label fw-500 text-primary-darker">Grant reward</label>

                                        <select className="form-select mb-4 bg-light" name="reward_id" id="reward_id">
                                            <option value="">Select a reward</option>  
                                            {rewards.map((reward) => (
                                                <option value={reward.id}>({reward.value}){ reward.title }</option>
                                            ))}                              
                                        </select>
                                    </> }
                                </div>
                            </div>
                            
                            <Button
                                    type="submit"
                                    text="Adjust points"
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
