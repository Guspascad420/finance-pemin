import {useNavigate} from "react-router-dom";
import rectangle14 from "../images/rectangle_14.png";
import {useState} from "react";
import axios from "axios";

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            alert("Email dan Password tidak boleh kosong");
            return;
        }

        const user = {
            "email": email,
            "password": password,
        }

        handleLogin(user);
    };

    const handleLogin = async (user) => {
        try {
            const res = await axios.post('http://localhost:8080/api/user/login', user, {
                validateStatus: false,
            });

            if (res.status !== 200) {
                alert(res.data.message);
                return;
            }
            localStorage.setItem('token', JSON.stringify(res.data.data.token));
            navigate('/overview')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex">
            <div className="basis-1/2">
                <img src={rectangle14} className="h-screen" alt=""/>
            </div>
            <div className="flex justify-center flex-col basis-1/2 h-screen">
                <div className="ml-32">
                    <label htmlFor="email" className="font-dm_sans block text-md text-gray-700 mb-2">Email</label>
                    <input type="text" id="email" className="w-3/4 mb-5 p-2.5 outline-0 rounded-lg bg-gray-50 border border-gray-300
                        text-gray-900 focus:border-[#299D91] focus:border-2"
                           placeholder="John" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="email" className="font-dm_sans block text-md text-gray-700 mb-2">Password</label>
                    <input type="password" id="email" className="border border-gray-300 outline-0
                        focus:border-[#299D91] focus:border-2 block w-3/4 p-2.5 rounded-lg bg-gray-50 text-gray-900"
                           placeholder="*****" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={handleSubmit} className="font-dm_sans text-white bg-[#299D91] mt-7
                    font-medium rounded-lg text-md w-3/4 px-5 py-2.5 text-center">Login
                    </button>
                    <p className="text-end xl:mr-36 lg:mr-24 md:mr-16 mt-2 text-[#299D91]">Forgot Password?</p>
                </div>
            </div>
        </div>
    )
}

export default Login;