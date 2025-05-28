import { cookies } from "next/headers";
import Link from 'next/link'

import StartHunt from "./egg-hunt";
import Egg from "./egg";
import EggCheck from "./egg-check";

export const metadata = {
    title: "Easter egg hunt ⑅ Princess Rewards",
    description: "Easter egg hunt ⑅ Princess Rewards",
};

export default async function Easter() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;
    const access = JSON.parse(cookieStore.get("access").value);
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
                setTimeout(() => {}, 1000);
            });
    }

    return (
        <div className="shadow w-100 m-auto" id="egghunt-wrapper">
            <div className="">
                <div className="" id="egghunt">
                    <div className="" id="egghunt-body">
                        <form>
                            <StartHunt user_id={user_id} token={token} username={user.username} game="Easter egg hunt" />
                            <div className="info-screen title-screen">
                                <div className="title-screen__content info-screen__content">
                                    <div className="egg first-egg" />
                                    <h1 className="h1 fw-normal font-fancy text-primary-lighter">
                                        <br />
                                        Easter
                                        <br />
                                        egg hunt
                                    </h1>
                                    <p className="lead text-primary-lighter">
                                        You have 30 seconds to find as many eggs
                                        as you can. Use your finger to tap on
                                        screen and look for eggs in the grass.
                                        Solid pink and blue eggs score more
                                        points!
                                    </p>
                                    <button className="btn btn-primary">
                                        Start
                                    </button>
                                </div>
                            </div>
                            <div className="info-screen game-screen">
                                <div className="title-screen__content info-screen__content">
                                    <div className="game" style={{ "--cells": 3 }}>
                                <div className="bunny">🐣</div>
                                <div className="bunny">🐰</div>
                                <svg
                                    className="grass"
                                    viewBox="0 0 79.374998 79.375002"
                                >
                                    <g transform="translate(0,-217.62498)">
                                        <g id="g3754">
                                            <path
                                                className="grass__base"
                                                id="rect3699"
                                                style={{
                                                    strokeWidth: "0.26685545",
                                                }}
                                                d="m 1.528988,219.28138 c 1.2701862,-1.28343 3.5682263,1.22371 5.3431845,0.89191 1.0645073,-0.19899 1.749343,-1.93861 2.7948712,-1.6564 1.1736033,0.31678 0.5938313,2.90035 1.7755463,3.18539 1.635286,0.39445 2.515827,-2.73048 4.196443,-2.80314 1.497791,-0.0648 2.446786,2.28037 3.941612,2.16606 1.598672,-0.12225 2.212553,-2.85683 3.814197,-2.93056 2.304776,-0.10608 3.547533,3.78874 5.852847,3.69506 1.907455,-0.0775 2.683406,-3.6689 4.57869,-3.44023 1.526167,0.18414 1.442119,3.9826 2.922287,3.56764 1.156319,-0.32417 -0.514968,-2.92797 0.501389,-3.56764 2.373699,-1.49394 5.231712,2.86109 8.018914,2.54832 1.416444,-0.15895 2.266076,-2.28086 3.686781,-2.16607 1.591462,0.12859 2.123082,2.73528 3.686781,3.05798 2.511437,0.51827 4.822095,-2.31988 7.381835,-2.16607 1.934713,0.11625 3.404982,2.29155 5.343184,2.29348 3.137224,0.003 5.794711,-4.98162 8.655992,-3.69505 1.712536,0.77004 1.168101,3.56931 1.783819,5.34318 0.739251,2.12977 2.169295,4.11152 2.293482,6.36251 0.180307,3.2682 -2.948505,6.34095 -2.293482,9.5479 0.285143,1.39605 2.523049,2.00731 2.548314,3.43195 0.0292,1.64678 -2.732138,2.42352 -2.803145,4.06903 -0.0778,1.80285 2.669169,2.90159 2.675729,4.70611 0.0076,2.08907 -3.162282,3.38411 -3.057976,5.4706 0.08519,1.70401 3.041905,2.49394 2.93056,4.19644 -0.127398,1.94797 -4.035966,2.37363 -3.949885,4.32386 0.06354,1.43953 2.765126,1.54401 3.185391,2.92229 0.687253,2.25387 -1.95,4.53421 -1.656403,6.87217 0.215113,1.71298 2.543124,2.85659 2.420897,4.57869 -0.148401,2.09089 -4.0464,3.02185 -3.695054,5.08835 0.199193,1.17159 2.485851,0.92833 2.93056,2.03038 0.485231,1.20248 -0.795346,2.51788 -0.764494,3.8142 0.03744,1.57292 2.296125,3.50425 1.146741,4.57869 -2.117459,1.97938 -5.378304,-2.80999 -8.273744,-2.67573 -1.936123,0.0898 -3.43192,2.6155 -5.343185,2.29348 -1.243219,-0.20946 -1.534856,-2.59109 -2.794871,-2.54831 -1.469128,0.0499 -1.605565,2.911 -3.049703,3.18539 -2.293953,0.43585 -4.046212,-3.22545 -6.362509,-2.93056 -1.465254,0.18654 -1.968811,2.60068 -3.43195,2.80314 -2.428165,0.336 -4.298141,-3.08206 -6.744757,-2.93056 -1.91695,0.11871 -3.04201,3.01121 -4.960937,2.93056 -1.245787,-0.0523 -1.827873,-1.91735 -3.049703,-2.16606 -3.107623,-0.63258 -6.752468,3.93676 -9.29307,2.03865 -0.921022,-0.68811 0.782576,-2.92773 -0.246558,-3.44023 -1.537563,-0.76568 -2.624438,2.55346 -4.323859,2.80315 -2.40433,0.35326 -4.702754,-2.83247 -6.999588,-2.03865 -1.580403,0.54621 -1.253509,3.97149 -2.922287,4.0773 -1.6776265,0.10637 -1.7867566,-3.34997 -3.4319495,-3.69505 -1.6731553,-0.35095 -3.2845591,2.98829 -4.7061062,2.03865 -2.22292522,-1.48499 0.3039434,-5.35145 0.1274157,-8.01892 -0.1330882,-2.01107 1.8765461,-2.04819 -0.8919097,-5.98026 -0.8630751,-1.22584 1.8813113,-2.31267 2.1660663,-3.94161 0.9652668,-5.52182 -2.99661848,-3.7507 -1.5289879,-7.63667 0.5943435,-1.57369 2.759661,-2.51482 2.8031446,-4.19644 0.047198,-1.82529 -2.8746617,-2.88161 -2.8031446,-4.70611 0.069144,-1.76396 3.0484729,-2.55857 3.0579759,-4.32386 0.00804,-1.4939 -2.4123332,-2.19906 -2.5483133,-3.68678 -0.2074161,-2.26928 3.1217796,-3.97874 2.8031447,-6.23509 -0.3031088,-2.14641 -4.13087386,-2.79449 -4.20471701,-4.96094 -0.0609824,-1.78913 3.62000381,-2.58724 3.18539161,-4.32386 -0.2856487,-1.14139 -2.8308735,-0.3988 -3.18539161,-1.52071 -0.46912622,-1.4846 2.30744541,-2.51213 2.29348201,-4.06903 -0.012783,-1.42528 -2.6080645,-2.33171 -2.16606634,-3.68678 0.22967354,-0.70413 1.68812044,-0.2312 2.03865064,-0.88364 1.2644467,-2.3535 -3.28090058,-5.99257 -1.4015723,-7.8915 z"
                                            />
                                            <path
                                                className="grass__blade"
                                                id="path3717"
                                                style={{
                                                    strokeWidth: "0.10614534",
                                                }}
                                                d="m 16.387716,271.43993 a 1.915467,4.6658818 13.923565 0 0 -2.726575,3.37397 3.0669915,2.6836178 78.788973 0 0 -1.58476,-1.04467 3.0669915,2.6836178 78.788973 0 0 -0.994777,-0.0155 3.0669915,2.6836178 78.788973 0 0 -0.988734,0.45346 4.5238127,2.9136421 78.788973 0 1 2.612273,1.93479 l 0.621682,6.2e-4 a 1.915467,4.6658818 13.923565 0 0 -9.6e-5,3.9e-4 l 0.124743,1.4e-4 1.071372,0.002 0.689802,6.7e-4 a 3.1924455,7.6127541 50.379355 0 1 2.07544,-2.0389 3.1924455,7.6127541 50.379355 0 1 2.2908,-1.6046 2.2417513,4.7095533 58.161336 0 0 -3.47253,1.15444 2.2417513,4.7095533 58.161336 0 0 -1.220288,0.87424 4.2757557,7.9959888 2.8384564 0 1 1.501648,-3.09029 z"
                                            />
                                            <path
                                                className="grass__blade"
                                                id="path3743"
                                                d="m 57.879523,274.11566 a 4.6658818,1.915467 76.076435 0 1 2.726575,3.37397 2.6836178,3.0669915 11.211027 0 1 1.58476,-1.04467 2.6836178,3.0669915 11.211027 0 1 0.994777,-0.0155 2.6836178,3.0669915 11.211027 0 1 0.988734,0.45346 2.9136421,4.5238127 11.211027 0 0 -2.612273,1.93479 l -0.621682,6.2e-4 a 4.6658818,1.915467 76.076435 0 1 9.6e-5,3.9e-4 l -0.124743,1.4e-4 -1.071372,0.002 -0.689802,6.7e-4 a 7.6127541,3.1924455 39.620645 0 0 -2.07544,-2.0389 7.6127541,3.1924455 39.620645 0 0 -2.2908,-1.6046 4.7095533,2.2417513 31.838664 0 1 3.47253,1.15444 4.7095533,2.2417513 31.838664 0 1 1.220288,0.87424 7.9959888,4.2757557 87.161544 0 0 -1.501648,-3.09029 z"
                                                style={{
                                                    strokeWidth: "0.10614534",
                                                }}
                                            />
                                            <path
                                                className="grass__blade"
                                                id="path3745"
                                                style={{
                                                    strokeWidth: "0.10614534",
                                                }}
                                                d="m 23.777825,226.71704 a 1.915467,4.6658818 13.923565 0 0 -2.726575,3.37397 3.0669915,2.6836178 78.788973 0 0 -1.58476,-1.04467 3.0669915,2.6836178 78.788973 0 0 -0.994777,-0.0155 3.0669915,2.6836178 78.788973 0 0 -0.988734,0.45346 4.5238127,2.9136421 78.788973 0 1 2.612273,1.93479 l 0.621682,6.2e-4 a 1.915467,4.6658818 13.923565 0 0 -9.6e-5,3.9e-4 l 0.124743,1.4e-4 1.071372,0.002 0.689802,6.7e-4 a 3.1924455,7.6127541 50.379355 0 1 2.07544,-2.0389 3.1924455,7.6127541 50.379355 0 1 2.2908,-1.6046 2.2417513,4.7095533 58.161336 0 0 -3.47253,1.15444 2.2417513,4.7095533 58.161336 0 0 -1.220288,0.87424 4.2757557,7.9959888 2.838456 0 1 1.501648,-3.09029 z"
                                            />
                                            <path
                                                className="grass__blade"
                                                id="path3747"
                                                style={{
                                                    strokeWidth: "0.10614534",
                                                }}
                                                d="m 54.994662,246.97613 a 1.915467,4.6658818 13.923565 0 0 -2.726575,3.37397 3.0669915,2.6836178 78.788973 0 0 -1.58476,-1.04467 3.0669915,2.6836178 78.788973 0 0 -0.994777,-0.0155 3.0669915,2.6836178 78.788973 0 0 -0.988734,0.45346 4.5238127,2.9136421 78.788973 0 1 2.612273,1.93479 l 0.621682,6.2e-4 a 1.915467,4.6658818 13.923565 0 0 -9.6e-5,3.9e-4 l 0.124743,1.4e-4 1.071372,0.002 0.689802,6.7e-4 a 3.1924455,7.6127541 50.379355 0 1 2.07544,-2.0389 3.1924455,7.6127541 50.379355 0 1 2.2908,-1.6046 2.2417513,4.7095533 58.161336 0 0 -3.47253,1.15444 2.2417513,4.7095533 58.161336 0 0 -1.220288,0.87424 4.2757557,7.9959888 2.838456 0 1 1.501648,-3.09029 z"
                                            />
                                        </g>
                                    </g>
                                </svg>
                                <div
                                    className="game__cell gc1"
                                    style={{
                                        "--score": 1,
                                        "--x": 1.5,
                                        "--y": 3.25,
                                    }}
                                >
                                    <EggCheck value={1}/>
                                    <div className="egg__container">
                                        <Egg primary="#ffc8dd" secondary="#f4ffb9" rotation={43} />
                                        <div
                                            className="game__cell gc2"
                                            style={{
                                                "--score": 5,
                                                "--x": 0,
                                                "--y": -2,
                                            }}
                                        >
                                            <EggCheck value={5} />
                                            <div className="egg__container">
                                                <Egg primary="#4992d7" secondary="#4992d7" rotation={0} />
                                            </div>
                                        </div>
                                        <div
                                            className="game__cell gc3"
                                            style={{
                                                "--score": 1,
                                                "--x": -1,
                                                "--y": 3,
                                            }}
                                        >
                                            <EggCheck value={1} />
                                            <div className="egg__container">
                                                <Egg primary="#44ffde" secondary="#f4ffb9" rotation={43} />
                                                <div
                                                    className="game__cell gc4"
                                                    style={{
                                                        "--score": 1,
                                                        "--x": 2,
                                                        "--y": -1,
                                                    }}
                                                >
                                                    <EggCheck value={1} />
                                                    <div className="egg__container">
                                                        <Egg primary="#cdfbbe" secondary="#ff9a9a" rotation={1} />
                                                        <div
                                                            className="game__cell gc5"
                                                            style={{
                                                                "--score": 1,
                                                                "--x": -2,
                                                                "--y": -3,
                                                            }}
                                                        >
                                                            <EggCheck value={1} />
                                                            <div className="egg__container">
                                                                <Egg primary="#b6b0ff" secondary="#ffebae" rotation={43} />
                                                                <div
                                                                    className="game__cell gc6"
                                                                    style={{
                                                                        "--score": 1,
                                                                        "--x": 2,
                                                                        "--y": -2,
                                                                    }}
                                                                >
                                                                    <EggCheck value={1} />
                                                                    <div className="egg__container">
                                                                        <Egg primary="#89b9e7" secondary="#bde0fe" rotation={34} />
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="game__cell gc7"
                                                                    style={{
                                                                        "--score": 5,
                                                                        "--x": 2,
                                                                        "--y": 2,
                                                                    }}
                                                                >
                                                                    <EggCheck value={5} />
                                                                    <div className="egg__container">
                                                                        <Egg primary="#ffc8dd" secondary="#ffc8dd" rotation={14} />
                                                                        <div
                                                                            className="game__cell gc8"
                                                                            style={{
                                                                                "--score": 1,
                                                                                "--x": -0.25,
                                                                                "--y": -2,
                                                                            }}
                                                                        >
                                                                            <EggCheck value={1} />
                                                                            <div className="egg__container">
                                                                                <Egg primary="#c8ffb7" secondary="#ff9a9a" rotation={19} />
                                                                                <div
                                                                                    className="game__cell gc9"
                                                                                    style={{
                                                                                        "--score": 1,
                                                                                        "--x": -2,
                                                                                        "--y": -2,
                                                                                    }}
                                                                                >
                                                                                    <EggCheck value={1} />
                                                                                    <div className="egg__container">
                                                                                        <Egg primary="#40c15e" secondary="#b0ffca" rotation={23} />
                                                                                        <div
                                                                                            className="game__cell gc10"
                                                                                            style={{
                                                                                                "--score": 5,
                                                                                                "--x": 0,
                                                                                                "--y": 4,
                                                                                            }}
                                                                                        >
                                                                                            <EggCheck value={5} />
                                                                                            <div className="egg__container">
                                                                                                <Egg primary="#ffc8dd" secondary="#ffc8dd" rotation={42} />
                                                                                                <div
                                                                                                    className="game__cell gc11"
                                                                                                    style={{
                                                                                                        "--score": 1,
                                                                                                        "--x": 1.25,
                                                                                                        "--y": -4.25,
                                                                                                    }}
                                                                                                >
                                                                                                    <EggCheck value={1} />
                                                                                                    <div className="egg__container">
                                                                                                        <Egg primary="#5cdfe7" secondary="#dcdcdc" rotation={18} />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="game__cell gc12"
                                                                                                    style={{
                                                                                                        "--score": 5,
                                                                                                        "--x": 1,
                                                                                                        "--y": 1,
                                                                                                    }}
                                                                                                >
                                                                                                    <EggCheck value={5} />
                                                                                                    <div className="egg__container">
                                                                                                        <Egg primary="#4992d7" secondary="#4992d7" rotation={43} />
                                                                                                        <div
                                                                                                            className="game__cell gc13"
                                                                                                            style={{
                                                                                                                "--score": 5,
                                                                                                                "--x": 2,
                                                                                                                "--y": -2.5,
                                                                                                            }}
                                                                                                        >
                                                                                                            <EggCheck value={5} />
                                                                                                            <div className="egg__container">
                                                                                                                <Egg primary="#4992d7" secondary="#4992d7" rotation={36} />
                                                                                                                <div
                                                                                                                    className="game__cell gc14"
                                                                                                                    style={{
                                                                                                                        "--score": 1,
                                                                                                                        "--x": -1,
                                                                                                                        "--y": 3.75,
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <EggCheck value={1} />
                                                                                                                    <div className="egg__container">
                                                                                                                        <Egg primary="#ffc8dd" secondary="#f4ffb9" rotation={36} />
                                                                                                                        <div
                                                                                                                            className="game__cell gc15"
                                                                                                                            style={{
                                                                                                                                "--score": 5,
                                                                                                                                "--x": 1,
                                                                                                                                "--y": -5,
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            <EggCheck value={5} />
                                                                                                                            <div className="egg__container">
                                                                                                                                <Egg primary="#ffc8dd" secondary="#ffc8dd" rotation={36} />
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    </div>
                                </div>
                            </div>
                            <div className="info-screen result">
                                <div className="result__content info-screen__content">
                                    <h2 className="score">You scored &nbsp;</h2>
                                    <Link reloadDocument href={`/dashboard/games/`} className="btn btn-secondary-lighter">Try again?</Link>
                                        
                                    <div
                                        className="egg"
                                        style={{
                                            "--eh-primary": "#44ffde",
                                            "--eh-secondary": "#b0fdff",
                                            "--rotation": -11,
                                        }}
                                    />
                                    <div
                                        className="egg"
                                        style={{
                                            "--eh-primary": "#cdfbbe",
                                            "--eh-secondary": "#f4ffb9",
                                            "--rotation": -8,
                                        }}
                                    />
                                    <div
                                        className="egg"
                                        style={{
                                            "--eh-primary": "#cdfbbe",
                                            "--eh-secondary": "#cdfbbe",
                                            "--rotation": 22,
                                        }}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
