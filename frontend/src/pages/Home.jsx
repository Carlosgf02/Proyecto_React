import { Outlet } from "react-router";
import Principal from "../components/Principal";


function Home(){
    return (
        <>
            <Principal />
            <Outlet />
        </>
    );
}
export default Home;