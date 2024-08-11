"use server"

import { CreateCategoryParams } from "@/types"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"

export const createCategory = async ({
  categoryName,
}: {
  categoryName: string
}) => {
  try {
    await connectToDatabase()

    const existingCategory = await Category.findOne({ name: categoryName })

    if (!existingCategory) {
      const newCategory = await Category.create({ name: categoryName })
      return JSON.parse(JSON.stringify(newCategory))
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getAllCategories = async () => {
  try {
    await connectToDatabase()
    const categories = await Category.find()
    return JSON.parse(JSON.stringify(categories))
  } catch (error) {
    console.error(error)
  }
}
