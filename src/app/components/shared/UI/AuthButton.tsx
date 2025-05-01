import AnimatedButton from "@/app/lib/animatated/animatedButton";
import { useAuth } from "@/app/lib/Providers/AuthProvider";
import { removeUser } from "@/app/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
    const { logout, user } = useAuth();

    const router = useRouter();
    const handleLogOut = () => {
        removeUser(); // Clear the token from local storage
        logout();
        router.refresh()// Clear user info from context
        // router.push('/login'); // Redirect to login page if needed
    };
    return (
        <>
            {
                user ? <AnimatedButton
                    onClick={handleLogOut} variant="contained" name='Logout'  /> : <Link href='/login'><AnimatedButton variant="contained" name='Login'  /></Link>
            }
        </>
    )
};

export default AuthButton;
