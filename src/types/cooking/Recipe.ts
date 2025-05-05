import { Ingredient } from './Ingredient';
import { AlternativeRecipe } from './AlternativeRecipe';
import { Machine } from './Machine';

export type Recipe = {
    id: string;
    name: string;
    quantity: number;
    ingredients: Ingredient[];
    alternatives?: AlternativeRecipe[];
    machines: Machine[];
};