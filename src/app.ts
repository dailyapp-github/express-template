import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import saslprep from "saslprep";
import cors from "cors";
import "dotenv/config";

const app: Application = express();
let cacheDb: any;

app.use(cors<Request>());
app.use(
	bodyParser.json({
		limit: "50mb",
	}),
	bodyParser.urlencoded({
		parameterLimit: 100000,
		limit: "50mb",
		extended: true,
	})
);
const port: number =
	process.env.NODE_ENV === "development" ? Number(process.env.PORT_DEV) : Number(process.env.PORT_PROD);
const stage = process.env.NODE_ENV === "development" ? "dev" : "prod";
const dbName = process.env.NODE_ENV === "development" ? process.env.DB_DEV : process.env.DB_PROD;
const username = process.env.NODE_ENV === "development" ? process.env.USERNAME_DEV : process.env.USERNAME_PROD;
const pass = process.env.NODE_ENV === "development" ? process.env.PASS_DEV : process.env.PASS_PROD;
if (cacheDb && mongoose.connection.readyState === 1) {
	cacheDb;
} else {
	mongoose
		.connect(`mongodb+srv://${username}:${pass}@dailybox-m3uld.mongodb.net/test?retryWrites=true&w=majority`, {
			useUnifiedTopology: true,
			dbName: dbName,
			//  useFindAndModify: false,
			useNewUrlParser: true,
			//  useCreateIndex: true,
		} as ConnectOptions)
		.then(() => {
			console.log("database connected");
		})
		.catch((err) => {
			console.log(err);
		});
}
// auth
// app.use(`/v1/${stage}/auth`, loginRouter);
// app.use(`/v1/${stage}/auth`, authVerify, requestToken);
// end auth

// portal user
// app.use(`/v1/${stage}/portal`, authVerify, createUserPortalRoute);
// app.use(`/v1/${stage}/portal`, authVerify, getUserPortalRoute);
// app.use(`/v1/${stage}/portal`, authVerify, detailUserPortalRoute);
// app.use(`/v1/${stage}/portal`, authVerify, updateUserPortalRoute);
// end portal user

// app.use(`/v1/${stage}/voucher`, outletHistoryRedeemVoucher);

app.listen(port, function () {
	console.log(`App is listening on port ${port} !`);
});
