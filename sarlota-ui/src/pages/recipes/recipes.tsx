// Libs
import { Button, Empty } from "antd";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";
import { useState } from "react";

// Components
import { Spinner } from "../../components/spinner";

// Assets
import { FileTextOutlined } from "@ant-design/icons";

export const RecipesPage: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="recipes__header">
        <Title level={3} style={{ marginTop: 0 }}>
          Recepti
        </Title>

        <div className="contacts__header__actions">
          <Button
            type="primary"
            size="large"
            icon={<FileTextOutlined />}
            // onClick={onNewEmployeeClick}
          >
            Dodaj novi recept
          </Button>
          <Search
            className="contacts__header__actions__search"
            placeholder="Pretraži recepte"
            allowClear
            enterButton="Pretraga"
            size="large"
            // onSearch={onSearch}
          />
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="employees__content">
          {/* {employees.length > 0 ? (
            employees?.map((employee) => (
              <EmployeeCard
                employee={employee}
                onDetailsClick={onEmployeeDetailsClick}
                onDeleteClick={onEmployeeDelete}
                onEditClick={onEmployeeEdit}
              />
            ))
          ) : (
            <Empty
              description="Nisu pronađeni zaposleni"
              style={{ margin: "auto", marginTop: "20vh" }}
            />
          )} */}
        </div>
      )}
    </div>
  );
};
