"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { discountedPrice } from "@/lib/discountedPrice";

const Store = () => {
  const [coins, setcoins] = useState(0);
  const { toast } = useToast();
  const { data: session } = useSession();
  const id = session?.user._id; // Get session data to access user information
  const ToastCoins = async () => {
    console.log("Toast");
    console.log(id);

    if (!id) {
      toast({
        title: "Unauthorized",
        description: `Login first`,
        variant: "destructive",
        action: <Link href={"/sign-in"}>Log In</Link>,
      });
    }
    if (id) {
      const response = await axios
        .post("/api/fetchCoins", { _id: id })
        .then((res) => {
          console.log(res.data?.Coins);
          setcoins(res.data?.Coins);
          toast({
            title: "Success",
            description: `You have ${res.data?.Coins} Coins currently`,
          });
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Failed to fetch Coins",
            description: `Try again`,
            variant: "destructive",
          });
        });
    }
  };
  const [mode, setMode] = useState<string | null>(null);
  const [products, setProducts] = useState<Record<string, any[]> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get Mode from localStorage
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem("Mode") : null;
    setMode(storedMode);

    // FetchCoins
    ToastCoins();
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/store/fetchProducts"); // Adjust API route if needed
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const handleAddToCart = async (productId: string) => {
    if (!session || !session.user) {
      toast({
        title: "Error",
        description: "User is not logged in.",
        variant: "destructive",
      });
      return;
    }

    const userName = session.user.username; // Assuming session contains the user's name

    try {
      const response = await axios.post("/api/store/addToCart", {
        productId,
        UserName: userName,
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Product added to cart!",
          action: <Link href={"/Store/Cart"}>Go to Cart</Link>,
        });
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <p className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading products...
      </p>
    );
  }

  if (!products) {
    return (
      <p className="flex items-center justify-center h-screen text-lg font-semibold">
        No products available.
      </p>
    );
  }

  return (
    <div className="p-3 mb-28">
      {/* <h1 className="text-3xl font-bold text-center p-3">
        {mode === "Child Mode" ? "Child Mode Store" : "Parent Mode Store"}
      </h1> */}
      {Object.entries(products).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-lg font-bold mt-4">{category}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg shadow space-y-3"
              >
                <Image
                  alt={product.Name}
                  src={`/ProductImages/${product._id}.png`}
                  width={200}
                  height={200}
                  className="mx-auto p-3"
                />
                <div>
                  <h3 className="font-semibold">{product.Name}</h3>
                  <p>{product.Description}</p>
                  <div className="flex justify-between w-full">
                    {coins ? (
                      <div className="flex border-black w-full justify-around my-auto">
                        <p className="text-black font-bold line-through">
                          &#8377;{product.Price * 10}
                        </p>
                        <p className="text-green-600 font-bold ">
                          &#8377;
                          {discountedPrice(product.Price,coins)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-green-600 font-bold">
                        &#8377;{product.Price * 10}
                      </p>
                    )}
                    <Button
                      className="bg-red-500 text-white"
                      variant={"outline"}
                      onClick={() => handleAddToCart(product._id)}
                    >
                      🛒 Add to Cart 🛒
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Store;
