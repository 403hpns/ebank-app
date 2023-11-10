"use client";

import { usePathname, useRouter } from "next/navigation";
import Button from "./ui/Button";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

type BreadcrumbProps = {
  title?: string;
};

const Breadcrumb = ({ title }: BreadcrumbProps) => {
  const pathname = usePathname();
  const pathNames = pathname.split("/").filter((path) => path);

  return (
    <div className="relative mb-4 flex w-full items-center justify-center gap-6 before:absolute before:left-0 before:top-full before:my-2 before:h-px before:w-full before:bg-[#e5e7eb]">
      <Link
        href={pathNames.at(pathNames.length - 4) ?? "/dasbhoard"}
        className="mr-auto"
      >
        <Button
          variant="unstyled"
          className="flex items-center gap-2 rounded border p-2"
        >
          <BsArrowRight className="rotate-180" /> Back
        </Button>
      </Link>
      <p className="font-bold">{title}</p>
      <div className="mr-auto">
        (
        {pathNames.map((path, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          return (
            <Link key={index} href={href}>
              {" "}
              {path} {pathNames.length - 1 !== index && "/"}
            </Link>
          );
        })}
        )
      </div>
    </div>
  );
};

export default Breadcrumb;
