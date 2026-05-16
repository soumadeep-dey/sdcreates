import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Home = lazy(() => import("@/pages/Home"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const BrandPage = lazy(() => import("@/pages/BrandPage"));
const WorkPage = lazy(() => import("@/pages/WorkPage"));
const VideoDetail = lazy(() => import("@/pages/VideoDetail"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));

const Spinner = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50vh",
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        border: "3px solid #c9a84c",
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

export default function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Spinner />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "services",
          element: (
            <Suspense fallback={<Spinner />}>
              <ServicesPage />
            </Suspense>
          ),
        },
        {
          path: "brand",
          element: (
            <Suspense fallback={<Spinner />}>
              <BrandPage />
            </Suspense>
          ),
        },
        {
          path: "work",
          element: (
            <Suspense fallback={<Spinner />}>
              <WorkPage />
            </Suspense>
          ),
        },
        {
          path: "work/video/:slug",
          element: (
            <Suspense fallback={<Spinner />}>
              <VideoDetail />
            </Suspense>
          ),
        },
        {
          path: "work/category/:categorySlug",
          element: (
            <Suspense fallback={<Spinner />}>
              <CategoryPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return routes;
}
