'use client'
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Loading from "../components/shared/loading/loading";
import Navbar from "../components/shared/navbar/Navbar";

const CommonLayoutPage = ({ children }: { children: React.ReactNode }) => {
    const isLoading = useSelector((state: any) => state.loading.isLoading);
    if(isLoading){
        return <Loading/>
    }
    return (
        <>
            <Navbar></Navbar>
            <Box className="min-h-screen">{children}</Box>
            
        </>
    )
};

export default CommonLayoutPage;
