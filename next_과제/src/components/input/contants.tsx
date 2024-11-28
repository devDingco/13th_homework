import { IformRegister } from "./types";

const regexPattern = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  password: /(?=.*\d)(?=.*[a-z]).{8,}/, // 8자 이상, 영문, 숫자포함
  phone: /^\d{3}-\d{3,4}-\d{4}$/,
  url: /^http[s]?:\/\/([\S]{3,})/i,
  youtube: /^https?:\/\/(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
};

const required = "필수 입력 사항입니다.";

export const formRegister: IformRegister = {
  commentDeletePassword: {
    required: "",
    minLength: {
      value: 1,
      message: "",
    },
  },
  commentPassword: {
    required,
    minLength: {
      value: 4,
      message: "비밀번호는 4자 이상으로 입력해 주세요.",
    },
  },
  commentWriter: {
    required,
    minLength: {
      value: 2,
      message: "작성자명은 2자 이상입니다.",
    },
  },
  commentContents: {
    required,
    maxLength: {
      value: 100,
      message: "내용은 100자 이내로 입력해 주세요.",
    },
  },
  writeName: {
    required,
    maxLength: {
      value: 10,
      message: "작성자명은 10자 이내로 입력해 주세요.",
    },
  },
  writePassword: {
    required,
    // pattern: {
    //   value: regexPattern.password,
    //   message: "비밀번호는 8자 이상, 숫자와 영문자를 포함해야 합니다.",
    // },
    minLength: {
      value: 4,
      message: "비밀번호는 4자 이상으로 입력해 주세요.",
    },
  },
  writeTitle: {
    required,
    maxLength: {
      value: 20,
      message: "제목은 20자 이내로 입력해 주세요.",
    },
  },
  writeAddress: {},
  youtubeUrl: {
    pattern: {
      value: regexPattern.youtube,
      message: "유투브 URL 형식을 확인해 주세요. ex) https://youtu.be/xxxxxx",
    },
  },
  imgFiles: {
    //! 이미지 용량 및 파일 형식 제한 추가 필요
    pattern: {
      value: /\.(jpe?g|png|gif)$/i,
      message: "이미지 파일만 업로드 가능합니다.",
    },
  },
  email: {
    pattern: {
      value: regexPattern.email,
      message: "이메일 형식을 확인해 주세요.",
    },
  },
  phone: {
    pattern: {
      value: regexPattern.phone,
      message: "휴대폰 번호 형식을 확인해 주세요.",
    },
  },
  userId: {
    required,
    maxLength: {
      value: 20,
      message: "아이디는 20자 이내로 입력해 주세요.",
    },
  },
  joinEmail: {
    required,
    pattern: {
      value: regexPattern.email,
      message: "이메일 형식을 확인해 주세요.",
    },
  },
  joinName: {
    required,
    maxLength: {
      value: 10,
      message: "이름은 10자 이내로 입력해 주세요.",
    },
  },
  joinPassword: {
    required,
    pattern: {
      value: regexPattern.password,
      message: "비밀번호는 8자 이상, 숫자와 영문자를 포함해야 합니다.",
    },
  },
  joinPasswordConfirm: {
    required,
    validate: (value: string, watch: { [key: string]: string }) => {
      return value === watch.joinPassword || "비밀번호가 일치하지 않습니다.";
    },
  },
  newPassword: {
    required,
    pattern: {
      value: regexPattern.password,
      message: "비밀번호는 8자 이상, 숫자와 영문자를 포함해야 합니다.",
    },
  },
  newPasswordCheck: {
    required,
  },
  productName: {
    required,
    maxLength: {
      value: 20,
      message: "제목은 20자 이내로 입력해 주세요.",
    },
  },
  productPrice: {
    required,
    pattern: {
      value: /^[0-9]*$/,
      message: "숫자만 입력해주세요.",
    },
    minLength: {
      value: 1,
      message: "숫자만 입력해주세요.",
    },
  },
  productRemarks: {
    required,
    maxLength: {
      value: 50,
      message: "제목은 50자 이내로 입력해 주세요.",
    },
  },
  productContents: {
    required,
    maxLength: {
      value: 300,
      message: "내용은 300자 이내로 입력해 주세요.",
    },
  },
  questionContents: {
    required,
    maxLength: {
      value: 100,
      message: "내용은 100자 이내로 입력해 주세요.",
    },
  },
};
