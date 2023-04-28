import React, { useState } from 'react';
import { Box, MenuItem, Fade, Menu, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import HeaderBtn from '../../components/HeaderBtn';
import KaKaoButtonImg from '../../images/kakao_login_medium_wide.png';
import { theme } from '../../Theme';

const REST_API_KEY = 'dd6cf43c13cb95bebf844aa4be90db27'
const REDIRECT_URI = 'http://localhost:3000/oauth'
const KAKAO_AUTH_URL= `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const sideLine = {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    color: 'primary.light',
    "::before": {
        content: '""',
        flex: 1,
        height: '1px',
        background: theme.palette.primary.light,
        marginRight: '0.5rem',
        },
    "::after" : {
        content: '""',
        flex: 1,
        height: '0.1px',
        background: theme.palette.primary.light,
        marginLeft: '0.5rem',
        }
}

const MenuBox = () => {

    const [anchorE1, setAnchorE1] = useState<HTMLElement | null>(null);
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const open: boolean = Boolean(anchorE1);

    const handleClick: () => void = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <HeaderBtn
                isClicked={false}
                handleClick={() => { handleClick() }}>
                로그인
            </HeaderBtn>
            <Dialog
                open={isDialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle sx={sideLine}>
                    간편 로그인
                </DialogTitle>
                <DialogContent>
                <a href={KAKAO_AUTH_URL}>
                    <img src={KaKaoButtonImg} alt="kakao-login" />
                </a>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default MenuBox;