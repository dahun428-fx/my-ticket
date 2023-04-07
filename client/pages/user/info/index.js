import { useEffect, useState } from "react";

const UserInfoPage = (props) => {

    const [user, setUser] = useState(null);

    useEffect(()=>{

        setUser(props.user);

        return ()=>{setUser(null)}
    },[])

    return (
        <>
            {user && 
            <>
                <div>{user.id}</div>
                <div>{user.name}</div>
            </>
            }
        </>
        // <div> .. . </div>
    )
}

export default UserInfoPage;