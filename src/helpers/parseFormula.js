/**
 * @param {string} recipeFormula The formula to be parsed, e.g. "150 * flour + 3 egg + 10g baking powder".
 * @returns Array of Objects containing the ingredient name, quantity and unit of measurement.
 */
const parseFormula = (recipeFormula) => {
  const regexPattern = 
      '(\\d+)' +      // one or more digits (quantity)
      '(g|ml)?' +     // optional unit of measurement
      '\\s+\\*\\s+' + // multiple operator surrounded by whitespace
      '([\\w\\s]+)'   // ingredient name
  const regexMatcher = new RegExp(regexPattern, 'gi'); // example match: 200g * flour + 10g * baking pwder + 3 * egg.
  const ingredientMatches = [...recipeFormula.matchAll(regexMatcher)];
  const parsedIngredients = ingredientMatches.reduce((parsedIngredients, match) => {
    return [
      ...parsedIngredients,
      {
        quantity: Number(match[1]),
        unitOfMeasurement: match[2],
        name: match[3].trim()
      }
    ];
  }, []);
  return parsedIngredients;
};

export {
  parseFormula
};