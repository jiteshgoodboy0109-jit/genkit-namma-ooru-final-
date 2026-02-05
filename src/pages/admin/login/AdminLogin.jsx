import "./login.css";
import LoginImage from "../assets/4.jpg";
import GenkitLogoBlack from "../assets/lightGK-logo-removebg-preview.png";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { loginApi } from "../../../services/auth";

export function AdminLogin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [isMessageOn, setIsMessageOn] = useState(false)
  const navigate = useNavigate()


  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res =await loginApi({ username,password }); 
      if(res.status == 200){
        navigate('/admin/orders/')
      }
    }catch (err){
      console.log(err.message)
      setIsMessageOn(true)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="form-box">
          <form id="loginForm" className="form admin-login-form" onSubmit={handleSumbit}>
            <div className="login-form-head">
              <h2>Admin</h2>
              <p>Welcome Back!</p>
            </div>

            <div className="admin-credentials-container">
              <div className={`message ${isMessageOn ? 'active' : ''}`}>Invalid email or password</div>
              <div className="admin-credentials-div">
                <input type="text" placeholder="Email" required value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <button className="btn primary-login" disabled={loading}>{ loading ? 'Loging in..' : 'Login'}</button>
            </div>

            <div className="admin-powered-by">
              <p className="admin-powered-by-title">Powered By</p>
              <div className="powered-by-img">
                <img src={GenkitLogoBlack} alt="Genkit-Logo" />
              </div>
            </div>
          </form>
        </div>

        <div className="image-box">
          <img src={LoginImage} />
        </div>
      </div>
    </div>
  );
}
