import WrappedRoutes from "@/router";
import { HappyProvider } from "@ant-design/happy-work-theme";
const App: React.FC = () => {
  return (
    <>
      <HappyProvider>
        <WrappedRoutes />
      </HappyProvider>
    </>
  );
};

export default App;
