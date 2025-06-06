"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductsHeader from "./ProductsHeader";
import UserHeader from "./UserHeader";
import CartHeader from "./CartHeader";
// import Search from "../home/Search";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { catagoryProps, ItemCartProps } from "@/lib/action";
import { usePathname } from "next/navigation";
import { IoMdMenu } from "react-icons/io";
import Mune from "./Mune";
import { getFireBase, lang } from "@/lib/action/uploadimage";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Lightbulb } from "lucide-react";
import { CiDark } from "react-icons/ci";
import { GrSystem } from "react-icons/gr";

const Header = () => {
  const pathName = usePathname();
  const [isopenCart, setisopenCart] = useState(false);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const { setTheme } = useTheme();
  const [category, setcategory] = useState<catagoryProps[]>([]);
  // State to track the total quantity and grand total
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("None");
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  // client components
  const t = useTranslations("header");

  // seerver componnets
  // const t = await getTranslations("header");
  useEffect(() => {
    const getdata = async () => {
      const cate: catagoryProps[] = await getFireBase("category");
      setcategory(cate);
    };
    getdata();
  }, []);
  const cartItems = useSelector(
    (state: { cart: ItemCartProps[] }) => state.cart
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > 7) {
        // Threshold to avoid small changes
        if (currentScrollY > lastScrollY + 3) {
          setScrollDirection("Increasing");
        } else if (currentScrollY < 30) {
          setScrollDirection("None");
        } else if (currentScrollY < lastScrollY + 4) {
          setScrollDirection("Decreasing");
        }
      }

      setisopenCart(false);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const quantityTotal = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setTotal(quantityTotal);

    const calculatedGrandTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setGrandTotal(calculatedGrandTotal);
  }, [cartItems]);

  if (pathName.startsWith("/si") || pathName.includes("dashboard")) {
    return null;
  }
  const changelanguage = (lang: string) => {
    // Get the current URL
    const currentPath = window.location.pathname; // Use the browser's `pathname`
    const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${lang}`); // Replace the lang()uage prefix

    // Push the new path
    router.push(newPath);
  };

  let login = t("login");
  let signup = t("signup");
  return (
    <div
      className={` ${
        // scrollDirection === "Decreasing"
        //   ? " translate-y-0 transition-all backdrop-blur-md text-black dark:backdrop-brightness-75 duration-300 sticky top-0 right-0 left-0"
        //   : scrollDirection === "None"
        //     ? "translate-y-0 "
        //     : "-translate-y-[200px] text-black "
        pathName === "/en" ? "text-white" : "text-black"
      } 
         flex relative z-[50] md:px-12 top-0 right-0 left-0  dark:bg-transparent   items-center px-3 pt-4 pb-2  justify-between`}
    >
      {/* logo */}
      <Link
        href={"/"}
        w-full
        className="hidden font-extrabold font-serif italic text-30 text-secondary sm:block"
      >
        {/* <Image
          src={"/y/logo1.png"}
          w-full
          alt="logo"
          width={48}
          height={53}
          className=" lg:w-[48px] w-[30px] h-[50px] lg:h-[93px]  md:w-[89px] md:h-[93px]"
        /> */}
        FC
      </Link>

      {/* menu */}
      <div className="block sm:hidden">
        <Mune category={category} />
      </div>
      <Link href="/" className="font-bold block sm:hidden text-secondary-300">
        Farmar - City
      </Link>
      {/* dark mode and light mode  */}
      <MdOutlineDarkMode
        className="block  dark:hidden md:dark:hidden md:hidden"
        onClick={() => setTheme("dark")}
      />
      <MdOutlineLightMode
        className="hidden  md:dark:hidden dark:block md:hidden"
        onClick={() => setTheme("light")}
      />
      {/* center */}
      <div className="sm:flex hidden xl:gap-12 lg:gap-6 md:gap-6 py-2 justify-center w-[60%] items-center">
        <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-secondary-100 text-lg font-[400]"
          href={"/"}
          w-full
        >
          {t("home")}
        </Link>
        <ProductsHeader
          textcolor={pathName === "/en" ? "text-white" : "text-black"}
          category={category}
          lng={t("products")}
        />
        <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-secondary-100 text-lg font-[400]"
          href={"/blog"}
          w-full
        >
          {t("blog")}
        </Link>
        <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-secondary-100 text-lg font-[400]"
          href={"/FAQ"}
          w-full
        >
          {t("faq")}
        </Link>
        {/* 
        <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-secondary-100 text-lg font-[400]"
          href={"/ContactUs"}
          w-full
        >
          {t("contactus")}
        </Link> */}

        <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-secondary-100 text-lg font-[400]"
          href={"/About"}
          w-full
        >
          {t("about")}
        </Link>
        <Link
          className="hover:underline underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-secondary-100 text-lg font-[400]"
          href={"/setting"}
          w-full
        >
          {t("setting")}
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:underline border-0 outline-none underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-secondary-100 text-lg font-[400]">
            {t("theme")}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:text-white dark:bg-neutral-700 ">
            <DropdownMenuItem
              className={`flex ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} hover:bg-secondary-300 hover:text-white transition-all duration-300 w-full gap-2 justify-start  items-center`}
              onClick={() => setTheme("light")}
            >
              <Lightbulb />
              {t("light")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} hover:bg-secondary-300 hover:text-white transition-all duration-300 w-full gap-2 justify-start  items-center`}
              onClick={() => setTheme("dark")}
            >
              <CiDark />
              {t("dark")}
            </DropdownMenuItem>

            <DropdownMenuItem
              className={`flex ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} hover:bg-secondary-300 hover:text-white transition-all duration-300 w-full gap-2 justify-start  items-center`}
              onClick={() => setTheme("orange")}
            >
              <GrSystem />
              {t("system")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* lang()ouge */}
      </div>
      {/* right */}
      {/* <DropdownMenu>
        <DropdownMenuTrigger className="hover:underline hidden md:block border-0 outline-none underline-offset-4 lg:text-16 md:text-12 duration-200 transition-all hover:text-secondary-100 text-lg font-[400]">
          {t("language")}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white dark:bg-neutral-700 ">
          <DropdownMenuItem
            className={`flex ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} hover:bg-secondary-300 hover:text-white transition-all duration-300 w-full gap-2 justify-start  items-center`}
            onClick={() => changelanguage("en")}
          >
            <Image
              alt="df"
              src={"/english.png"}
              width={25}
              height={25}
              className="size-[25px]"
            />
            {t("english")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`flex ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} hover:bg-secondary-300 hover:text-white transition-all duration-300 w-full gap-2 justify-start  items-center`}
            onClick={() => changelanguage("ku")}
          >
            {" "}
            <Image
              alt="df"
              src={"/kurdish.png"}
              width={25}
              height={25}
              className="size-[25px]"
            />
            {t("kurdish")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`flex ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} hover:bg-secondary-300 hover:text-white transition-all duration-300 w-full gap-2 justify-start  items-center`}
            onClick={() => changelanguage("tr")}
          >
            {" "}
            <Image
              alt="df"
              src={"/turkish.png"}
              width={25}
              height={25}
              className="size-[25px]"
            />
            {t("turkish")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`flex ${lang() === "ku" || lang() === "ar" ? "flex-row-reverse" : "flex-row"} hover:bg-secondary-300 hover:text-white transition-all duration-300 w-full gap-2 justify-start  items-center`}
            onClick={() => changelanguage("ar")}
          >
            <Image
              alt="df"
              src={"/arabic.png"}
              width={25}
              height={25}
              className="size-[25px]"
            />
            {t("arabic")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
      <div className="flex gap-2 items-center">
        {isAdmin && (
          <Link
            className="bg-secondary-400 mx-3 px-3 py-1 duration-300 transition-all text-white rounded-lg hover:bg-secondary-600"
            href={"/dashboard/home"}
            w-full
          >
            {t("dashboard")}
          </Link>
        )}
        <div onClick={() => setisopenCart(!isopenCart)} className="relative">
          <IoCartOutline size={27} className="relative" />
          <p className="text-10 font-semibold rounded-full px-2 flex items-center justify-center   py-[2px] absolute bg-blue-700 text-white -bottom-1 -right-2">
            {total}
          </p>
        </div>
        <div className="hidden sm:block">
          <SignedOut>
            <div className="flex items-center justify-center gap-3">
              <div className="text-primary cursor-pointer text-12 px-3 py-1">
                <SignInButton>
                  <LoginButton />
                </SignInButton>
              </div>
              <div className="px-3 py-1 text-8 cursor-pointer sm:text-12 bg-blue-700 text-white rounded-lg">
                <SignUpButton>
                  <SingUp />
                </SignUpButton>
              </div>
            </div>
          </SignedOut>
        </div>
        <SignedIn>
          <UserHeader />
        </SignedIn>
      </div>
      {isopenCart && (
        <CartHeader items={cartItems} onclose={() => setisopenCart(false)} />
      )}
    </div>
  );
};

export default Header;
export const LoginButton = () => {
  const t = useTranslations("header");
  return (
    <Link
      href={"/sign-in"}
      className="flex text-23 text-white items-center gap-2"
    >
      <span>{t("login")}</span>
    </Link>
  );
};
export const SingUp = () => {
  const t = useTranslations("header");
  return (
    <Link
      href={"/sign-up"}
      className="flex text-23 text-white items-center gap-2"
    >
      <span>{t("signup")}</span>
    </Link>
  );
};
