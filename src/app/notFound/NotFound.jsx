import PageWrapper from "@/components/PageWrapper";

export default function NotFound() {
  return (
    <PageWrapper
      height={"100vh"}
      className={"flex justify-center items-center"}
    >
      <div className="">
        <h1 className="text-5xl font-bold mb-4">404 Not Found</h1>
        <p className="text-xl mb-8">
          The page you are looking for does not exist.
        </p>
      </div>
    </PageWrapper>
  );
}
