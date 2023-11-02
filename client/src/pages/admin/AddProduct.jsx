import { Button, Form } from "react-bootstrap";
import { list } from "../../services/category";
import { useCallback, useEffect, useState } from "react";
import { create } from "../../services/products";
import { useDispatch } from "react-redux";
export default function AddProduct() {
  const [payload, setPayload] = useState({
    name: "",
    alias: "",
    category: "",
    quantity: "",
    price: "",
  });
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const getAllCategories = useCallback(async () => {
    const data = await list();

   
    if (!data) return null;
    const { data: cats } = data;
    setCategories(cats.data.data);
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await create( payload );
console.log({data})
  };


  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

 
  return (
    <div>
      <Form className="p-4" onClick={(e) => handleSubmit(e)}>
        <h1 className="text-center">Add new Products</h1>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label> Images</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product Name"
            value={payload?.name}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Alias</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Alias"
            value={payload?.alias}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, alias: e.target.value };
              });
            }}
          />
        </Form.Group>

        <Form.Select
          className="mb-3"
          aria-label="  Default select example"
          value={payload?.category}
          onChange={(e) => {
            setPayload((prev) => {
              return { ...prev, category: e.target.value };
            });
          }}
        >
          <option value="">Select One</option>
          {categories.length > 0
            ? categories.map((cat) => {
                return (
                  <option key={cat?._id} value={cat?._id}>
                    {cat?.name}
                  </option>
                );
              })
            : null}
        </Form.Select>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>description</Form.Label>
          <Form.Control type="text" placeholder="Enter description" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Quantity"
            value={payload?.quantity}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, quantity: e.target.value };
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            value={payload?.price}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, price: e.target.value };
              });
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
