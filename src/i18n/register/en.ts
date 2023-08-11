export const register = {
  Hi: "Hi",
  workOut_message: "Let's work out!",
  WORK_OUT: "WORK OUT",
  // username
  usernameAsking_message:
    "What <strong>username</strong> would you like to use?",
  existingUsername_error: "This username is already existing 😮",
  username_error: "Failed to set username.",
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
  deadliftAsking_message: "What is your max <strong>deadlift</strong> weight?",
  welcome_message: `
      <>
      <p><strong>The Lifter {{username}},</strong> who lifts up <strong>{{total}}kg</strong> easily, </p>
      <p>which is {{weight_ratio}} times your own body weight!</p>
      </>
      `,
};

export default register;
