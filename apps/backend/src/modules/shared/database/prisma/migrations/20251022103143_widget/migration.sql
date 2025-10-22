-- CreateTable
CREATE TABLE "WidgetConfig" (
    "id" TEXT NOT NULL,
    "submitButtonColor" TEXT NOT NULL DEFAULT '#3829c2',
    "backgroundColor" TEXT NOT NULL DEFAULT '#f4f4f4',
    "fontColor" TEXT NOT NULL DEFAULT '#000000',
    "buttonFontColor" TEXT NOT NULL DEFAULT '#ffffff',
    "borderColor" TEXT NOT NULL DEFAULT '#cccccc',
    "makeTransparent" BOOLEAN NOT NULL DEFAULT false,
    "colorFormat" TEXT NOT NULL DEFAULT 'hex',
    "title" TEXT,
    "successTitle" TEXT,
    "successDescription" TEXT,
    "buttonText" TEXT NOT NULL DEFAULT 'Sign Up',
    "waitlistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "WidgetConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WidgetConfig_waitlistId_key" ON "WidgetConfig"("waitlistId");

-- AddForeignKey
ALTER TABLE "WidgetConfig" ADD CONSTRAINT "WidgetConfig_waitlistId_fkey" FOREIGN KEY ("waitlistId") REFERENCES "Waitlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
