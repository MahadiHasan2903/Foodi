"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Camera } from "lucide-react";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import api from "@/lib/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const AddFoodItem = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAddItem = async () => {
    if (!image || !name || !description || !originalPrice || !category) {
      setLoading(false);
      toast.error("Please fill in all the required fields");
      return;
    }
    setLoading(true);

    const foodItemData = {
      image,
      name,
      description,
      originalPrice,
      category,
    };

    try {
      const response = await api.foodItems.createfoodItem(
        accessToken,
        foodItemData
      );
      console.log(response);
      if (!response.newFoodItem) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
      }
      setImage(null);
      setName("");
      setDescription("");
      setOriginalPrice("");
      setCategory("");
    } catch (error) {
      console.error("Error adding food item:", error);
      toast.error("Failed to add food item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-around w-[90%] md:w-[60%] lg:w-[40%] m-5 border px-5 py-10 bg-[#d7d7d7] dark:bg-[#1d232a]">
      <div className="relative flex flex-col items-center justify-center w-full my-5 lg:mx-5">
        <label
          htmlFor="file-input"
          className="w-32 h-32 overflow-hidden rounded-full"
        >
          <Input
            type="file"
            name="avatar"
            id="file-input"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileInputChange}
            className="hidden"
          />
          {image ? (
            <Image
              width={500}
              height={500}
              src={image}
              alt="Secondary Image"
              className="object-cover w-full h-full bg-gray-300"
            />
          ) : (
            <Image
              src="/foodLogo.png"
              alt="developer"
              width={500}
              height={500}
              className="object-cover bg-gray-300"
            />
          )}
          <div className="absolute rounded-full cursor-pointer right-[33%] bottom-5">
            <label htmlFor="file-input">
              <Camera size={20} className="cursor-pointer text-primary" />
            </label>
          </div>
        </label>
      </div>

      <div className="w-[80%]">
        <Input
          type="text"
          id="name"
          placeholder="Name"
          className="my-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-[80%]">
        <Textarea
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="w-[80%]">
        <Input
          type="text"
          id="originalPrice"
          placeholder="Price"
          className="my-2"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />
      </div>

      <div className="w-[80%]">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full p-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-black bg-white border rounded-md  dark:text-[#96969e] dark:bg-[#0c0a09] my-2"
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Main Dish">Main Dish</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Dessert">Dessert</option>
          <option value="Drinks">Drinks</option>
        </select>
      </div>

      <div className="w-[80%]">
        <Button
          className="mt-8 gap-x-2"
          type="submit"
          onClick={handleAddItem}
          disabled={loading}
        >
          {loading ? <HashLoader size={35} /> : <>Add</>}
        </Button>
      </div>
    </div>
  );
};

export default AddFoodItem;
