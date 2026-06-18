import { useQuery } from "@tanstack/react-query";
import { Title, Card } from "@ui5/webcomponents-react";
import { BarChart } from "@ui5/webcomponents-react-charts";
import "@ui5/webcomponents-react-charts/styles.css";
import { fetchTransactions } from "../../api/transactions";

export default function Dashboard() {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const imports = transactions.filter((t) => t.type === "Import").length;
  const exports = transactions.filter((t) => t.type === "Export").length;

  return (
    <Card header={<Title level="H3">Dashboard</Title>} style={{ padding: "1rem" }}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Total Transactions: {transactions.length}</p>
          <p>Imports: {imports}, Exports: {exports}</p>
          <BarChart
            dataset={[
              { name: "Import", value: imports },
              { name: "Export", value: exports },
            ]}
            dimensions={[{ accessor: "name" }]}
            measures={[{ accessor: "value", label: "Transactions" }]}
          />
        </>
      )}
    </Card>
  );
}
