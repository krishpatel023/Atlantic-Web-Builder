import { connect } from "@/backend/helpers/connection";
import users from "@/backend/models/users";
import bcrypt from "bcrypt";

export interface UserProps {
  _doc: string;
  userID: string;
  name: string;
  email: string;
  password: string;
  projects: string[];
}

// CREDENTIAL VALIDATION OR LOGIN

export interface UserLoginFields {
  email: string;
  password: string;
}

export interface UserRegisterFields {
  name: string;
  email: string;
  password: string;
  userID: string;
  projects: string[];
}

// GET USER DIRECTLY
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    connect();
    const user = await users.findOne({ userID: userId });
    if (!user) {
      return Response.json(
        { msg: "INVALID_EMAIL", status: false },
        { status: 200 },
      );
    } else {
      const { password, ...others } = user._doc;
      return Response.json(
        { msg: "VALIDATED", data: { ...others }, status: true },
        { status: 200 },
      );
    }
  } catch (error) {
    return Response.json({ status: false, error: error }, { status: 400 });
  }
}

// LOGIN
export async function PUT(req: Request) {
  try {
    const json = await req.json();

    // Type assertion to UserLoginFields or null
    const body = json as UserLoginFields | null;

    if (!body || !body.email || !body.password)
      return Response.json({ msg: "INVALID_REQUEST", status: false });

    connect();
    const enteredPassword = body.password;
    const enteredEmail = body.email;

    const user = await users.findOne({ email: enteredEmail });
    const { password, ...others } = user?._doc;

    if (!user) {
      return Response.json({ msg: "INVALID_EMAIL", status: false });
    } else {
      const isPassCorrect = await bcrypt.compare(enteredPassword, password);
      if (!isPassCorrect) {
        return Response.json({ msg: "INVALID_PASSWORD", status: false });
      } else {
        return Response.json({
          msg: "VALIDATED",
          data: { ...others },
          status: true,
        });
      }
    }
  } catch (error) {
    return Response.json({ status: false, error: error });
  }
}

// SIGN UP
export async function POST(req: Request) {
  try {
    const json = await req.json();

    // Type assertion to UserLoginFields or null
    const body = json as UserRegisterFields | null;

    if (!body || !body.email || !body.password)
      return Response.json({ msg: "INVALID_REQUEST", status: false });

    connect();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);
    const newUser = new users({
      ...body,
      password: hash,
    });
    await newUser.save();
    const { password, ...others } = newUser._doc;
    return Response.json(
      { message: "USER_CREATED", data: { ...others }, status: true },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ status: false, error: error }, { status: 400 });
  }
}
