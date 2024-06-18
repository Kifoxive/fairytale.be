"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMealCategoryRequestSchema = void 0;
const zod_1 = require("zod");
// request for meal category creating
const postMealCategoryRequestSchema = () => zod_1.z.object({
    data: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        subMealCategoriesId: zod_1.z.array(zod_1.z.string()),
    }),
});
exports.postMealCategoryRequestSchema = postMealCategoryRequestSchema;
//# sourceMappingURL=mealCategory.interface.js.map