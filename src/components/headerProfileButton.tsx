"use client"
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function ProfileButton({ userId }: { userId: string }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        handleClose();
        router.push(`/profile/${userId}`);
    }

    const handleLogoutClick = async () => {
        handleClose();
        signOut({ redirectTo: "/login" });
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose} sx={{ mt: 2 }}>
                <MenuItem onClick={handleProfileClick}>
                    Profile
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}