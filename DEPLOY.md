# Hướng dẫn Deploy Frontend (Vercel/Render)

## Cấu hình biến môi trường cần thiết:

### 1. Render.com:
- Trong Settings → Environment Variables, thêm:
  ```
  BACKEND_URL = https://your-backend-url.onrender.com
  NEXT_PUBLIC_API_BASE_URL = https://your-backend-url.onrender.com
  ```

### 2. Vercel.com:
- Trong Project Settings → Environment Variables, thêm:
  ```
  BACKEND_URL = https://your-backend-url.onrender.com
  NEXT_PUBLIC_API_BASE_URL = https://your-backend-url.onrender.com
  ```

## Các bước deploy:

### Deploy Backend trước:
1. Deploy NIAD-XCT-BE lên Render
2. Lấy URL backend (ví dụ: https://niad-backend.onrender.com)
3. Cập nhật biến môi trường với URL này

### Deploy Frontend sau:
1. Cập nhật biến môi trường trên Vercel/Render
2. Deploy NIAD-XCT frontend
3. Kiểm tra các API route hoạt động đúng

## Troubleshooting:

### Lỗi "Failed to fetch images":
- Kiểm tra BACKEND_URL đã đúng chưa
- Kiểm tra backend đã chạy và accessible chưa
- Kiểm tra CORS settings trên backend

### Lỗi 500 Internal Server Error:
- Kiểm tra backend logs
- Kiểm tra database connection
- Kiểm tra các API routes có hoạt động không

### Các file cần kiểm tra:
- `src/app/api/images/types/[type]/route.ts`
- Backend server status
- Environment variables trên hosting platform
