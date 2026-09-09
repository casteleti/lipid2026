-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EDITOR', 'USER');

-- CreateEnum
CREATE TYPE "InstitutionalBlockSection" AS ENUM ('FACT', 'PROCESS_STEP', 'QUALITY_ITEM', 'METRIC', 'PRINCIPLE', 'FAQ');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('ARTIGO', 'DOWNLOAD');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "LeadSector" AS ENUM ('FARMACEUTICA', 'COSMETICO', 'ALIMENTICIA', 'NUTRICIONAL', 'VETERINARIO');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "excerpt" TEXT,
    "icon" TEXT,
    "banner" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technologies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "excerpt" TEXT,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "eyebrow" TEXT,
    "h1" TEXT,
    "subheadline" TEXT,
    "heroCtaLabel" TEXT,
    "imageOneUrl" TEXT,
    "imageOneAlt" TEXT,
    "imageOneCaption" TEXT,
    "imageTwoUrl" TEXT,
    "imageTwoAlt" TEXT,
    "imageTwoCaption" TEXT,
    "essenceTitle" TEXT,
    "essenceIntro" TEXT,
    "pillars" JSONB,
    "criteriaTitle" TEXT,
    "criteria" JSONB,
    "authorityStatement" TEXT,
    "formEyebrow" TEXT,
    "formTitle" TEXT,
    "formDescription" TEXT,
    "formValueProposition" TEXT,
    "formCtaLabel" TEXT,
    "formSuccessMessage" TEXT,
    "formChallengeOptions" JSONB,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "technologies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technologies_on_applications" (
    "technologyId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "technologies_on_applications_pkey" PRIMARY KEY ("technologyId","applicationId")
);

-- CreateTable
CREATE TABLE "ingredient_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredient_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients_on_tags" (
    "ingredientId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ingredients_on_tags_pkey" PRIMARY KEY ("ingredientId","tagId")
);

-- CreateTable
CREATE TABLE "ingredient_images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "ingredientId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingredient_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_files" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sizeBytes" INTEGER,
    "ingredientId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingredient_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingredient_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "excerpt" TEXT,
    "cta" TEXT,
    "inci" TEXT,
    "partnerId" TEXT,
    "categoryId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients_on_technologies" (
    "ingredientId" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,

    CONSTRAINT "ingredients_on_technologies_pkey" PRIMARY KEY ("ingredientId","technologyId")
);

-- CreateTable
CREATE TABLE "ingredients_on_applications" (
    "ingredientId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "ingredients_on_applications_pkey" PRIMARY KEY ("ingredientId","applicationId")
);

-- CreateTable
CREATE TABLE "partners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "excerpt" TEXT,
    "logo" TEXT,
    "image" TEXT,
    "websites" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "country" TEXT,
    "highlights" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institutional_page" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "heroEyebrow" TEXT,
    "heroTitle" TEXT,
    "heroDescription" TEXT,
    "heroImage" TEXT,
    "heroCtaPrimaryLabel" TEXT,
    "heroCtaPrimaryHref" TEXT,
    "heroCtaSecondaryLabel" TEXT,
    "heroCtaSecondaryHref" TEXT,
    "quemSomosIntro" TEXT,
    "comoAjudamosCta" TEXT,
    "parceriaText" TEXT,
    "qualidadeText" TEXT,
    "historiaText" TEXT,
    "ctaFinalHeading" TEXT,
    "ctaFinalText" TEXT,
    "ctaFinalPrimaryLabel" TEXT,
    "ctaFinalPrimaryHref" TEXT,
    "ctaFinalSecondaryLabel" TEXT,
    "ctaFinalSecondaryHref" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institutional_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institutional_blocks" (
    "id" TEXT NOT NULL,
    "section" "InstitutionalBlockSection" NOT NULL,
    "icon" TEXT,
    "title" TEXT,
    "value" TEXT,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institutional_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institutional_sections" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "eyebrow" TEXT,
    "title" TEXT,
    "subtitle" TEXT,
    "body" TEXT,
    "highlight" TEXT,
    "quote" TEXT,
    "ctaLabel" TEXT,
    "ctaHref" TEXT,
    "secondaryCtaLabel" TEXT,
    "secondaryCtaHref" TEXT,
    "imageHint" TEXT,
    "imageUrl" TEXT,
    "extra" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institutional_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institutional_section_items" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "icon" TEXT,
    "title" TEXT,
    "subtitle" TEXT,
    "text" TEXT,
    "value" TEXT,
    "linkLabel" TEXT,
    "linkHref" TEXT,
    "imageHint" TEXT,
    "imageUrl" TEXT,
    "extra" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institutional_section_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "segment_pages" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sector" "LeadSector" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "eyebrow" TEXT,
    "h1" TEXT,
    "subheadline" TEXT,
    "salesParagraphs" JSONB,
    "applicationsTitle" TEXT,
    "applicationsIntro" TEXT,
    "applications" JSONB,
    "floatingHighlight" TEXT,
    "ingredientExplorerHeadline" TEXT,
    "ingredientExplorerSupportingText" TEXT,
    "formEyebrow" TEXT,
    "formTitle" TEXT,
    "formDescription" TEXT,
    "formValueProposition" TEXT,
    "formCtaLabel" TEXT,
    "formSuccessMessage" TEXT,
    "formChallengeOptions" JSONB,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "segment_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_views" (
    "id" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "sector" "LeadSector",
    "referrer" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content" (
    "id" TEXT NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'ARTIGO',
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "featured" TEXT,
    "featuredAlt" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "author" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_summary_points" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "content_summary_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_faqs" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "content_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_files" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sizeBytes" INTEGER,
    "mimetype" TEXT,
    "contentId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "content_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_on_categories" (
    "contentId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "content_on_categories_pkey" PRIMARY KEY ("contentId","categoryId")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "sector" "LeadSector",
    "message" TEXT,
    "source" TEXT NOT NULL DEFAULT 'website',
    "pageUrl" TEXT,
    "pageTitle" TEXT,
    "landingRoute" TEXT,
    "ingredientId" TEXT,
    "contentId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seo_pages" (
    "id" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "keywords" TEXT,
    "ogImage" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seo_pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "applications_name_key" ON "applications"("name");

-- CreateIndex
CREATE UNIQUE INDEX "applications_slug_key" ON "applications"("slug");

-- CreateIndex
CREATE INDEX "applications_slug_idx" ON "applications"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "technologies_name_key" ON "technologies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "technologies_slug_key" ON "technologies"("slug");

-- CreateIndex
CREATE INDEX "technologies_slug_idx" ON "technologies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ingredient_categories_name_key" ON "ingredient_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ingredient_categories_slug_key" ON "ingredient_categories"("slug");

-- CreateIndex
CREATE INDEX "ingredient_categories_slug_idx" ON "ingredient_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "tags_slug_idx" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "ingredient_images_ingredientId_idx" ON "ingredient_images"("ingredientId");

-- CreateIndex
CREATE INDEX "ingredient_files_ingredientId_idx" ON "ingredient_files"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "ingredient_codes_code_key" ON "ingredient_codes"("code");

-- CreateIndex
CREATE INDEX "ingredient_codes_ingredientId_idx" ON "ingredient_codes"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_slug_key" ON "ingredients"("slug");

-- CreateIndex
CREATE INDEX "ingredients_slug_idx" ON "ingredients"("slug");

-- CreateIndex
CREATE INDEX "ingredients_partnerId_idx" ON "ingredients"("partnerId");

-- CreateIndex
CREATE INDEX "ingredients_categoryId_idx" ON "ingredients"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_partnerId_name_key" ON "ingredients"("partnerId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "partners_name_key" ON "partners"("name");

-- CreateIndex
CREATE UNIQUE INDEX "partners_slug_key" ON "partners"("slug");

-- CreateIndex
CREATE INDEX "partners_slug_idx" ON "partners"("slug");

-- CreateIndex
CREATE INDEX "institutional_blocks_section_order_idx" ON "institutional_blocks"("section", "order");

-- CreateIndex
CREATE UNIQUE INDEX "institutional_sections_slug_key" ON "institutional_sections"("slug");

-- CreateIndex
CREATE INDEX "institutional_sections_order_idx" ON "institutional_sections"("order");

-- CreateIndex
CREATE INDEX "institutional_section_items_sectionId_order_idx" ON "institutional_section_items"("sectionId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "segment_pages_slug_key" ON "segment_pages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "segment_pages_sector_key" ON "segment_pages"("sector");

-- CreateIndex
CREATE INDEX "segment_pages_slug_idx" ON "segment_pages"("slug");

-- CreateIndex
CREATE INDEX "page_views_route_idx" ON "page_views"("route");

-- CreateIndex
CREATE INDEX "page_views_sector_idx" ON "page_views"("sector");

-- CreateIndex
CREATE INDEX "page_views_createdAt_idx" ON "page_views"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_slug_idx" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "content_title_key" ON "content"("title");

-- CreateIndex
CREATE UNIQUE INDEX "content_slug_key" ON "content"("slug");

-- CreateIndex
CREATE INDEX "content_slug_idx" ON "content"("slug");

-- CreateIndex
CREATE INDEX "content_status_idx" ON "content"("status");

-- CreateIndex
CREATE INDEX "content_type_idx" ON "content"("type");

-- CreateIndex
CREATE INDEX "content_summary_points_contentId_idx" ON "content_summary_points"("contentId");

-- CreateIndex
CREATE INDEX "content_faqs_contentId_idx" ON "content_faqs"("contentId");

-- CreateIndex
CREATE INDEX "content_files_contentId_idx" ON "content_files"("contentId");

-- CreateIndex
CREATE INDEX "leads_email_idx" ON "leads"("email");

-- CreateIndex
CREATE INDEX "leads_createdAt_idx" ON "leads"("createdAt");

-- CreateIndex
CREATE INDEX "leads_ingredientId_idx" ON "leads"("ingredientId");

-- CreateIndex
CREATE INDEX "leads_contentId_idx" ON "leads"("contentId");

-- CreateIndex
CREATE INDEX "leads_landingRoute_idx" ON "leads"("landingRoute");

-- CreateIndex
CREATE UNIQUE INDEX "seo_pages_route_key" ON "seo_pages"("route");

-- AddForeignKey
ALTER TABLE "technologies_on_applications" ADD CONSTRAINT "technologies_on_applications_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technologies_on_applications" ADD CONSTRAINT "technologies_on_applications_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_on_tags" ADD CONSTRAINT "ingredients_on_tags_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_on_tags" ADD CONSTRAINT "ingredients_on_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_images" ADD CONSTRAINT "ingredient_images_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_files" ADD CONSTRAINT "ingredient_files_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_codes" ADD CONSTRAINT "ingredient_codes_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ingredient_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_on_technologies" ADD CONSTRAINT "ingredients_on_technologies_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_on_technologies" ADD CONSTRAINT "ingredients_on_technologies_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_on_applications" ADD CONSTRAINT "ingredients_on_applications_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients_on_applications" ADD CONSTRAINT "ingredients_on_applications_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institutional_section_items" ADD CONSTRAINT "institutional_section_items_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "institutional_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_summary_points" ADD CONSTRAINT "content_summary_points_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_faqs" ADD CONSTRAINT "content_faqs_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_files" ADD CONSTRAINT "content_files_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_on_categories" ADD CONSTRAINT "content_on_categories_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_on_categories" ADD CONSTRAINT "content_on_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE SET NULL ON UPDATE CASCADE;
