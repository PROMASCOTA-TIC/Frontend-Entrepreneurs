"use client";
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';

const items = [
    { name: 'Inicio', path: '/emprendedores/inicio' },
    { name: 'Registro de Productos', path: '/emprendedores/registro-productos' },
    { name: 'Lista de Productos', path: '/emprendedores/lista-productos' },
    { name: 'Pedidos', path: '/emprendedores/lista-pedidos' },
    { name: 'Enlaces de Interés', path: '/enlaces' },
    { name: 'Publi-Reportajes', path: '/publireportajes' },
    { name: 'Preguntas Frecuentes', path: '/preguntas-frecuentes' },
    { name: 'Comisiones y Pagos', path: '/comisionesypago' },
];

export const TopMenu = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" style={{ background: '#0000001a' }}>
            <Container maxWidth="xl" style={{ background: '#0000001a' }}>
                <Toolbar disableGutters style={{ minHeight: '48px', maxHeight: '48px' }}>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} style={{ height: 'inherit' }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
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
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {items.map((item) => (
                                <MenuItem key={item.name} onClick={handleCloseNavMenu}>
                                    <Link href={item.path} passHref>
                                        <Typography style={{ color: '#004040' }}>{item.name}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }} style={{ gap: '55px', height: 'inherit' }}>
                        {items.map((item) => (
                            <Link href={item.path} key={item.name} passHref>
                                <Typography style={{ color: '#004040', cursor: 'pointer' }}>{item.name}</Typography>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
