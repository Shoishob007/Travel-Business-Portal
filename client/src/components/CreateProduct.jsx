import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      await axios.post(
        "https://hotel.aotrek.net/api/auth/create",
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
        text: "Product created successfully!",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
      setName("");
      setTitle("");
      setDescription("");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to create product.",
        icon: "error",
        confirmButtonColor: "#cf3737",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md dark:bg-gray-800"
      >
        <h2 className="mb-4 text-2xl font-bold text-center text-emerald-600 dark:text-emerald-400">
          Create Product
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <button
          type="submit"
          className="w-full p-3 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition dark:hover:bg-emerald-700"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
