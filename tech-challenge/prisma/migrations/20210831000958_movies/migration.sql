-- CreateTable
CREATE TABLE "Movie" (
    "imdbID" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Year" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "Poster" TEXT NOT NULL,

    PRIMARY KEY ("imdbID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie.imdbID_unique" ON "Movie"("imdbID");
