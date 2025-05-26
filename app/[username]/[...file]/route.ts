import { type NextRequest, NextResponse } from "next/server"
import { getUserData } from "@/lib/sheets"
import fs from "fs"
import path from "path"

// Map file extensions to content types
const contentTypes: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
}

export async function GET(request: NextRequest, context: { params: { username: string; file: string[] } }) {
  const { username: paramUsername, file } = await context.params;
  let username = paramUsername;

  // Extract subdomain from Host header if present (e.g., path.localhost or user.domain.com)
  const host = request.headers.get("host") || "";
  const hostParts = host.split(":")[0].split("."); // Remove port, split by dot

  // If host is like subdomain.domain.tld or subdomain.localhost
  if (hostParts.length > 2) {
    // For localhost, treat last two as 'localhost' (e.g., path.localhost)
    // For prod, treat last two as domain + tld (e.g., user.domain.com)
    username = hostParts.slice(0, hostParts.length - 2).join(".") || username;
  }
  // Now, username is from subdomain if present, else from path param

  const filePath = file.join("/");
  console.info({filePath});
  console.info({username});

  try {
    // Get the user data to retrieve the sheet ID
    const userData = await getUserData(username)
    console.info({userData})
    if (!userData) {
      return new NextResponse("User not found", { status: 404 })
    }

    // Determine the file extension for content type
    const ext = path.extname(filePath).toLowerCase()
    const contentType = contentTypes[ext] || "text/plain"

    // Path to the static file in the public directory
    const staticFilePath = path.join(process.cwd(), "public", "templates", filePath)

    // Check if file exists
    if (!fs.existsSync(staticFilePath)) {
      return new NextResponse(`File ${filePath} not found`, { status: 404 })
    }

    // Read the file content
    let content = fs.readFileSync(staticFilePath, "utf-8")

    // If it's an HTML or JS file, inject the sheet ID
    if (ext === ".html") {
      // Inject sheet ID as a global variable in HTML files
      const scriptTag = `<script>
        window.SHEET_ID = "${userData.sheetId}";
        window.USER_NAME = "${username}";
        window.IS_PAID = ${userData.isPaid};
      </script>`

      // Insert the script tag right after the opening <head> tag
      content = content.replace("<head>", `<head>${scriptTag}`)
    } else if (ext === ".js") {
      // For JavaScript files, check if they already have the constants defined
      // If not, add them at the beginning of the file
      if (!content.includes("const SHEET_ID")) {
        const jsConstants = `
// Injected constants - DO NOT MODIFY
const SHEET_ID = "${userData.sheetId}";
const USER_NAME = "${username}";
const IS_PAID = ${userData.isPaid};
// End of injected constants

`
        content = jsConstants + content
      }
    }

    // Return the content with the appropriate content type
    return new NextResponse(content, {
      headers: {
        "Content-Type": contentType,
      },
    })
  } catch (error) {
    console.error(`Error serving file ${filePath} for user ${username}:`, error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
