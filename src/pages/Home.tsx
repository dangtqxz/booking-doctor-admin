import { Carousel, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "swiper/css";
import DoctorCard from "../components/DoctorCard";
import PostCard from "../components/PostCard";
import SlideSwiper from "../components/SliderSwiper";
import SpecialtyCard from "../components/SpecialtyCard";
import {
  dataHealthTips,
} from "../contains/data-fake";
import HelmetWrapper from "../components/HelmetWrapper";
import { Doctor, Specialty } from "../types";
import { PostWithJson } from "../services/axiosConfig";

const { Title } = Typography;

const Home: React.FC = () => {
  const images = [
    "https://kpmg.com/content/dam/kpmgsites/xx/images/2024/03/two-doctors-smiling-banner.jpg",
    "https://assets.kpmg.com/is/image/kpmg/two-doctors-talking-banner:cq5dam.web.2000.500",
    "https://cdn.iuhealth.org/heros/_2000x500_crop_top-center_none/app_fellowship_banner_2.jpg",
  ];

  const [dataSpecialties, setDataSpecialties] = useState<Specialty[]>([]);

  const loadDataSpecialties = async () => {
    let payload = {};
    let endpoint = 'chuyenkhoa';
    let response = await PostWithJson<Specialty[]>(payload, endpoint);
    let data = response.data;
    setDataSpecialties(data)
  };

  useEffect(() => {
    loadDataSpecialties();
  }, []);

  const specialties: React.ReactNode[] = dataSpecialties.map((item) => (
    <SpecialtyCard
      key={item.ID_ChuyenKhoa}
      iD_ChuyenKhoa={item.ID_ChuyenKhoa}
      tenChuyenKhoa={item.TenChuyenKhoa}
      anhUrl={item.AnhUrl}
    />
  ));

  const [datafeaturedDoctors, setdataFeaturedDoctors] = useState<Doctor[]>([]);

  const loadFeaturedDoctors = async () => {
    let payload = {};
    let endpoint = 'bacsi';
    let response = await PostWithJson<Doctor[]>(payload, endpoint);
    let data = response.data;
    setdataFeaturedDoctors(data)
  };

  useEffect(() => {
    loadFeaturedDoctors();
  }, []);

  const featuredDoctors: React.ReactNode[] = datafeaturedDoctors.map((item) => (
    <DoctorCard
      key={item.ID_BacSi}
      iD_BacSi={item.ID_BacSi}
      hoTen={item.HoTen}
      tenBangCap={item.TenBangCap}
      avatar={item.Avatar}
    />
  ));

  const healthTips: React.ReactNode[] = dataHealthTips.map((item) => (
    <PostCard key={item.id} id={item.id} title={item.title} imageUrl={item.imageUrl} />
  ));

  return (
    <HelmetWrapper title="Trang chủ">
      <Carousel autoplay className="w-full" dots={true} pauseOnFocus infinite>
        {images.map((image, index) => (
          <div key={index} className="h-full">
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-[200px] md:h-full object-cover "
            />
          </div>
        ))}
      </Carousel>

      <section className="py-4 md:py-8 container mx-auto px-4 md:px-4">
        <Title level={3} className="text-lg md:text-xl mb-4">Chuyên khoa</Title>
        <SlideSwiper
          id="specialty-slider"
          data={specialties}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
          }}
        />
      </section>

      <section className="py-4 md:py-8 container mx-auto px-4 md:px-4">
        <Title level={3} className="text-lg md:text-xl mb-4">Bác sĩ nổi bật</Title>
        <SlideSwiper
          id="doctor-slider"
          data={featuredDoctors}
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
        />
      </section>

      <section className="py-4 md:py-8 container mx-auto px-4 md:px-4">
        <Title level={3} className="text-lg md:text-xl mb-4">Sống khỏe suốt đời</Title>
        <SlideSwiper
          id="health-tips-slider"
          data={healthTips}
          slidesPerView={1}
          spaceBetween={10}
          buttonType="arrow"
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
        />
      </section>
    </HelmetWrapper>
  );
};

export default Home;
