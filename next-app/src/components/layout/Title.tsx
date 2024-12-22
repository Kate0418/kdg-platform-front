import Image from "next/image";

interface Props {
  title: string;
  icon: string;
}

export function Title({ title, icon }: Props) {
  return (
    <div className="border-b border-text-800 w-full">
      <div className="text-xl lg:text-3xl pl-2 pb-2 flex items-center gap-2">
        <Image src={`/img/${icon}.svg`} width={36} height={36} alt={icon} />
        {title}
      </div>
    </div>
  );
}
