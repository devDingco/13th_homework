export function calculatePasswordStrength(password: string): number {
  let score = 0;

  // 길이 점수
  score += password.length * 4;

  // 대문자 포함
  if (/[A-Z]/.test(password)) score += 10;

  // 소문자 포함
  if (/[a-z]/.test(password)) score += 10;

  // 숫자 포함
  if (/[0-9]/.test(password)) score += 10;

  // 특수문자 포함
  if (/[^A-Za-z0-9]/.test(password)) score += 10;

  return Math.min(100, score);
}
