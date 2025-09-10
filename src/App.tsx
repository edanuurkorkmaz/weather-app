import Layout from "./Layout";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

type Props = {};

export default function App({}: Props) {
  return (
    <Layout>
      <Navbar />
      <Hero />
    </Layout>
  );
}
