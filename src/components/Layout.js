import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="page">

      <Header />

      <div className="main-layout">
        <Sidebar />

        <main className="content">
          {children}
        </main>

        <Sidebar />
      </div>

      <Footer />

    </div>
  );
}

export default Layout;