
import useAuth from '../../Hooks/useAuth';
import Loading from '../../components/Logo/Loading/Loading';
import { Navigate, useLocation, useNavigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    console.log("Location", location);    
    if(loading) {
        return <Loading></Loading>
    }
    if(!user){
       return <Navigate state={{from : location}} to="/login" replace />;
    }
    return children;
};

export default PrivateRoute;