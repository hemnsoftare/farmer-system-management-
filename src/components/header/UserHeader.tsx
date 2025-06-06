import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { MdOutlineManageAccounts } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { FaBlog, FaHeart, FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { lang } from "@/lib/action/uploadimage";
import { RiProfileFill } from "react-icons/ri";

const UserHeader = () => {
  const { user } = useUser(); // Access the current user data
  const t = useTranslations("UserHeader");
  const profileImageUrl = user?.imageUrl || "/default-profile-image.png";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none border-none">
        <FaRegUser className="object-cover w-5 h-5 md:h-6 md:w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 dark:bg-black dark:text-gray-100 border dark:border-white/50 mt-3 bg-white">
        <DropdownMenuLabel className="flex gap-2 border-b-2 dark:border-neutral-700 border-neutral-100 items-center justify-between">
          <Image
            src={profileImageUrl}
            alt="user"
            width={24}
            height={24}
            className="object-cover min-h-[34px] max-h-[34px] min-w-[34px] max-w-[34px] rounded-full"
          />
          <div className="flex gap-0 items-start justify-center flex-col">
            <span className="capitalize text-blue-800 text-[12px] ">
              {user?.fullName}
            </span>
            <span className="text-[10px] cursor-pointer hover:text-blue-700 hover:underline underline-offset-4">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem
          className={`flex  sm:dark:hover:bg-orangeMode-foreground dark:border-neutral-700 items-center gap-2 border-b-2 border-neutral-100 sm:hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3`}
        >
          <Link
            href={"/profile"}
            className={`flex ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} w-full gap-2 justify-start  items-center`}
          >
            <RiProfileFill color="#f45e0c" className="size-[23px]" />
            <span>{t("profile")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`flex  sm:dark:hover:bg-orangeMode-foreground dark:border-neutral-700 items-center gap-2 border-b-2 border-neutral-100 sm:hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3`}
        >
          <Link
            href={"/user-profile"}
            className={`flex ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} w-full gap-2 justify-start  items-center`}
          >
            <MdOutlineManageAccounts color="#f45e0c" className="size-[23px]" />
            <span>{t("manageAccount")}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex sm:dark:hover:bg-orangeMode-foreground dark:border-neutral-700 items-center gap-2 border-b-2 border-neutral-100 sm:hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          <Link
            href={"/historyOrder"}
            className={`flex ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} w-full gap-2 justify-start  items-center`}
          >
            <LuHistory color=" #f45e0c" className="size-[23px]" />
            <span>{t("historyOrder")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex sm:dark:hover:bg-orangeMode-foreground dark:border-neutral-700 items-center gap-2 border-b-2 border-neutral-100 sm:hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          <Link
            href={"/favorite"}
            className={`flex ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} w-full gap-2 justify-start  items-center`}
          >
            <FaHeart color=" #f45e0c" className="size-[23px]" />
            <span>{t("favoriteProduct")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex sm:dark:hover:bg-orangeMode-foreground dark:border-neutral-700 items-center gap-2 border-b-2 border-neutral-100 sm:hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          <Link
            href={"/saveBlog"}
            className={`flex ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} w-full gap-2 justify-start  items-center`}
          >
            <FaBlog color=" #f45e0c" className="size-[23px]" />
            <span>{t("SaveBlog")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex sm:dark:hover:bg-orangeMode-foreground dark:border-neutral-700 items-center gap-2 border-b-2 border-neutral-100 sm:hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          <Link
            href={"/setting"}
            className={`flex ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} w-full gap-2 justify-start  items-center`}
          >
            <IoSettingsOutline color=" #f45e0c" className="size-[23px]" />
            <span>{t("setting")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex sm:dark:hover:bg-orangeMode-foreground dark:border-neutral-700 items-center gap-2 border-b-2 border-neutral-100 sm:hover:bg-neutral-100 duration-300 transition-all hover:scale-[1.08] px-3">
          <span
            className={`w-full flex items-center gap-2 ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} w-full `}
          >
            <CiLogout color=" #f45e0c" className="size-[23px]" />
            <SignOutButton>{t("logout")}</SignOutButton>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserHeader;
