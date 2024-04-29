import { getServerSession } from "next-auth";
import { option } from "../../api/auth/[...nextauth]";
import makeAxiosInstance from "../../../middleware/axiosInstance";
import { USER_ME, USER_PROVIDER_INFO } from "../../../api/url/enum/user.api.url";
import ListTitle from "../../../Component/Movie/ListTitle";
import UserInfoPage from "../info";
import ProviderPage from '../provider';
import { Box } from "@mui/material";

const AccountPage = (props) => {

    return (
        <>
            <Box sx={{
                width: '100%', typhography: 'body1'
            }}>
                <Box m={2}>
                    <ListTitle title={`MY ACCOUNT`} />
                </Box>
                <Box m={2}>
                    <UserInfoPage {...props}/>
                    <ProviderPage {...props}/>
                </Box>
            </Box>
        </>
    )
}

export default AccountPage;

export async function getServerSideProps(context) {
    try {
        const session = null;
        const axios = await makeAxiosInstance(session);
        const {data:providerList} = await axios.get(USER_PROVIDER_INFO);
        const {data:user} = await axios.get(USER_ME);
        return {
          props: {
            providerList,
            user,
          },
        }
    } catch (error) {
    }
    return {
        props:{}
    }
  }