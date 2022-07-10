const Category = require(`${process.cwd()}/models/categoryModel`)
const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)

exports.getCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find()

    res.status(200).json({
        status: 'success',
        results: categories.length,
        data: {
            categories
        }
    })
})

exports.createCategory = catchAsync(async (req, res, next) => {
    const newCategory = await Category.create(req.body)

    return res.status(200).json({
        status: 'success',
        message: 'Category created successfully',
        data: {
            newCategory
        }
    })
})


exports.deleteCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id)

    return res.status(200).json({
        status: 'success',
        message: 'Category deleted successfully'
    })
})

exports.updateCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id)

    return res.status(200).json({
        status: 'success',
        message: 'Category updated successfully',
        data: {
            category
        }
    })
})