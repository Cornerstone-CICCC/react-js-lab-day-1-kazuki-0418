import { useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import UserList, { type User } from "./components/UserList";

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [editingUser, setEditingUser] = useState<User | null>(null);

	const handleEdit = (id: number) => {
		const userToEdit = users.find((user) => user.id === id);
		if (userToEdit) {
			setEditingUser(userToEdit);
		}
	};

	return (
		<>
			<UserForm users={users} setUsers={setUsers} editingUser={editingUser} />
			<UserList users={users} setUsers={setUsers} onEdit={handleEdit} />
		</>
	);
}

export default App;
