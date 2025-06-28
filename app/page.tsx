import MainContainer from "@/components/static/mainPageContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خانه",
  description: "خانه",
};
const Home = () => {
  return (
    <>
      <section>
        <MainContainer />
      </section>
    </>
  );
};
export default Home;
