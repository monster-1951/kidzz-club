import { Recipies } from "@/constants/Recipies";
import Image from "next/image";
import React from "react";

const Recipes = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Recipies.map((recipe, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              className="h-48 w-fit mx-auto"
              width={1000}
              height={1000}
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold">{recipe.title}</h2>
            <div className="sm:flex justify-between space-x-4 md:block w-fit mx-auto">
            <div>
                <h3 className="text-lg mt-2 font-semibold">Ingredients:</h3>
                <ul className="list-disc list-inside text-sm">
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mt-2">Steps:</h3>
                <ol className="list-decimal list-inside text-sm">
                  {recipe.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
