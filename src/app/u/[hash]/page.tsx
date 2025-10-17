import {db} from "@/lib/db";
import {notFound, redirect} from "next/navigation";

interface Props {
    params: {
        hash: string;
    }
}

export default async function RedirectPage({params}: Props) {
    const link = await db.shortLink.findUnique({
        where: { hash: params.hash },
    });

    if (!link) {
        notFound();
    }
    redirect(link.originalUrl);
}