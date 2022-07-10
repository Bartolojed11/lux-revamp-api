
const Category = require(`${process.cwd()}/models/categoryModel`)
const catchAsync = require(`${process.cwd()}/handlers/CatchAsync`)

exports.getCategory = catchAsync(async (req, res, next) => {
    const category = await Category.find({_id: req.params.id})

    return res.status(200).json({
        status: 'success',
        data: {
            category
        }
    })
})