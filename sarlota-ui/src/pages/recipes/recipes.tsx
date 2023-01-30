// Libs
import { useState } from "react";
import { Button, Empty } from "antd";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";

// Components
import { Spinner } from "../../components/spinner";
import { RecipeCard } from "../../components/recipe";
import { RecipeDrawer } from "../../features/recipe-drawer";

// Assets
import { FileTextOutlined } from "@ant-design/icons";

import "./recipes.scss";
import { api } from "../../api";

export const RecipesPage: React.FunctionComponent = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showNewRecipeDrawer, setShowNewRecipeDrawer] = useState(false);
  const [showEditRecipeDrawer, setShowEditRecipeDrawer] = useState(false);

  const fetchRecipes = async () => {
    setLoading(true);
    const response = await api.recepti.fetchRecipes();
    const data = await response.json();
    setRecipes(data);
    setLoading(false);
  };

  const onNewRecipeClick = () => {
    setShowNewRecipeDrawer(true);
  };

  const onDrawerClose = () => {
    setShowNewRecipeDrawer(false);
  };

  const onSearch = async (value: string) => {
    if (value === "") {
      fetchRecipes();
    } else {
      const response = await api.recepti.searchRecipes(value);
      const data = await response.json();
      setRecipes(data);
    }
  };

  return (
    <div className="recipes">
      <RecipeDrawer open={showNewRecipeDrawer} onClose={onDrawerClose} />

      <div className="recipes__header">
        <Title level={3} style={{ marginTop: 0 }}>
          Recepti
        </Title>

        <div className="recipes__header__actions">
          <Button
            type="primary"
            size="large"
            icon={<FileTextOutlined />}
            onClick={onNewRecipeClick}
          >
            Dodaj novi recept
          </Button>
          <Search
            className="recipes__header__actions__search"
            placeholder="Pretraži recepte"
            allowClear
            enterButton="Pretraga"
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="recipes__content">
          {recipes?.length > 0 ? (
            recipes?.map((recipe) => <RecipeCard />)
          ) : (
            <Empty
              description="Nisu pronađeni recepti"
              style={{ margin: "auto", marginTop: "20vh" }}
            />
          )}
        </div>
      )}
    </div>
  );
};
