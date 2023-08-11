export const register = {
  Hi: "안녕하세요",
  workOut_message: "루틴을 시작해보세요!",
  WORK_OUT: "시작하기",
  // username
  usernameAsking_message: "어떤 <strong>이름</strong>을 사용하시겠어요?",
  existingUsername_error: "이름이 이미 존재해요 ㅠ",
  username_error: "닉네임 등록에 실패했어요.",
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
  squatAsking_message: "<strong>스쿼트</strong> 최대 중량은 어떻게 되시나요?",
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
};

export default register;
