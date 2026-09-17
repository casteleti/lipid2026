-- `youtubeUrl` (um link) vira `youtubeUrls` (lista, em ordem de exibição).
-- A Lipoid tem dois vídeos institucionais no YouTube; um campo só não comportava.
--
-- O valor existente é preservado como primeiro item da lista — quem tinha um link
-- continua com ele; o painel passa a permitir adicionar outros.

ALTER TABLE "partners" ADD COLUMN "youtubeUrls" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

UPDATE "partners"
SET "youtubeUrls" = ARRAY["youtubeUrl"]
WHERE "youtubeUrl" IS NOT NULL AND btrim("youtubeUrl") <> '';

ALTER TABLE "partners" DROP COLUMN "youtubeUrl";
