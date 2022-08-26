import React, { useContext, useEffect, useState } from "react";
import { FetchContext } from "../context/FetchContext";
import HomeCard from "./RealEstateApp/Homes/HomeCard";
import HomeFilter from "./RealEstateApp/Homes/HomeFilters";
import NavBar from "./NavBar";
import Footer from "./Footer";

function HomeList() {
  const { mainAxios } = useContext(FetchContext);
  const [homes, setHomes] = useState([]);
  const [cities, setCities] = useState([]);
  const [bedrooms, setBedrooms] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await mainAxios.get(`homes/`);
        console.log(data);
        setHomes(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [mainAxios]);

  return (
    <>
      <NavBar />
      <section className="grid grid-cols-1 md:flex">
        <HomeFilter />
        <div class="grid grid-cols-1 gap-8 mt-8 md:gap-12 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {homes.map((h) => (
            <HomeCard home={h} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default HomeList;
