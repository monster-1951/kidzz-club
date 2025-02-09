"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Product {
  _id: string;
  Name: string;
  Price: number;
  Image?: string;
  Description?: string;
  Category: string;
  status: "available" | "sold";
  ratings: number;
}

export default function CartDisplay() {
  const { toast } = useToast();
  const [mode, setMode] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("Mode");
      setMode(storedMode);
    }
    console.log(mode)
    if (status === "loading") return; // Wait until session is loaded
    if (!session?.user?.username) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const UserName = session.user.username;
    console.log("Logged-in User:", UserName);

    const fetchCart = async () => {
      try {
        const response = await axios.post("/api/store/fetchCart", { UserName });
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setError(response.data.message || "Failed to fetch cart items");
        }
      } catch (err) {
        console.log(err);
        setError("Error fetching cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [session, status]); // Dependency updated to ensure it runs after session loads

  // 🔥 Remove item from cart function
  const removeFromCart = async (productId: string) => {
    if (!session?.user?.username) {
      setError("User not authenticated");
      return;
    }

    const UserName = session.user.username;

    try {
      const response = await axios.post("/api/store/removeFromCart", {
        UserName,
        productId,
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Removed from cart Successfully",
        });
        // Remove product from state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } else {
        toast({
          title: "Failure",
          description: response.data.message,
          variant: "destructive",
        });
        // setError(response.data.message || "Failed to remove item from cart");
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Failure",
        description: "Error in removing the item",
        variant: "destructive",
      });
    }
  };

  if (loading) return <p className="text-center text-lg">Loading cart...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (products.length === 0)
    return <p className="text-center">No items in cart.</p>;

  return (
    <>
      <h1 className="text-3xl font-bold text-center p-3">🛒 Cart 🛒</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mb-28">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-md">
            <Image
              src={`/ProductImages/${product._id}.png`}
              alt={product.Name}
              width={200}
              height={200}
              className="mx-auto p-3 rounded-md h-40"
            />
            <h2 className="text-lg font-bold mt-2">{product.Name}</h2>
            <p className="text-gray-700">{product.Description}</p>
            <p className="text-blue-600 font-semibold">₹{product.Price}</p>
            <p className="text-sm text-gray-500">
              Category: {product.Category}
            </p>
            <p
              className={`text-sm ${
                product.status === "sold" ? "text-red-500" : "text-green-500"
              }`}
            >
              {product.status === "sold" ? "Sold Out" : "Available"}
            </p>
            <p className="w-full flex flex-col py-3 space-y-2">
              {/* Remove from Cart Button */}
              {mode == "Parent Mode" && (
                <Button className="w-[30vh] mx-auto">Buy Now</Button>
              )}
              <Button
                className="w-[30vh] mx-auto"
                onClick={() => removeFromCart(product._id)}
              >
                Remove from cart
              </Button>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
