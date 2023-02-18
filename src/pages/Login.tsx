import { auth, provider } from "../../src/config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface SetIsLogin {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setIsLogin }: SetIsLogin) {
  const navigate = useNavigate();

  function signInWithGoogle() {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("login", "true");
      setIsLogin(true);
      navigate("/");
      console.log(result);
    });
  }
  return (
    <div>
      <button
        onClick={signInWithGoogle}
        className="btn btn-ghost btn-outline normal-case"
      >
        Sign in With Google
      </button>
    </div>
  );
}
