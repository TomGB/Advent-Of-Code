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

  const allergensFound = new Set();

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
      }
    });
  });

  do {
    allAllergens.forEach((ingredientsSet, allergen) => {
      if (ingredientsSet.size === 1 && !allergensFound.has(allergen)) {
        allergensFound.add(allergen);

        const [confirmedIngredient] = ingredientsSet;

        console.log(`Allergen ${allergen} is definitely ${ingredientsSet}`);

        allAllergens.forEach((otherIngredientsSet, otherAllergen) => {
          if (otherAllergen !== allergen) {
            otherIngredientsSet.delete(confirmedIngredient);
          }
        });
      }
    });
  } while (allergensFound.size < allAllergens.size);

  console.log(allAllergens);

  allAllergens.forEach((ingredientsForAllergen) => {
    [...ingredientsForAllergen].map((ingredient) => {
      allIngredients = allIngredients.filter((x) => x != ingredient);
    });
  });

  const sortedAllAllergens = new Map(
    [...allAllergens.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  );

  console.log(sortedAllAllergens);
  const canonical = [...sortedAllAllergens].map(([, s]) => [...s][0]).join(",");
  console.log("canonical dangerous ingredient list:", canonical);
};

module.exports = partOne;
