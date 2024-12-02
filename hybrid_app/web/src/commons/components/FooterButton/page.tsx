import { FOOTER } from "@/commons/constants/constants";
import Icon from "../Icon/page";

export default function FooterButton({ name }: { name: string }) {
  return (
    <button className="flex flex-col justify-center items-center w-1/2">
      <Icon src={`/svgs/${name.toLowerCase()}.svg`} alt={name?.toLowerCase()} />
      <p>{FOOTER[name.toUpperCase() as keyof typeof FOOTER]}</p>
    </button>
  );
}
