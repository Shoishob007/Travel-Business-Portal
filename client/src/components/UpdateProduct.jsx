/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const fetchProduct = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get(
        `https://hotel.aotrek.net/api/auth/manage`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const product = response.data.categories.find(
        (p) => p.id === parseInt(id)
      );

      if (product) {
        setName(product.name);
        setTitle(product.title);
        setDescription(product.description);
      } else {
        console.error(`Product with ID ${id} not found in the response.`);
        Swal.fire("Error!", "Product not found.", "error");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      Swal.fire("Error!", "Failed to fetch product.", "error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      await axios.put(
        `https://hotel.aotrek.net/api/auth/update/${id}`,
        {
          name,
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Product updated successfully!",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
      navigate("/manage");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update product.",
        icon: "error",
        confirmButtonColor: "#cf3737",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="mb-4 text-2xl font-bold text-center text-emerald-600">
          Update Product
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
