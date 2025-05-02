import { type FormEvent, useState } from "react";
import "./UserForm.css";
import type { User } from "../UserList";

type UserFormProps = {
	users: User[];
	setUsers: (users: User[]) => void;
	editingUser?: User | null;
};

const UserForm = ({ users, setUsers, editingUser = null }: UserFormProps) => {
	// State for form fields
	const [formData, setFormData] = useState({
		fullname: "",
		age: 0,
		education: "high school", // Default value
		gender: "",
		skills: {
			typescript: false,
			react: false,
			node: false,
			nosql: false,
		},
		bio: "",
	});

	// Handle input changes
	const handleChange = (e: {
		target: {
			name: string;
			value: string;
			type: string;
			checked?: boolean;
		};
	}) => {
		const { name, value, type, checked } = e.target;

		if (type === "checkbox") {
			setFormData({
				...formData,
				skills: {
					...formData.skills,
					[name]: checked,
				},
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	// Handle form submission
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (editingUser) {
			// Update existing user
			setUsers(
				users.map((user) =>
					user.id === editingUser.id
						? {
								...formData,
								id: user.id,
								skills: Object.entries(formData.skills).map(([skill]) => skill),
							}
						: user,
				),
			);
			return;
		}

		const newUser = {
			id: new Date().getTime(),
			...formData,
			skills: Object.entries(formData.skills)
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.filter(([_, isSelected]) => isSelected)
				.map(([skill]) => skill),
		};
		console.log(newUser);

		const updatedUsers = [...users, newUser];
		setUsers(updatedUsers);
	};

	// Handle form reset
	const handleReset = () => {
		setFormData({
			fullname: "",
			age: 0,
			education: "high school",
			gender: "",
			skills: {
				typescript: false,
				react: false,
				node: false,
				nosql: false,
			},
			bio: "",
		});
	};

	return (
		<div className="user-form-container">
			<h2>User Information</h2>

			<form onSubmit={handleSubmit} className="user-form">
				{/* Full Name Field */}
				<div className="form-group">
					<label htmlFor="fullname">Full Name:</label>
					<input
						type="text"
						id="fullname"
						name="fullname"
						value={formData.fullname}
						onChange={handleChange}
						required
					/>
				</div>

				{/* Age Field */}
				<div className="form-group">
					<label htmlFor="age">Age:</label>
					<input
						type="number"
						id="age"
						name="age"
						value={formData.age}
						onChange={handleChange}
						required
					/>
				</div>

				{/* Education Field */}
				<div className="form-group">
					<label htmlFor="education">Education:</label>
					<select
						id="education"
						name="education"
						value={formData.education}
						onChange={handleChange}
					>
						<option value="grade school">Grade school</option>
						<option value="high school">High school</option>
						<option value="college">College</option>
					</select>
				</div>

				{/* Gender Field */}
				<div className="form-group">
					<label htmlFor="gender">Gender:</label>
					<div className="radio-group">
						<label>
							<input
								type="radio"
								name="gender"
								value="male"
								checked={formData.gender === "male"}
								onChange={handleChange}
							/>
							Male
						</label>
						<label>
							<input
								type="radio"
								name="gender"
								value="female"
								checked={formData.gender === "female"}
								onChange={handleChange}
							/>
							Female
						</label>
						<label>
							<input
								type="radio"
								name="gender"
								value="other"
								checked={formData.gender === "other"}
								onChange={handleChange}
							/>
							Other
						</label>
					</div>
				</div>

				{/* Skills Field */}
				<div className="form-group">
					<label htmlFor="skills">Skills:</label>
					<div className="checkbox-group">
						<label>
							<input
								type="checkbox"
								name="typescript"
								checked={formData.skills.typescript}
								onChange={handleChange}
							/>
							TypeScript
						</label>
						<label>
							<input
								type="checkbox"
								name="react"
								checked={formData.skills.react}
								onChange={handleChange}
							/>
							React
						</label>
						<label>
							<input
								type="checkbox"
								name="node"
								checked={formData.skills.node}
								onChange={handleChange}
							/>
							Node
						</label>
						<label>
							<input
								type="checkbox"
								name="nosql"
								checked={formData.skills.nosql}
								onChange={handleChange}
							/>
							NoSQL
						</label>
					</div>
				</div>

				{/* Bio Field */}
				<div className="form-group">
					<label htmlFor="bio">Bio:</label>
					<textarea
						id="bio"
						name="bio"
						value={formData.bio}
						onChange={handleChange}
						rows={4}
					/>
				</div>

				{/* Form Buttons */}
				<div className="form-buttons">
					<button type="submit" className="submit-btn">
						Submit
					</button>
					<button type="button" className="reset-btn" onClick={handleReset}>
						Reset
					</button>
				</div>
			</form>
		</div>
	);
};

export default UserForm;
