import User from "../model/usermodel.js";
import jwt from "jsonwebtoken";

// export const protectRoute = async (req, res, next) => {
// 	try {
// 		const token = req.cookies.jwt;

// 		if (!token) {
// 			return res.status(401).json({ error: "Unauthorized: No Token Provided" });
// 		}

// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);

// 		if (!decoded) {
// 			return res.status(401).json({ error: "Unauthorized: Invalid Token" });
// 		}

// 		const user = await User.findById(decoded.userId).select("-password");

// 		if (!user) {
// 			return res.status(404).json({ error: "User not found" });
// 		}

// 		req.user = user;
// 		next();
// 	} catch (err) {
// 		console.log("Error in protectRoute middleware", err.message);
// 		return res.status(500).json({ error: "Internal Server Error" });
// 	}
// };

export const protectRoute = async (req, res, next) => {
  try {


    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const jwttoken = token.replace("Bearer ", "");
    // console.log("Token from Pranav",jwttoken);

    const decoded = jwt.verify(jwttoken, process.env.JWT_SECRET);
    // console.log(decoded)

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    // console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
