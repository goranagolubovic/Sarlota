import { Button, Card, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  BookOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import confirm from "antd/es/modal/confirm";

import { Recipe } from "../../api/services/recipes.service";

import "./recipe.scss";
import { useState } from "react";

const defaultImg =
  "https://foodhub.scene7.com/is/image/woolworthsltdprod/2209-easy-choc-crunch-cake:Mobile-1300x1150";

interface RecipeCardProps {
  recipe: Recipe;
  onDetailsClick: (recipe: Recipe) => void;
  onDeleteClick: (id: number) => void;
  onEditClick: (recipe: Recipe) => void;
  onToggleFavoriteClick: (id: number) => void;
}

export const RecipeCard: React.FunctionComponent<RecipeCardProps> = ({
  recipe,
  onDeleteClick,
  onDetailsClick,
  onEditClick,
  onToggleFavoriteClick,
}) => {
  const [favorite, setFavorite] = useState(false);

  const onDetails = () => {
    onDetailsClick(recipe);
  };

  const onEdit = () => {
    onEditClick(recipe);
  };

  const onDelete = () => {
    confirm({
      title: "Da li ste sigurni da želite da obrišete recept?",
      icon: <ExclamationCircleFilled />,
      content: "Ovu akciju ne možete opozvati.",
      onOk() {
        onDeleteClick(recipe.id);
      },
      cancelText: "Poništi",
    });
  };

  const onToggleFavorites = () => {
    setFavorite((is) => !is);
    onToggleFavoriteClick(recipe.id);
  };

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src={recipe.fotografija ?? defaultImg}
          height={200}
        />
      }
      actions={[
        <Tooltip title="Recept" placement="bottom">
          <BookOutlined key="details" onClick={onDetails} />
        </Tooltip>,
        <Tooltip title="Izmjena" placement="bottom">
          <EditOutlined key="edit" onClick={onEdit} />
        </Tooltip>,
        <Tooltip title="Brisanje" placement="bottom">
          <DeleteOutlined key="brisanje" onClick={onDelete} />
        </Tooltip>,
      ]}
    >
      <div className="recipe">
        <Meta title={recipe.naslov} className={"recipe__title"} />
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
          onClick={onToggleFavorites}
        />
      </div>
    </Card>
  );
};
