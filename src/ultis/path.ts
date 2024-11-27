// Định nghĩa các đường dẫn cơ bản
export const PATH_HOME = '/';
export const PATH_LOGIN = '/login';
export const PATH_FORGOTPASSWORD = '/forgotpassword';
export const PATH_REGISTER = '/register';

// Đường dẫn Admin
export const PATH_ADMINDASHBOARD = '/admindashboard';

// Đường dẫn cho chuyên khoa
export const PATH_SPECIALTIES = '/specialties';
export const PATH_SPECIALTY_DETAIL = '/specialties/:id';

// Đường dẫn cho bác sĩ
export const PATH_DOCTORS = '/doctors';
export const PATH_DOCTOR_DETAIL = '/doctors/:id';

// Đường dẫn cho sức khỏe
export const PATH_HEALTHY = '/healthy';
export const PATH_HEALTHY_DETAIL = '/healthy/:id';

// Đường dẫn cho lịch hẹn
export const PATH_APPOINTMENTS = '/booking';
export const PATH_APPOINTMENT_BOOKING = '/booking/:id';

// Đường dẫn cho trang cá nhân
export const PATH_PROFILE = '/profile';

export const PATH_SEARCH = '/search';


// Hàm helper để tạo đường dẫn động
export const createPath = (path: string, params: Record<string, string | number>) => {
  let result = path;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, value.toString());
  });
  return result;
};
