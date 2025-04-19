'use client'
 
export default function StartHunt({user_id, token, username, game}) {
    const startGame = () => { 
        setTimeout(function() {
            let score = 0;
            const eggs = document.querySelectorAll('.egg__check:checked');
            const eggsArray = [...eggs]
            eggsArray.forEach(egg => { score = score + Number(egg.dataset.score) })

            const API_ROOT = `${process.env.NEXT_PUBLIC_API_URL}`;   
            const GAME_URL = `${API_ROOT}/users/${user_id}/points/game`;

            const body = {
                username: username,
                game: game,
                point_value_override: score
            };

            fetch(GAME_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
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

                
        }, 31000); 
    }
 
    return (
        <input className="start" id="start" type="checkbox" onChange={ () => startGame() } />
    )
}