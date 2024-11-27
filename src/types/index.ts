// Kiểu dữ liệu cho bác sĩ
export interface Doctor {
  ID_BacSi: string;
  HoTen: string;
  TenChuyenKhoa: string;
  Avatar: string;
  HeSoLuong?: number;
  TenBangCap: string;
  DiaChi: string;
  MoTa: string;
}

// Kiểu dữ liệu cho chuyên khoa
export interface Specialty {
  ID_ChuyenKhoa: string;
  TenChuyenKhoa: string;
  MoTa: string;
  AnhUrl: string;
}

// Kiểu dữ liệu cho lịch hẹn
export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// Kiểu dữ liệu cho bài viết sức khỏe
export interface HealthArticle {
  id: string;
  title: string;
  content?: string;
  imageUrl: string;
  author?: string;
  publishDate?: Date;
  category?: string;
}

// Kiểu dữ liệu cho kết quả tìm kiếm
export interface SearchResult {
  doctors: Doctor[];
  specialties: Specialty[];
}
