import React from "react";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import api from "@utils/FetchApi";
import DataTable from "@components/DataTable";
import PaginationControls from "@components/PaginationControls";

export default function ShowAllBlog() {
  const [blogs, setBlogs] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
    lastPage: 1,
    count: 0,
  });

  const tableHeads = [
    { title: "Title", attribute: "title" },
    { title: "Description", attribute: "description" },
    { title: "Created At", attribute: "formatted_created_at", isDate: true },
  ];

  const fetchBlogs = async ({ page, limit }) => {
    const res = await api.get(`/api/v1/blogs?page=${page}&limit=${limit}`);
    setBlogs(res.data);
    setPagination({
      page,
      limit,
      lastPage: res.pagination.lastPage,
      count: res.pagination.totalItems,
    });
  };

  React.useEffect(() => {
    fetchBlogs(pagination);
  }, []);

  return (
    <div>
      <Navbar />
      <PageWrapper className="p-6">
        <DataTable data={blogs} tableHeads={tableHeads} routeIdName="id" />
        <PaginationControls
          page={pagination.page}
          limit={pagination.limit}
          lastPage={pagination.lastPage}
          count={pagination.count}
          onPageChange={fetchBlogs}
        />
      </PageWrapper>
    </div>
  );
}
