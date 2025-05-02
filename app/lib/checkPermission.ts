import axios from "axios";

export async function checkPermission(Auth: string | undefined) {
    if (!Auth) {
        return false;
    }

    try {
        const response = await axios.get("https://api.smt.siraphop.me/permission", {
            headers: {
                "Auth": Auth
            }
        });

        return response.data === "Admin";
    } catch (error) {
        console.error("บุคคลภายนอก :", error);
        return false;
    }
}
