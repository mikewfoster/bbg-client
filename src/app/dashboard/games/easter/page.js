import { cookies } from 'next/headers';
import { SubNav } from "@/components/template/parts/SubNav";

export default async function Easter() {   
    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access?.id;
    const role_id = access?.role;

    let user = [];

    if (user_id && token) {
        const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`;        
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
    }

    return (
        <div id="game_landing" className="p-5 bg-light shadow w-100 m-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12 text-center">
                        <img src="/bunny-game-pink.png" />
                        
                        <h1 className="mt-3 font-fancy text-primary">You found an Easter bunny!</h1>
                        <p className="lead">You have been rewarded 10 Princess Points.</p>
                    </div>
                    <div className="col-12 text-center">
                        <SubNav role={role_id} />
                    </div>
                </div>
            </div>
        </div>
    );
}