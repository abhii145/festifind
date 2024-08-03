import { connectToDatabase } from "@/lib/database"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import User from "@/lib/database/models/user.model"

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    const reqBody = await request.json()
    const { email, password } = reqBody

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide all fields" },
        { status: 400 }
      )
    }

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      return NextResponse.json(
        { error: "Email ID does not exist" },
        { status: 400 }
      )
    }

    const isPasswordCorrect = bcryptjs.compareSync(
      password,
      existingUser.password || ""
    )

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 400 })
    }

    const { name, _id, role } = existingUser
    const details = { name, email, _id, role }

    return NextResponse.json({
      message: "Login successful",
      success: true,
      details,
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
