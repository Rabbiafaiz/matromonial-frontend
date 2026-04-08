import React from "react";
import Link from "next/link";
import { SuccessDetailImg } from "@/app/components/common/allImages/AllImages";
import Image from "next/image";

const SuccessStoryDetail = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      {/* Breadcrumb Navigation */}
      <nav className="my-8">
        <ul className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/home" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li className="text-gray-400"><span>›</span></li>
          <li>
            <Link
              href="/home/success-stories"
              className="hover:text-primary"
            >
              Success Stories
            </Link>
          </li>
          <li className="text-gray-400"><span>›</span></li>
          <li>
            <span className="text-orange-500">See Detail</span>
          </li>
        </ul>
      </nav>

      {/* Hero Image */}
      <div className="rounded-2xl overflow-hidden mb-8 w-full relative">
        <Image src={SuccessDetailImg} alt="Success Story Hero" className="w-full h-full" />
      </div>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Lorem ipsum dolor sit
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
          delectus sapiente mollitia odio, voluptatum laboriosam ipsum doloribus
          natus blanditiis suscipit, voluptates nam odit labore debitis
          molestias nostrum sint sequi. Illum!
        </p>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
          delectus sapiente mollitia odio, voluptatum laboriosam ipsum doloribus
          natus blanditiis suscipit, voluptates nam odit labore debitis
          molestias nostrum sint sequi. Illum!
        </p>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
          delectus sapiente mollitia odio, voluptatum laboriosam ipsum doloribus
          natus blanditiis suscipit, voluptates nam odit labore debitis
          molestias nostrum sint sequi. Illum!
        </p>

        <div>
          <div className="flex items-start">
            <div>
              <p className="text-orange-500 font-semibold">Anthony Bahringer</p>
              <p className="text-normal text-sm">Research Manager</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default SuccessStoryDetail;
