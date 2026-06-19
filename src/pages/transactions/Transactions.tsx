import { useState } from "react";
import {
  Card,
  Title,
  Table,
  TableHeaderRow,
  TableHeaderCell,
  TableRow,
  TableCell,
  Input,
  Button,
  Dialog,
  Label
} from "@ui5/webcomponents-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addTransaction, deleteTransaction, fetchTransactions } from "../../api/transactions";

export default function TransactionsPage() {
  const qc = useQueryClient();
  const { data: txs = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newTx, setNewTx] = useState({ name: "", type: "", createdBy: "", createdAt: "", description: "" });

  const addMut = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      setOpen(false);
      setNewTx({ name: "", type: "", createdBy: "", createdAt: "", description: "" });
    },
  });

  const delMut = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["transactions"] }),
  });

  const filtered = txs.filter((t: any) =>
    [t.name, t.createdBy, t.description].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div style={{ padding: 16 }}>Loading transactions...</div>;

  return (
    <Card header={<Title>Transactions</Title>}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
        <Input
          placeholder="Search transactions..."
          style={{ width: "40%" }}
          value={search}
          onInput={(e: any) => setSearch(e.target.value)}
        />
        <Button design="Emphasized" icon="add" onClick={() => setOpen(true)}>
          Add Transaction
        </Button>
      </div>

      <Table noDataText="No transactions">
        <TableHeaderRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Created By</TableHeaderCell>
          <TableHeaderCell>Created At</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableHeaderRow>

        {filtered.map((t: any) => (
          <TableRow key={t.id}>
            <TableCell>{t.id}</TableCell>
            <TableCell>{t.name}</TableCell>
            <TableCell>{t.createdBy}</TableCell>
            <TableCell>{t.createdAt}</TableCell>
            <TableCell>{t.description}</TableCell>
            <TableCell>
              <Button design="Negative" icon="delete" onClick={() => delMut.mutate(t.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>

      <Dialog open={open} headerText="Add new transaction" onClose={() => setOpen(false)}>
        <div style={{ padding: 16, display: "grid", gap: 12, minWidth: 420 }}>
          <Label>Name</Label>
          <Input value={newTx.name} onInput={(e: any) => setNewTx({ ...newTx, name: e.target.value })} />
          <Label>Type</Label>
          <Input value={newTx.type} onInput={(e: any) => setNewTx({ ...newTx, type: e.target.value })} />
          <Label>Created By</Label>
          <Input value={newTx.createdBy} onInput={(e: any) => setNewTx({ ...newTx, createdBy: e.target.value })} />
          <Label>Created At</Label>
          <Input type="Text" value={newTx.createdAt} onInput={(e: any) => setNewTx({ ...newTx, createdAt: e.target.value })} />
          <Label>Description</Label>
          <Input value={newTx.description} onInput={(e: any) => setNewTx({ ...newTx, description: e.target.value })} />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              design="Emphasized"
              onClick={() => {
                if (!newTx.name) return;
                addMut.mutate(newTx);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    </Card>
  );
}
