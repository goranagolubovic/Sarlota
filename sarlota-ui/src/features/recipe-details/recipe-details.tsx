import { Recipe } from "../../api/services/recipes.service";

interface RecipeDetailsProps {
  recipe: Recipe;
}

export const RecipeDetails: React.FunctionComponent<RecipeDetailsProps> = ({
  recipe,
}) => {
  return <div>recipe-details</div>;
};
