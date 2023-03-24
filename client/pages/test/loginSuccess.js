import WithAuth from "../../Hoc/withAuth";

function loginSuccess(props) {
    return (
        <div>
            loginSuccess
        </div>
    );
}

export default WithAuth(loginSuccess);