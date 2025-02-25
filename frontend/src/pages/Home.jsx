import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Home = () => {
  const [courses, setCourses] = useState([]);
  console.log(courses);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/course/courses"
        );
        console.log(response.data.data);
        setCourses(response.data.data);
      } catch (error) {
        console.log("Error in fetch Cources", error);
      }
    };
    fetchCourses();
  }, []);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    autoplay:true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay:true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="pt-4 md:pt-8 lg:pt-14">
      <div className="flex justify-center items-center">
        <div>
          <h2 className="lg:text-4xl text-center md:text-2xl font-poppins text-xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-orange-600 via-pink-500 to-violet-600 ">
            Course Haven
          </h2>
          <p className="py-2 text-slate-500">
            Sharpens your skills with courses crafted by experts
          </p>
          <div className="my-3 flex gap-4">
            <Link>
              <button className="bg-green-600 text-white font-poppins py-1 px-6">
                Explore Courses
              </button>
            </Link>
            <Link>
              <button className="bg-white  text-black font-poppins py-1 px-6">
                Explore Courses
              </button>
            </Link>
          </div>
        </div>
      </div>
      

      {/* slider part start */}
      <section className="">
        <Slider {...settings}>
          {courses.map((items, index) => (
            <div key={items._id}>
              <div>
                <div className="p-4 border border-slate-600 relative mx-2 flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                  <img src={items.image.url} className="h-44 " alt="" />
                  <div className="flex justify-center">
                    <div>
                      <h4 className="text-white text-center py-2">{items.title}</h4>
                      <button className="bg-orange-500 py-1 px-4 rounded-full">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      {/* slider part end */}

      <hr className="mt-4" />
    </div>
  );
};

export default Home;
