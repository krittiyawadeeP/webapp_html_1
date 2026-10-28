import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [inputs, setInputs] = useState({
    userName: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/authen/login", inputs);
      if (response.status === 200) {
        alert(response.data.message);
        // บันทึก Token ลงใน LocalStorage (สไลด์หน้า 35)
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        alert(err.response.data.message);
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login</h2>
      <h3>User mode: Username: Ann | Password: 1234 (จะเห็นเรตติ้ง)
        
Admin mode: Username: John | Password: 1234 (จะเห็นปุ่มลบ/เพิ่มเมนู และปุ่มสลับไปจัดการ User)</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label><br />
          <input type="text" name="userName" value={inputs.userName} onChange={handleChange} required />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password: </label><br />
          <input type="password" name="password" value={inputs.password} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ marginTop: '15px' }}>ส่ง (Login)</button>
      </form>
      <div style={{ marginTop: '15px' }}>
        No Account? <Link to="/register">Register Here</Link>
      </div>
    </div>
  );
}

export default LoginPage;