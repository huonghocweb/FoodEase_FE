import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import vi from "./locales/vi.json";

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

i18n
  .use(LanguageDetector) // Sử dụng trình phát hiện ngôn ngữ
  .use(initReactI18next) // Tích hợp với React
  .init({
    resources,
    fallbackLng: "en", // Ngôn ngữ mặc định nếu không phát hiện được
    detection: {
      // Cấu hình phát hiện ngôn ngữ
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"], // Thứ tự phát hiện
      caches: ["cookie", "localStorage"], // Lưu ngôn ngữ vào cookie hoặc localStorage
    },
    interpolation: {
      escapeValue: false, // Không cần thoát giá trị
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
