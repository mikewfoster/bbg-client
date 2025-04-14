import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import Button from "@/components/form/Button";

// Game Names
// "Easter hunt" - 2025 easter egg style game

async function Game () {
    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get('access').value);
    const user_id = access.id;
    const role_id = access.role;
    const username = access.username;
    
    const isLoggedIn = token ? true : false;
    let points = [];

    const currentDate = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
    let show_game = (currentDate <= new Date('04/20/25'));
    let game_active = false;

    if (user_id && token) {
        const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`;    
        const POINTS_URL = `${API_ROOT}/users/${user_id}/points`;  
            
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
                const easterPoints = points.filter(point => (point.title == 'Easter hunt'))

                if (easterPoints.length >= 20 || !show_game) {
                    game_active = false;
                } else {
                    game_active = (Math.random() <= 0.5)
                }
            })
            .catch((error) => {
                setTimeout(() => {
                }, 1000);
            });
    }

    const adjustPoints = async (data) => {
        "use server"

        const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`;   
        const GAME_URL = `${API_ROOT}/users/${data.get('user_id')}/points/game`;

        const body = {
            username: data.get('username'),
            game: data.get('game')
        };

        fetch(GAME_URL, {
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
        
        redirect(`/dashboard/games`);  
    };

    const submitHandler = async (formData) => {
        "use server"
        await adjustPoints(formData);
    };

    return (
        <div className="row py-4 game" id="easter">               
            <div className="col-md-12 text-center">   
                
                { (isLoggedIn && game_active && role_id == 2) &&
                    <form className="" action={submitHandler}>
                        <input type="hidden" name="username" id="username" value={username} />
                        <input type="hidden" name="user_id" id="user_id" value={user_id} />
                        <input type="hidden" name="token" id="token" value={token} />
                        <input type="hidden" name="game" id="game" value="Easter hunt" />
                        <Button
                            type="submit"
                            id="bunny"
                            text={ <img src={"/bunny-game.png"} /> }
                            theme=""
                            classList="mt-3 border-0"
                        />
                    </form> 
                }
            </div>   
        </div>   
    )
}

export default Game