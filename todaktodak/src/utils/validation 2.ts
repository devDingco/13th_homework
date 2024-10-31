export const validateSignupForm = (formData: any) => {
  const errors: Record<string, string> = {};

  // 이름 검증
  if (!formData.name.trim()) {
    errors.name = "이름을 입력해주세요";
  }

  // 닉네임 검증
  if (!formData.nickname.trim()) {
    errors.nickname = "닉네임을 입력해주세요";
  }

  // 이메일 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    errors.email = "이메일을 입력해주세요";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다";
  }

  // 비밀번호 검증
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!formData.password) {
    errors.password = "비밀번호를 입력해주세요";
  } else if (!passwordRegex.test(formData.password)) {
    errors.password = "영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요";
  }

  // 비밀번호 확인 검증
  if (formData.password !== formData.passwordConfirm) {
    errors.passwordConfirm = "비밀번호가 일치하지 않습니다";
  }

  return errors;
};
