-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cnic" TEXT,
    "photo" TEXT,
    "father_name" TEXT,
    "finger_print_photo" TEXT,
    "is_authorized" BOOLEAN DEFAULT false,
    "voted_for_presidential_candidates" BOOLEAN DEFAULT false,
    "voted_for_vice_presidential_candidates" BOOLEAN DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cnic_key" ON "User"("cnic");
