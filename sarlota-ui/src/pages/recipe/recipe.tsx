// Libs
import { useCallback, useEffect, useState } from "react";
import { Button, Result, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

// Assets
import {
  HeartOutlined,
  HeartFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";

// Rest
import { api } from "../../api";
import { Recipe } from "../../api/services/recipes.service";

import "./recipe.scss";

const placeholderImage = "https://bit.ly/3YanMLO";
const { Title } = Typography;

export const RecipePage: React.FunctionComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [favorite, setFavorite] = useState(recipe?.omiljeni);

  const [error, setError] = useState(false);

  const fetchRecipe = useCallback(async () => {
    if (id) {
      const response = await api.recepti.fetchRecipe(+id);
      if (response.status === 200) {
        const data: Recipe = await response.json();
        setRecipe(data);
        setFavorite(data.omiljeni);
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [id]);

  const onBack = () => {
    setError(false);
    navigate(-1);
  };

  const onToggleFavorite = async () => {
    if (recipe) await api.recepti.toggleFavorite(recipe.id);
    setFavorite((is) => !is);
  };

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  return (
    <div className="recipe-container">
      <Button
        type="link"
        className="back-button"
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
      />

      {error && (
        <Result
          status="404"
          title="404"
          subTitle="Recept nije pronađen."
          extra={
            <Button type="primary" onClick={onBack}>
              Nazad
            </Button>
          }
        />
      )}

      {recipe && (
        <div className="recipe-view">
          <div
            style={{
              backgroundImage: `url(${recipe.fotografija ?? placeholderImage})`,
            }}
            className="recipe-view__img"
          />

          <div className="recipe-view__heading">
            <Title style={{ color: "#030852" }}>{recipe.naslov}</Title>
            <Button
              type="ghost"
              shape="circle"
              size="large"
              icon={
                favorite ? (
                  <HeartFilled style={{ color: "red" }} />
                ) : (
                  <HeartOutlined style={{ color: "red" }} />
                )
              }
              className={"recipe__favorite"}
              onClick={onToggleFavorite}
            />
          </div>

          <div className="recipe-view__description">
            <div className="recipe-view__description__ingredients">
              <Title level={4}>Sastojci</Title>
              {recipe.sastojci}
            </div>
            <div className="recipe-view__description__method">
              <Title level={4}>Način pripreme</Title>
              {recipe.priprema}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
