import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// document.getElementById('root') ➡️ คือคำสั่ง JS ปกติที่ไปหากล่อง <div id="root"> ในหน้า index.html
// .render(<App />) ➡️ สั่งว่า "ให้เอาหน้าเว็บที่เขียนอยู่ในฟังก์ชัน App (จากไฟล์ App.jsx) ไปยัดใส่ในกล่อง root นี้นะ!"