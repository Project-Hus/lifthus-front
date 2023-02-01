import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      /* Sign */
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
      /* Register */
      Hi: "Hi",
      "{{name}}": "{{name}}",
      "Let's work out!": "Let's work out!",
      "WORK OUT": "WORK OUT",
      // nickname
      "What nickname would you like to use?":
        "What nickname would you like to use?",
      Next: "Next",
      "This nickname is already existing.":
        "This nickname is already existing ToT",
      "What kind of training do you usually do?":
        "What kind of training do you usually do?",
      // type
      Strength: "Strength",
      Bodybuilding: "Bodybuilding",
      Crossfit: "Crossfit",
      Weightlifting: "Weightlifting",
      Bodyweight: "Bodyweight",
      Cardio: "Cardio",
      etc: "etc",
      undefined: "undefined",
      "I'd like to have more strength.": "I'd like to have more strength.",
      "I wanna be in better shape.": "I wanna be in better shape.",
      "I do crossfit.": "I do crossfit.",
      "I do clean and jerk, snatch.": "I do clean and jerk, snatch.",
      "I use my own weight.": "I use my own weight.",
      "I do run.": "I do run.",
      "I do something else.": "I do something else.",
      "I don't do certain training particularly more.":
        "I don't do certain training particularly more.",
      "How much do you weigh?": "How much do you weigh?",
      "How tall are you?": "How tall are you?",
      "What is you max squat weight?":
        "What is you max <strong>squat</strong> weight?",
      "What is you max benchpress weight?":
        "and what about the <strong>benchpress</strong> max weight?",
      "What is you max deadlift weight?":
        "What is you max <strong>deadlift</strong> weight?",
      Max: "Max",
    },
  },
  kr: {
    translation: {
      /* Sign */
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
      /* Register */
      Hi: "안녕하세요",
      "{{name}}": "{{name}}님",
      "Let's work out!": "루틴을 시작해보세요!",
      "WORK OUT": "시작하기",
      // nickname
      "What nickname would you like to use?": "어떤 닉네임을 사용하시겠어요?",
      Next: "다음으로",
      "This nickname is already existing.": "닉네임이 이미 존재해요 ㅠ",
      // type
      "What kind of training do you usually do?": "어떤 훈련을 주로 하세요?",
      Strength: "스트렝스",
      Bodybuilding: "바디빌딩",
      Crossfit: "크로스핏",
      Weightlifting: "역도",
      Bodyweight: "맨몸운동",
      Cardio: "유산소",
      etc: "etc",
      undefined: "모름",
      "I'd like to have more strength.": "더 강한 힘을 원해요.",
      "I wanna be in better shape.": "더 좋은 몸을 원해요.",
      "I do crossfit.": "크로스핏을 해요.",
      "I do clean and jerk, snatch.": "역도를 주로 해요.",
      "I use my own weight.": "맨몸운동을 주로 해요.",
      "I do run.": "유산소를 주로 해요.",
      "I do something else.": "다른 운동을 해요.",
      "I don't do certain training particularly more.":
        "특정 운동을 딱히 많이 하지 않아요.",
      "How much do you weigh?": "평소 <strong>체중</strong>은 어떻게 되시나요?",
      HamoHamo: "평소 <strong>체중</strong>은 어떻게 되시나요?",
      "How tall are you": "<strong>신장</storng>은 어떻게 되세요?",
      "What is you max squat weight?":
        "<strong>스쿼트</strong> 최대 중량은 어떻게 되시나요?",
      "What is you max benchpress weight?":
        "<strong>벤치프레스</strong> 최대 중량은요?",
      "What is you max deadlift weight?": "<strong>데드리프트</strong>는요?",
      Max: "최대",
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
