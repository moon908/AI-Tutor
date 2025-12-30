import CompanionForm from "@/components/CompanionForm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Image from "next/image"
import { newCompanionPermissions } from "@/lib/actions/companion.action"
import Link from "next/link"

const NewCompanion = async () => {
    const { userId } = await auth()

    if (!userId) redirect('/sign-in');

    const canCreateCompanoin = await newCompanionPermissions();

    return (
        <main className="flex flex-col mx-auto lg:w-1/3 md:w-2/3 items-center justify-center">
            {canCreateCompanoin ? (<article className="w-full gap-4 flex flex-col">
                <h1>Companion Builder</h1>
                <CompanionForm />
            </article>) : (
                <article className="companion-limit">
                    <Image src="/images/limit.svg" alt="Companion limit reached" width={360} height={230} />
                    <div className="cta-badge">
                        Upgrade your plan
                    </div>
                    <h1>You've Reached Your Limit</h1>
                    <p>You've Reached your companion limit. Upgrade to create more companions and permissions feature</p>
                    <Link href="/subscription" className="btn-primary w-full justify-center">
                        Upgrade My Plan</Link>
                </article>
            )}
        </main>
    )
}

export default NewCompanion