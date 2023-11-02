import { Table } from "react-bootstrap";

export default function Tables({ headers, data }) {
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
          </tr>
        </thead>
        <tbody>
          {data?.length > 0
            ? data.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{product?.name}</td>
                    <td>{product?.quantity}</td>
                    <td>{product?.price}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </div>
  );
}
