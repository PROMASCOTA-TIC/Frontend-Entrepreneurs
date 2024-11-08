"use client";
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';

interface Item {
    name: string;
    url: string;
}

interface TopMenuProps {
    listaItems: Item[];
}

export const TopMenu = ({ listaItems }: TopMenuProps) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    return (
        <AppBar position="static" style={{ background: '#0000001a' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters style={{ minHeight: '48px', maxHeight: '48px' }}>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} style={{ height: 'inherit' }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            style={{ color: '#004040', background: '#0000001a' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => setAnchorElNav(null)}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {listaItems.map((page) => (
                                <MenuItem key={page.name}>
                                    <Link
                                        href={page.url}
                                        key={page.name}
                                        style={{ color: '#004040' }}
                                    >
                                        {page.name}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }} style={{ gap: '55px', height: 'inherit' }}>
                        {listaItems.map((page) => (
                            <Link
                                href={page.url}
                                key={page.name}
                                style={{ color: '#004040' }}
                            >
                                {page.name}
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
