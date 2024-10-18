import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import vi from "./locales/vi.json";

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // không cần phải thoát giá trị
  },
});

// Hàm tùy chỉnh để không phân biệt chữ hoa chữ thường
const customTranslate = (key) => {
  // Chuyển đổi khóa thành chữ thường
  const lowerKey = key.toLowerCase();
  // Kiểm tra xem khóa chữ thường có tồn tại không
  const translation = i18n.t(lowerKey);
  // Nếu không tìm thấy, trả về khóa gốc
  return translation !== lowerKey ? translation : i18n.t(key);
};

export { customTranslate };
export default i18n;