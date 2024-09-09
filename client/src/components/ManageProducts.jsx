import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get(
        "https://hotel.aotrek.net/api/auth/manage",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.categories);
    } catch (error) {
      console.error("Error fetching products:", error);
      Swal.fire("Error!", "Failed to fetch products.", "error");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#cf3737",
      cancelButtonColor: "#10b981",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`https://hotel.aotrek.net/api/auth/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success",
          confirmButtonColor: "#10b981",
        });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete product.",
          icon: "error",
          confirmButtonColor: "#cf3737",
        });
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-800">
      <h2 className="mb-4 text-2xl font-bold text-center dark:text-white">
        Manage Products
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md dark:bg-gray-700">
          <thead>
            <tr className="bg-emerald-500 text-white rounded-t-lg dark:bg-gray-800">
              <th className="border px-4 py-3">ID</th>
              <th className="border px-4 py-3">Name</th>
              <th className="border px-4 py-3">Title</th>
              <th className="border px-4 py-3">Description</th>
              <th className="border px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-100 dark:text-gray-200 transition dark:hover:bg-gray-600"
              >
                <td className="border px-4 py-3">{product.id}</td>
                <td className="border px-4 py-3">{product.name}</td>
                <td className="border px-4 py-3">{product.title}</td>
                <td className="border px-4 py-3">{product.description}</td>
                <td className="border px-4 py-3 flex justify-center items-center">
                  <button
                    onClick={() => navigate(`/update/${product.id}`)}
                    className="mr-2 text-emerald-500 hover:underline dark:text-emerald-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:underline dark:text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
