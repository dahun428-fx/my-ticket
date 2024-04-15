import { getServerSession } from 'next-auth';
import ProviderPage from '../provider';
import makeAxiosInstance from '../../../middleware/axiosInstance';
import { USER_ME, USER_PROVIDER_INFO } from '../../../api/url/enum/user.api.url';
import { option } from '../../api/auth/[...nextauth]';
import UserInfoPage from '../info';
import User from '../../../models/user';
import ListTitle from '../../../Component/Movie/ListTitle';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

const UserUpdatePage = (props) => {

    const router = useRouter();

    const onClickEventHandler = (e) => {
      e.preventDefault();
      let name = e.target.name;

      router.push(`/user/mypage/${name}`);
    }
    return (
        <>
          <Box
          sx={{
            width: '100%', typhography: 'body1'
          }}
          >
            <Box m={2}>
              <ListTitle title={`DASHBOARD`} />
            </Box>
            <Box m={2}>
              <Button variant='outlined' fullWidth name="favorite" onClick={onClickEventHandler}>
                My Favorite Movie
              </Button>
            </Box>
            <Box m={2}>
              <Button variant='outlined' fullWidth name="account" onClick={onClickEventHandler}>
                My Account
              </Button>
            </Box>
          </Box>

          {/* <div>1. main</div>

          <div>1. my favorite movie -read/update/delete ( like )</div>
          <div>3. my info - read (userid, name )</div>
          <div>2. my account - update</div>
          <div>3. 회원탈퇴 (delete)</div>
            <div>
                update 
            </div> */}
        </>
    )
}
export default UserUpdatePage;