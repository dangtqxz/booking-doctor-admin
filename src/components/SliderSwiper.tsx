import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface SliderProps extends SwiperOptions {
  data: (React.ReactNode | string)[];
  className?: string;
  id: string;
  buttonType?: 'circle' | 'arrow';
}

const SlideSwiper: React.FC<SliderProps> = ({
  data,
  className,
  id,
  buttonType = 'circle',
  ...swiperProps
}) => {
  const renderNavigationButtons = () => {
    if (buttonType === 'circle') {
      return (
        <>
          <div className={`swiper-button-prev !w-10 !h-10 !bg-white !rounded-full !shadow-md after:!text-gray-600 after:!text-base border border-blue-300`}>
            <LeftOutlined />
          </div>
          <div className={`swiper-button-next !w-10 !h-10 !bg-white !rounded-full !shadow-md after:!text-gray-600 after:!text-base border border-blue-300`}>
            <RightOutlined />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={`swiper-button-prev !w-8 !h-8 !bg-transparent !shadow-none after:!text-blue-500 after:!text-2xl`}>
            <LeftOutlined className="text-blue-500 text-2xl" />
          </div>
          <div className={`swiper-button-next !w-8 !h-8 !bg-transparent !shadow-none after:!text-blue-500 after:!text-2xl`}>
            <RightOutlined className="text-blue-500 text-2xl" />
          </div>
        </>
      );
    }
  };

  return (
    <div className={`slider-container relative ${id}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: `.${id} .swiper-button-next`,
          prevEl: `.${id} .swiper-button-prev`,
        }}
        className={`${className} relative`}
        {...swiperProps}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            {typeof item === "string" ? (
              <img
                src={item}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              item
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {renderNavigationButtons()}
    </div>
  );
};

export default SlideSwiper;
