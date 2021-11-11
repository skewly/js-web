import BrandHeader from "./components/layout/header/BrandHeader";
import AppHeader from "./components/layout/header/AppHeader";

const App = () => {
  return (
    <>
      <BrandHeader />
      <AppHeader />
      <div className="container mx-auto">
        <h1>Hello World!</h1>
      </div>
    </>
  );
}

export default App;
