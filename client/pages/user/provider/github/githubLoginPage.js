import Button from '../../../../Component/Common/Button'
export default function GithubLoginPage(props) {
    
    const URL = "https://github.com/login/oauth/authorize";

    const loginAction = () => {
        window.location.assign(`${URL}?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`)
    }
    return (
        <Button {...props} onClick={()=>loginAction()}/>
    )
}