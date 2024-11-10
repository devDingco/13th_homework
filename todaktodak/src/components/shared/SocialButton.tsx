import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SocialButtonProps {
  provider: "google" | "kakao" | "naver";
  onClick?: () => void;
}

export function SocialButton({ provider, onClick }: SocialButtonProps) {
  return (
    <Button variant="social" size="social" onClick={onClick}>
      <Image
        src={`/images/login/${provider}.svg`}
        alt={provider}
        width={48}
        height={48}
      />
    </Button>
  );
}
