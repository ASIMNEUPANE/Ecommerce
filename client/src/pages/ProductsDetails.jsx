import { useParams } from "react-router-dom";

const ProductsDetails = () => {
    const {id} = useParams();
  return <>ProductsDetails {id}</>;
};
export default ProductsDetails;

