import { useAuth0 } from "@auth0/auth0-react";


const ProtectedRoute = ({ component: Component }) => {
  const {isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading....</div>
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h2>You must be logged in to view this page.</h2>
      </div>
    )
  }
  
  return <Component/>
};

export default ProtectedRoute;