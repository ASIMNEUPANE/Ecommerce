import { useState, useEffect, useCallback } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { fetchProducts } from "../../slices/productSlice";

export default function AddProduct() {
  const [selectedOption, setSelectedOption] = useState("All");

  const { products, loading, limit, total, page, currentPage } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const initFetch = useCallback(() => {
    dispatch(fetchProducts({ limit, page, currentPage }));
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  let contentToDisplay = null;

  if (selectedOption === "All") {
    contentToDisplay = <h1>Display All Content</h1>;
  } else if (selectedOption === "Active") {
    contentToDisplay = <h1>Display Active Content</h1>;
  } else if (selectedOption === "Archived") {
    contentToDisplay = <h1>Display Archived Content</h1>;
  }

  return (
    <div>
      <div className="flex d-flex gap-4">
        <input
          type="radio"
          value="All"
          checked={selectedOption === "All"}
          onChange={handleRadioChange}
        />
        <label>All</label>
        <input
          type="radio"
          value="Active"
          checked={selectedOption === "Active"}
          onChange={handleRadioChange}
        />
        <label>Active</label>
        <input
          type="radio"
          value="Archived"
          checked={selectedOption === "Archived"}
          onChange={handleRadioChange}
        />
        <label>Archived</label>
      </div>

      {contentToDisplay}
    </div>
  );
}
