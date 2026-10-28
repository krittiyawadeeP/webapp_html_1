import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const [inputs, setInputs] = useState({
    userName: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่า password กับ confirm password ตรงกันไหม
    if (inputs.password !== inputs.cpassword) {
      alert("Password mismatch");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/authen/register", inputs);
      if (response.status === 201) {
        alert(response.data.message);
        navigate('/login');
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert(err.response.data.message);
      } else {
        alert("Register failed");
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label><br />
          <input type="text" name="userName" value={inputs.userName} onChange={handleChange} required />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Email: </label><br />
          <input type="email" name="email" value={inputs.email} onChange={handleChange} required />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password: </label><br />
          <input type="password" name="password" value={inputs.password} onChange={handleChange} required />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Confirm Password: </label><br />
          <input type="password" name="cpassword" value={inputs.cpassword} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ marginTop: '15px' }}>Sign Up</button>
      </form>
      <div style={{ marginTop: '15px' }}>
        Have an Account? <Link to="/login">Login Here</Link>
      </div>
    </div>
  );
}

export default RegisterPage;