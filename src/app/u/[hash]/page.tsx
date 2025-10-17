import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

interface Props {
    params: Promise<{ hash: string }>;
}

export default async function RedirectPage({ params }: Props) {
    const { hash } = await params;

    const link = await db.shortLink.findUnique({
        where: { hash },
    });

    if (!link) notFound();
    redirect(link.originalUrl);
}
