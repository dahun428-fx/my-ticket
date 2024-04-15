import { useState } from "react";
import { changeUserPwd, isRightPassword } from "../../../api/user";
import { Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, TextField, Typography } from "@mui/material";
import { signOut } from "next-auth/react";

const PasswordChange = ({user}) => {

    const [expanded, setExpanded] = useState(false);

    const [nowPassword, setNowPassword] = useState("");
    const [changePassword, setChangePassword] = useState("");
    const [changePasswordChk, setChangePasswordChk] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [hasErr, setHasErr] = useState(false);

    const [open, setOpen] = useState(false);

    const [progress, setProgress] = useState(0);
    const [buffer, setBuffer] = useState(10);
    
    const toggleExpandForm = () => {
        setExpanded(!expanded);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!changePassword || changePassword.length < 2 || !nowPassword || nowPassword < 2 || !changePasswordChk || changePasswordChk < 2) {
            setErrMsg("비밀번호는 최소 2글자 이상입니다.");
            setHasErr(true);
            return;
        }

        if(changePassword !== changePasswordChk) {
            setErrMsg("변경할 비밀번호가 틀립니다.");
            setHasErr(true);
            return;
        }
        let request = {
            userid : user.id,
            userpw : nowPassword,
        }
        const {data : chkRes} = await isRightPassword(request);
        if(!chkRes) {
            setErrMsg("현재 비밀번호가 틀립니다.");
            setHasErr(true);
            return;
        }
        let request2 = {
            userid : user.id,
            userpw : changePassword,
        }
        const {data : changeRes} = await changeUserPwd(request2);
        if(changeRes) {
            setOpen(true);
            const timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
            }, 1000);
            setTimeout(() => {
                clearInterval(timer)
                handleClose(e);
            }, 5000);
        }
    }
    const onChangeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if(name === 'nowPwd') {
            setNowPassword(value);
        } else if (name === 'changePwd') {
            setChangePassword(value);
        } else if (name === 'changePwdChk') {
            setChangePasswordChk(value);
        }
    }
    const onFocusHandler = (e) => {
        setHasErr(false);
        setErrMsg("");
    }
    const handleClose = (e) => {
        e.preventDefault();
        setOpen(false);
        signOut({
            callbackUrl:'/signin'
          });
    }
    return (
        <>
            <Box m={2}>
                <Button variant="contained"
                    onClick={toggleExpandForm}
                >비밀번호 변경</Button>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box component='form'
                    sx={{
                        '& .MuiTextField-root': { m: 1, minWidth: '25ch'},
                        }}
                        autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <TextField 
                            fullWidth
                            id='nowPwd'
                            label='현재 비밀번호'
                            name='nowPwd'
                            type='password'
                            placeholder="현재 비밀번호를 입력해주세요"
                            value={nowPassword}
                            onChange={onChangeHandler}
                            onFocus={onFocusHandler}
                        />
                    </div>
                    <div>
                        <TextField 
                            fullWidth
                            id='changePwd'
                            label='변경할 비밀번호'
                            name='changePwd'
                            type='password'
                            placeholder="변경할 비밀번호를 입력해주세요"
                            value={changePassword}
                            onChange={onChangeHandler}
                            onFocus={onFocusHandler}
                        />
                    </div>
                    <div>
                        <TextField 
                            fullWidth
                            id='changePwdChk'
                            label='변경할 비밀번호 확인'
                            name='changePwdChk'
                            type='password'
                            placeholder="변경할 비밀번호를 다시 입력해주세요"
                            value={changePasswordChk}
                            onChange={onChangeHandler}
                            onFocus={onFocusHandler}
                        />
                    </div>
                    <Box display={hasErr ? 'block' : 'none'}>
                        <Typography color={`red`}>
                            {errMsg}
                        </Typography>
                    </Box>

                <Box sx={{
                    textAlign:'right'
                }}>
                    <Button type="submit" variant="outlined">확인</Button>
                </Box>
                </Box>
            </Collapse>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"비밀번호 변경 완료"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    비밀번호가 변경 되었습니다. 5초 뒤에 재접속 됩니다. 다시 로그인 해주세요.
                    <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PasswordChange;