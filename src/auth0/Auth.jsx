import { useAuth0 } from "@auth0/auth0-react";
import Header from "../components/Header";

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  

  if (isLoading) {
    return <h1> Loading......</h1>
  }

  return (
    <>
    <Header/>
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        {!isAuthenticated ? (
          <>
            <h1>Please Log In</h1>
            <button onClick={() => loginWithRedirect()}>Login</button>
          </>
        ) : (
          <>
            <h1>Welcome, {user.name}</h1>
            <img src={user.picture} alt={user.name} width={80} style={{ borderRadius: '50%' }} />
            <br />
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default AuthButtons;