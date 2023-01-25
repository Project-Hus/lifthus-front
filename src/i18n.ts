import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Work out!": "Work out!",
      "Google Login": "Google Login",
      "Sign in": "Sign in",
      "Sign up": "Sign up",
      ID: "ID",
      Password: "Password",
      "Check your password": "Check your password",
      "{{min}} to {{max}} characters": "{{min}} to {{max}} characters",
      "ID already exists": "ID already exists",
      "ID doesn't exists": "ID doesn't exists",
      "Failed to sign up": "Failed to sign up",
      "Failed to sign in": "Failed to sign in",
      "Welcome to join us!": "Welcome to join us!",
      "Hi {{user_id}},": "Hi {{user_id}},",
      "Let's work out!": "Let's work out!",
      "WORK OUT": "WORK OUT",
    },
  },
  kr: {
    translation: {
      "Work out!": "Work out!",
      "Google Login": "Google 로그인",
      "Sign in": "로그인",
      "Sign up": "회원가입",
      ID: "아이디",
      Password: "비밀번호",
      "Check your password": "비밀번호 확인",
      "{{min}} to {{max}} characters": "{{min}}~{{max}}자",
      "ID already exists": "아이디가 이미 존재해요.",
      "ID doesn't exists": "이런 아이디는 없어요 ㅠ",
      "Failed to sign up": "회원가입 실패, 가입 정보를 확인해주세요.",
      "Failed to sign in": "로그인에 실패했어요.",
      "Welcome to join us!": "가입을 환영해요!",
      "Hi {{user_id}},": "안녕하세요 {{user_id}}님,",
      "Let's work out!": "루틴을 시작해보세요!",
      "WORK OUT": "시작하기",
    },
  },
};

i18n
  // we pass the i18n instance to react-i18next which will
  // make it available for all the components via the context api.
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "kr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
