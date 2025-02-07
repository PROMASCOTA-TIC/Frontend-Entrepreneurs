'use client';

import * as React from 'react';
import Link from 'next/link';
import { Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import logo from '../../../assets/images/logo-topnavar.png';
import Container from '@mui/material/Container';
import { themePalette } from '@/app/config/theme.config';


const settings = [
  { path: '/configurar-cuenta', text: 'Configurar cuenta' },
  { path: '/agregar-fotos', text: 'Cargar imágenes emprendimiento' },
  { path: '/auth/login', text: 'Cerrar sesión' },
];

const NavbarEm: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ width: '100%', height: { xs: '60px', md: '80px',background:themePalette.primary } }}>
      <Container maxWidth="xl" >
      <Toolbar disableGutters sx={{ height: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
       <Link href="/inicio" passHref>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: 'Work Sans, sans-serif',
                fontWeight: 700,
                letterSpacing: '.1rem',
                textDecoration: 'none',
                fontSize: { xs: '1rem', md: '1.5rem' },
              }}
            >
              PROMASCOTA
            </Typography>
            <img src={logo.src} alt="Logo" style={{ height: '40px', marginRight: '8px' }} />
        </Box>
</Link>
        {/* Menú de cuenta visible en todas las pantallas */}
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', ml: 'auto' }}>
          <Tooltip title="Open settings">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0,display: 'flex', alignItems: 'center' }}>
                <AccountCircleIcon sx={{ color: 'white', fontSize: { xs: 28, md: 40 } }} />
                <ArrowForwardIosIcon
                  sx={{ color: 'white', fontSize: { xs: 10, md: 14 }, ml: 0.5, transform: 'rotate(90deg)' }}
                />
              </IconButton>
              <Typography
                sx={{
                  color: 'white',
                  fontSize: { xs: 12, md: 18 },
                  fontWeight: 'regular',
                  mt: 0.5,
                }}
              >
                Cuenta
              </Typography>
            </Box>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting.text}    onClick={() => {
                handleCloseUserMenu();
                  localStorage.clear();
                  document.cookie = 'auth_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';  
                }}>
                <Link href={setting.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography textAlign="center">{setting.text}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarEm;
