-- CreateTable
CREATE TABLE "snacks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "date_time" TIMESTAMP(3) NOT NULL,
    "on_diet" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "snacks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "snacks" ADD CONSTRAINT "snacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
