import * as T from "@components/Table";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function DataTable({ data, tableHeads, routeIdName }) {
  return (
    <T.Table>
      <T.TableHeader>
        <T.TableRow>
          {tableHeads.map((head, i) => (
            <T.TableHead key={i}>{head.title}</T.TableHead>
          ))}
          {routeIdName && <T.TableHead>Action</T.TableHead>}
        </T.TableRow>
      </T.TableHeader>
      <T.TableBody>
        {data.length > 0 ? (
          data.map((blog, i) => (
            <T.TableRow key={i}>
              {tableHeads.map((head, j) => {
                let value = blog[head.attribute];
                if (typeof value === "string" && value.length > 30) {
                  value = value.substring(0, 30) + "...";
                }
                return (
                  <T.TableCell className="truncate" key={j}>
                    {value}
                  </T.TableCell>
                );
              })}
              {routeIdName && (
                <T.TableCell>
                  <Link
                    to={`/blogs/${blog[routeIdName]}`}
                    className="text-blue-700 hover:underline flex items-center gap-1"
                  >
                    View <FaArrowRight />
                  </Link>
                </T.TableCell>
              )}
            </T.TableRow>
          ))
        ) : (
          <T.TableRow>
            <T.TableCell
              colSpan={tableHeads.length + (routeIdName ? 1 : 0)}
              className="text-center"
            >
              No blogs found.
            </T.TableCell>
          </T.TableRow>
        )}
      </T.TableBody>
    </T.Table>
  );
}
