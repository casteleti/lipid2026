-- DropForeignKey
ALTER TABLE "ingredient_codes" DROP CONSTRAINT "ingredient_codes_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredient_files" DROP CONSTRAINT "ingredient_files_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredient_images" DROP CONSTRAINT "ingredient_images_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_partnerId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_on_applications" DROP CONSTRAINT "ingredients_on_applications_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_on_applications" DROP CONSTRAINT "ingredients_on_applications_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_on_tags" DROP CONSTRAINT "ingredients_on_tags_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_on_tags" DROP CONSTRAINT "ingredients_on_tags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_on_technologies" DROP CONSTRAINT "ingredients_on_technologies_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredients_on_technologies" DROP CONSTRAINT "ingredients_on_technologies_technologyId_fkey";

-- DropForeignKey
ALTER TABLE "leads" DROP CONSTRAINT "leads_ingredientId_fkey";

-- DropIndex
DROP INDEX "leads_ingredientId_idx";

-- AlterTable
ALTER TABLE "leads" DROP COLUMN "ingredientId";

-- AlterTable
ALTER TABLE "segment_pages" DROP COLUMN "ingredientExplorerHeadline",
DROP COLUMN "ingredientExplorerSupportingText";

-- DropTable
DROP TABLE "ingredient_categories";

-- DropTable
DROP TABLE "ingredient_codes";

-- DropTable
DROP TABLE "ingredient_files";

-- DropTable
DROP TABLE "ingredient_images";

-- DropTable
DROP TABLE "ingredients";

-- DropTable
DROP TABLE "ingredients_on_applications";

-- DropTable
DROP TABLE "ingredients_on_tags";

-- DropTable
DROP TABLE "ingredients_on_technologies";

-- DropTable
DROP TABLE "tags";

