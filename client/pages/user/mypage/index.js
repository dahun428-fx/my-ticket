import { getServerSession } from 'next-auth';
import ProviderPage from '../provider';
import makeAxiosInstance from '../../../middleware/axiosInstance';
import { USER_ME, USER_PROVIDER_INFO } from '../../../api/url/enum/user.api.url';
import { option } from '../../api/auth/[...nextauth]';
import UserInfoPage from '../info';
import User from '../../../models/user';

const UserUpdatePage = (props) => {



    return (
        <>
            <div>
                update 
            </div>
            <UserInfoPage {...props}/>
            <ProviderPage {...props}/>
        </>
    )
}
export default UserUpdatePage;

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, option)
    const axios = await makeAxiosInstance(session);
    
    const {data:providerList} = await axios.get(USER_PROVIDER_INFO);
    const {data:user} = await axios.get(USER_ME);
    return {
      props: {
        providerList,
        user,
      },
    }
  }