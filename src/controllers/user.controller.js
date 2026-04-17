import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // 1. take user input
    // verify user details
    // 2. send that input to server.
    // 3. check if already exists , if not then register that user.
    // check for images.
    // upload them on cloudinary, avatar check,
    // create user object - for uploading in mongoDB.
    // then create entry in DB.
    // remove password and refresh token field from response.
    // check response - whether user is created or not successfully.
    // if created - return response, else send error.

    // const { username, email, fullname, password } = req.body;
    const { email, fullname, password, username } = req.body;
    // console.log("email", email);
    // console.log("email", email)
    // if(fullname == ""){
    //     throw new ApiError(400, "full name is required")
    // }

    if (
        [fullname, email, password, username].some(
            (field) => filed?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are necessary");
    }

    const existingUser = User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
        throw new ApiError(409, "User Already Exists.");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) throw new ApiError(400, "avatar is required");

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) throw new ApiError(400, "avatar is required");

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser)
        throw new ApiError(500, "couldnt register user due to some error");

    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "user registered successfully")
        );
});

export default registerUser;
