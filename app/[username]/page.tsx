import { getUserData } from "@/lib/sheets"
import UserWebsite from "@/components/UserWebsite"
import UserNotFound from "@/components/UserNotFound"

export default async function UserPage({ params }: { params: { username: string; file?: string[] } }) {
  // Defensive: If file param exists, this is not a root user page
  if ("file" in params && params.file && params.file.length > 0) {
    return <UserNotFound username={params.username} />
  }

  const { username } = params
  try {
    const userData = await getUserData(username)
    if (!userData) {
      return <UserNotFound username={username} />
    }
    return <UserWebsite sheetId={userData.sheetId} isPaid={userData.isPaid} username={username} />
  } catch (error) {
    return <UserNotFound username={username} error={true} />
  }
}
