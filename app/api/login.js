// // pages/api/login.js
// import { serialize } from "cookie";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { mobile, password } = req.body;

//     try {
//       const response = await fetch("https://mis.tcimax.co.in/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobile, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Set the token in an HTTP-only cookie
//         res.setHeader(
//           "Set-Cookie",
//           serialize("access_token", data.access_token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 60 * 60 * 24, // 1 day
//             path: "/",
//           })
//         );

//         return res.status(200).json({ message: "Login successful" });
//       } else {
//         return res
//           .status(401)
//           .json({ message: data.message || "Login failed" });
//       }
//     } catch (error) {
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).json({ message: "Method not allowed" });
//   }
// }
