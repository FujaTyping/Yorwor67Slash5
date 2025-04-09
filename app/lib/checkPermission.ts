import axios from "axios";

export async function checkPermission(email: string | undefined) {
    if (!email) {
        return false;
    }

    try {
        const response = await axios.get("https://api.smt.siraphop.me/permission", {
            headers: {
                "Auth": email
            }
        });

        return response.data === "Admin";
    } catch (error) {
        console.error("บุคคลภายนอก :", error);
        return false;
    }
}
