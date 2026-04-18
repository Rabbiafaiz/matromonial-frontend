"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  LeftArrow,
  ReviewIcon,
  RightArrow,
  StarIcon,
} from "../../common/allImages/AllImages";
import { getSuccessStoriesList } from "@/app/lib/api/successStoryRoutes";

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Next slide"
    className="slick-next"
  >
    <RightArrow />
  </button>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Previous slide"
    className="slick-prev"
  >
    <LeftArrow />
  </button>
);

const SuccessStories = () => {
  const [successStoriesList, setSuccessStoriesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const hasMultipleStories = (successStoriesList?.length || 0) > 1;
  const settings = {
    dots: false,
    infinite: hasMultipleStories,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: hasMultipleStories ? <NextArrow /> : undefined,
    prevArrow: hasMultipleStories ? <PrevArrow /> : undefined,
  };
  const renderStoryCard = (testimonial: any, index: number) => (
    <div key={index} className="flex justify-center w-full px-2 mb-2">
      <div className="bg-primary custom-rounded text-left flex justify-between">
        <div className="lg:py-20 py-8 px-4 lg:px-12 relative">
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
        <img
          src={testimonial.image}
          alt={"Testimonial Image"}
          className="md:block hidden w-full h-full"
        />
      </div>
    </div>
  );

  const getSuccessStories = async () => {
    try {
      setIsLoading(true);
      const { data } = await getSuccessStoriesList();
      setSuccessStoriesList(data?.successStories || []);
    } catch (error) {
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  };
  useEffect(() => {
    getSuccessStories();
  }, []);

  return (
    <section className="py-16 border-b border-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h2 className="text-sm font-medium text-normal uppercase">
            Success Stories
          </h2>
          <h3 className="md:text-3xl text-2xl font-bold text-gray-900 mt-2">
            Heartwarming Journeys
          </h3>
        </div>
        <div className="mt-10">
          {!isLoading && (successStoriesList?.length || 0) > 1 ? (
            <Slider {...settings}>
              {successStoriesList.map((testimonial, index) =>
                renderStoryCard(testimonial, index)
              )}
            </Slider>
          ) : !isLoading && (successStoriesList?.length || 0) === 1 ? (
            renderStoryCard(successStoriesList[0], 0)
          ) : !isLoading && hasFetched ? (
            <div>
              <h4 className="md:text-lg text-center text-base font-normal text-gray-900 mb-6">
                No Stories Found!
              </h4>
            </div>
          ) : null
          }
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
