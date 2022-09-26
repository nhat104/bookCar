"# bookCar"

- Làm theo các bước sau để cài đặt project.

* Note: Các lệnh sau chạy trên terminal. Để mở terminal nhấn window + R, gõ cmd, enter sẽ mở ra hộp màu đen.
  Khi nói: "mở terminal tại folder A", thì truy cập folder A trên máy tính, nhấn chuột vào đường dẫn tới folder
  trên máy tính và gõ cmd, enter. Kiểm tra đường dẫn đã trỏ tới đúng folder A là thành công.

1. Cài đặt môi trường NodeJS tại:
   https://nodejs.org/dist/v16.17.1/node-v16.17.1-x64.msi

Kiểm tra cài đặt thành công bằng lệnh sau trên terminal
node -v

2. Cài đặt thư viện cho từng folder client và server:

- Mở terminal tại thư mục client. Gõ lệnh:
  npm install
  Sau khi cài đặt xong gõ lệnh sau để khởi động ứng dụng
  npm start
  Mở browser truy cập http://127.0.0.1:3000/ để xem giao diện.

- Mở terminal tại thư mục server. Gõ lệnh:
  npm install
  Sau khi cài đặt xong gõ lệnh sau để khởi động ứng dụng
  npm start

3. Khi chưa khởi động database thì lệnh npm start trên server sẽ lỗi. Phần này sẽ hướng dẫn sau.
