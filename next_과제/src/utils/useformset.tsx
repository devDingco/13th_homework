// import Filter from "badwords-ko"; 나중에 욕설 검사 필터링 추가
// const badwordFilter = new Filter();

export type formList = {
  writeName?: string;
  writePassword?: string;
  writeTitle?: string;
  writeContent?: string;
  writeAddressPost?: string;
  writeAddress?: string;
  writeAddressDetail?: string;
  youtubeUrl?: URL;
  imgFile?: File;
  email?: string;
  phone?: string;
  userId?: string;
};

const regexPattern = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  password: /(?=.*\d)(?=.*[a-z]).{8,}/, // 8자 이상, 영문, 숫자포함
  phone: /^\d{3}-\d{3,4}-\d{4}$/,
  url: /^http[s]?:\/\/([\S]{3,})/i,
  youtube: /^https?:\/\/(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
};

export const formResister: {
  [key: string]: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
  };
} = {
  writeName: {
    required: "필수 입력 사항입니다.",
    maxLength: {
      value: 10,
      message: "작성자명은 10자 이내로 입력해 주세요.",
    },
  },
  writePassword: {
    required: "필수 입력 사항입니다.",
    pattern: {
      value: regexPattern.password,
      message: "비밀번호는 8자 이상, 숫자와 영문자를 포함해야 합니다.",
    },
    minLength: {
      value: 8,
      message: "비밀번호는 8자 이상으로 입력해 주세요.",
    },
  },
  writeTitle: {
    required: "필수 입력 사항입니다.",
    maxLength: {
      value: 20,
      message: "제목은 20자 이내로 입력해 주세요.",
    },
  },
  writeContent: {
    required: "필수 입력 사항입니다.",
    maxLength: {
      value: 300,
      message: "내용은 300자 이내로 입력해 주세요.",
    },
  },
  writeAddress: {},
  youtubeUrl: {
    pattern: {
      value: regexPattern.youtube,
      message: "유투브 URL 형식을 확인해 주세요.",
    },
  },
  imgFile: {},
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
    required: "필수 입력 사항입니다.",
    maxLength: {
      value: 20,
      message: "아이디는 20자 이내로 입력해 주세요.",
    },
  },
};
