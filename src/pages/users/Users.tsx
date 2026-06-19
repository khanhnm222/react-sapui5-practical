import React, { useState } from "react";
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
import { addUser, deleteUser, fetchUsers } from "../../api/users";

export default function UsersPage() {
  const qc = useQueryClient();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", email: "" });

  const addMut = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
      setNewUser({ username: "", email: "" });
    },
  });

  const delMut = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });

  const filtered = users.filter((u: any) =>
    [u.username, u.email].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div style={{ padding: 16 }}>Loading users...</div>;

  return (
    <Card header={<Title>Users</Title>}>
      {/* toolbar: search (left) + add (right) */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
        <Input
          placeholder="Search users..."
          style={{ width: "40%" }}
          value={search}
          onInput={(e: any) => setSearch(e.target.value)}
        />
        <Button design="Emphasized" icon="add" onClick={() => setOpen(true)}>
          Add User
        </Button>
      </div>

      <Table noDataText="No users">
        <TableHeaderRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Username</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableHeaderRow>

        {filtered.map((u: any) => (
          <TableRow key={u.id}>
            <TableCell>{u.id}</TableCell>
            <TableCell>{u.username}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>
              <Button design="Negative" icon="delete" onClick={() => delMut.mutate(u.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>

      {/* Add dialog */}
      <Dialog open={open} headerText="Add new user" onClose={() => setOpen(false)}>
        <div style={{ padding: 16, display: "grid", gap: 12, minWidth: 360 }}>
          <Label>Username</Label>
          <Input value={newUser.username} onInput={(e: any) => setNewUser({ ...newUser, username: e.target.value })} />
          <Label>Email</Label>
          <Input value={newUser.email} onInput={(e: any) => setNewUser({ ...newUser, email: e.target.value })} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              design="Emphasized"
              onClick={() => {
                if (!newUser.username || !newUser.email) return;
                addMut.mutate(newUser);
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
