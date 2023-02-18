import { Link } from "react-router-dom";

interface IsLogin {
  isLogin: boolean;
  signOutWithGoogle(): void;
}

export default function Nav({ isLogin, signOutWithGoogle }: IsLogin) {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link className="text-xl font-bold" to={"/"}>
          Blogg
        </Link>
      </div>
      <div className="navbar-end space-x-5">
        {isLogin ? (
          <>
            <button onClick={signOutWithGoogle}>Logout</button>
            <Link to={"/createpost"}>Post</Link>
          </>
        ) : (
          <Link className="btn" to={"/login"}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
