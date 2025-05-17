import { comparePassword } from "../../util/comparePass.js";
import { generateToken } from "../../util/generateToken.js";
import { encryptPassword } from "../../util/hashPassword.js";
import { User } from "./user.schema.js";

interface ReturnResponse {
  update?: boolean;
  success?: boolean;
  data: any;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const signUp = async (body: any): Promise<ReturnResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      
        // Validate input
      if (!body.email || !body.password) {
        return reject({
          success: false,
          message: "Email and password are required",
        });
      }

      //user existence
      const { success: existSuccess } = await getUserByEmail(body.email);
      if (existSuccess) {
        return reject({
          message: "Email already exist!",
          data: [],
          success: false,
        });
      }

      const { success: passSuccess, hashPassword } = await encryptPassword(
        body.password
      );
      if (!passSuccess) throw new Error("Please send valid password.");

      body["password"] = hashPassword;
      const result = new User(body);

      result.save();

      if (result) {
        const { password, ...userWithoutPassword } = result.toObject();

        resolve({ success: true, data: userWithoutPassword });
      } else {
        return reject({ success: false, data: [] });
      }
    } catch (error: any) {
      return reject(error);
    }
  });
};

const getUserByEmail = async (email: string): Promise<ReturnResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await User.find({ email: email });
      if (result.length) {
        resolve({ success: true, data: result });
      } else {
        resolve({ success: false, data: [] });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const login = async (
  body: LoginCredentials
): Promise<ReturnResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate input
      if (!body.email || !body.password) {
        return reject({
          success: false,
          message: "Email and password are required",
        });
      }

      const { success: existSuccess, data: user } = await getUserByEmail(
        body.email
      );
      if (!existSuccess) {
        return reject({
          message: "Invalid credentials",
          data: [],
          success: false,
        });
      }
      //  Verify password
      const isMatch = await comparePassword(body.password, user[0].password);
      if (!isMatch) {
        return reject({
          success: false,
          message: "Invalid credentials",
        });
      }

      const { password, ...userWithoutPassword } = user[0].toObject();

      //generate token
      userWithoutPassword.token = await generateToken(user[0]);
      resolve({
        success: true,
        data: userWithoutPassword,
      });
    } catch (error) {
      return reject(error);
    }
  });
};
