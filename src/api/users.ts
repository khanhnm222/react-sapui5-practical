import usersData from '../dummy/users.json';

let users = [...usersData];

type User = {
  id: number;
  username: string;
  email: string;
};

export const fetchUsers = async () => {
  return new Promise<User[]>((resolve) => {
    setTimeout(() => resolve(users as User[]), 300);
  });
};

export const addUser = async (user: { username: string; email: string }) => {
  return new Promise((resolve) => {
    const newUser = { id: users.length + 1, ...user };
    users.push(newUser);
    setTimeout(() => resolve(newUser), 300);
  });
};

export const deleteUser = async (id: number) => {
  return new Promise((resolve) => {
    users = users.filter((u) => u.id !== id);
    setTimeout(() => resolve(true), 300);
  });
};
