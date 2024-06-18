"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMealRequestSchema = void 0;
const zod_1 = require("zod");
// request for meal creating
const postMealRequestSchema = () => zod_1.z.object({
    data: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        price: zod_1.z.number(),
        weight: zod_1.z.string(),
        allergens: zod_1.z.array(zod_1.z.string()),
        mealCategory_id: zod_1.z.string(),
        imgUrl: zod_1.z.string().nullable(),
    }),
});
exports.postMealRequestSchema = postMealRequestSchema;
//# sourceMappingURL=meal.interface.js.map