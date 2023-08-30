import {useNavigate} from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    // 跳转到关于页
    function goAbout(){
        navigate('/about?id=1001', {replace:true})
    }
    return (
        <div>
            login
            <button onClick={goAbout}>跳到关于</button>
        </div>
    )
}

export default Login