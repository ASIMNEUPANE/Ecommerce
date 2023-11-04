import { Table } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2"


export default function Tables({ headers, data,remove,msg,url }) {

  const handleDelete=async(id)=>{
  const swalRes = await  Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      if (swalRes.isConfirmed) {
        // delete hook
      await remove(url,id)
        Swal.fire(
          'Deleted!',
          msg,
          'success'
        )
      }
    
    console.log("delete",id)


  }

  const handleEdit=async(id)=>{
console.log("edit",id)

  }

  
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers?.length > 0
              ? headers.map((title, index) => {
                  return <th key={index}>{title}</th>;
                })
              : null}
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0
            ? data.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product?.name}</td>
                    <td>{product?.quantity}</td>
                    <td>{product?.price}</td>
                    <td>
                      <div  className="flex d-flex justify-content-around">
                      <AiOutlineDelete className="text-danger"  onClick={()=>handleDelete(product?._id)}/>
                      <AiOutlineEdit className="text-success" onClick={()=>handleEdit(product?._id)} />
                      </div>
                   
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </div>
  );
}
