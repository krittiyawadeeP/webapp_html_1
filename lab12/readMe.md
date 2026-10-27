#### front 
cd D:\webappp\lab12
npx create-react-app frontend
cd frontend
npm install axios react-router-dom


(💡 ทางลัดถ้าขี้เกียจรอโหลดนาน: คุณสามารถใช้ Vite ตามสไลด์ ch7_2 หน้า 12 ก็ได้ คือรัน 
npm create vite@latest frontend -- --template react แล้ว (เลือก eslite)
cd frontend -> 
npm install -> 
npm install axios react-router-dom จะสร้างเสร็จภายใน 10 วินาทีครับ!)


ใน slide <frontendพิมตามนี้ไป>
npm install -g create-vite
npm creat vite@latest
cd franted
npm install -y

## พวก rounter ใน fronte ดูสไลด์5 lab11

## note
.jsx = js ที่อณุญาติให้เขียน html ลงไปได้ (่js+html)
.jsx คืออะไร? คือไฟล์ JavaScript ที่อนุญาตให้เรา return ( <h1>สวัสดี</h1> ) (เอาแท็ก HTML มาเขียนปนในฟังก์ชัน JS ได้เลย)


# quation
อธิบาย  flow html , app , main คือยังไงบ้าง createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>, คือไร , .jsx คือไร มีอะไรที่ต้องีู้ก่อนทำไหม เรารู้จักแค่ html css js