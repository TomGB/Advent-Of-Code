const splitIntoIngredientsAndAllergens = (line) => {
  const [ingredientsPart, allergensPart] = line
    .replace(")", "")
    .split(" (contains ");
  const ingredients = ingredientsPart.split(" ");
  const allergens = allergensPart.split(", ");
  return { ingredients, allergens };
};

const partOne = (input) => {
  const lines = input.split("\n").filter((x) => x);

  const ingredientsAndAllergens = lines.map(splitIntoIngredientsAndAllergens);

  console.log(ingredientsAndAllergens);

  const allAllergens = new Map();
  let allIngredients = [];

  ingredientsAndAllergens.map(({ ingredients, allergens }) => {
    allIngredients.push(...ingredients);

    allergens.map((allergen) => {
      if (!allAllergens.has(allergen)) {
        allAllergens.set(allergen, new Set(ingredients));
      } else {
        const interseciton = [...allAllergens.get(allergen)].filter((v) =>
          new Set(ingredients).has(v)
        );
        allAllergens.set(allergen, new Set(interseciton));

        if (interseciton.length === 1) {
          console.log(`Allergen ${allergen} is definitely ${interseciton[0]}`);
          for (const [otherAllergen, otherAllergenSet] of allAllergens) {
            if (otherAllergen !== allergen) {
              otherAllergenSet.delete(interseciton[0]);
            }
          }
        }
      }
    });
  });

  console.log(allAllergens);

  allAllergens.forEach((ingredientsForAllergen) => {
    [...ingredientsForAllergen].map((ingredient) => {
      allIngredients = allIngredients.filter((x) => x != ingredient);
    });
  });

  const result = allIngredients.length;

  console.log(allIngredients.length);

  return allIngredients.length;
};

module.exports = partOne;
