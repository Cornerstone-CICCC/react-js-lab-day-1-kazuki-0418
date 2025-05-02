import { useState } from "react";
import "./UserList.css"; // Assuming you'll create this CSS file
import UserDetails from "../UserProfile";

export type User = {
	id: number;
	fullname: string;
	age: number;
	gender: string;
	education: string;
	skills: string[];
	bio: string;
};

type UserListProps = {
	users: User[];
	setUsers: (users: User[]) => void;
	onEdit: (id: number) => void;
};

const UserList = ({ users, setUsers, onEdit }: UserListProps) => {
	// State to track which user is being viewed (null when no user is selected)
	const [viewingUser, setViewingUser] = useState<User | null>(null);

	const onDelete = (id: number) => {
		const updatedUsers = users.filter((user) => user.id !== id);
		setUsers(updatedUsers);
	};

	const handleDelete =
		onDelete || ((id) => console.log(`Delete user with ID: ${id}`));

	// Handler for View button click
	const handleView = (userId: number) => {
		if (!userId) {
			console.error("User ID is required to view user details.");
			return;
		}

		const userToView = users.find((user) => user.id === userId);

		if (!userToView) {
			console.error(`User with ID ${userId} not found.`);
			return;
		}
		setViewingUser(userToView);
	};

	// Handler to close the UserDetails component
	const handleCloseDetails = () => {
		setViewingUser(null);
	};

	return (
		<div className="user-list-container">
			<h2>User List</h2>

			{users && users.length > 0 ? (
				<table className="user-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Full Name</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.fullname}</td>
								<td className="action-buttons">
									<button
										type="button"
										className="view-btn"
										onClick={() => handleView(user.id)}
									>
										View
									</button>
									<button
										type="button"
										className="edit-btn"
										onClick={() => onEdit(user.id)}
									>
										Edit
									</button>
									<button
										type="button"
										className="delete-btn"
										onClick={() => handleDelete(user.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className="no-users-message">No users found.</p>
			)}

			{/* Render the UserDetails component when a user is being viewed */}
			{viewingUser && (
				<UserDetails user={viewingUser} onClose={handleCloseDetails} />
			)}
		</div>
	);
};

export default UserList;
