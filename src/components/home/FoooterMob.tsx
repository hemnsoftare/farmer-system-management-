"use client";
import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaPhoneVolume,
  FaRegUser,
  FaYoutube,
} from "react-icons/fa";
import { MdNavigateNext, MdOutlineMailOutline } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoLocationOutline } from "react-icons/io5";
import { LuTwitter } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { footerProps } from "@/lib/action";
import { useTranslations } from "next-intl";
const FoooterMob = () => {
  const t = useTranslations("footer");
  const footer: footerProps[] = [
    {
      name: t("company"),
      item: [
        { name: t("about_us") },
        { name: t("contact_us") },
        { name: t("returns") },
        { name: t("order_status") },
      ],
    },
    {
      name: t("info"),
      item: [
        { name: t("how_it_works") },
        { name: t("our_promises") },
        { name: t("faq") },
      ],
    },
    {
      name: t("contact_us"),
      item: [
        { name: t("address"), icon: "location" },
        { name: t("phone"), icon: "phone" },
        { name: t("email"), icon: "eamil" },
      ],
    },
  ];
  const pathName = usePathname();
  const lang = pathName.startsWith("/ar") || pathName.startsWith("/ku");
  if (
    pathName.startsWith("/si") ||
    pathName.includes("dashboard") ||
    pathName === "/user-profile"
  ) {
    return;
  }
  return (
    <div className="bg-gradient-to-t dark:to-black dark:via-blue-950 dark:via-indigo-950 sm:hidden px-3 w-full py-6 to-primary-800  via-primary-800 from-primary-700 flex-col flex text-white">
      <div className="w-full ">
        <h2 className="text-14">{t("sign_up")}</h2>

        <button className="flex justify-between items-center py-2 mt-2 px-2 border-2 w-full border-white rounded-lg">
          <span className="flex items-center gap-2">
            <FaRegUser color="white" />
            <span className="text-12 sm:text-16">{t("email_address")} </span>
          </span>
          <MdNavigateNext color="white" />
        </button>
      </div>
      <Accordion type="single" collapsible className="w-full mt-4">
        {footer.map((section) => (
          <AccordionItem
            key={section.name}
            value={section.name.toLowerCase().replace(/\s+/g, "-")}
          >
            <AccordionTrigger
              className={`${lang ? "flex-row-reverse" : "flex-row"} flex text-12 w-full sm:text-16`}
            >
              {section.name}
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                {section.item.map((item) => (
                  <li
                    key={item.name}
                    className={`flex ${lang ? "text-right flex-row-reverse justify-start" : "text-left flex-row justify-end "}  items-center w-full gap-2`}
                  >
                    {item.icon && (
                      <span className="mr-2">
                        {item.icon === "phone" ? (
                          <FaPhoneVolume className="group-hover:text-blue-400 w-4 h-4 text-white" />
                        ) : item.icon === "location" ? (
                          <IoLocationOutline className="group-hover:text-blue-400 w-4 h-4" />
                        ) : (
                          <MdOutlineMailOutline className="group-hover:text-blue-400 w-4 h-4" />
                        )}
                      </span>
                    )}{" "}
                    <span className="text-primary-50">{item.name}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex w-full justify-between items-center">
        <FaFacebookSquare className="w-[24px] h-[24px] text-blue-800 =" />
        <LuTwitter className="w-[24px] h-[24px] text-blue-400 " />
        <FaInstagram className="w-[24px] h-[24px] text-[#E4405F] transition-colors duration-300" />

        <FaYoutube className="w-[24px] text-red-700 h-[24px] hover " />
      </div>
    </div>
  );
};

export default FoooterMob;
