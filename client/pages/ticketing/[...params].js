import { getServerSession } from "next-auth";
import { option } from "../api/auth/[...nextauth]";
import makeAxiosInstance from "../../middleware/axiosInstance";

const Ticketing = ({}) => {
    return (
        <>
            <div>ticketing</div>
        </>
    )
}

export default Ticketing;

export async function getServerSideProps(context) {

    try {
        const session = await getServerSession(context.req, context.res, option);
        const axios = await makeAxiosInstance(session);
    
        return {
            props : {}
        }
        
    } catch (error) {
        console.log(error);
    }
    return {
        props : {}
    }
}