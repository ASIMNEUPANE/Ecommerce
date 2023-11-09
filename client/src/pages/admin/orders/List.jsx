import { useCallback, useEffect,useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Hookpagination from '../../../components/Hookpagination'
import { useOrder } from "../../../hooks/useOrder";

export default function List() {
  const { data, list, deleteById, approve } = useOrder();
  const [limit, setLimit] = useState(4);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const fetchOrders = useCallback(async () => {
    const result = await list({ page: currentPage, limit: limit });
    setLimit(result.limit)
    setCurrentPage(result.pageNum)
    setTotal(result.total)
  }, [list, currentPage, limit]);

  const handleDelete = async (event, id) => {
    event.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const resp = await deleteById(id);
        if (resp) {
          Swal.fire({
            title: "Deleted!",
            text: "Delete Successful.",
            icon: "success",
          });
          await list({ page: currentPage, limit: limit });
        }
      }
    } catch (err) {
      alert(err || "Something went wrong");
    }
  };
  const handleApprove = async (event, id, status) => {
    event.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve it!",
      });
      if (result.isConfirmed) {
        const payload =
          status === "pending"
            ? { status: "completed" }
            : { status: "pending" };
        const resp = await approve(id, payload);
        if (resp) {
          Swal.fire({
            title: "Approve!",
            text: "Approve Successful.",
            icon: "success",
          });
          await list({ page: currentPage, limit: limit });
        }
      }
    } catch (err) {
      alert(err || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div>
      <h1 className="text-center"> Orders</h1>
      <div className="d-flex flex-row-reverse">
        <Link className="btn btn-success mb-2" to="/admin/orders/add">
          Add New Order
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Order#</th>
            <th scope="col">Buyer Email</th>
            <th scope="col">Amount</th>

            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={item?._id}>
                  <th width="25%">{item?.id}</th>
                  <td>{item?.email}</td>
                  <td>{item?.amount}</td>

                  <td>{item?.status}</td>
                  <td width="10%">
                    <div className="flex d-flex justify-content-evenly">
                      <BsFillTrashFill
                        color="red"
                        onClick={(e) => handleDelete(e, item?.id)}
                      />
                      <BsFillPencilFill
                        onClick={() => navigate(`/admin/orders/${item?._id}`)}
                      />
                      <FcApproval
                        onClick={(e) =>
                          handleApprove(e, item?._id, item?.status)
                        }
                      />
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No Orders
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Hookpagination
        total={total}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setLimit={setLimit}
      />
    </div>
  );
}
