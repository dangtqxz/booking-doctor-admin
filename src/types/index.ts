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
// export interface Appointment {
//   id: string;
//   doctorId: string;
//   patientId: string;
//   date: Date;
//   time: string;
//   status: 'pending' | 'confirmed' | 'cancelled';
// }

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

export interface Appointment {
  key: string;
  ID_LichHen: string;
  NgayHen: string;
  GioHen: string;
  TrieuChung: string;
  GhiChu: string;
  TrangThai: string;
  TenBenhNhan: string;
  SoDienThoai: string;
  TenBacSi: string;
}

export interface Patient {
  key: string;
  name: string;
  age: number;
  phone: string;
  address: string;
}// người ta đặt thường như này. ông thần đi đặt cái gì kia

export interface PatientsList {
  ID_BenhNhan: string;
  TenBenhNhan: string;
  TienSuBenh: string;
  DiUng: string;
}

export interface HoSoBenhAn {
  ID_HoSoBenhAn: string;
  NgayKham: string;
  ChuanDoan: string;
  TenBacSi: string;
  TrieuChung: string;
  KetQuaXetNghiem: string;
  DiUng: string;
  TienSuBenh: string;
  TenBenhNhan: string;
  HuongDieuTri: string;
  NgaySinh: string;
  GioiTinh: string;
  SDT: string;
  DiaChi: string;
}

export interface KetQuaXetNghiem {
  TenChiSo: string;
  GiaTri: string;
  MucBinhThuong: string;
  DonViDo: string;
  GhiChu: string;
}

export interface TaiKhoan {
  ID_TaiKhoan: string;
  TenDangNhap: string;
  MatKhau: string;
  Email: string;
  HoTen: string;
  NgaySinh: string;
  GioiTinh: string;
  SDT: string;
  DiaChi: string;
  Avatar: string;
}

export interface Thuoc {
  ID_Thuoc: string;
  TenThuoc: string;
}

export interface ChuyenKhoa {
  ID_ChuyenKhoa: string;
  TenChuyenKhoa: string;
  MoTa: string;
  AnhURL: string;
}

export interface ChuyenKhoa {
  ID_BangCap: string;
  TenBangCap: string;
  MoTa: string;
  HeSoLuong: string;
}

export interface LichLam {
  ID_LichLamViec: string;
  NgayLamViec: string; // hoặc Date nếu bạn đang sử dụng đối tượng Date
  ThoiGianBatDau: string;
  ThoiGianKetThuc: string;
  TrangThai: string;
}

export interface Thuoc {
  ID_Thuoc: string;
  TenThuoc: string; // hoặc Date nếu bạn đang sử dụng đối tượng Date
  SoLuong: string;
  DonVi: string;
  CachDung: string;
}

export interface ThongTinBenhNhan {
  ID_BenhNhan: string;
  HoTen: string;
  NgaySinh: string; // hoặc Date nếu bạn đang sử dụng đối tượng Date
  GioiTinh: string;
  SDT: string;
  DiaChi: string;
  TienSuBenh: string;
  DiUng: string;
  TrieuChung: string;
}

export interface Admin {
  ChiTiet: string;
}

export interface DocTor {
  MoTa: string;
  TenChuyenKhoa: string;
  TenBangCap: string;
}

export interface Support {
  MoTa: string;
}