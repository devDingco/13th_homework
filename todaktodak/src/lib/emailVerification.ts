export async function sendVerificationEmail(email: string) {
  // 1. 임시 verification code 생성
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  // 2. localStorage나 context에 코드 저장
  sessionStorage.setItem(`email_verification_${email}`, code);

  // 3. 콘솔에 코드 출력 (개발용)
  console.log(`Verification code for ${email}: ${code}`);

  return code;
}
