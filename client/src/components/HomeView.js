import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useParams } from "react-router";
import { FetchContext } from "../context/FetchContext";

function HomeView() {
  const { id } = useParams();
  const { mainAxios } = useContext(FetchContext);
  console.log(id);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await mainAxios.get(`/homes/${id}`);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [mainAxios]);
  return (
    <div>
      <NavBar />
      <main>Home View</main>
      <Footer />
    </div>
  );
}

export default HomeView;
