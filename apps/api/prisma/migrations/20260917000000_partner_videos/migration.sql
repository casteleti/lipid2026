-- Vídeos do parceiro: de um `youtubeUrl` único para uma lista `videos` (JSONB).
--
-- Cada item é { url, title?, poster? }. `url` pode ser YouTube ou um arquivo enviado
-- pelo painel. Motivo: a Lipoid tem dois vídeos institucionais próprios (Lipoid e
-- Lipoid Kosmetik AG), e o cliente não quis a moldura do YouTube.
--
-- O único valor que `youtubeUrl` chegou a ter foi um vídeo de TESTE
-- (youtube.com/watch?v=CX7rUjjY0rI), colocado nos dois parceiros em 11/09/2026 quando
-- o campo nasceu. O cliente pediu a remoção em 16/09. Por isso a coluna é descartada
-- sem migrar o conteúdo — não há dado real a preservar. Conferido na API pública de
-- produção antes desta migration.

ALTER TABLE "partners" ADD COLUMN "videos" JSONB NOT NULL DEFAULT '[]';
ALTER TABLE "partners" DROP COLUMN "youtubeUrl";
