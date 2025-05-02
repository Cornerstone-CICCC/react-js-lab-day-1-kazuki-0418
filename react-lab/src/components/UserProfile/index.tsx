import "./UserProfile.css";
import type { User } from "../UserList";

type UserDetailsProps = {
	user: User | null;
	onClose: () => void;
};

const UserDetails = ({ user, onClose }: UserDetailsProps) => {
	// Early return if no user is passed
	if (!user) return null;

	// Convert skills object to an array of selected skills

	return (
		<div className="user-details-overlay">
			<div className="user-details-container">
				<div className="user-details-header">
					<h2>User Details</h2>
					<button type="button" className="close-btn" onClick={onClose}>
						×
					</button>
				</div>

				<div className="user-details-content">
					<div className="detail-row">
						<span className="detail-label">ID:</span>
						<span className="detail-value">{user.id}</span>
					</div>

					<div className="detail-row">
						<span className="detail-label">Full Name:</span>
						<span className="detail-value">{user.fullname}</span>
					</div>

					<div className="detail-row">
						<span className="detail-label">Age:</span>
						<span className="detail-value">{user.age}</span>
					</div>

					<div className="detail-row">
						<span className="detail-label">Education:</span>
						<span className="detail-value">{user.education}</span>
					</div>

					<div className="detail-row">
						<span className="detail-label">Gender:</span>
						<span className="detail-value">{user.gender}</span>
					</div>

					<div className="detail-row">
						<span className="detail-label">Skills:</span>
						<span className="detail-value">
							{user.skills.length > 0 ? user.skills.join(", ") : "None"}
						</span>
					</div>

					<div className="detail-row bio-row">
						<span className="detail-label">Bio:</span>
						<span className="detail-value bio-value">
							{user.bio || "No bio provided."}
						</span>
					</div>
				</div>

				<div className="user-details-footer">
					<button type="button" className="back-btn" onClick={onClose}>
						Back to List
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserDetails;
