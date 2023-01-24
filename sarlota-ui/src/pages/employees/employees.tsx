// Libs
import { useCallback, useEffect, useState } from "react";
import { Button, Typography } from "antd";
import Search from "antd/es/input/Search";

// Components
import { EmployeeCard } from "../../components/employee";
import { EmployeeDetails } from "../../features/employee-details";
import { EmployeeModal } from "../../features/employee-modal";

// Assets
import { UserAddOutlined } from "@ant-design/icons";

import "./employees.scss";
import { Employee } from "../../api/services/employee.service";
import { api } from "../../api";
import { Spinner } from "../../components/spinner";

const { Title } = Typography;

export const EmployeesPage: React.FunctionComponent = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    const response = await api.zaposleni.fetchEmployees();
    const data = await response.json();
    setEmployees(data);
    setLoading(false);
  }, []);

  const onSearch = (value: string) => console.log(value);

  const onNewEmployeeClick = () => {
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
    setRefresh((is) => !is);
  };

  const onEmployeeDelete = () => {};

  const onEmployeeEdit = () => {};

  const onEmployeeDetailsClick = () => {
    setShowDetails(true);
  };

  const onEmployeeDetailsClose = () => {
    setShowDetails(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees, refresh]);

  return (
    <div className="employees">
      <EmployeeDetails open={showDetails} onClose={onEmployeeDetailsClose} />

      <EmployeeModal
        title="Dodajte novog zaposlenog"
        isModalOpen={showModal}
        onModalClose={onModalClose}
      />

      <div className="contacts__header">
        <Title level={3} style={{ marginTop: 0 }}>
          Zaposleni
        </Title>

        <div className="contacts__header__actions">
          <Button
            type="primary"
            size="large"
            icon={<UserAddOutlined />}
            onClick={onNewEmployeeClick}
          >
            Dodaj zaposlenog
          </Button>
          <Search
            className="contacts__header__actions__search"
            placeholder="Pretraži zaposlene"
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
        <div className="employees__content">
          {employees?.map((employee) => (
            <EmployeeCard
              employee={employee}
              onDetailsClick={onEmployeeDetailsClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
