"use client";
import {
  ReviewIcon,
  StarIcon,
} from "@/app/components/common/allImages/AllImages";
import CustomLoader from "@/app/components/common/loader/CustomLoader";
import Pagination from "@/app/components/common/pagination/Pagination";
import { getSuccessStoriesList } from "@/app/lib/api/successStoryRoutes";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PaginationData {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const STORIES_PAGE_LIMIT = 5;

const SuccessStoriesPage = () => {
  const searchParams = useSearchParams();
  const [successStoriesList, setSuccessStoriesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: STORIES_PAGE_LIMIT,
    totalCount: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const pageParam = Number(searchParams.get("page"));
  const currentPage =
    Number.isFinite(pageParam) && pageParam > 0 ? Math.floor(pageParam) : 1;

  const getSuccessStories = async (page: number) => {
    try {
      setIsLoading(true);
      const { data } = await getSuccessStoriesList({
        page,
        limit: STORIES_PAGE_LIMIT,
      });
      setSuccessStoriesList(data?.successStories || []);
      setPagination({
        page: data?.pagination?.page || page,
        limit: data?.pagination?.limit || STORIES_PAGE_LIMIT,
        totalCount: data?.pagination?.totalCount || 0,
        totalPages: data?.pagination?.totalPages || 1,
        hasNextPage: Boolean(data?.pagination?.hasNextPage),
        hasPreviousPage: Boolean(data?.pagination?.hasPreviousPage),
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    getSuccessStories(currentPage);
  }, [currentPage]);

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center gap-2 text-sm my-8">
          <li>
            <Link href="/dashbaord" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li className="text-gray-400">
            <span>›</span>
          </li>
          <li>
            <span className="text-orange-500">Success Stories</span>
          </li>
        </ul>
        {isLoading ? (
          <div className="mb-10">
            <div className="flex flex-col gap-10">
              {Array.from({ length: 2 }).map((_, index) => (
                <React.Fragment key={`skeleton-${index}`}>
                  <div className="flex justify-center w-full animate-pulse shadow-lg rounded-2xl">
                    <div className="bg-gray-200 w-full min-h-[350px] rounded-3xl text-left flex justify-between overflow-hidden relative">
                      <div className="lg:py-20 py-8 px-4 lg:px-12 w-full md:w-[60%] flex flex-col justify-center">
                        <div className="flex mb-4">
                          {Array(5)
                            .fill("")
                            .map((_, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 mr-1 bg-gray-300 rounded-full"
                              />
                            ))}
                        </div>
                        <div className="space-y-3 md:mt-9 mt-4 w-full">
                          <div className="h-5 bg-gray-300 rounded w-full"></div>
                          <div className="h-5 bg-gray-300 rounded w-5/6"></div>
                          <div className="h-5 bg-gray-300 rounded w-4/6"></div>
                        </div>
                        <div className="mt-7">
                          <div className="h-7 bg-gray-300 rounded w-1/3 mb-2"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        </div>
                      </div>
                      <div className="md:block hidden w-[40%] bg-gray-300 h-full absolute right-0 top-0 bottom-0"></div>
                    </div>
                  </div>
                  <div>
                    <div className="h-12 w-full sm:w-40 bg-gray-200 rounded-full animate-pulse block"></div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-10">
            <div className="flex flex-col gap-10">
              {successStoriesList?.length > 0 ? (
                successStoriesList?.map((testimonial, index) => (
                  <React.Fragment key={index}>
                    <div className="flex justify-center w-full">
                      <div className="bg-primary custom-rounded text-left flex overflow-hidden">
                        <div className="md:w-2/3 w-full lg:py-20 py-8 px-4 lg:px-12 relative">
                          <div>
                            <ReviewIcon className="absolute top-14 right-20 opacity-35" />
                          </div>
                          <div className="flex">
                            {Array(5)
                              .fill("")
                              .map((_, i) => (
                                <StarIcon key={i} />
                              ))}
                          </div>
                          <p className="text-white md:text-xl text-base md:mt-9 mt-4">
                            {testimonial?.description}
                          </p>
                          <h4 className="text-xl text-white font-semibold text-gray-900 mt-7">
                            {testimonial?.createdBy?.name}
                          </h4>
                          <p className="text-white font-light text-sm mt-1">
                            {testimonial?.createdBy?.occupation}
                          </p>
                        </div>
                        <Image
                          src={testimonial.image}
                          width={500}
                          height={500}
                          alt={"Testimonial Image"}
                          className="md:block hidden md:w-1/3 h-full object-cover"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                    {/* <div>
                      <Button
                        label="See Detail"
                        variant="secondary"
                        className="px-10 w-full sm:w-auto"
                        onClick={() =>
                          router.push(
                            `/dashbaord/success-stories/${testimonial?._id}`,
                          )
                        }
                      />
                    </div> */}
                  </React.Fragment>
                ))
              ) : hasFetched ? (
                <div>
                  <h4 className="md:text-lg text-center min-h-[40vh] text-base font-normal text-gray-900 mb-6">
                    No Stories Found!
                  </h4>
                </div>
              ) : null
              }
            </div>

            {successStoriesList?.length > 0 && pagination?.totalPages > 1 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                baseUrl="/dashbaord/success-stories"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStoriesPage;
