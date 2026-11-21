const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

module.exports = async function handler(req, res) {
    res.setHeader("Cache-Control", "no-store");

    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method not allowed" });
    }

    const apiKey = process.env.ROBOFLOW_API_KEY;
    if (!apiKey) {
        console.error("ROBOFLOW_API_KEY is not configured.");
        return res.status(500).json({ error: "Image classification is not configured." });
    }

    const image = req.body && req.body.image;
    if (typeof image !== "string" || !image.trim()) {
        return res.status(400).json({ error: "A base64-encoded image is required." });
    }

    const base64Image = image.trim();
    if (Buffer.byteLength(base64Image, "base64") > MAX_IMAGE_BYTES) {
        return res.status(413).json({ error: "The image is too large. Please choose a smaller image." });
    }

    try {
        const roboflowResponse = await fetch(
            `https://serverless.roboflow.com/vegetable-classification-t6t4d/1?api_key=${encodeURIComponent(apiKey)}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: base64Image
            }
        );

        const responseText = await roboflowResponse.text();
        let responseBody;
        try {
            responseBody = JSON.parse(responseText);
        } catch {
            responseBody = null;
        }

        if (!roboflowResponse.ok) {
            console.error("Roboflow rejected the request:", roboflowResponse.status, responseText);
            return res.status(roboflowResponse.status).json({
                error: "Image classification failed.",
                upstreamStatus: roboflowResponse.status
            });
        }

        return res.status(200).json(responseBody);
    } catch (error) {
        console.error("Unable to contact Roboflow:", error);
        return res.status(502).json({ error: "Unable to contact the image-classification service." });
    }
};
