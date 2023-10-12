import { Schema, model } from "mongoose";
export interface IActivityError {
	isSolved: boolean;
	apps: string;
	module: string;
	function: string;
	error: string;
}

const portalActivityErrorSchema = new Schema(
	{
		isSolved: { type: Boolean, required: false, default: false },
		apps: { type: String, required: false, default: "" },
		module: { type: String, required: false, default: "" },
		function: { type: String, required: false, default: "" },
		error: { type: String, required: false, default: "" },
	},
	{ collection: "activityErrors", timestamps: true }
);

const ActivityError = model<IActivityError>("ActivityError", portalActivityErrorSchema);

export default ActivityError;
