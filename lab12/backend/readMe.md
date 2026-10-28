node -v
npm init -y
npm install
npm install express

npm install -g nodemon
สร้างไฟล์ app.js ก่อน
npx nodemon app.js

npm install prisma @6prisma/client
npx prisma init
ลบ path ใน shcem.prisma
npx prisma db pull
npx prisma generate

รวม(มีออกใน slide ล่าสุด)(ยัง)
npm install express cors dotenv nodemon bcrypt jsonwebtoken prisma@6 @prisma/client@6

# run
npx nodemon app.js