import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      error_page: "an error occurs 😭",
      Next: "Next",
      characterLimit_message: "{{min}} to {{max}} characters",
      name_var: "{{name}}",
      Max: "Max",
      sign: {
        first_button: "Work out!",
        GoogleLogin: "Google Login",
        SignIn: "Sign in",
        SignUp: "Sign up",
        ID: "ID",
        Password: "Password",
        checkPassword_phrase: "Check your password",
        existingId_error: "ID already exists",
        noId_error: "There's no such ID",
        signUp_error: "Failed to sign up",
        signIn_error: "Failed to sign in",
        welcome_message: "Welcome to join us!",
      },
      register: {
        Hi: "Hi",
        workOut_message: "Let's work out!",
        WORK_OUT: "WORK OUT",
        // username
        usernameAsking_message:
          "What <strong>username</strong> would you like to use?",
        existingUsername_error: "This username is already existing 😮",
        //type
        typeAsking_message: "What kind of training do you usually do?",
        strength_message: "I'd like to have more strength.",
        bodybuilding_message: "I wanna be in better shape.",
        crossfit_message: "I do crossfit.",
        weightlifting_message: "I do clean and jerk, snatch.",
        bodyweight_message: "I use my own weight.",
        cardio_message: "I do run.",
        etc_message: "I do something else.",
        undefined_message: "I don't do certain training particularly more.",
        // figures
        weightAsking_message: "How much do you <strong>weigh</strong>?",
        heightAsking_message: "<strong>How tall</strong> are you?",
        squatAsking_message: "What is your max <strong>squat</strong> weight?",
        benchpressAsking_message:
          "and what about the <strong>benchpress</strong> max weight?",
        deadliftAsking_message:
          "What is your max <strong>deadlift</strong> weight?",
        welcome_message: `
          <>
          <p><strong>The Lifter {{username}},</strong> who lifts up <strong>{{total}}kg</strong> easily, </p>
          <p>which is {{weight_ratio}} times your own body weight!</p>
          </>
          `,
      },
      trainingType: {
        Strength: "Strength",
        Bodybuilding: "Bodybuilding",
        Crossfit: "Crossfit",
        Weightlifting: "Weightlifting",
        Bodyweight: "Bodyweight",
        Cardio: "Cardio",
        Etc: "etc",
        Undefined: "undefined",
      },
    },
  },
  kr: {
    translation: {
      error_page: "에러 발생 ㅠ",
      Next: "다음으로",
      characterLimit_message: "{{min}}~{{max}}자",
      name_var: "{{name}}님",
      Max: "최대",
      sign: {
        first_button: "Work out!",
        GoogleLogin: "Google 로그인",
        SignIn: "로그인",
        SignUp: "회원가입",
        ID: "아이디",
        Password: "비밀번호",
        checkPassword_phrase: "비밀번호 확인",
        existingId_error: "아이디가 이미 존재해요.",
        noId_error: "이런 아이디는 없어요 ㅠ",
        signUp_error: "회원가입 실패, 가입 정보를 확인해주세요.",
        signIn_error: "로그인에 실패했어요.",
        welcome_message: "가입을 환영해요!",
      },
      register: {
        Hi: "안녕하세요",
        workOut_message: "루틴을 시작해보세요!",
        WORK_OUT: "시작하기",
        // username
        usernameAsking_message: "어떤 <strong>이름</strong>을 사용하시겠어요?",
        existingUsername_error: "이름이 이미 존재해요 ㅠ",
        // type
        typeAsking_message: "어떤 훈련을 주로 하세요?",
        Strength: "스트렝스",
        Bodybuilding: "바디빌딩",
        Crossfit: "크로스핏",
        Weightlifting: "역도",
        Bodyweight: "맨몸운동",
        Cardio: "유산소",
        Etc: "etc",
        Undefined: "모름",
        strength_message: "더 강한 힘을 원해요.",
        bodybuilding_message: "더 좋은 몸을 원해요.",
        crossfit_message: "크로스핏을 해요.",
        weightlifting_message: "역도를 주로 해요.",
        bodyweight_message: "맨몸운동을 주로 해요.",
        cardio_message: "유산소를 주로 해요.",
        etc_message: "다른 운동을 해요.",
        undefined_message: "특정 운동을 딱히 많이 하지 않아요.",
        //figures
        weightAsking_message: "평소 <strong>체중</strong>은 어떻게 되시나요?",
        heightAsking_message: "<strong>신장</strong>은 어떻게 되세요?",
        squatAsking_message:
          "<strong>스쿼트</strong> 최대 중량은 어떻게 되시나요?",
        benchpressAsking_message: "<strong>벤치프레스</strong> 최대 중량은요?",
        deadliftAsking_message: "<strong>데드리프트</strong>는요?",
        welcome_message: `
        <>
        <p>무려 체중의 {{weight_ratio}}배를 들어올리는</p>
        <p>
          도합 <strong>3대{{total}}</strong>의 {{username}} <strong>리프터</strong>님!
        </p>
        </>
        `,
      },
      trainingType: {
        Strength: "스트렝스",
        Bodybuilding: "바디빌딩",
        Crossfit: "크로스핏",
        Weightlifting: "역도",
        Bodyweight: "맨몸운동",
        Cardio: "유산소",
        Etc: "etc",
        Undefined: "모름",
      },
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
