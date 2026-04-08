import React from "react";
import Image from "next/image";
import {
  AppStore,
  Facebook,
  GooglePlay,
  Insta,
  Linkedin,
  LogoLight,
  Pinterest,
  Xicon,
  Youtube,
} from "../common/allImages/AllImages";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mx-auto bg-darkBlue text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap">
          {/* Logo and Description */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-8 sm:text-left text-center lg:mb-0 pe-5">
            <div className="flex items-center sm:justify-normal justify-center mb-4">
              <Image src={LogoLight} alt="Logo" width={150} height={100} />
            </div>
            <p className="text-sm">
              Discover your ideal partner with Vaishakhi Matrimony, the top
              online platform for finding love.
            </p>
            <div className="flex space-x-4 mt-4">
              {/* Social Media Icons */}
              <a href="#" className="text-white">
                <Xicon />
              </a>
              <a href="#" className="text-white">
                <Facebook />
              </a>
              <a href="#" className="text-white">
                <Linkedin />
              </a>
              <a href="#" className="text-white">
                <Pinterest />
              </a>
              <a href="#" className="text-white">
                <Youtube />
              </a>
              <a href="#" className="text-white">
                <Insta />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-8 lg:mb-0">
            <h3 className="font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <Link
                  href="/home/success-stories"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-policy"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-8 lg:mb-0">
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:info@vaishakhimatrimony.com"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Help & Support
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="#faqs"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Apps */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h3 className="font-bold mb-4">Apps</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.metrimoni"
                target="_blank"
              >
                <Image
                  src={GooglePlay}
                  alt="Google Play"
                  width={135}
                  height={40}
                />
              </a>
              {/* <span>
                <Image src={AppStore} alt="App Store" width={135} height={40} />
              </span> */}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm">
          <div className="flex justify-between">
            <div>
              &copy; Copyright 2024, All Rights Reserved By{" "}
              <span className="font-bold">
                Vaishakhi Foundation and Matrimony Trust.
              </span>
            </div>
            <div>
              <a href="https://selflance.com/" target="_blank">Designed & Developed by Selflance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
