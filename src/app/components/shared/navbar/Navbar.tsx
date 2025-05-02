'use client'
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Drawer, List, ListItem, ListItemText, Container, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../assets/logo.png';
import Loading from '../loading/loading';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AuthButton from '../UI/AuthButton';
import dynamic from 'next/dynamic';
import useUserInfo from '@/app/hooks/userUserInfo';
import { useAuth } from '@/app/lib/Providers/AuthProvider';
import { removeUser } from '@/app/services/authService';

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true); // To control navbar visibility
    const [lastScrollY, setLastScrollY] = useState(0);  // To track the last scroll position
    const userInfo = useUserInfo();
    const router = useRouter();
    const { logout ,user} = useAuth();

    // Function to toggle the drawer
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Function to close the drawer when a link is clicked
    const handleLinkClick = () => {
        setIsDrawerOpen(false);
    };

    // Function to handle logout
    const handleLogOut = () => {
        removeUser(); // Clear the token from local storage
        logout(); 
        toast.success('User logged out!!')
        router.push('/')
        
    };

    

    const menuItems = [
        { text: 'Home', link: '/' },
    ];

    if (user) {
        menuItems.push({ text: 'Dashboard', link: '/dashboard' });
    }
    //@ts-ignore
    if (user?.role ==='student') {
        menuItems.splice(2,1)
        menuItems.push({ text: 'My Courses', link: '/dashboard/student/my-course' });
    }
    const AuthButton = dynamic(() => import('../UI/AuthButton'), { ssr: false })
    return (
        <Container>
            {/* Conditionally show/hide the navbar based on scroll */}
            <Stack
                py={4}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    display: showNavbar ? 'flex' : 'none', // Show/hide navbar based on scroll
                    transition: 'transform 0.3s ease', // Add smooth transition for the hide/show effect
                }}
            >
                {/* Logo */}
                <Typography variant="h6" fontSize={30} component={Link} href="/">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        {/* <Image src={logo} alt="logo" /> */}
                        eShiksa
                    </motion.div>
                </Typography>

                {/* Desktop Menu */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={4}
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                    {menuItems.map((item) => (
                        <motion.div key={item.text} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Typography sx={{ fontWeight: 700 }} color="inherit" component={Link} href={item.link}>
                                {item.text}
                            </Typography>
                        </motion.div>
                    ))}
                     <AuthButton/>
                </Stack>

                {/* Mobile Menu Icon */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { xs: 'block', md: 'none' } }}
                    onClick={toggleDrawer}
                >
                    <MenuIcon />
                </IconButton>

                {/* Mobile Drawer */}
                <Drawer
                    PaperProps={{
                        style: {
                            width: 300, // Set your custom width here
                        },
                    }}
                    anchor="right"
                    open={isDrawerOpen}
                    onClose={toggleDrawer}
                >
                    <Box display="flex" justifyContent="center" alignItems="center" margin={8}>
                        <List sx={{ width: 250 }}>
                            {menuItems.map((item) => (
                                <motion.div key={item.text} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Typography
                                        sx={{ fontWeight: 700, fontSize: '20px', textDecoration: 'none', marginTop: '40px' }}
                                        color="inherit"
                                        component={Link}
                                        href={item.link}
                                        onClick={handleLinkClick}
                                    >
                                        {item.text}
                                    </Typography>
                                </motion.div>
                            ))}
                            <AuthButton/>
                            
                        </List>
                    </Box>
                </Drawer>
            </Stack>
        </Container>
    );
};

export default Navbar;
