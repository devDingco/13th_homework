import Header from "../components/header";

const Main = (props: any) => {
  return (
    <main>
      <Header />
      <div className="max-w-7xl m-auto py-10 max-md:max-w-full max-lg:mx-5 flex flex-col gap-10">
        {props.children}
      </div>
    </main>
  );
};

export default Main;
