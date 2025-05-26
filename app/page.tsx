import Link from "next/link"
import { getLastSignups } from "../lib/sheets"
// Type for UserData
import type { UserData } from "../lib/sheets"
import HomeClient from "../components/HomeClient"

export default async function Home() {    
    // Fetch last 5 signups from the master sheet
    let lastSignups: UserData[] = []
    try {
      lastSignups = await getLastSignups(5)
    } catch (e) {
      lastSignups = []
    }

    return <HomeClient lastSignups={lastSignups} />
}
