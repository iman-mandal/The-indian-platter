import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="registerWrapper">
            <div className="glassCard">
                <h2 className="title">Login</h2>

                {error && <div className="errorBox">{error}</div>}

                <form className="formArea" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btnSubmit" type="submit">
                        Login
                    </button>
                </form>

                <p className="switchText">
                    Don’t have an account?
                    <Link to="/register"> Create one</Link>
                </p>
            </div>
        </div>
    );
}
