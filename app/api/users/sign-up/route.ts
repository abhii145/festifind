import { connectToDatabase } from "@/lib/database"

import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import User from "@/lib/database/models/user.model"

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    const reqBody = await request.json()
    const { name, email, password, role } = reqBody

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    const userRole = role === "admin" ? "admin" : "user"

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    })

    const savedUser = await newUser.save()

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    })
  } catch (error: any) {
      console.log(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
