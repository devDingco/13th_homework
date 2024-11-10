import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";
import SignUpLink from "./SignUpLink";
import SocialLogin from "./SocialLogin";

export function LoginContainer() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <LoginHeader />
          <LoginForm />
          <SocialLogin />
          <SignUpLink />
        </div>
      </div>
    </div>
  );
}
