import { redirect } from "next/navigation";

export default async function Redeem( {} ) {
    redirect(`/dashboard/points/spend`);  
}
