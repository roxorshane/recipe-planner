import { parseFormula } from './parseFormula.js';

describe("parseFormula", () => {
  it("returns recipeComponents for each match", () => {
    const recipeComponents = 
        parseFormula(
          "2 * egg + 150g * flour + 100ml * milk + 10g * baking soda"
        );

    expect(recipeComponents).toStrictEqual([
      {
        quantity: 2,
        unitOfMeasurement: undefined,
        name: "egg"
      },
      {
        quantity: 150,
        unitOfMeasurement: "g",
        name: "flour"
      },
      {
        quantity: 100,
        unitOfMeasurement: "ml",
        name: "milk"
      },
      {
        quantity: 10,
        unitOfMeasurement: "g",
        name: "baking soda"
      }
    ]);
  });

  it("ignores components that don't match", () => {
    // Missing * operator
    expect(parseFormula("2 eggs")).toStrictEqual([]);

    // Missing quantity
    expect(parseFormula("flour + egg")).toStrictEqual([]);
  });
});