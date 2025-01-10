import axios from "axios"
import { NextResponse } from "next/server"

import type { NextApiRequest, NextApiResponse } from "next"

export async function GET (req: NextApiRequest, res: NextApiResponse) {
        const response = await axios.get("http://127.0.0.1:8000/auth/auth.php")

        if (response.status !== 200) {
            return new NextResponse(JSON.stringify({error: "err connection !!!"})),
            {status: 400}
        }
        return new NextResponse(JSON.stringify(response.data), {status: 200})
}

